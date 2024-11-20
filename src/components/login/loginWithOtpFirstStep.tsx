import * as Yup from "yup";
import { useFormik } from "formik";
import { getOtpFunc } from "../../api/ApiClient";
import { useTranslation } from "react-i18next";
import Loading from "../common/Loading";
import { useTransition } from "react";
import { useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useShop } from "@/hooks/shop-state";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const LoginWithOtpFirstStep = () => {
  const { shopData } = useShop();
  const [t] = useTranslation("global");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const phoneNumber = searchParams.get("phoneNumber") || "";
  const phoneRegExp = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  const { mutate: loginMutation, isPending: loginPending } = useMutation({
    mutationKey: ["loginMutation"],
    mutationFn: getOtpFunc,
    onSuccess: () => {
      startTransition(() => {
        searchParams.set("loginActiveSec", "verifyOtp");
        searchParams.set("phoneNumber", formik.values.phone);
        setSearchParams(searchParams);
      });
    },
    onError: () => {},
  });
  const formik = useFormik({
    initialValues: {
      phone: phoneNumber,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      phone: Yup.string()
        .required(`${t("form.phoneError")}`)
        .matches(phoneRegExp, `${t("form.phoneValid")}`),
    }),

    onSubmit: (data) => {
      loginMutation({ phone_number: data?.phone });
    },
  });
  return (
    <form
      className="p-6 gap-4 min-w-[400px] flex flex-col border rounded-2xl border-[#e9ecef] bg-white"
      onSubmit={formik.handleSubmit}
    >
      <img
        src={shopData?.logo || "/logo.webp"}
        className="mx-auto w-2/3 max-h-[54px] mb-2 object-contain"
        alt="logo image"
      />
      <div className="flex flex-col gap-3 ">
        <label htmlFor={"phone"} className="text-sm font-bold">
          {t("form.phoneNumber")} <span className="text-red-500">*</span>
        </label>
        <PhoneInput
          defaultCountry="tr"
          value={formik.values.phone}
          onChange={(phone) => formik.setFieldValue("phone", phone)}
          onBlur={formik.handleBlur}
          className="w-full"
          inputClassName="flex-1"
          style={{ direction: "ltr" }}
        />
      </div>
      {formik.errors.phone && formik.touched.phone && (
        <div className="text-red-600 w-full text-sm px-3 py-2 animate__animated animate__headShake">
          {formik.errors.phone as string}
        </div>
      )}

      <button type="submit" disabled={loginPending} className="primary-btn">
        {loginPending || isPending ? (
          <Loading bg="bg-white" />
        ) : (
          t("btn.getCode")
        )}
      </button>
    </form>
  );
};

export default LoginWithOtpFirstStep;
