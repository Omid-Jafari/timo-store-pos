import { useTranslation } from "react-i18next";
import CartTableRows from "./CartTableRows";
import { useCart } from "@/hooks/cart-state";

const OrderListsCol = () => {
  const [t] = useTranslation("global");
  const { cartData } = useCart();

  return (
    <div className="h-full flex flex-col gap-2 overflow-y-auto">
      <div className="flex-1 flex flex-col border rounded-md border-[#e9ecef] overflow-hidden text-center">
        <div className="grid grid-cols-11 gap-1 p-1 text-[#8492A6] text-[13px] font-semibold border-b border-[#e9ecef] sticky top-0 bg-white">
          <div className="col-span-1">{t("table.number")}</div>
          <div className="col-span-3">{t("table.product")}</div>
          <div className="col-span-2">{t("table.unitPrice")}</div>
          <div className="col-span-1">{t("table.count")}</div>
          <div className="col-span-2">{t("table.unit")}</div>
          <div className="col-span-2">{t("table.total")}</div>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          {cartData?.items?.map((cartItem, cartItemIdx: number) => (
            <CartTableRows
              key={`cartItemIdx${cartItemIdx}`}
              cartItem={cartItem}
              cartItemIdx={cartItemIdx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderListsCol;
