import { addOrderProductWithIdentifierFunc } from "@/api/ApiClient";
import { OrderItem } from "@/hooks/orders-state";
import { playSound } from "@/utils/playSound";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Suspense } from "react";
import DeleteOrderItem from "./DeleteOrderItem";
import { useTranslation } from "react-i18next";
import priceComma from "@/utils/priceComma";
import Loading from "@/components/common/Loading";
import ChangeOrderItemQuantity from "./ChangeOrderItemQuantity";
import AddProductModalList from "@/components/addProduct/AddProductModalList";

const OrderItemList = ({
  orderId,
  orderItems,
}: {
  orderId: string;
  orderItems: OrderItem[];
}) => {
  const [t] = useTranslation("global");
  const queryClient = useQueryClient();
  const {
    mutate: addOrderProductWithIdentifierMutation,
    isPending: addOrderItemPending,
  } = useMutation({
    mutationKey: ["addOrderProductWithIdentifierMutation"],
    mutationFn: addOrderProductWithIdentifierFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ordersDataQuery"] });
      playSound(true);
    },
    onError: () => {
      playSound(false);
    },
  });
  const onSubmit = ({
    productId,
    cartCount,
  }: {
    productId: string;
    cartCount: number;
  }) => {
    addOrderProductWithIdentifierMutation({
      order: orderId,
      product: productId,
      quantity: cartCount,
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {orderItems?.map((orderItem, orderItemIdx: number) => (
        <div
          className="col-span-2 md:col-span-1 relative p-3 border border-[#e9ecef] rounded flex items-center gap-3"
          key={`orderItemIdx${orderItem?.identifier}${orderItemIdx}`}
        >
          {orderItems.length > 1 ? (
            <DeleteOrderItem orderItem={orderItem} />
          ) : null}
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
                {t("table.unitPrice")}:
              </span>
              <span className="text-[14.4px] font-semibold">
                {priceComma(+orderItem?.gross_price)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[14.4px] text-[#8492a6] whitespace-nowrap">
                {t("table.unit")}:
              </span>
              <span className="text-[14.4px] font-semibold">
                {orderItem?.product?.unit?.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#8492a6]">{t("product.quantity")}: </span>
              <Suspense
                fallback={<Loading bg={"bg-primary"} className="w-5 h-5" />}
              >
                <ChangeOrderItemQuantity
                  selectedOrder={orderItem}
                  orderId={orderId}
                />
              </Suspense>
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
      <AddProductModalList
        onSubmit={onSubmit}
        isPending={addOrderItemPending}
      />
    </div>
  );
};

export default OrderItemList;
