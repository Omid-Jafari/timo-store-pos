import { Suspense, lazy, useState } from "react";
import { useTranslation } from "react-i18next";
import { productsList } from "../../../../api/ApiClient";
import ProductRow from "./ProductRow";
import Loading from "../../../common/Loading";
import ModalComp from "@/components/common/ModalComp";
import PaginationComp from "../../../common/PaginationComp";
import { useQuery } from "@tanstack/react-query";

const SearchProductInputComp = lazy(() => import("./SearchProductInputComp"));

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

const ModalProductList = () => {
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
        <button className="bg-[rgb(228,0,15)] hover:bg-red-700 transition-colors duration-300 text-white py-2 px-1 rounded disabled:opacity-30">
          {t("btn.productSearch")}
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
                    key={`productItemIdx${productItemIdx}`}
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

export default ModalProductList;
