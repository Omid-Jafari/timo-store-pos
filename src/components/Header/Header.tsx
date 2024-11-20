import { useShop } from "@/hooks/shop-state";
import { lazy } from "react";

const SwitchLocale = lazy(() => import("./SwitchLocale"));
const BackBtn = lazy(() => import("./BackBtn"));
const HeaderHamberMenu = lazy(() => import("./HeaderHamberMenu"));

const Header = () => {
  const { shopData } = useShop();

  return (
    <div className="w-full flex items-center gap-3">
      <BackBtn />
      <HeaderHamberMenu />
      <SwitchLocale />
      <img
        src={shopData?.logo || "/logo.webp"}
        className="w-20 max-h-[70px] object-contain rtl:mr-auto ltr:ml-auto"
        alt="logo image"
      />
    </div>
  );
};

export default Header;
