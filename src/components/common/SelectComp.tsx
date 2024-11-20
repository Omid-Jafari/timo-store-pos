import { Info } from "lucide-react";
import { ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Loading from "./Loading";

const SelectComp = ({
  options,
  defaultValue,
  label,
  info,
  isRequired = false,
  icon,
  className,
  error,
  onValueChange,
  isPending = false,
  hasError = false,
}: {
  options: { display_name: string; value: string }[];
  defaultValue?: string | undefined;
  label: string;
  icon?: string | ReactNode;
  info?: string | undefined;
  isRequired?: boolean;
  onValueChange: (e: string) => void;
  className?: string;
  error?: string;
  isPending?: boolean;
  hasError?: boolean;
}) => {
  return (
    <div className={`flex flex-col gap-1 sm:gap-2 ${className}`} dir="rtl">
      <label className="text-sm font-bold">
        {label} {isRequired ? <span className="text-red-500">*</span> : null}
      </label>
      <div className="relative w-full">
        <Select  defaultValue={defaultValue} onValueChange={onValueChange}>
          <SelectTrigger
            className={`border w-full rounded-md p-2 outline-none focus:border-secondary transition-all duration-300 relative overflow-hidden pr-8 ${
              hasError ? "!border-[#e43f52]" : "!border-[#e9ecef]"
            }`}
            disabled={isPending}
          >
            {isPending ? (
              <div className="w-full flex justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-30">
                <Loading bg="bg-primary" />
              </div>
            ) : null}

            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option, optionIdx) => (
              <SelectItem key={`optionIdx${optionIdx}`} value={option?.value}>
                {option?.display_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="absolute top-1/2 -translate-y-1/2 right-[12px] pointer-events-none">
          {typeof icon === "string" ? (
            <img
              src={icon}
              className="object-contain w-[18px] h-[18px]"
              alt="icon"
              style={{
                filter:
                  "invert(16%) sepia(12%) saturate(342%) hue-rotate(163deg) brightness(99%) contrast(90%)",
              }}
            />
          ) : icon ? (
            icon
          ) : null}
        </div>
      </div>
      {info ? (
        <div className="flex items-center gap-1 text-xs text-[#8492A6]">
          <Info size={14} />
          <span>{info}</span>
        </div>
      ) : null}
      {hasError ? (
        <div className="text-red-500 w-full text-sm animate__animated animate__headShake">
          {error}
        </div>
      ) : null}
    </div>
  );
};

export default SelectComp;
