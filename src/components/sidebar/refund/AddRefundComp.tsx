import { lazy, Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import ModalComp from "@/components/common/ModalComp";
import Loading from "@/components/common/Loading";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRefundFunc } from "@/api/ApiClient";
import { Trash2 } from "lucide-react";
import TextAreaComp from "@/components/common/TextAreaComp";
import { UserInv } from "@/components/chooseUser/ChooseUser";

const ChooseUser = lazy(() => import("@/components/chooseUser/ChooseUser"));

const AddRefundComp = () => {
  const [t] = useTranslation("global");
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: addRefundMutation, isPending } = useMutation({
    mutationKey: ["addRefundMutation"],
    mutationFn: addRefundFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["refundsDataQuery"] });
      setIsOpen(false);
      formik.resetForm();
    },
  });
  const formik = useFormik({
    initialValues: {
      userId: "",
      userFirstName: "",
      userLastName: "",
      userPhoneNumber: "",
      reason: "",
    },

    onSubmit: (data) => {
      addRefundMutation({ reason: data?.reason, user: data?.userId });
    },
  });
  const getUser = (user: UserInv) => {
    formik.setFieldValue("userId", user?.identifier);
    formik.setFieldValue("userFirstName", user?.first_name);
    formik.setFieldValue("userLastName", user?.last_name);
    formik.setFieldValue("userPhoneNumber", user?.phone_number);
  };

  return (
    <>
      <ModalComp
        trigger={
          <button
            onClick={() => setIsOpen(true)}
            type="button"
            className="bg-[rgb(228,0,15)] hover:bg-red-700 transition-colors duration-300 text-white py-2 px-3 rounded disabled:opacity-30"
          >
            {t("refunds.addRefund")}
          </button>
        }
        title={t("refunds.addRefund")}
        open={isOpen}
        setOpen={setIsOpen}
        dialogContentClassName="max-w-xl"
      >
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8 ">
          <h5 className="text-xl font-semibold -mb-7">{t("order.customer")}</h5>
          {!formik.values.userId ? (
            <Suspense fallback={<Loading />}>
              <ChooseUser getUser={getUser} />
            </Suspense>
          ) : (
            <div className="border rounded-md p-4 flex gap-3 items-center justify-between">
              <div className="flex flex-col items-start justify-center gap-2">
                <h5 className="font-semibold">{`${formik.values?.userFirstName} ${formik.values?.userLastName}`}</h5>
                <span className="text-sm" dir="ltr">
                  {formik?.values?.userPhoneNumber}
                </span>
              </div>
              <div className="flex flex-col gap-2 justify-between items-end">
                <button
                  onClick={() => formik.setFieldValue("userId", undefined)}
                  className=""
                >
                  <Trash2 className="text-primary" />
                </button>
                <Suspense fallback={<Loading />}>
                  <ChooseUser update getUser={getUser} />
                </Suspense>
              </div>
            </div>
          )}
          <TextAreaComp
            label={t("refunds.reason")}
            name="reason"
            value={formik.values.reason}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="w-full flex items-center gap-2 justify-end">
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="transparent-btn px-5 text-base rounded-lg m-0"
            >
              {t("btn.cancel")}
            </button>
            <button
              disabled={isPending}
              type="button"
              onClick={() => formik.handleSubmit()}
              className="relative overflow-hidden primary-btn px-5 text-base rounded-lg"
            >
              {isPending ? (
                <div className="w-full flex justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-30">
                  <Loading bg="bg-white" />
                </div>
              ) : null}
              {t("btn.save")}
            </button>
          </div>
        </form>
      </ModalComp>
    </>
  );
};

export default AddRefundComp;
