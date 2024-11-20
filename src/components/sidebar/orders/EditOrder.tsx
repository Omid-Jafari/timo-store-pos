import { useFormik } from "formik";
import ModalComp from "@/components/common/ModalComp";
import { Order } from "@/hooks/orders-state";
import { SquarePen, Trash2 } from "lucide-react";
import { lazy, Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editOrderFunc } from "@/api/ApiClient";
import Loading from "@/components/common/Loading";
import SelectComp from "@/components/common/SelectComp";
import DeliveryMethod from "./DeliveryMethod";
import UserAddresses from "./UserAddresses";
import { UserInv } from "@/components/chooseUser/ChooseUser";
import OrderItemList from "./OrderItemList";

const ChooseUser = lazy(() => import("@/components/chooseUser/ChooseUser"));

const EditOrder = ({ order }: { order: Order }) => {
  const [t] = useTranslation("global");
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const statusOptions = [
    { display_name: t("orders.unpaid"), value: "unpaid" },
    {
      display_name: t("orders.awaitng_confirmation"),
      value: "awaitng_confirmation",
    },
    { display_name: t("orders.paid"), value: "paid" },
    { display_name: t("orders.preparing"), value: "preparing" },
    { display_name: t("orders.sent"), value: "sent" },
    {
      display_name: t("orders.partially_refunded"),
      value: "partially_refunded",
    },
    { display_name: t("orders.refunded"), value: "refunded" },
    { display_name: t("orders.cancelled"), value: "cancelled" },
  ];

  const { mutate: updateOrderMutation, isPending } = useMutation({
    mutationKey: ["updateOrderMutation"],
    mutationFn: editOrderFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ordersDataQuery"] });
      setIsOpen(false);
    },
  });
  const formik = useFormik({
    initialValues: {
      userId: order?.user?.identifier,
      userFirstName: order?.user?.first_name,
      userLastName: order?.user?.last_name,
      userPhoneNumber: order?.user?.phone_number,
      status: order?.status,
      delivery_method: order?.delivery_method?.identifier,
      shipping_address: order?.shipping_address?.identifier,
      billing_address: order?.billing_address?.identifier,
    },
    enableReinitialize: true,
    onSubmit: (data) => {
      updateOrderMutation({
        identifier: order?.identifier,
        body: {
          user: data?.userId,
          status: data?.status,
          ...(data?.billing_address && {
            billing_address: data?.billing_address,
          }),
          ...(data?.shipping_address && {
            shipping_address: data?.shipping_address,
          }),
          ...(data?.delivery_method && {
            delivery_method: data?.delivery_method,
          }),
        },
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
      title={t("orders.editOrders")}
      open={isOpen}
      setOpen={setIsOpen}
      dialogContentClassName="max-w-4xl"
    >
      <div className="flex flex-col gap-8 ">
        <SelectComp
          options={statusOptions}
          label={t("orders.status")}
          defaultValue={formik.values.status}
          onValueChange={(e: string) => formik.setFieldValue("status", e)}
          isRequired
          className="w-full"
          error={formik.errors.status as string}
          hasError={!!formik.errors.status && !!formik.touched.status}
        />
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
        <UserAddresses
          shipping_address={formik.values.shipping_address}
          setShipping_address={(shipAddress) =>
            formik.setFieldValue("shipping_address", shipAddress)
          }
          billing_address={formik.values.billing_address}
          setBilling_address={(shipAddress) =>
            formik.setFieldValue("billing_address", shipAddress)
          }
        />
        <DeliveryMethod
          deliveryMethodState={formik.values.delivery_method}
          setdeliveryMethodState={(delId) =>
            formik.setFieldValue("delivery_method", delId)
          }
        />
        <OrderItemList orderId={order?.identifier} orderItems={order?.items}/>
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

export default EditOrder;
