import { useTranslation } from "react-i18next";
import { Dispatch, SetStateAction } from "react";

const OriginOptionsTab = ({
  origin,
  setOrigin,
  setCurrentPage,
  originOptions,
}: {
  origin: "store_pos" | "checkout";
  setOrigin: Dispatch<SetStateAction<"store_pos" | "checkout">>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  originOptions: {
    store_pos: "store_pos";
    checkout: "checkout";
  };
}) => {
  const [t] = useTranslation("global");

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-muted p-1 flex rounded-md">
        <button
          type="button"
          onClick={() => {
            setOrigin(originOptions.store_pos);
            setCurrentPage(1);
          }}
          className={`flex-1 p-1 rounded-md transition-all duration-300 ${
            origin === originOptions.store_pos ? "bg-white" : "bg-transparent"
          }`}
        >
          {t("orders.storePos")}
        </button>
        <button
          type="button"
          onClick={() => {
            setOrigin(originOptions.checkout);
            setCurrentPage(1);
          }}
          className={`flex-1 p-1 rounded-md transition-all duration-300 ${
            origin === originOptions.checkout ? "bg-white" : "bg-transparent"
          }`}
        >
          {t("orders.checkout")}
        </button>
      </div>
    </div>
  );
};

export default OriginOptionsTab;
