import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Upload, Image as ImageIcon, Video, CheckCircle2 } from "lucide-react";
import { validateMediaFile } from "../../lib/mediaUpload";
import { optimizeImage } from "../../lib/imageOptimizer";

export default function MediaUploadModal({
  isOpen,
  onClose,
  onUpload,
  defaultGalleryType = "shared",
  defaultSemester = 1,
}) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [mediaType, setMediaType] = useState("image");
  const [galleryType, setGalleryType] = useState(defaultGalleryType);
  const [semesterNumber, setSemesterNumber] = useState(defaultSemester);
  const [caption, setCaption] = useState("");
  const [handwrittenNote, setHandwrittenNote] = useState("");
  const [altText, setAltText] = useState("");
  const [category, setCategory] = useState("College");
  const [frameStyle, setFrameStyle] = useState("polaroid");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleFileSelect = async (selectedFile) => {
    setError(null);
    const val = validateMediaFile(selectedFile);
    if (!val.valid) {
      setError(val.error);
      return;
    }

    setFile(selectedFile);
    setMediaType(val.mediaType);

    if (val.mediaType === "image") {
      const opt = await optimizeImage(selectedFile);
      setPreviewUrl(opt.previewUrl);
    } else {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a photo or video to upload.");
      return;
    }
    if (!altText.trim() || altText.trim().length < 3) {
      setError("Required accessibility description (alt text) must be at least 3 characters.");
      return;
    }

    setIsSubmitting(true);
    const res = await onUpload({
      file,
      caption,
      handwrittenNote,
      altText,
      category,
      galleryType,
      semesterNumber: galleryType === "semester" ? Number(semesterNumber) : null,
      frameStyle,
    });

    if (res.success) {
      onClose();
    } else {
      setError(res.error || "Upload failed.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="upload-modal-backdrop" onClick={onClose}>
      <motion.div
        className="upload-modal-container"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="upload-modal-header">
          <div>
            <h3 style={{ fontSize: "1.5rem", fontFamily: "var(--font-display)", color: "white" }}>
              ✨ Add a Memory to the Universe
            </h3>
            <p style={{ opacity: 0.7, fontSize: "0.88rem" }}>Upload a photograph or video to store permanently</p>
          </div>
          <button className="lightbox-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={22} />
          </button>
        </div>

        {error && <div className="upload-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="upload-form-grid">
          {/* Dropzone / Preview */}
          <div className="upload-left-col">
            {!previewUrl ? (
              <div
                className="memory-upload-dropzone"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <Upload size={38} style={{ color: "var(--chaos-violet)", marginBottom: "0.5rem" }} />
                <p style={{ fontWeight: 800, color: "var(--chaos-text-dark)" }}>Drag & Drop Memory File Here</p>
                <p style={{ fontSize: "0.8rem", opacity: 0.7, marginBlock: "0.4rem" }}>
                  Supports JPEG, PNG, WebP (max 12MB) or MP4, WebM (max 100MB)
                </p>
                <label className="primary-button btn-chaos" style={{ marginTop: "0.5rem", cursor: "pointer", display: "inline-block" }}>
                  Browse Files
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => e.target.files[0] && handleFileSelect(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </label>
              </div>
            ) : (
              <div className="memory-preview-wrapper">
                {mediaType === "video" ? (
                  <video src={previewUrl} controls className="memory-preview-media" />
                ) : (
                  <img src={previewUrl} alt="Upload preview" className="memory-preview-media" />
                )}
                <button
                  type="button"
                  className="change-file-btn"
                  onClick={() => { setFile(null); setPreviewUrl(null); }}
                >
                  Change File
                </button>
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="upload-right-col">
            <div className="form-group">
              <label>Gallery Destination:</label>
              <select value={galleryType} onChange={(e) => setGalleryType(e.target.value)} className="upload-input">
                <option value="semester">📚 Semester Memory Archive</option>
                <option value="daisy">🌼 Daisy Personal Collection</option>
                <option value="sunshine">☀️ Sunshine Personal Collection</option>
                <option value="shared">💜 Our Chaos Shared Collection</option>
              </select>
            </div>

            {galleryType === "semester" && (
              <div className="form-group">
                <label>Semester Number (1 to 6):</label>
                <select value={semesterNumber} onChange={(e) => setSemesterNumber(e.target.value)} className="upload-input">
                  <option value={1}>Semester 1 (2023)</option>
                  <option value={2}>Semester 2 (Jan–June 2024)</option>
                  <option value={3}>Semester 3 (July–Dec 2024)</option>
                  <option value={4}>Semester 4 (Jan–June 2025)</option>
                  <option value={5}>Semester 5 (July–Dec 2025)</option>
                  <option value={6}>Semester 6 (Jan–June 2026)</option>
                </select>
              </div>
            )}

            <div className="form-group">
              <label>Accessibility Alt Text (Required):</label>
              <input
                type="text"
                className="upload-input"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Describe what is visible in the photograph for screen readers..."
                required
              />
            </div>

            <div className="form-group">
              <label>Caption:</label>
              <textarea
                className="upload-input"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="The story behind this photograph..."
                rows={2}
                maxLength={500}
              />
            </div>

            <div className="form-group">
              <label>Handwritten Scrapbook Note:</label>
              <input
                type="text"
                className="upload-input handwritten"
                value={handwrittenNote}
                onChange={(e) => setHandwrittenNote(e.target.value)}
                placeholder="Short note in Caveat font..."
                maxLength={300}
              />
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="upload-input">
                  <option value="College">College</option>
                  <option value="BTS">BTS</option>
                  <option value="Night Stays">Night Stays</option>
                  <option value="Food">Food</option>
                  <option value="Events">Events</option>
                  <option value="Celebrations">Celebrations</option>
                  <option value="Random Chaos">Random Chaos</option>
                </select>
              </div>

              <div className="form-group" style={{ flex: 1 }}>
                <label>Frame Style:</label>
                <select value={frameStyle} onChange={(e) => setFrameStyle(e.target.value)} className="upload-input">
                  <option value="polaroid">Polaroid</option>
                  <option value="classic">Classic Frame</option>
                  <option value="film">Film Strip</option>
                </select>
              </div>
            </div>

            <div className="upload-modal-actions">
              <button type="button" className="cancel-reply-btn" onClick={onClose} style={{ color: "white" }}>
                Cancel
              </button>
              <button type="submit" className="primary-button btn-daisy" disabled={isSubmitting || !file}>
                {isSubmitting ? "Uploading Memory…" : "✨ Add Memory"}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
