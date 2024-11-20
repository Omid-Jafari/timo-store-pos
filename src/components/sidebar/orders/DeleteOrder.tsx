import { deleteOrderFunc } from "@/api/ApiClient";
import Loading from "@/components/common/Loading";
import ModalComp from "@/components/common/ModalComp";
import { Order } from "@/hooks/orders-state";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const DeleteOrder = ({ order }: { order: Order }) => {
  const [t] = useTranslation("global");
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: deleteOrderMutation, isPending } = useMutation({
    mutationKey: ["deleteOrderMutation"],
    mutationFn: deleteOrderFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ordersDataQuery"] });
      setIsOpen(false);
    },
  });

  return (
    <ModalComp
      trigger={
        <button className="text-primary">
          <Trash2 size={18} />
        </button>
      }
      title={t("orders.deleteOrder")}
      open={isOpen}
      setOpen={setIsOpen}
      dialogContentClassName="max-w-md"
    >
      <p className="font-medium mb-5">{t("orders.deleteOrderConfirm")}</p>
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
          onClick={() => deleteOrderMutation(order?.identifier)}
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

export default DeleteOrder;
