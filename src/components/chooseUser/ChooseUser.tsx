import { lazy, Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import ModalComp from "@/components/common/ModalComp";
import { UserRoundCog, UserRoundPlus } from "lucide-react";
import AddUserComp from "@/components/pos/orderDetailsCol/AddUserComp";
import OrderRow from "./OrderRow";
import PaginationComp from "@/components/common/PaginationComp";
import { usersList } from "@/api/ApiClient";
import Loading from "../common/Loading";

const SearcUserComp = lazy(
  () => import("@/components/pos/orderDetailsCol/SearcUserComp")
);

export type UserInv = {
  email: string;
  first_name: string;
  identifier: string;
  last_name: string;
  phone_number: string;
  username: string;
};

const ChooseUser = ({
  update = false,
  getUser,
}: {
  update?: boolean;
  getUser: (user: UserInv) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [t] = useTranslation("global");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInp, setSearchInp] = useState("");
  const {
    data: userData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getUsersDataQuery", currentPage, searchInp],
    queryFn: () => usersList(currentPage, searchInp),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: isOpen,
  });
  const closeModalFunc = () => {
    setIsOpen(false);
  };

  return (
    <ModalComp
      trigger={
        update ? (
          <button className="primary-btn px-2 !h-8 flex items-center gap-1 text-sm !font-medium">
            <UserRoundCog size={14} />
            {t("btn.change")}
          </button>
        ) : (
          <button className="border rounded-md flex items-center justify-center gap-1 text-primary font-medium p-5 text-base">
            <UserRoundPlus size={16} />
            {t("btn.selectCustomer")}
          </button>
        )
      }
      title={t("user.users")}
      open={isOpen}
      setOpen={setIsOpen}
    >
      <div className="w-full flex flex-col gap-4">
        <AddUserComp setSearchInp={setSearchInp} />
        <Suspense>
          <SearcUserComp
            setCurrentPage={setCurrentPage}
            searchInp={searchInp}
            setSearchInp={setSearchInp}
          />
        </Suspense>
        <div className="flex-1 flex flex-col border rounded-md border-[#e9ecef] min-h-[586px]">
          <div className="grid grid-cols-11 gap-1 p-1 text-start text-[#8492A6] text-sm font-semibold border-b border-[#e9ecef]">
            <div className="col-span-1">{t("table.number")}</div>
            <div className="col-span-3">{t("table.phone")}</div>
            <div className="col-span-2">{t("table.firstName")}</div>
            <div className="col-span-2">{t("table.lastName")}</div>
            <div className="col-span-3">{t("table.email")}</div>
          </div>
          {isLoading || isFetching ? (
            <Loading className="text-red-400 w-9 h-9 overflow-hidden m-auto" />
          ) : (
            <div className="flex flex-col flex-1 overflow-y-auto">
              {userData?.data?.results?.map(
                (userItem: UserInv, userItemIdx: number) => (
                  <OrderRow
                    getUser={getUser}
                    key={`userItemIdx${userItemIdx}`}
                    closeModalFunc={closeModalFunc}
                    userItem={userItem}
                    userItemIdx={userItemIdx}
                  />
                )
              )}
            </div>
          )}
        </div>
        <PaginationComp
          pagesCount={+userData?.data?.num_pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </ModalComp>
  );
};

export default ChooseUser;
