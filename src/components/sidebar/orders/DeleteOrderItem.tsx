import { deleteOrderItemFunc } from "@/api/ApiClient";
import Loading from "@/components/common/Loading";
import ModalComp from "@/components/common/ModalComp";
import { OrderItem } from "@/hooks/orders-state";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const DeleteOrderItem = ({ orderItem }: { orderItem: OrderItem }) => {
  const [t] = useTranslation("global");
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: deleteOrderItemMutation, isPending } = useMutation({
    mutationKey: ["deleteOrderItemMutation"],
    mutationFn: deleteOrderItemFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ordersDataQuery"] });
      setIsOpen(false);
    },
  });

  return (
    <ModalComp
      trigger={
        <button className="text-primary absolute top-3 left-3 rtl:right-3 z-10">
          <Trash2 size={22} />
        </button>
      }
      title={t("orders.deleteOrderItem")}
      open={isOpen}
      setOpen={setIsOpen}
      dialogContentClassName="max-w-md"
    >
      <p className="font-medium mb-5">{t("orders.deleteOrderItemConfirm")}</p>
      <div className="w-full flex items-center gap-2 justify-end">
        <button
          onClick={() => setIsOpen(false)}
          type="button"
          className="transparent-btn px-5 text-base rounded-lg m-0"
        >
          {t("btn.cancel")}
        </button>
        <button
          disabled={isPending}
          type="button"
          onClick={() => deleteOrderItemMutation(orderItem?.identifier)}
          className="relative overflow-hidden primary-btn px-5 text-base rounded-lg"
        >
          {isPending ? (
            <div className="w-full flex justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-30">
              <Loading bg="bg-white" />
            </div>
          ) : null}
          {t("btn.delete")}
        </button>
      </div>
    </ModalComp>
  );
};

export default DeleteOrderItem;
