import { useFormik } from "formik";
import ModalComp from "@/components/common/ModalComp";
import { SquarePen, Trash2 } from "lucide-react";
import { lazy, Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editRefundFunc } from "@/api/ApiClient";
import Loading from "@/components/common/Loading";
import { Refund } from "@/hooks/refunds-state";
import TextAreaComp from "@/components/common/TextAreaComp";
import { UserInv } from "@/components/chooseUser/ChooseUser";
import RefundItemsList from "./RefundItemsList";

const ChooseUser = lazy(() => import("@/components/chooseUser/ChooseUser"));

const EditRefund = ({ refund }: { refund: Refund }) => {
  const [t] = useTranslation("global");
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: updateRefundMutation, isPending } = useMutation({
    mutationKey: ["updateRefundMutation"],
    mutationFn: editRefundFunc,
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["refundsDataQuery"] });
    },
  });
  const formik = useFormik({
    initialValues: {
      userId: refund?.user?.identifier,
      userFirstName: refund?.user?.first_name,
      userLastName: refund?.user?.last_name,
      userPhoneNumber: refund?.user?.phone_number,
      reason: refund?.reason || "",
    },
    enableReinitialize: true,
    onSubmit: (data) => {
      updateRefundMutation({
        identifier: refund?.identifier,
        body: { user: data?.userId, reason: data?.reason },
      });
    },
  });
  const getUser = (user: UserInv) => {
    formik.setFieldValue("userId", user?.identifier);
    formik.setFieldValue("userFirstName", user?.first_name);
    formik.setFieldValue("userLastName", user?.last_name);
    formik.setFieldValue("userPhoneNumber", user?.phone_number);
  };

  return (
    <ModalComp
      trigger={
        <button className="text-secondary">
          <SquarePen size={18} />
        </button>
      }
      title={t("refunds.editRefunds")}
      open={isOpen}
      setOpen={setIsOpen}
      dialogContentClassName="max-w-4xl"
    >
      <div className="flex flex-col gap-8 ">
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
        <RefundItemsList
          refundItems={refund?.items}
          refundId={refund?.identifier}
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
      </div>
    </ModalComp>
  );
};

export default EditRefund;
