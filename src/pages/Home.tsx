import { useTranslation } from "react-i18next";
import OrderListsCol from "../components/pos/orderListsCol/OrderListsCol";
import ActionsCol from "../components/pos/actionsCol/ActionsCol";
import OrderDetailsCol from "../components/pos/orderDetailsCol/OrderDetailsCol";

const Home = () => {
  const [t] = useTranslation("global");
  return (
    <div className="w-full h-full grid grid-cols-3 grid-rows-[auto,1fr] gap-2">
      <div className="border border-[#e9ecef] bg-[#f8f9fa] rounded-md text-center text-[#8492A6] font-semibold py-1">
        {t("header.productLists")}
      </div>
      <div className="border border-[#e9ecef] bg-[#f8f9fa] rounded-md text-center text-[#8492A6] font-semibold py-1">
        {t("header.actions")}
      </div>
      <div className="border border-[#e9ecef] bg-[#f8f9fa] rounded-md text-center text-[#8492A6] font-semibold py-1">
        {t("header.orderDetails")}
      </div>
      <OrderListsCol />
      <ActionsCol />
      <OrderDetailsCol />
    </div>
  );
};

export default Home;
