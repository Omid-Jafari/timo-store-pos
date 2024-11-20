import { Suspense, lazy, useState } from "react";
import { useTranslation } from "react-i18next";
import ModalComp from "@/components/common/ModalComp";
import { useQuery } from "@tanstack/react-query";
import { productsList } from "@/api/ApiClient";
import Loading from "@/components/common/Loading";
import { Plus } from "lucide-react";
import ProductRow from "./ProductRow";
import PaginationComp from "@/components/common/PaginationComp";

const SearchProductInputComp = lazy(
  () => import("@/components/pos/actionsCol/FindProduct/SearchProductInputComp")
);

export type Product = {
  identifier: string;
  title: string;
  link_title: string;
  cover: string;
  discount_active: boolean;
  discount_percent: number;
  gross_price: number;
  net_price: number;
  stock_status: boolean;
  stock_amount: number;
  free_delivery: boolean;
  short_description: string;
  unit: {
    identifier: string;
    title: string;
    plural_title: string;
  };
  categories: {
    identifier: string;
    title: string;
    link_title: string;
    cover: string;
  }[];
};

const AddProductModalList = ({
  isPending,
  onSubmit,
}: {
  isPending: boolean;
  onSubmit: ({
    productId,
    cartCount,
  }: {
    productId: string;
    cartCount: number;
  }) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [t] = useTranslation("global");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInp, setSearchInp] = useState("");

  const {
    data: productData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getProductsDataQuery", currentPage, searchInp],
    queryFn: () => productsList(currentPage, searchInp),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: isOpen,
    staleTime: 2 * 60 * 1000,
    refetchInterval: 2 * 60 * 1000,
  });

  return (
    <ModalComp
      trigger={
        <button className="col-span-2 md:col-span-1 px-3 py-5 border border-[#e9ecef] rounded flex items-center justify-center gap-1">
          {t("btn.addProduct")} <Plus size={22} />
        </button>
      }
      title={t("product.products")}
      open={isOpen}
      setOpen={setIsOpen}
    >
      <div className={`w-full flex flex-col gap-4 `}>
        <Suspense fallback={<Loading />}>
          <SearchProductInputComp
            setCurrentPage={setCurrentPage}
            searchInp={searchInp}
            setSearchInp={setSearchInp}
          />
        </Suspense>
        <div className="flex-1 flex flex-col border rounded-md border-[#e9ecef] min-h-[402px]">
          <div className="grid grid-cols-12 gap-1 p-1 text-[#8492A6] text-sm font-semibold border-b border-[#e9ecef]">
            <div className="text-center col-span-1">{t("table.number")}</div>
            <div className="text-center col-span-4">{t("table.title")}</div>
            <div className="text-center col-span-2">{t("table.unitPrice")}</div>
            <div className="text-center col-span-2">
              {t("table.availabilityStatus")}
            </div>
            <div className="text-center col-span-2">
              {t("table.inventoryValue")}
            </div>
            <div className="text-center col-span-1">{t("table.unit")}</div>
          </div>
          {isLoading || isFetching ? (
            <Loading className="w-14 h-14 m-auto" bg="bg-primary" />
          ) : (
            <div className="flex flex-col flex-1 overflow-y-auto">
              {productData?.data?.results?.map(
                (productItem: Product, productItemIdx: number) => (
                  <ProductRow
                    onSubmit={onSubmit}
                    isPending={isPending}
                    key={`orderProductItemIdx${productItemIdx}`}
                    productItem={productItem}
                    productItemIdx={productItemIdx}
                  />
                )
              )}
            </div>
          )}
        </div>
        <PaginationComp
          pagesCount={+productData?.data?.num_pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </ModalComp>
  );
};

export default AddProductModalList;
