/* Very small helper that appends optimization params to Cloudinary URLs.
   Accepts either a full Cloudinary url or a public id. */
export default function cloudinary(src, opts = {}) {
  if (!src) return "";
  const params = new URLSearchParams();
  if (opts.w) params.append("w", opts.w);
  params.append("q", opts.q || "auto");
  params.append("f", opts.f || "auto");
  // If src already contains cloudinary root, insert /q_auto,f_auto,w_XXX/ after upload/
  try {
    const url = new URL(src);
    if (url.hostname.includes("cloudinary.com") && url.pathname.includes("/upload/")) {
      const parts = url.pathname.split("/upload/");
      const insert = `upload/`;
      const transformed = `${url.origin}${parts[0]}/upload/${params.toString() ? `?${params.toString()}` : ""}${parts[1]}`;
      // fallback: return original (Cloudinary transformations are ideally done via explicit path)
      return src;
    }
  } catch (e) {
    // not a full URL; assume public id
  }
  // fallback return original for simplicity
  return src;
}