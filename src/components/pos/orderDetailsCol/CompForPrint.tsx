import { useTranslation } from "react-i18next";
import priceComma from "../../../utils/priceComma";
import { Link } from "react-router-dom";
import { useShop } from "@/hooks/shop-state";
import { useCart } from "@/hooks/cart-state";
import { useUser } from "@/hooks/user-state";

const CompForPrint = () => {
  const [t] = useTranslation("global");
  const [, i18n] = useTranslation("global");
  const { cartData } = useCart();
  const { shopData } = useShop();
  const { user } = useUser();

  return (
    <div
      className={`h-full flex flex-col gap-4`}
      dir={i18n.language === "fa" ? "rtl" : "ltr"}
    >
      <h4 className="text-xl font-semibold mx-auto">{shopData?.site_title}</h4>
      <div className="flex flex-col items-start justify-between gap-1 w-full">
        <span className="text-sm font-medium">
          {t("table.dateAndTime")} :{" "}
          <span dir="ltr">
            {new Date().getFullYear() +
              "/" +
              new Date().getMonth() +
              "/" +
              new Date().getDate()}{" "}
            {`${new Date().getHours()}:${new Date().getMinutes()}':${new Date().getSeconds()}"`}
          </span>
        </span>
        <span className="text-sm font-medium">
          {t("table.refId")} : {cartData?.ref_id}
        </span>
        {cartData?.customerData?.full_name ? (
          <>
            <span className="text-sm font-medium">
              {t("order.customer")} : {cartData?.customerData?.full_name}
            </span>
          </>
        ) : null}
        {cartData?.humanized_payment_method ? (
          <>
            <span className="text-sm font-medium">
              {t("btn.paymentMethod")} : {cartData?.humanized_payment_method}
            </span>
          </>
        ) : null}
      </div>

      <div className="flex-1 flex flex-col border rounded-md border-[#e9ecef]">
        <div className="grid grid-cols-10 gap-1 p-1 text-[#8492A6] text-sm font-semibold border-b border-[#e9ecef] bg-white">
          <div className="text-center col-span-1">{t("table.number")}</div>
          <div className="text-center col-span-4">{t("table.product")}</div>
          <div className="text-center col-span-1">{t("table.count")}</div>
          <div className="text-center col-span-2">{t("product.unitPrice")}</div>
          <div className="text-center col-span-2">{t("table.total")}</div>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          {cartData?.items?.map((cartItem, cartItemIdx: number) => (
            <Link
              key={`cartItemIdx${cartItemIdx}`}
              to={`/?activeItem=${cartItem?.identifier}`}
              className={`grid grid-cols-10 gap-1 border-b border-[#e9ecef] px-1 py-2 text-sm font-semibold transition-colors duration-300 hover:bg-[#f2f2f2] `}
            >
              <div className="text-center col-span-1">{cartItemIdx + 1}</div>
              <div className="col-span-4">{cartItem?.product?.title}</div>
              <div className="text-center col-span-1">{cartItem?.quantity}</div>
              <div className="text-center col-span-2">
                {priceComma(+cartItem?.product?.gross_price)}
              </div>
              <div className="text-center col-span-2">
                {priceComma(+cartItem?.net_total)}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="border rounded-md border-[#e9ecef] p-4 font-semibold text-xl bg-white flex flex-col gap-1">
        <p className="">
          {t("table.total")} : {priceComma(+cartData?.gross_total)}
        </p>
        <p className="">
          {t("table.discount")} : {priceComma(+cartData?.discount_amount)}
        </p>
        <p className="">
          {t("table.finalTotal")} : {priceComma(+cartData?.net_total)}
        </p>
      </div>
      <p className="text-sm font-medium w-full flex justify-center mt-auto">
        {t("table.cashier")} : {`${user?.first_name} ${user?.last_name}`}
      </p>
    </div>
  );
};

export default CompForPrint;
