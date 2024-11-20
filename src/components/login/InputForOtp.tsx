import { useTranslation } from "react-i18next";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

const InputForOtp = ({
  onChange,
  value,
  onComplete,
}: {
  onChange: any;
  value: any;
  onComplete: any;
}) => {
  const [t] = useTranslation("global");

  return (
    <div className="flex flex-col gap-3 ">
      <label htmlFor="code" className="text-sm font-bold">
        {t("form.otp")} <span className="text-red-500">*</span>
      </label>
      <div className="w-full py-2" dir="ltr">
        <InputOTP
          maxLength={6}
          onChange={(value) => onChange(value)}
          value={value}
          onComplete={onComplete}
          containerClassName=" justify-around"
          autoFocus
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={4} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    </div>
  );
};

export default InputForOtp;
