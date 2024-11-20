import { useQuery } from "@tanstack/react-query";
import { CheckCircle } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deliveryMethodFunc } from "@/api/ApiClient";
import { useTranslation } from "react-i18next";
import priceComma from "@/utils/priceComma";

const DeliveryMethod = ({
  deliveryMethodState,
  setdeliveryMethodState,
}: {
  deliveryMethodState: string | undefined;
  setdeliveryMethodState: Dispatch<SetStateAction<string>>;
}) => {
  const [t] = useTranslation("global");

  const { data: deliveryMethodData } = useQuery({
    queryKey: ["getDeliveryMethodQuery"],
    queryFn: deliveryMethodFunc,
  });

  return (
    <div className="flex flex-col gap-3">
      <h5>{t("user.deliveryMethod")}</h5>
      <div className="grid grid-cols-2 gap-3">
        {deliveryMethodData?.results?.map(
          (
            deliveryMethod: {
              delivery_cost: number | null;
              icon: string;
              identifier: string;
              is_active: boolean;
              title: string;
            },
            deliveryMethodIdx: number
          ) => (
            <TooltipProvider key={`deliveryMethodIdx${deliveryMethodIdx}`}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    disabled={!deliveryMethod?.is_active}
                    type="button"
                    className={`disabled:opacity-60 relative col-span-2 sm:col-span-1 text-center p-4 rounded-md flex flex-col gap-2 items-start ${
                      deliveryMethodState === deliveryMethod?.identifier
                        ? "border-secondary border"
                        : "border"
                    }`}
                    onClick={() =>
                      setdeliveryMethodState(deliveryMethod?.identifier)
                    }
                  >
                    {deliveryMethodState === deliveryMethod?.identifier ? (
                      <CheckCircle
                        size={18}
                        className="text-secondary absolute rtl:left-3 ltr:right-3 top-3"
                      />
                    ) : null}
                    <div className="flex items-center gap-2">
                      <img
                        src={deliveryMethod?.icon}
                        className="w-7 h-7"
                        alt="delivery method icon"
                      />
                      <h6 className="font-semibold">{deliveryMethod?.title}</h6>
                    </div>
                    {deliveryMethod?.delivery_cost ||
                    deliveryMethod?.delivery_cost === 0 ? (
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-gray-500">
                          {t("orders.deliveryCost")}:
                        </span>
                        <span className="">
                          {deliveryMethod?.delivery_cost === 0
                            ? t("user.free")
                            : priceComma(+deliveryMethod?.delivery_cost)}
                        </span>
                      </div>
                    ) : null}
                  </button>
                </TooltipTrigger>
                {!deliveryMethod?.is_active ? (
                  <TooltipContent>
                    <p>{t("user.notAvailableDelivery")}</p>
                  </TooltipContent>
                ) : null}
              </Tooltip>
            </TooltipProvider>
          )
        )}
      </div>
    </div>
  );
};

export default DeliveryMethod;
