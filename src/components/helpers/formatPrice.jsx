export default function formatPrice(amount) {
  const num = typeof amount === "number" ? amount : Number(amount) || 0;
  return new Intl.NumberFormat("en-NG").format(num) + " ₦";
}