import { Order } from "@/hooks/orders-state";
import priceComma from "@/utils/priceComma";
import { CheckCircle, Circle, RefreshCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import SingleOrderDetail from "./SingleOrderDetail";
import EditOrder from "./EditOrder";
import DeleteOrder from "./DeleteOrder";

const SingleOrder = ({ order }: { order: Order }) => {
  const [t] = useTranslation("global");

  return (
    <div className={`flex flex-col gap-1 border rounded-md p-2`}>
      <div className="flex items-center justify-between">
        <h6 className="text-base font-bold">
          {order?.user?.first_name
            ? `${order?.user?.first_name} ${order?.user?.last_name}`
            : t("orders.noCustomer")}
        </h6>
        <div className="bg-gray-100 p-1 rounded-md font-bold text-sm">
          {new Date(order?.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
      <div className="flex items-center gap-1">
        {order?.status === "paid" ? (
          <CheckCircle size={14} className="text-secondary" />
        ) : (
          <RefreshCcw size={14} className="text-primary" />
        )}
        <span className="font-medium text-xs">{order?.humanized_status}</span>
      </div>
      <div className="flex items-center gap-2 text-[13px]">
        <div className="flex items-center gap-1">
          <span className="text-gray-400">{t("orders.orderNumber")}</span>
          <span>{order?.ref_id}</span>
        </div>
        <div className="flex items-center gap-1">
          <Circle size={8} className="text-gray-400" />
          <span className="text-gray-400">{t("table.total")}</span>
          <span>{priceComma(+order?.gross_total)}</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <EditOrder order={order} />
        <DeleteOrder order={order} />
        <SingleOrderDetail order={order} />
      </div>
    </div>
  );
};

export default SingleOrder;
