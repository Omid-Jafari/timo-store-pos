import AddWithBarcode from "./FindProduct/AddWithBarcode";
import ProductDetail from "./ProductDetail";

const ActionsCol = () => {
  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden">
      <ProductDetail />
      <AddWithBarcode />
    </div>
  );
};

export default ActionsCol;
