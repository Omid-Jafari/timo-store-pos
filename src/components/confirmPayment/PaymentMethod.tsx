import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import Loading from "../common/Loading";
import { CheckCircle } from "lucide-react";
import { useMemo } from "react";
import useAxios from "@/api/ApiServise";

const PaymentMethod = () => {
  const [t] = useTranslation("global");
  const [searchParams, setSearchParams] = useSearchParams();
  const paymentValue = searchParams.get("paymentValue") || "";

  const getPaymentOptions = async () => {
    const resp = await useAxios.options(`/store-pos/submit/`);
    searchParams.set(
      "paymentValue",
      resp?.data?.actions?.POST?.payment_method?.choices[0]?.value
    );
    setSearchParams(searchParams);

    return resp.data;
  };
  const { data, isPending } = useQuery({
    queryKey: ["getPaymentOptionsDataQuery"],
    queryFn: () => getPaymentOptions(),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
  const paymentOptions = useMemo<{ display_name: string; value: string }[]>(
    () => data?.actions?.POST?.payment_method?.choices,
    [data]
  );

  return (
    <div className="flex flex-col gap-2 ">
      <h5 className="text-xl font-semibold">{t("btn.paymentMethod")}</h5>
      <div className="flex flex-wrap gap-2 justify-start items-center">
        {isPending ? (
          <Loading />
        ) : (
          paymentOptions?.map((paymentOption, paymentOptionIdx) => (
            <button
              type="button"
              key={`paymentOptionIdx${paymentOptionIdx}`}
              className={`text-center p-4 rounded-md flex gap-2 items-center ${
                paymentValue === paymentOption?.value
                  ? "border-secondary border"
                  : "border"
              }`}
              onClick={() => {
                searchParams.set("paymentValue", paymentOption?.value);
                setSearchParams(searchParams);
              }}
            >
              <h6 className="font-semibold">{paymentOption?.display_name}</h6>
              <CheckCircle
                size={18}
                className={
                  paymentValue === paymentOption?.value
                    ? "text-secondary"
                    : "text-[#e4e4e7]"
                }
              />
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default PaymentMethod;
