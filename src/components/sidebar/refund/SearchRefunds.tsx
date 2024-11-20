import { X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const SearchRefunds = ({
  setCurrentPage,
  searchInp,
  setSearchInp,
}: {
  setCurrentPage: any;
  setSearchInp: (value: string) => void;
  searchInp: string;
}) => {
  const [t] = useTranslation("global");
  const [inputValue, setInputValue] = useState(searchInp);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setCurrentPage(1);
        setSearchInp(inputValue);
      }}
      className="flex-shrink-0 flex border rounded-md border-[#e9ecef] overflow-hidden relative"
    >
      <input
        autoFocus
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target?.value)}
        className="flex-1 appearance-none bg-inherit p-[6px] border border-inherit ltr:rounded-l-md rtl:rounded-r-md outline-none focus:border-red-500 transition-colors duration-300"
      />
      {searchInp || inputValue ? (
        <button
          type="button"
          className="absolute ltr:right-20 rtl:left-20 top-1/2 -translate-y-1/2"
          onClick={() => {
            setInputValue("");
            setCurrentPage(1);
            setSearchInp("");
          }}
        >
          <X className="text-primary" />
        </button>
      ) : null}
      <button
        className="hover:bg-[#d3d4d5] transition-colors duration-300 bg-[#f8f9fa] px-3 py-1 font-medium "
        type="submit"
      >
        {t("btn.search")}
      </button>
    </form>
  );
};

export default SearchRefunds;
