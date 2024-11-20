import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import ModalComp from "@/components/common/ModalComp";
import Loading from "@/components/common/Loading";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser } from "@/api/ApiClient";
import InputComp from "@/components/common/InputComp";

const AddUserComp = ({
  setSearchInp,
}: {
  setSearchInp: Dispatch<SetStateAction<string>>;
}) => {
  const [t] = useTranslation("global");
  const [userModalOpen, setUserModalOpen] = useState(false);
  const handleModal = (open: boolean) => {
    setUserModalOpen(open);
    setSearchInp("");
  };
  const queryClient = useQueryClient();
  const { mutate: addUserMutation, isPending } = useMutation({
    mutationKey: ["addUserMutation"],
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUsersDataQuery"] });
      handleModal(false);
      formik.resetForm();
    },
    onError: () => {},
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      phone_number: "",
    },
    validationSchema: Yup.object({
      phone_number: Yup.string()
        .required(`${t("form.phoneError")}`)
        .matches(
          /^[+]*[0-9]*[ ]{0,1}[(]{0,1}[ ]{0,1}[0-9]{1,3}[ ]{0,1}[)]{0,1}[ ]{0,1}[0-9]{1,3}[ ]{0,1}[0-9]{2}[ ]{0,1}[0-9]{2}[ ]{0,1}[-./]{0,1}[ ]{0,1}[0-9]{1,5}$/g,
          `${t("form.phoneValid")}`
        ),
    }),

    onSubmit: (data) => {
      addUserMutation(data);
    },
  });

  return (
    <>
      <ModalComp
        trigger={
          <button
            onClick={() => setUserModalOpen(true)}
            type="button"
            className="mr-auto bg-[rgb(228,0,15)] hover:bg-red-700 transition-colors duration-300 text-white py-2 px-3 rounded disabled:opacity-30"
          >
            {t("user.addUser")}
          </button>
        }
        title={t("user.addUser")}
        open={userModalOpen}
        setOpen={handleModal}
        dialogContentClassName="max-w-xl"
      >
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-3">
          <InputComp
            className="col-span-2"
            autoFocus
            label={t("form.phoneNumber")}
            required
            type="number"
            name="phone_number"
            value={formik.values.phone_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errors={formik.errors.phone_number}
            touched={formik.touched.phone_number}
          />
          <InputComp
            label={t("form.firstName")}
            name="first_name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <InputComp
            label={t("form.lastName")}
            name="last_name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <InputComp
            className="col-span-2"
            label={t("form.email")}
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button
            type="submit"
            className="col-span-2 mx-auto min-w-[50%] bg-[rgb(228,0,15)] mt-6 hover:bg-red-700 transition-colors duration-300 text-white py-2 px-3 rounded disabled:opacity-30"
          >
            {isPending ? <Loading /> : t("user.addUser")}
          </button>
        </form>
      </ModalComp>
    </>
  );
};

export default AddUserComp;
