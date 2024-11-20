import { useTranslation } from "react-i18next";
import priceComma from "../../../utils/priceComma";
import { lazy, Suspense } from "react";
import { useCart } from "@/hooks/cart-state";

const SubmitOrderComp = lazy(() => import("./SubmitOrderComp"));
const ModalProductList = lazy(
  () => import("../actionsCol/FindProduct/ModalProductList")
);

const OrderDetailsCol = () => {
  const [t] = useTranslation("global");
  const { cartData } = useCart();

  return (
    <div className="h-full flex flex-col gap-3">
      <div className="flex flex-col border rounded-md border-[#e9ecef] p-4 gap-4">
        <div className="flex items-center justify-between border-b border-[#e9ecef]">
          <span>{t("table.itemsCount")}</span>
          <span>{cartData?.items_count}</span>
        </div>
        <div className="flex items-center justify-between border-b border-[#e9ecef]">
          <span>{t("table.sumTotal")}</span>
          <span>{priceComma(+cartData?.gross_total)}</span>
        </div>
        <div className="flex items-center justify-between border-b border-[#e9ecef]">
          <span>{t("table.discount")}</span>
          <span>{priceComma(+cartData?.discount_amount)}</span>
        </div>
        <div className="flex items-center justify-between border-b border-[#e9ecef]">
          <span>{t("table.finalTotal")}</span>
          <span>{priceComma(+cartData?.net_total)}</span>
        </div>
      </div>
      <Suspense>
        <SubmitOrderComp />
      </Suspense>
      <Suspense>
        <ModalProductList />
      </Suspense>
    </div>
  );
};

export default OrderDetailsCol;
