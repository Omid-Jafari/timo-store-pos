import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import priceComma from "../../../utils/priceComma";
import { useShop } from "@/hooks/shop-state";
import { useCart } from "@/hooks/cart-state";
import { lazy, Suspense } from "react";
import Loading from "@/components/common/Loading";

const CahngeSelectedProductQuantity = lazy(
  () => import("./CahngeSelectedProductQuantity")
);
const DeleteSelectedProduct = lazy(() => import("./DeleteSelectedProduct"));

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const activeItem = searchParams.get("activeItem");
  const [t] = useTranslation("global");
  const { shopData } = useShop();
  const { cartData } = useCart();
  const selectedProduct = cartData?.items?.find(
    (product) => product?.identifier === activeItem
  );

  return (
    <div className="flex-1 flex flex-col border rounded-md border-[#e9ecef] p-4 gap-4 overflow-y-auto">
      {selectedProduct ? (
        <>
          <div className="flex gap-3">
            <img
              src={
                selectedProduct?.product?.cover
                  ? selectedProduct?.product?.cover
                  : shopData?.default_cover
              }
              className="max-w-[40%] max-h-[200px] w-full rounded-md object-contain overflow-hidden"
              alt=""
            />
            <div className="flex flex-col gap-1 justify-between">
              <h5 className="text-base font-bold">
                {selectedProduct?.product?.title}
              </h5>
              <div className="flex items-center gap-2">
                <span className="text-[#8492a6]">
                  {t("product.quantity")} :{" "}
                </span>
                <Suspense
                  fallback={<Loading bg={"bg-primary"} className="w-5 h-5" />}
                >
                  <CahngeSelectedProductQuantity
                    selectedProduct={selectedProduct}
                  />
                </Suspense>
              </div>
              <p className="text-[#8492a6]">
                {t("table.unit")} :{" "}
                <span className="text-black">
                  {selectedProduct?.product?.unit?.title}
                </span>
              </p>
              <Suspense
                fallback={<Loading bg={"bg-primary"} className="w-5 h-5" />}
              >
                <DeleteSelectedProduct selectedProduct={selectedProduct} />
              </Suspense>
            </div>
          </div>
          <div className="flex flex-col border rounded-md border-[#e9ecef] p-3 gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="">{t("product.unitPrice")}</span>
              <span className="">
                {priceComma(+selectedProduct?.gross_price)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="">{t("table.total")}</span>
              <span className="">
                {priceComma(+selectedProduct?.gross_total)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="">{t("table.discount")}</span>
              <span className="">
                {priceComma(+selectedProduct?.discount_amount)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="">{t("table.finalTotal")}</span>
              <span className="">
                {priceComma(+selectedProduct?.net_total)}
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="m-auto flex flex-col items-center justify-center gap-3">
          <img
            src="/browsing.png"
            className="max-w-[40%] max-h-[200px] w-full"
            alt=""
          />
          <p className="text-[#8492a6]">{t("form.noItem")}</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
