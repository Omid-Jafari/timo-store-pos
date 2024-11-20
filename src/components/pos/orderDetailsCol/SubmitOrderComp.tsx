import { useTranslation } from "react-i18next";
import { useCart } from "@/hooks/cart-state";
import { useNavigate } from "react-router-dom";

const SubmitOrderComp = () => {
  const navigate = useNavigate();
  const { cartData } = useCart();
  const [t] = useTranslation("global");

  return (
    <button
      disabled={!cartData || +cartData?.items?.length === 0}
      onClick={() => navigate("/confirm-payment")}
      className="flex items-center justify-center gap-1 bg-[rgb(228,0,15)] hover:bg-red-700 transition-all duration-300 text-white py-2 px-1 rounded disabled:opacity-40"
    >
      <svg
        stroke="currentColor"
        fill="none"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke-linecap="round"
        stroke-linejoin="round"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>{" "}
      {t("order.submitOrder")}
    </button>
  );
};

export default SubmitOrderComp;
