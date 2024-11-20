import { Link, useSearchParams } from "react-router-dom";
import priceComma from "../../../utils/priceComma";
import { CartItem } from "@/hooks/cart-state";

const CartTableRows = ({
  cartItem,
  cartItemIdx,
  disable = false,
}: {
  cartItem: CartItem;
  cartItemIdx: number;
  disable?: boolean;
}) => {
  const [searchParams] = useSearchParams();
  const activeItem = searchParams.get("activeItem");

  return (
    <Link
      to={`?activeItem=${cartItem?.identifier}`}
      className={`grid items-center grid-cols-11 gap-1 border-b border-[#e9ecef] px-1 py-2 text-[13px] font-semibold transition-colors duration-300 hover:bg-[#f2f2f2] ${
        activeItem === cartItem?.identifier ? "bg-[#e6e5e5]" : ""
      } ${disable ? "pointer-events-none" : ""}`}
    >
      <div className="text-center col-span-1">{cartItemIdx + 1}</div>
      <div title={cartItem?.product?.title} className="col-span-3">
        <span className="">{cartItem?.product?.title}</span>
      </div>
      <div title={priceComma(+cartItem?.gross_price)} className="col-span-2">
        <span className="">{priceComma(+cartItem?.gross_price)}</span>
      </div>
      <div className="text-center col-span-1">{cartItem?.quantity}</div>
      <div className="text-center col-span-2">
        {cartItem?.product?.unit?.title}
      </div>
      <div className="text-center col-span-2">
        {priceComma(+cartItem?.net_total)}
      </div>
    </Link>
  );
};

export default CartTableRows;
