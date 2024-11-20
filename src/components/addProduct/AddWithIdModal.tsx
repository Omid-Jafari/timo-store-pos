import ModalComp from "@/components/common/ModalComp";
import priceComma from "@/utils/priceComma";
import { useTranslation } from "react-i18next";
import Loading from "@/components/common/Loading";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Product } from "./AddProductModalList";

const AddWithIdModal = ({
  isPending,
  onSubmit,
  productItem,
  isOpen,
  setIsOpen,
}: {
  isPending: boolean;
  onSubmit: ({
    productId,
    cartCount,
  }: {
    productId: string;
    cartCount: number;
  }) => void;
  productItem: Product;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  const [cartCount, setCartCount] = useState(1);
  const totalPrice = +productItem?.gross_price * +cartCount;
  const finalPrice = +productItem?.net_price * +cartCount;
  const discountAmount =
    ((+productItem?.discount_percent * +productItem?.gross_price) / 100) *
    cartCount;
  const [t] = useTranslation("global");

  return (
    <ModalComp
      title={productItem?.title}
      open={isOpen}
      setOpen={setIsOpen}
      dialogContentClassName="max-w-xl"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({
            productId: productItem?.identifier,
            cartCount: cartCount,
          });
          setTimeout(() => {
            setIsOpen(false);
          }, 500);
        }}
        className="flex items-center gap-3 md:gap-4 lg:gap-x-6 gap-y-2 flex-wrap"
      >
        <div className="flex-[0_0_calc(60%)] aspect-square max-w-[200px]">
          <img
            src={productItem?.cover}
            className="object-cover w-full h-full"
            alt={productItem?.title}
          />
        </div>
        <div className="flex flex-col gap-2 sm:gap-1 flex-1">
          <div className="flex items-center gap-1">
            <span className="text-[14.4px] text-[#8492a6]">
              {t("table.unitPrice")} :
            </span>
            <span className="font-semibold">
              {priceComma(+productItem?.gross_price)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[14.4px] text-[#8492a6]">
              {t("product.quantity")} :
            </span>
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
                onClick={() => setCartCount(cartCount - 1)}
              >
                <Minus size={16} />
              </button>
              <input
                autoFocus
                disabled={isPending}
                className={`w-6 text-center font-medium outline-none`}
                type="number"
                value={cartCount}
                onChange={(e) => setCartCount(+e.target?.value)}
                min={1}
                max={productItem?.stock_amount}
              />
              <button
                type="button"
                // plus
                disabled={
                  (productItem?.stock_amount &&
                    cartCount >= Number(productItem?.stock_amount)) ||
                  isPending
                }
                onClick={() => setCartCount(cartCount + 1)}
              >
                {productItem?.stock_amount &&
                cartCount >= Number(productItem?.stock_amount) ? (
                  <span className="text-xs text-[#8492a6] font-semibold">
                    {t("maximum")}
                  </span>
                ) : (
                  <Plus size={16} />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[14.4px] text-[#8492a6]">
              {t("table.unit")} :
            </span>
            <span className="font-semibold">{productItem?.unit?.title}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[14.4px] text-[#8492a6]">
              {t("table.total")} :
            </span>
            <span className="font-semibold">{priceComma(+totalPrice)}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[14.4px] text-[#8492a6]">
              {t("table.discount")} :
            </span>
            <span className="font-semibold">{priceComma(+discountAmount)}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[14.4px] text-[#8492a6]">
              {t("table.finalPrice")} :
            </span>
            <span className="font-semibold">{priceComma(+finalPrice)}</span>
          </div>
        </div>
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
            type="submit"
            className="relative overflow-hidden primary-btn px-5 text-base rounded-lg"
          >
            {isPending ? (
              <div className="w-full flex justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-30">
                <Loading bg="bg-white" />
              </div>
            ) : null}
            {t("btn.add")}
          </button>
        </div>
      </form>
    </ModalComp>
  );
};

export default AddWithIdModal;
