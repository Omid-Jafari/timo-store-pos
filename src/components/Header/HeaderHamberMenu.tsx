import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import OrdersSection from "../sidebar/orders/OrdersSection";
import { useTranslation } from "react-i18next";
import RefundsSection from "../sidebar/refund/RefundsSection";

const HeaderHamberMenu = () => {
  const typeOptions = { notSet: "notSet", orders: "orders", return: "return" };
  const [type, setType] = useState(typeOptions.notSet);
  const [t, i18n] = useTranslation("global");

  const token = localStorage.getItem("token");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!!isLoggedIn && !!token)
    return (
      <Sheet onOpenChange={() => setType(typeOptions.notSet)}>
        <SheetTrigger
          className={`relative w-[22px] h-[16px] flex flex-col justify-between`}
        >
          <span className="w-full h-[2px] rounded-full bg-[#0c0c0c]"></span>
          <span className="w-full h-[2px] rounded-full bg-[#0c0c0c]"></span>
          <span className="w-full h-[2px] rounded-full bg-[#0c0c0c]"></span>
        </SheetTrigger>
        <SheetContent
          side={i18n.language === "fa" ? "right" : "left"}
          className="flex flex-col gap-5 w-full p-4"
          onOpenAutoFocus={(e: any) => e.preventDefault()}
        >
          <button type="button" onClick={() => setType(typeOptions.notSet)}>
            <h3 className="text-xl font-bold text-start">{t("header.menu")}</h3>
          </button>
          {type === typeOptions.orders ? (
            <OrdersSection />
          ) : type === typeOptions.return ? (
            <RefundsSection />
          ) : (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setType(typeOptions.orders)}
                type="button"
                className="primary-btn"
              >
                {t("header.orders")}
              </button>
              <button
                onClick={() => setType(typeOptions.return)}
                type="button"
                className="primary-btn"
              >
                {t("header.refunds")}
              </button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    );
};

export default HeaderHamberMenu;
