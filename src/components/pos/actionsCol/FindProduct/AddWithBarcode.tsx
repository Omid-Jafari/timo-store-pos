import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { addProductFunc } from "../../../../api/ApiClient";
import Loading from "../../../common/Loading";
import { useNavigate } from "react-router-dom";
import { playSound } from "../../../../utils/playSound";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCart, CartItem, useCart } from "@/hooks/cart-state";

const AddWithBarcode = () => {
  const [t] = useTranslation("global");
  const { cartData } = useCart();
  const queryClient = useQueryClient();
  const barcodeInputRef = useRef<any>();
  const [barcodeInp, setBarcodeInp] = useState("");
  const navigate = useNavigate();

  const numButtonClickHandler = (num: number) => {
    setBarcodeInp(barcodeInp + num);
    barcodeInputRef.current.focus();
  };
  const delButtonClickHandler = () => {
    setBarcodeInp(barcodeInp.slice(0, -1));
    barcodeInputRef.current.focus();
  };
  const { mutate: addWithBarcodeMutation, isPending } = useMutation({
    mutationKey: ["addWithBarcodeFuncMutation"],
    mutationFn: addProductFunc,
    onSuccess: (res) => {
      updateCart({
        queryClient,
        cartData: cartData,
        cartItem: res?.data as CartItem,
      });
      queryClient.invalidateQueries({ queryKey: ["cartDataQuery"] });
      setBarcodeInp("");
      navigate(`?activeItem=${res?.data?.identifier}`);
      playSound(true);
    },
    onError: () => {
      playSound(false);
      setBarcodeInp("");
    },
  });
  const submitBarcodeFunc = (event: any) => {
    event.preventDefault();
    addWithBarcodeMutation({ product: barcodeInp });
  };

  return (
    <form onSubmit={submitBarcodeFunc} className="flex flex-col gap-3">
      <label>
        {t("btn.barcode")} <span className="text-red-400">*</span>
      </label>
      <input
        ref={barcodeInputRef}
        autoFocus
        id="barcodeInputId"
        type="number"
        value={barcodeInp}
        onChange={(e) => setBarcodeInp(e?.target?.value)}
        className="rounded-md outline-none border border-[#e9ecef] p-2 focus:border-red-500 transition-colors duration-300"
      />
      <div className="flex gap-3 w-full">
        <div className="grid grid-cols-3 gap-3 flex-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
            <button
              type="button"
              key={`numpadbtn${number}`}
              className={`w-full py-2 font-semibold rounded-md border border-[#e9ecef] bg-[#f8f9fa] transition-colors duration-300 hover:bg-[#d3d4d5] ${
                number === 0 ? "col-span-3" : ""
              }`}
              onClick={() => numButtonClickHandler(number)}
            >
              {number}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <button
            type="button"
            className={`w-24 py-2 font-semibold rounded-md border border-[#e9ecef] bg-[#f8f9fa] transition-colors duration-300 hover:bg-[#d3d4d5] `}
            onClick={delButtonClickHandler}
          >
            {t("btn.del")}
          </button>
          <button
            className={`w-24 flex-1 py-2 font-semibold rounded-md border border-[#e9ecef] bg-[#f8f9fa] transition-colors duration-300 hover:bg-[#d3d4d5] `}
            type="submit"
          >
            {isPending ? (
              <Loading className="w-10 h-10 mx-auto" bg="bg-primary" />
            ) : (
              t("btn.enter")
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddWithBarcode;
