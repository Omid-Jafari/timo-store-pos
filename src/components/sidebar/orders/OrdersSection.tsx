import { useState } from "react";
import SearchOrders from "./SearchOrders";
import { useOrders } from "@/hooks/orders-state";
import Loading from "@/components/common/Loading";
import SingleOrder from "./SingleOrder";
import PaginationComp from "@/components/common/PaginationComp";
import ToggleFilter from "./ToggleFilter";
import OriginOptionsTab from "./OriginOptionsTab";

const OrdersSection = () => {
  const originOptions = {
    store_pos: "store_pos" as const,
    checkout: "checkout" as const,
  };
  const [origin, setOrigin] = useState<"store_pos" | "checkout">(
    originOptions.store_pos
  );
  const [status, setStatus] = useState("all");
  const [searchInp, setSearchInp] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { orderData, isPending } = useOrders({
    origin,
    status: status === "paid" ? "paid" : undefined,
    page: currentPage,
    search: searchInp,
  });

  return (
    <>
      <ToggleFilter setStatus={setStatus} status={status} />
      <SearchOrders
        searchInp={searchInp}
        setSearchInp={setSearchInp}
        setCurrentPage={setCurrentPage}
      />
      <OriginOptionsTab
        origin={origin}
        setCurrentPage={setCurrentPage}
        setOrigin={setOrigin}
        originOptions={originOptions}
      />
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
        {isPending ? (
          <Loading className="w-12 h-10 mx-auto" />
        ) : (
          orderData?.results?.map((order, orderIdx) => (
            <SingleOrder key={`orderIdx${orderIdx}`} order={order} />
          ))
        )}
      </div>
      {+orderData?.num_pages > 1 ? (
        <PaginationComp
          pagesCount={+orderData?.num_pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : null}
    </>
  );
};

export default OrdersSection;
