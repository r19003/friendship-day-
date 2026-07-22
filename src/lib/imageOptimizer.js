// Client-side image optimization, thumbnail generation, and WebP conversion

export async function optimizeImage(file, maxWidth = 1920, maxHeight = 1080, quality = 0.85) {
  if (!file || !file.type.startsWith("image/")) return file;

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const optimizedFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".webp"), {
                type: "image/webp",
                lastModified: Date.now(),
              });
              resolve({
                file: optimizedFile,
                previewUrl: URL.createObjectURL(blob),
                width,
                height,
              });
            } else {
              resolve({ file, previewUrl: URL.createObjectURL(file), width: img.width, height: img.height });
            }
          },
          "image/webp",
          quality
        );
      };
      img.onerror = () => resolve({ file, previewUrl: URL.createObjectURL(file) });
      img.src = e.target.result;
    };
    reader.onerror = () => resolve({ file, previewUrl: URL.createObjectURL(file) });
    reader.readAsDataURL(file);
  });
}

export async function generateThumbnail(file, size = 300) {
  if (!file || !file.type.startsWith("image/")) return null;

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");

        // Center crop square
        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;

        ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const thumbFile = new File([blob], "thumb_" + file.name.replace(/\.[^/.]+$/, ".webp"), {
                type: "image/webp",
              });
              resolve({ file: thumbFile, url: URL.createObjectURL(blob) });
            } else {
              resolve(null);
            }
          },
          "image/webp",
          0.75
        );
      };
      img.onerror = () => resolve(null);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
}
