import ModalComp from "@/components/common/ModalComp";
import { Refund } from "@/hooks/refunds-state";
import { ChevronRight, Circle } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const SingleRefundDetail = ({ refund }: { refund: Refund }) => {
  const [t] = useTranslation("global");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalComp
      trigger={
        <button className="ltr:ml-auto rtl:mr-auto text-primary text-sm flex items-center font-bold">
          {t("refunds.refundsDetail")}
          <ChevronRight size={18} className="rtl:rotate-180" />
        </button>
      }
      title={t("refunds.refundsDetail")}
      open={isOpen}
      setOpen={setIsOpen}
      dialogContentClassName="max-w-4xl"
    >
      <div className={`flex flex-col gap-3`}>
        <div className="flex items-center gap-2 text-[13px]">
          <div className="flex items-center gap-1">
            <span className="text-gray-400">{t("orders.createdAt")}</span>
            <span>
              {new Date(refund?.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </span>
          </div>
          <Circle size={8} className="text-gray-400" />
          <div className="flex items-center gap-1">
            <span className="text-gray-400">{t("refunds.reason")}</span>
            <span>{refund?.reason}</span>
          </div>
        </div>
        <hr />
        {refund?.user ? (
          <>
            <div className="flex items-center gap-2 text-[13px] flex-wrap">
              <div className="flex items-center gap-1">
                <span className="text-gray-400">{t("refunds.refundTo")}</span>
                <span>{`${refund?.user?.first_name} ${refund?.user?.last_name}`}</span>
              </div>
              <Circle size={8} className="text-gray-400" />
              <div className="flex items-center gap-1">
                <span className="text-gray-400">{t("form.phoneNumber")}</span>
                <span dir="ltr">{refund?.user?.phone_number}</span>
              </div>
            </div>
            <hr />
          </>
        ) : null}
        {/* <div className="flex items-center gap-2 text-[13px] flex-wrap">
          <div className="flex items-center gap-1">
            <span className="text-gray-400">{t("table.total")}</span>
            <span>{priceComma(+refund?.gross_total)}</span>
          </div>
          <Circle size={8} className="text-gray-400" />
          <div className="flex items-center gap-1">
            <span className="text-gray-400">{t("btn.paymentMethod")}</span>
            <span>{refund?.humanized_payment_method}</span>
          </div>
        </div>
        <hr /> */}
        <div className="grid grid-cols-2 gap-4">
          {refund?.items?.map((orderItem, orderItemIdx: number) => (
            <div
              className="col-span-2 md:col-span-1 relative p-3 border border-[#e9ecef] rounded flex items-center gap-3"
              key={`orderItemIdx${orderItem?.identifier}${orderItemIdx}`}
            >
              <div className="relative aspect-square max-w-[200px] w-full">
                <img
                  src={orderItem?.product?.cover}
                  className="object-cover w-full h-full"
                  alt={orderItem?.product?.title}
                />
              </div>
              <div className="flex flex-col gap-2 flex-1 self-stretch">
                <h5 className="text-base font-semibold mb-auto">
                  {orderItem?.product?.title}
                </h5>
                {/* <div className="flex items-center gap-1">
                  <span className="text-[14.4px] text-[#8492a6]">
                    {t("table.unitPrice")} :
                  </span>
                  <span className="text-[14.4px] font-semibold">
                    {priceComma(+orderItem?.gross_price)}
                  </span>
                </div> */}
                <div className="flex items-center gap-1">
                  <span className="text-[14.4px] text-[#8492a6] whitespace-nowrap">
                    {t("product.quantity")} :
                  </span>
                  <span className="text-[14.4px] font-semibold">
                    {orderItem?.quantity}
                  </span>
                </div>
                <div className="flex items-center gap-1 mb-auto">
                  <span className="text-[14.4px] text-[#8492a6] whitespace-nowrap">
                    {t("table.unit")} :
                  </span>
                  <span className="text-[14.4px] font-semibold">
                    {orderItem?.product?.unit?.title}
                  </span>
                </div>

                {/* <div className="flex items-center gap-1 mt-auto">
                  <span className="text-[14.4px] text-[#8492a6] whitespace-nowrap">
                    {t("table.total")} :
                  </span>
                  <span className="text-[14.4px] font-semibold text-primary">
                    {priceComma(+orderItem?.gross_total)}
                  </span>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ModalComp>
  );
};

export default SingleRefundDetail;
