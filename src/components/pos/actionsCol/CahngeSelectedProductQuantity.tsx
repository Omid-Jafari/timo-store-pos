import { addProductFunc } from "@/api/ApiClient";
import Loading from "@/components/common/Loading";
import { CartItem, updateCart, useCart } from "@/hooks/cart-state";
import { playSound } from "@/utils/playSound";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const CahngeSelectedProductQuantity = ({
  selectedProduct,
}: {
  selectedProduct: CartItem;
}) => {
  const [t] = useTranslation("global");
  const { cartData } = useCart();
  const [cartCount, setCartCount] = useState(selectedProduct?.quantity);
  const [hasChanged, setHasChanged] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: addWithIdentifierMutation, isPending } = useMutation({
    mutationKey: ["addWithIdentifierMutation"],
    mutationFn: addProductFunc,
    onSuccess: (res) => {
      !localStorage?.getItem("cartIdentifier") &&
        localStorage?.setItem("cartIdentifier", res?.data?.cart?.identifier);
      updateCart({
        queryClient,
        cartData: cartData,
        cartItem: res?.data as CartItem,
      });
      queryClient.invalidateQueries({ queryKey: ["cartDataQuery"] });
      playSound(true);
      setHasChanged(false);
    },
    onError: () => {
      playSound(false);
    },
  });
  useEffect(() => {
    setCartCount(selectedProduct?.quantity);

    return () => {
      setCartCount(0);
    };
  }, [selectedProduct]);
  useEffect(() => {
    const delaySearchFn = setTimeout(() => {
      selectedProduct?.quantity !== cartCount &&
        hasChanged &&
        addWithIdentifierMutation({
          product: selectedProduct?.product?.identifier,
          quantity: cartCount,
        });
    }, 750);

    return () => clearTimeout(delaySearchFn);
  }, [
    addWithIdentifierMutation,
    cartCount,
    hasChanged,
    selectedProduct?.product?.identifier,
    selectedProduct?.quantity,
  ]);

  return (
    <div
      className={`relative text-lg flex items-center justify-between !h-8 sm:!h-9 gap-5 p-2 border border-[#919eab3d] rounded-lg overflow-hidden `}
      dir="ltr"
    >
      {isPending ? (
        <div className="w-full flex justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-30">
          <Loading bg="bg-white" />
        </div>
      ) : null}
      <button
        type="button"
        // minus
        disabled={isPending || 1 >= cartCount}
        className="disabled:opacity-40"
        onClick={() => {
          setCartCount(cartCount - 1);
          setHasChanged(true);
        }}
      >
        <Minus size={16} />
      </button>
      <input
        disabled={isPending}
        className={`w-6 text-center font-medium outline-none`}
        type="number"
        value={cartCount}
        onChange={(e) => {
          setCartCount(+e.target?.value);
          setHasChanged(true);
        }}
        min={1}
        max={selectedProduct?.product?.stock_amount}
      />
      <button
        type="button"
        // plus
        disabled={
          (selectedProduct?.product?.stock_amount &&
            cartCount >= Number(selectedProduct?.product?.stock_amount)) ||
          isPending
        }
        onClick={() => {
          setCartCount(cartCount + 1);
          setHasChanged(true);
        }}
      >
        {selectedProduct?.product?.stock_amount &&
        cartCount >= Number(selectedProduct?.product?.stock_amount) ? (
          <span className="text-xs text-[#8492a6] font-semibold">
            {t("maximum")}
          </span>
        ) : (
          <Plus size={16} />
        )}
      </button>
    </div>
  );
};

export default CahngeSelectedProductQuantity;
