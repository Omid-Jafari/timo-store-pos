import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const BackBtn = () => {
  const [t] = useTranslation("global");
  const location = useLocation();

  if (location.pathname === "/confirm-payment")
    return (
      <Link to="/" className="px-5 flex items-center gap-2 transparent-btn">
        <ArrowLeft size={20} className="rtl:rotate-180" />
        {t("btn.back")}
      </Link>
    );
};

export default BackBtn;
