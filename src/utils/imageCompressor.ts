/**
 * Compresses an image file using an off-screen HTML5 Canvas.
 * Resizes large smartphone/camera photos (which can be 2MB-12MB) down to ~30KB-60KB
 * ensuring it fits perfectly into localStorage without hitting QuotaExceededError.
 */
export async function compressImageFile(
  file: File, 
  maxWidth = 720, 
  maxHeight = 720, 
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    // If not an image, reject
    if (!file.type.startsWith('image/')) {
      reject(new Error('অনুগ্রহ করে সঠিক ছবির ফাইল (.jpg, .png, ইত্যাদি) নির্বাচন করুন।'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('ফাইল পড়তে ত্রুটি হয়েছে।'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('ছবি লোড করতে সমস্যা হয়েছে।'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect-ratio preserved dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback to original data URL if canvas 2D context fails
          resolve(e.target?.result as string);
          return;
        }

        // High quality bicubic resampling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to optimized JPEG format
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };

      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}
