import { lazy, Suspense, useTransition } from "react";
import { getSingleUser } from "../../../api/ApiClient";
import Loading from "../../common/Loading";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { UserInv } from "@/components/chooseUser/ChooseUser";

const ChooseUser = lazy(() => import("@/components/chooseUser/ChooseUser"));

const CustomerComp = () => {
  const [removeUserLoading, startTransition] = useTransition();
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get("userId") || "";
  const { data: userData, isLoading } = useQuery({
    queryKey: ["getSingleUserDataQuery", userId],
    queryFn: () => getSingleUser(userId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!userId,
  });
  const getUser = (user: UserInv) => {
    searchParams.set("userId", user?.identifier);
    setSearchParams(searchParams);
  };

  return (
    <>
      {!userId ? (
        <Suspense fallback={<Loading />}>
          <ChooseUser getUser={getUser} />
        </Suspense>
      ) : isLoading ? (
        <div className="border rounded-md p-4 flex items-center justify-center">
          <Loading className="w-10 h-10" />
        </div>
      ) : (
        <div className="border rounded-md p-4 flex gap-3 items-center justify-between">
          <div className="flex flex-col items-start justify-center gap-2">
            <h5 className="font-semibold">{`${userData?.data?.first_name} ${userData?.data?.last_name}`}</h5>
            <span className="text-sm" dir="ltr">
              {userData?.data?.phone_number}
            </span>
          </div>
          <div className="flex flex-col gap-2 justify-between items-end">
            <button
              onClick={() => {
                startTransition(() => {
                  searchParams.delete("userId");
                  setSearchParams(searchParams);
                });
              }}
              disabled={removeUserLoading}
              className=""
            >
              {removeUserLoading ? (
                <Loading className="w-9 h-9" />
              ) : (
                <Trash2 className="text-primary" />
              )}
            </button>
            <Suspense fallback={<Loading />}>
              <ChooseUser update getUser={getUser} />
            </Suspense>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerComp;
