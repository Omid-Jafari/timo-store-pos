import { useTranslation } from "react-i18next";
import ChangeRefundItemQuantity from "./ChangeRefundItemQuantity";
import Loading from "@/components/common/Loading";
import { Suspense } from "react";
import DeleteRefundItem from "./DeleteRefundItem";
import { RefundItem } from "@/hooks/refunds-state";
import AddProductModalList from "@/components/addProduct/AddProductModalList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductRefundFunc } from "@/api/ApiClient";
import { playSound } from "@/utils/playSound";

const RefundItemsList = ({
  refundItems,
  refundId,
}: {
  refundItems: RefundItem[];
  refundId: string;
}) => {
  const [t] = useTranslation("global");
  const queryClient = useQueryClient();

  const { mutate: addProductRefund, isPending } = useMutation({
    mutationKey: ["addProductRefund"],
    mutationFn: addProductRefundFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["refundsDataQuery"] });
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
    addProductRefund({
      refund: refundId,
      product: productId,
      quantity: cartCount,
    });
  };
  return (
    <div className="grid grid-cols-2 gap-4">
      {refundItems?.map((refundItem, refundItemIdx: number) => (
        <div
          className="col-span-2 md:col-span-1 relative p-3 border border-[#e9ecef] rounded flex items-center gap-3"
          key={`refundItemIdx${refundItem?.identifier}${refundItemIdx}`}
        >
          <DeleteRefundItem refundItem={refundItem} />
          <div className="relative aspect-square max-w-[200px] w-full">
            <img
              src={refundItem?.product?.cover}
              className="object-cover w-full h-full"
              alt={refundItem?.product?.title}
            />
          </div>
          <div className="flex flex-col gap-2 flex-1 self-stretch">
            <h5 className="text-base font-semibold mb-auto">
              {refundItem?.product?.title}
            </h5>
            {/* <div className="flex items-center gap-1">
                  <span className="text-[14.4px] text-[#8492a6]">
                    {t("table.unitPrice")} :
                  </span>
                  <span className="text-[14.4px] font-semibold">
                    {priceComma(+refundItem?.gross_price)}
                  </span>
                </div> */}
            <div className="flex items-center gap-1 mb-auto">
              <span className="text-[14.4px] text-[#8492a6] whitespace-nowrap">
                {t("table.unit")}:
              </span>
              <span className="text-[14.4px] font-semibold">
                {refundItem?.product?.unit?.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#8492a6]">{t("product.quantity")}: </span>
              <Suspense
                fallback={<Loading bg={"bg-primary"} className="w-5 h-5" />}
              >
                <ChangeRefundItemQuantity
                  selectedRefund={refundItem}
                  refundId={refundId}
                />
              </Suspense>
            </div>
            {/* <div className="flex items-center gap-1 mt-auto">
                  <span className="text-[14.4px] text-[#8492a6] whitespace-nowrap">
                    {t("table.total")} :
                  </span>
                  <span className="text-[14.4px] font-semibold text-primary">
                    {priceComma(+refundItem?.gross_total)}
                  </span>
                </div> */}
          </div>
        </div>
      ))}
      <AddProductModalList onSubmit={onSubmit} isPending={isPending} />
    </div>
  );
};

export default RefundItemsList;
