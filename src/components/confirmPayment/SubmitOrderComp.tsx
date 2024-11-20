import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCart } from "@/hooks/cart-state";
import { updateCartData } from "@/api/ApiClient";
import { playSound } from "@/utils/playSound";
import Loading from "../common/Loading";
import { useSearchParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import ModalComp from "../common/ModalComp";
import { useState } from "react";
import PrintReceiptComp from "../pos/orderDetailsCol/PrintReceiptComp";

const SubmitOrderComp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const userId = searchParams.get("userId") || "";
  const paymentValue = searchParams.get("paymentValue") || "";
  const { cartData } = useCart();
  const [t] = useTranslation("global");
  const { mutate: updateCartDataMutation, isPending } = useMutation({
    mutationKey: ["updateCartDataMutation"],
    mutationFn: updateCartData,
    onSuccess: (res) => {
      queryClient.setQueryData(["cartDataQuery"], {
        ...cartData,
        ref_id: res?.data?.ref_id,
        humanized_payment_method: res?.data?.humanized_payment_method,
        ...(res?.data?.user?.first_name && {
          customerData: {
            full_name:
              res?.data?.user?.first_name + " " + res?.data?.user?.last_name,
          },
        }),
      });
      playSound(true);
      setIsOpen(true);
      localStorage.removeItem("cartIdentifier");
    },
    onError: () => {
      playSound(false);
    },
  });
  const closeModalFunc = (open: boolean) => {
    if (open) {
      setIsOpen(open);
    } else {
      setIsOpen(open);
      window.location.replace("/");
    }
  };

  return (
    <>
      <ModalComp
        title={t("order.succeed")}
        open={isOpen}
        setOpen={closeModalFunc}
        dialogContentClassName="max-w-xl"
      >
        <div className="flex flex-col items-center gap-4">
          <img
            src="/successOrder.jpg"
            alt="order succeed"
            className="object-contain aspect-square w-2/5"
          />
          <h5 className="font-semibold text-lg flex items-center gap-1">
            {t("order.succeed")}
            <CheckCircle size={18} className="text-emerald-500" />
          </h5>
          <div className="w-full flex items-center gap-2 justify-end">
            <button
              onClick={() => closeModalFunc(false)}
              type="button"
              className="transparent-btn px-5 text-base rounded-lg m-0"
            >
              {t("btn.confirm")}
            </button>
            <PrintReceiptComp />
          </div>
        </div>
      </ModalComp>
      <button
        disabled={!paymentValue}
        onClick={() =>
          updateCartDataMutation({
            payment_method: paymentValue,
            user: userId,
            cart: cartData?.identifier,
          })
        }
        className="mt-auto flex items-center justify-center gap-1 bg-[rgb(228,0,15)] hover:bg-red-700 transition-all duration-300 text-white py-2 px-1 rounded disabled:opacity-40"
      >
        {isPending ? (
          <Loading className="w-12 h-6" bg="bg-white" />
        ) : (
          <>
            <CheckCircle size={16} className="text-white" />
            {t("order.submitOrder")}
          </>
        )}
      </button>
    </>
  );
};

export default SubmitOrderComp;
