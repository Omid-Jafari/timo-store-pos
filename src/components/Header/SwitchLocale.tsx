import { useTransition } from "react";
import Loading from "../common/Loading";
import { useTranslation } from "react-i18next";
// import { useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const SwitchLocale = () => {
  // const queryClient = useQueryClient();
  const [, i18n] = useTranslation("global");
  const [isPending, startTransition] = useTransition();
  const langOptions = [
    { id: "fa", title: "Farsi" },
    { id: "tr", title: "Turkish" },
    { id: "en", title: "English" },
  ];

  return (
    <Select
      defaultValue={i18n.language}
      onValueChange={(e) => {
        startTransition(() => {
          i18n.changeLanguage(e);
          localStorage.setItem("lang", e);
          // queryClient.resetQueries();
          window.location.reload();
        });
      }}
    >
      <SelectTrigger className="relative overflow-hidden" disabled={isPending}>
        {isPending ? (
          <div className="w-full flex justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-30">
            <Loading bg="bg-primary" />
          </div>
        ) : null}
        <SelectValue />
      </SelectTrigger>
      <SelectContent align={i18n.language !== "fa" ? "start" : "end"}>
        {langOptions?.map((lang, langIdx) => (
          <SelectItem value={lang?.id} key={`langIdx${langIdx}`}>
            <div className="flex items-center gap-1 justify-between w-full font-medium">
              <span>{lang?.title}</span>
              <img
                className="w-4 h-3"
                src={`https://cdn.timobio.com/static/addon/site/images/country-flags/${lang?.id}.webp`}
                alt="country flag"
              />
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SwitchLocale;
