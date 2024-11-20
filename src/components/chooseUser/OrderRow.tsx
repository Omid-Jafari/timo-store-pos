import { useTransition } from "react";
import { UserInv } from "./ChooseUser";
import Loading from "../common/Loading";

const OrderRow = ({
  closeModalFunc,
  userItem,
  userItemIdx,
  getUser,
}: {
  closeModalFunc: () => void;
  userItem: UserInv;
  userItemIdx: number;
  getUser: (user: UserInv) => void;
}) => {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      {isPending ? (
        <Loading className="text-red-400 w-[29px] h-[29px] overflow-hidden mx-auto my-1" />
      ) : (
        <button
          type="button"
          onClick={() => {
            startTransition(() => {
              getUser(userItem);
              closeModalFunc();
            });
          }}
          className={`grid grid-cols-11 gap-1 text-start border-b hover:bg-[#f2f2f2] disabled:bg-none disabled:opacity-50 border-[#e9ecef] px-1 py-2 text-sm font-semibold transition-colors duration-300 `}
        >
          <div className="col-span-1">{userItemIdx + 1}</div>
          <div title={userItem?.phone_number} className="col-span-3">
            {userItem?.phone_number}
          </div>
          <div className="col-span-2">{userItem?.first_name || "_"}</div>
          <div className="col-span-2">{userItem?.last_name || "_"}</div>
          <div className="col-span-3">{userItem?.email || "_"}</div>
        </button>
      )}
    </>
  );
};

export default OrderRow;
