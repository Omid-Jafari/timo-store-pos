import ModalComp from "@/components/common/ModalComp";
import { Order } from "@/hooks/orders-state";
import priceComma from "@/utils/priceComma";
import { CheckCircle, ChevronRight, Circle, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const SingleOrderDetail = ({ order }: { order: Order }) => {
  const [t] = useTranslation("global");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalComp
      trigger={
        <button className="ltr:ml-auto rtl:mr-auto text-primary text-sm flex items-center font-bold">
          {t("header.orderDetails")}
          <ChevronRight size={18} className="rtl:rotate-180" />
        </button>
      }
      title={`سفارش شماره ی ${order?.ref_id}`}
      open={isOpen}
      setOpen={setIsOpen}
      dialogContentClassName="max-w-4xl"
    >
      <div className={`flex flex-col gap-3`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {order?.status === "paid" ? (
              <CheckCircle size={18} className="text-secondary" />
            ) : (
              <RefreshCcw size={18} className="text-primary" />
            )}
            <span className="font-bold">{order?.humanized_status}</span>
          </div>
          {order?.delivery_method ? (
            <div className="flex items-center gap-1">
              <img
                src={order?.delivery_method?.icon}
                width={25}
                height={25}
                alt="delivery icon"
              />
              <span className="font-bold">{order?.delivery_method?.title}</span>
            </div>
          ) : null}
        </div>
        <div className="flex items-center gap-2 text-[13px]">
          <div className="flex items-center gap-1">
            <span className="text-gray-400">{t("orders.orderNumber")}</span>
            <span>{order?.ref_id}</span>
          </div>
          <Circle size={8} className="text-gray-400" />
          <div className="flex items-center gap-1">
            <span className="text-gray-400">{t("orders.createdAt")}</span>
            <span>
              {new Date(order?.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </span>
          </div>
        </div>
        <hr />
        {order?.user || order?.shipping_address || order?.billing_address ? (
          <>
            <div className="flex items-center gap-2 text-[13px] flex-wrap">
              {order?.user ? (
                <>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400">
                      {t("orders.deliverTo")}
                    </span>
                    <span>{`${order?.user?.first_name} ${order?.user?.last_name}`}</span>
                  </div>
                  <Circle size={8} className="text-gray-400" />
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400">
                      {t("form.phoneNumber")}
                    </span>
                    <span dir="ltr">{order?.user?.phone_number}</span>
                  </div>
                </>
              ) : null}
              {order?.shipping_address ? (
                <>
                  <Circle size={8} className="text-gray-400" />
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400">
                      {t("orders.shipAddress")}
                    </span>
                    <span>
                      {order?.shipping_address?.country?.name}{" "}
                      {order?.shipping_address?.country_area}{" "}
                      {order?.shipping_address?.city}{" "}
                      {order?.shipping_address?.city_area}{" "}
                      {order?.shipping_address?.street_address}
                    </span>
                  </div>
                </>
              ) : null}
              {order?.billing_address ? (
                <>
                  <Circle size={8} className="text-gray-400" />
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400">
                      {t("orders.billAddress")}
                    </span>
                    {order?.billing_address?.country?.name}{" "}
                    {order?.billing_address?.country_area}{" "}
                    {order?.billing_address?.city}{" "}
                    {order?.billing_address?.city_area}{" "}
                    {order?.billing_address?.street_address}
                  </div>
                </>
              ) : null}
            </div>
            <hr />
          </>
        ) : null}
        <div className="flex items-center gap-2 text-[13px] flex-wrap">
          <div className="flex items-center gap-1">
            <span className="text-gray-400">{t("table.total")}</span>
            <span>{priceComma(+order?.gross_total)}</span>
          </div>
          {order?.delivery_cost ? (
            <>
              <Circle size={8} className="text-gray-400" />
              <div className="flex items-center gap-1">
                <span className="text-gray-400">
                  {t("orders.deliveryCost")}
                </span>
                <span>
                  {priceComma(order?.delivery_cost ? +order?.delivery_cost : 0)}
                </span>
              </div>
            </>
          ) : null}
          <Circle size={8} className="text-gray-400" />
          <div className="flex items-center gap-1">
            <span className="text-gray-400">{t("btn.paymentMethod")}</span>
            <span>{order?.humanized_payment_method}</span>
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-2 gap-4">
          {order?.items?.map((orderItem, orderItemIdx: number) => (
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
                <div className="flex items-center gap-1">
                  <span className="text-[14.4px] text-[#8492a6]">
                    {t("table.unitPrice")} :
                  </span>
                  <span className="text-[14.4px] font-semibold">
                    {priceComma(+orderItem?.gross_price)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[14.4px] text-[#8492a6] whitespace-nowrap">
                    {t("product.quantity")} :
                  </span>
                  <span className="text-[14.4px] font-semibold">
                    {orderItem?.quantity}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[14.4px] text-[#8492a6] whitespace-nowrap">
                    {t("table.unit")} :
                  </span>
                  <span className="text-[14.4px] font-semibold">
                    {orderItem?.product?.unit?.title}
                  </span>
                </div>

                <div className="flex items-center gap-1 mt-auto">
                  <span className="text-[14.4px] text-[#8492a6] whitespace-nowrap">
                    {t("table.total")} :
                  </span>
                  <span className="text-[14.4px] font-semibold text-primary">
                    {priceComma(+orderItem?.gross_total)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ModalComp>
  );
};

export default SingleOrderDetail;
