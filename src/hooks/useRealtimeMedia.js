import { useState, useEffect } from "react";
import { useRealtime } from "../components/realtime/RealtimeProvider";
import { uploadMediaToStorage, validateMediaFile } from "../lib/mediaUpload";
import { optimizeImage, generateThumbnail } from "../lib/imageOptimizer";
import { logActivity } from "../lib/activityLogger";

export function useRealtimeMedia(galleryType = "shared", semesterNumber = null) {
  const { supabase, isConfigured, userRole, sessionId } = useRealtime();
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch items from Supabase or localStorage
  useEffect(() => {
    const storageKey = `ami_local_media_${galleryType}_${semesterNumber || "all"}`;

    if (!isConfigured || !supabase) {
      const local = localStorage.getItem(storageKey);
      setMediaList(local ? JSON.parse(local) : []);
      return;
    }

    let query = supabase.from("media_items").select("*");

    if (galleryType !== "all") {
      query = query.eq("gallery_type", galleryType);
    }
    if (semesterNumber) {
      query = query.eq("semester_number", semesterNumber);
    }

    query.order("created_at", { ascending: false }).then(({ data, error }) => {
      if (!error && data) {
        setMediaList(data);
        localStorage.setItem(storageKey, JSON.stringify(data));
      }
    });

    // Realtime channel
    const channel = supabase
      .channel(`realtime:media:${galleryType}:${semesterNumber || "all"}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "media_items" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setMediaList((prev) => [payload.new, ...prev.filter((m) => m.id !== payload.new.id)]);
          } else if (payload.eventType === "DELETE") {
            setMediaList((prev) => prev.filter((m) => m.id !== payload.old.id));
          } else if (payload.eventType === "UPDATE") {
            setMediaList((prev) => prev.map((m) => (m.id === payload.new.id ? payload.new : m)));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isConfigured, supabase, galleryType, semesterNumber]);

  const uploadMemory = async ({ file, caption, handwrittenNote, altText, category, dateLabel, frameStyle = "polaroid" }) => {
    const val = validateMediaFile(file);
    if (!val.valid) return { success: false, error: val.error };

    setIsUploading(true);
    setUploadProgress(20);

    let fileToUpload = file;
    let width = null;
    let height = null;

    if (val.mediaType === "image") {
      setUploadProgress(40);
      const opt = await optimizeImage(file);
      fileToUpload = opt.file;
      width = opt.width;
      height = opt.height;
    }

    setUploadProgress(65);
    const folder = galleryType === "semester" ? `semesters/semester-${semesterNumber || 1}` : galleryType;
    const uploadRes = await uploadMediaToStorage(fileToUpload, sessionId, folder);

    if (!uploadRes.success) {
      setIsUploading(false);
      return { success: false, error: "Media upload failed." };
    }

    setUploadProgress(85);

    const newRecord = {
      id: "media_" + Math.random().toString(36).substring(2, 9),
      room_id: "ami",
      user_id: sessionId,
      author_name: userRole,
      gallery_type: galleryType,
      semester_number: semesterNumber,
      media_type: val.mediaType,
      storage_path: uploadRes.storagePath,
      media_url: uploadRes.mediaUrl,
      thumbnail_url: uploadRes.mediaUrl,
      caption: caption || "",
      handwritten_note: handwrittenNote || "",
      alt_text: altText || "Memory photo",
      category: category || "College",
      date_label: dateLabel || "",
      frame_style: frameStyle,
      rotation: Math.round((Math.random() * 4 - 2) * 10) / 10,
      width,
      height,
      created_at: new Date().toISOString(),
    };

    // Optimistic insert
    setMediaList((prev) => [newRecord, ...prev]);

    if (isConfigured && supabase) {
      try {
        const { data, error } = await supabase.from("media_items").insert([newRecord]).select().single();
        if (!error && data) {
          setMediaList((prev) => [data, ...prev.filter((m) => m.id !== newRecord.id)]);
        }
      } catch (err) {
        console.warn("Media insert fallback:", err);
      }
    }

    // Log activity
    logActivity({
      sessionId,
      authorName: userRole,
      activityType: "upload_media",
      entityType: "media",
      summary: `${userRole} added a new ${val.mediaType} memory to ${galleryType === "semester" ? `Semester ${semesterNumber}` : galleryType}.`,
    });

    setUploadProgress(100);
    setIsUploading(false);
    return { success: true };
  };

  const deleteMemory = async (mediaId) => {
    setMediaList((prev) => prev.filter((m) => m.id !== mediaId));
    if (isConfigured && supabase) {
      try {
        await supabase.from("media_items").delete().eq("id", mediaId);
      } catch {
        // Fallback
      }
    }
  };

  return {
    mediaList,
    uploadMemory,
    deleteMemory,
    isUploading,
    uploadProgress,
    userRole,
  };
}
