import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getOtpFunc } from "@/api/ApiClient";
import Loading from "../common/Loading";

const CountDownComponent = () => {
  const [t] = useTranslation("global");
  const [searchParams] = useSearchParams();
  const phoneNumber = searchParams.get("phoneNumber") || "";
  const [timer, setTimer] = useState<any>(59);

  const getOtpMutation = useMutation({
    mutationKey: ["getOtpMutation"],
    mutationFn: getOtpFunc,
    onSuccess: () => {
      setTimer(59);
    },
    onError: () => {},
  });
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setTimer(false);
    }
  }, [timer]);

  return (
    <div className="flex items-center justify-center">
      {timer ? (
        <span className="text-gray-500 font-medium text-[13px]">
          {t("form.timerTxt", { timer: timer ? `00:${timer}` : "" })}
        </span>
      ) : (
        <button
          type="button"
          className="text-[13px] font-semibold"
          onClick={() =>
            phoneNumber &&
            getOtpMutation.mutate({
              phone_number: phoneNumber,
            })
          }
        >
          {getOtpMutation?.isPending ? (
            <Loading className="w-10 h-6" bg="bg-primary" />
          ) : (
            t("form.getCodeAgain")
          )}
        </button>
      )}
    </div>
  );
};

export default CountDownComponent;
