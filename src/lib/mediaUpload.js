// Media upload helper for Supabase Storage

import { supabase, isSupabaseConfigured } from "./supabase";

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
export const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm"];
export const MAX_IMAGE_SIZE = 12 * 1024 * 1024; // 12 MB
export const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100 MB

export function validateMediaFile(file) {
  if (!file) return { valid: false, error: "No file selected." };

  const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
  const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type);

  if (!isImage && !isVideo) {
    return {
      valid: false,
      error: "Unsupported file format. Please upload JPEG, PNG, WebP, AVIF images or MP4, WebM videos.",
    };
  }

  if (isImage && file.size > MAX_IMAGE_SIZE) {
    return { valid: false, error: "Image size exceeds 12 MB limit." };
  }

  if (isVideo && file.size > MAX_VIDEO_SIZE) {
    return { valid: false, error: "Video size exceeds 100 MB limit." };
  }

  return { valid: true, mediaType: isImage ? "image" : "video" };
}

export async function uploadMediaToStorage(file, userId, folder = "shared") {
  if (!isSupabaseConfigured || !supabase) {
    // Return object URL for local fallback demonstration
    const localUrl = URL.createObjectURL(file);
    return {
      success: true,
      mediaUrl: localUrl,
      storagePath: `local/${folder}/${file.name}`,
      isLocal: true,
    };
  }

  const ext = file.name.split(".").pop().toLowerCase();
  const safeFileName = `${userId}/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
  const bucketName = "friendship-media";
  const fullPath = `${folder}/${safeFileName}`;

  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fullPath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fullPath);

    return {
      success: true,
      mediaUrl: publicUrlData.publicUrl,
      storagePath: fullPath,
      isLocal: false,
    };
  } catch (err) {
    console.warn("Supabase Storage upload failed, utilizing local URL fallback:", err);
    return {
      success: true,
      mediaUrl: URL.createObjectURL(file),
      storagePath: fullPath,
      isLocal: true,
    };
  }
}
