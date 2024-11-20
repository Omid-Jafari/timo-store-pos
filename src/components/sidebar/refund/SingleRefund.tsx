import { useTranslation } from "react-i18next";
import SingleRefundDetail from "./SingleRefundDetail";
import EditRefund from "./EditRefund";
import DeleteRefund from "./DeleteRefund";
import { Refund } from "@/hooks/refunds-state";

const SingleRefund = ({ refund }: { refund: Refund }) => {
  const [t] = useTranslation("global");

  return (
    <div className={`flex flex-col gap-1 border rounded-md p-2`}>
      <div className="flex items-center justify-between">
        <h6 className="text-base font-bold">
          {refund?.user?.first_name
            ? `${refund?.user?.first_name} ${refund?.user?.last_name}`
            : t("orders.noCustomer")}
        </h6>
        <div className="bg-gray-100 p-1 rounded-md font-bold text-sm">
          {new Date(refund?.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
      <div className="flex items-center gap-2 text-[13px]">
        <div className="flex items-center gap-1">
          <span className="text-gray-400">{t("refunds.reason")}</span>
          <span>{refund?.reason}</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <EditRefund refund={refund} />
        <DeleteRefund refund={refund} />
        <SingleRefundDetail refund={refund} />
      </div>
    </div>
  );
};

export default SingleRefund;
