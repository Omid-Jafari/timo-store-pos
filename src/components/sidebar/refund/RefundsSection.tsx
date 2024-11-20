import { useState } from "react";
import SearchRefunds from "./SearchRefunds";
import Loading from "@/components/common/Loading";
import SingleRefund from "./SingleRefund";
import { useTranslation } from "react-i18next";
import { useRefunds } from "@/hooks/refunds-state";
import PaginationComp from "@/components/common/PaginationComp";
import AddRefundComp from "./AddRefundComp";

const RefundsSection = () => {
  const [t] = useTranslation("global");
  const [searchInp, setSearchInp] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { refundData, isPending } = useRefunds({
    page: currentPage,
    search: searchInp,
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-medium">{t("header.refunds")}</h5>
        <AddRefundComp />
      </div>
      <SearchRefunds
        searchInp={searchInp}
        setSearchInp={setSearchInp}
        setCurrentPage={setCurrentPage}
      />
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
        {isPending ? (
          <Loading className="w-12 h-10 mx-auto" />
        ) : (
          refundData?.results?.map((refund, refundIdx) => (
            <SingleRefund key={`refundIdx${refundIdx}`} refund={refund} />
          ))
        )}
      </div>
      {+refundData?.num_pages > 1 ? (
        <PaginationComp
          pagesCount={+refundData?.num_pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : null}
    </>
  );
};

export default RefundsSection;
