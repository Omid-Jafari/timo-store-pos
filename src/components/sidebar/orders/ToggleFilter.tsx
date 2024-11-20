import { Switch } from "@/components/ui/switch";
import { Filter } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";

const ToggleFilter = ({
  status,
  setStatus,
}: {
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
}) => {
  const [t] = useTranslation("global");
  const [toggleFilter, setToggleFilter] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-medium">{t("header.orders")}</h5>
        <button
          type="button"
          className={`transition-all duration-300 p-1.5 rounded-md ${
            toggleFilter ? "text-secondary bg-gray-100 " : ""
          }`}
          onClick={() => setToggleFilter(!toggleFilter)}
        >
          <Filter size={18} />
        </button>
      </div>
      <button
        onClick={() => {
          if (status === "all") {
            setStatus("paid");
          } else {
            setStatus("all");
          }
        }}
        className={`flex items-center gap-1 transition-all duration-300 overflow-hidden ${
          toggleFilter
            ? "max-h-16 pointer-events-auto"
            : "max-h-0 pointer-events-none -mt-6 opacity-0"
        }`}
      >
        {t("orders.justPaid")}
        <Switch checked={status === "paid"} dir="ltr" />
      </button>
    </>
  );
};

export default ToggleFilter;
