export function fetchImg(src, options = {}) {
  if (!src) return "";

  const {
    width,
    height,
    crop = "fill",
    quality = "auto",
  } = options;

  const transforms = [];
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (crop) transforms.push(`c_${crop}`);
  if (quality) transforms.push(`q_${quality}`);

  const transformString = transforms.join(",");

  // ✅ If NOT a Cloudinary URL → return as-is
  if (!src.includes("res.cloudinary.com")) {
    return src;
  }

  // ✅ If no transforms → return original
  if (!transformString) return src;

  // ✅ SAFELY inject after '/upload/' ONLY ONCE
  const parts = src.split("/upload/");

  if (parts.length !== 2) {
    return src; // fallback if unexpected format
  }

  return `${parts[0]}/upload/${transformString}/${parts[1]}`;
}