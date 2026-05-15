// Upload a file to backend Cloudinary route
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch("https://brandx-backend-4vs6.onrender.com/api/uploads/product", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "Upload failed");
  }

  const data = await res.json();
  return data.url; // <-- this is the Cloudinary URL
};
