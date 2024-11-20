import { useTranslation } from "react-i18next";
import priceComma from "../../../../utils/priceComma";
import { Product } from "./ModalProductList";
import { lazy, Suspense, useState } from "react";

const AddWithIdModal = lazy(() => import("./AddWithIdModal"));

const ProductRow = ({
  productItem,
  productItemIdx,
}: {
  productItem: Product;
  productItemIdx: number;
}) => {
  const [t] = useTranslation("global");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Suspense>
        <AddWithIdModal
          productItem={productItem}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </Suspense>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        disabled={!productItem?.stock_status}
        className={`grid grid-cols-12 gap-1 border-b hover:bg-[#f2f2f2] disabled:bg-none disabled:opacity-50 border-[#e9ecef] px-1 py-2 text-sm font-semibold transition-colors duration-300 `}
      >
        <div className="text-center col-span-1">{productItemIdx + 1}</div>
        <div title={productItem?.title} className="col-span-4 line-clamp-1">
          {productItem?.title}
        </div>
        <div className="text-center col-span-2">
          {priceComma(productItem?.gross_price)}
        </div>
        <div className="text-center col-span-2 flex">
          {productItem?.stock_status ? (
            <div className="w-auto mx-auto text-white font-medium text-sm px-2 bg-[rgb(46,202,139)] rounded-md">
              {t("table.inStock")}
            </div>
          ) : (
            <div className="w-auto mx-auto text-white font-medium text-sm px-2 bg-[rgb(228,63,82)] rounded-md">
              {t("table.outStock")}
            </div>
          )}
        </div>
        <div className="text-center col-span-2">
          {productItem?.stock_amount}
        </div>
        <div className="text-center col-span-1">{productItem?.unit?.title}</div>
      </button>
    </>
  );
};

export default ProductRow;
