import * as Yup from "yup";
import { useFormik } from "formik";
import { verifyOtpFunc } from "../../api/ApiClient";
import { useTranslation } from "react-i18next";
import Loading from "../common/Loading";
import { lazy, useTransition } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Edit } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useShop } from "@/hooks/shop-state";
import InputForOtp from "./InputForOtp";
import { User } from "@/hooks/user-state";

const CountDownComponent = lazy(() => import("./CountDownComponent"));

const LoginWithOtpSecondStep = () => {
  const queryClient = useQueryClient();
  const { shopData } = useShop();
  const [t] = useTranslation("global");
  const [searchParams] = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const phoneNumber = searchParams.get("phoneNumber") || "0";
  const { mutate: loginMutation, isPending: loginPending } = useMutation({
    mutationKey: ["loginMutation"],
    mutationFn: verifyOtpFunc,
    onSuccess: (res) => {
      startTransition(() => {
        localStorage.setItem("token", res?.data?.token);
        localStorage.setItem("isLoggedIn", "true");
        window.location.replace("/");

        queryClient.setQueryData(["getUserDataQuery"], {
          ...res?.data,
        } as User);
      });
    },
    onError: () => {},
  });
  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: Yup.object({
      code: Yup.string().required(`${t("form.codeError")}`),
    }),

    onSubmit: (data) => {
      loginMutation({ phone_number: phoneNumber, code: data?.code });
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
        <label htmlFor={"phoneNumber"} className="text-sm font-bold">
          {t("form.phoneNumber")}
        </label>
        <div className="relative w-full">
          <input
            disabled
            dir="ltr"
            name="phoneNumber"
            value={phoneNumber}
            className={`text-left font-semibold border border-[#e9ecef] w-full rounded-md p-2 outline-none focus:border-green transition-all duration-300 relative `}
          />
          <Link to={`/login?phoneNumber=${phoneNumber}`}>
            <Edit className="text-red-500 object-contain w-[18px] h-[18px] absolute top-1/2 -translate-y-1/2 right-[3%]" />
          </Link>
        </div>
      </div>
      <InputForOtp
        value={formik.values.code}
        onChange={(e: string) => formik.setFieldValue("code", e)}
        onComplete={() => formik.handleSubmit()}
      />
      {formik.errors.code && formik.touched.code && (
        <div className="text-red-600 w-full text-sm px-3 py-2 animate__animated animate__headShake">
          {formik.errors.code as string}
        </div>
      )}
      <button type="submit" disabled={loginPending} className="primary-btn">
        {loginPending || isPending ? <Loading bg="bg-white" /> : t("btn.login")}
      </button>
      <CountDownComponent />
    </form>
  );
};

export default LoginWithOtpSecondStep;
