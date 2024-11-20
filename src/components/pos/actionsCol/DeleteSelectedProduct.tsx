import { deleteProductFunc } from "@/api/ApiClient";
import Loading from "@/components/common/Loading";
import { CartItem, removeFromCart, useCart } from "@/hooks/cart-state";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const DeleteSelectedProduct = ({
  selectedProduct,
}: {
  selectedProduct: CartItem;
}) => {
  const [t] = useTranslation("global");
  const { cartData } = useCart();
  const queryClient = useQueryClient();
  const { mutate: deleteProductMutation, isPending } = useMutation({
    mutationKey: ["deleteProductMutation"],
    mutationFn: deleteProductFunc,
    onSuccess: () => {
      removeFromCart({ queryClient, cartItem: selectedProduct, cartData });
      queryClient.invalidateQueries({ queryKey: ["cartDataQuery"] });
    },
  });
  return (
    <button
      disabled={isPending}
      onClick={() => deleteProductMutation(selectedProduct?.identifier)}
      className="ltr:mr-auto rtl:ml-auto bg-red-500 hover:bg-red-700 text-sm transition-colors duration-300 text-white py-1 px-4 rounded flex justify-center items-center min-h-7"
    >
      {isPending ? <Loading className="h-5 w-5" /> : t("btn.delete")}
    </button>
  );
};

export default DeleteSelectedProduct;
