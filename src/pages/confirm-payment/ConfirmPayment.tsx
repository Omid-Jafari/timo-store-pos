import PaymentMethod from "@/components/confirmPayment/PaymentMethod";
import CustomerComp from "@/components/pos/orderDetailsCol/CustomerComp";
import CartTableRows from "@/components/pos/orderListsCol/CartTableRows";
import { useCart } from "@/hooks/cart-state";
import priceComma from "@/utils/priceComma";
import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";

const SubmitOrderComp = lazy(
  () => import("@/components/confirmPayment/SubmitOrderComp")
);

const ConfirmPayment = () => {
  const [t] = useTranslation("global");
  const { cartData } = useCart();

  return (
    <div className="w-full h-full flex gap-4 overflow-hidden">
      <div className="flex-1 flex flex-col gap-8">
        <div className="flex flex-col gap-2 ">
          <h5 className="text-xl font-semibold">{t("order.customer")}</h5>
          <CustomerComp />
        </div>
        <PaymentMethod />
        <Suspense>
          <SubmitOrderComp />
        </Suspense>
      </div>
      <div className="h-full flex flex-col gap-2 flex-[0_0_50%]">
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
        <div className="flex-1 flex flex-col border rounded-md border-[#e9ecef] overflow-hidden">
          <div className="grid grid-cols-11 gap-1 p-1 text-[#8492A6] text-[13px] font-semibold border-b border-[#e9ecef] sticky top-0 bg-white">
            <div className="text-center col-span-1">{t("table.number")}</div>
            <div className="text-center col-span-3">{t("table.product")}</div>
            <div className="text-center col-span-2">{t("table.unitPrice")}</div>
            <div className="text-center col-span-1">{t("table.count")}</div>
            <div className="text-center col-span-2">{t("table.unit")}</div>
            <div className="text-center col-span-2">{t("table.total")}</div>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto">
            {cartData?.items?.map((cartItem, cartItemIdx: number) => (
              <CartTableRows
                key={`cartItemIdx${cartItemIdx}`}
                cartItem={cartItem}
                cartItemIdx={cartItemIdx}
                disable
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPayment;
