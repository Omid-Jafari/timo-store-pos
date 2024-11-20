const priceComma = (price: number) => {
  if (isNaN(price)) return "-";
  return price?.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
  });
};
export default priceComma;
