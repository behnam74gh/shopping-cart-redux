export default function formatCurrancy(num) {
  return "$" + Number(num.toFixed(1)).toLocaleString() + " ";
}
