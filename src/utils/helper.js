export function formatNumber(number) {
  if (number === null || isNaN(number)) number = 0;
  const formattedNumber = number
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return formattedNumber;
}
