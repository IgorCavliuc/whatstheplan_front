import styles from "./styles.module.scss";
import { Input, MultiSwitch, SelectCustom } from "../../../ui";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { signup } from "../../../service";
import useUserStore from "../../../zustand/user";
import { BigLoading } from "../../../component/PageLoading";
import { useState } from "react";
import { setCookie } from "../../../utils";

export const SignUp = () => {
  const addUser = useUserStore((state) => state.addUser);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [, setSearchParams] = useSearchParams();

  const formik = useFormik({
    initialValues: {
      name: "",
      surename: "",
      birthday: "",
      phone: "",
      linkedin: "",
      instagram: "",
      facebook: "",
      email: "",
      password: "",
      confirmPassword: "",
      profession: "",
      userType: "",
      photo: "",
      valid: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      surename: Yup.string().required("Surename is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values, { setFieldError }) => {
      setIsLoading(true);

      try {
        const data = await signup(values);
        if (data.message && data.message.email) {
          setFieldError("email", data.message.email);
        }
        if (data.access_token) {
          setCookie("access_token", data.access_token);
          setTimeout(() => {
            navigate("/");
            setIsLoading(false);
            addUser(data.user);
          }, 2000);
        }
      } catch (error) {
        console.error("Ошибка:", error);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    },
  });

  const userTypeArray = [
    { value: "frontend", label: "Frontened developer" },
    { value: "backend", label: "Backend developer" },
    { value: "ui/ux", label: "UIUX Designer" },
  ];

  return (
    <>
      {isLoading && <BigLoading />}
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <label>SignUp</label>
        <MultiSwitch
          options={[
            { label: "client", value: "Client" },
            { label: "prof", value: "Professional" },
          ]}
          name="userType"
          onChange={formik.setFieldValue}
        />
        <div className={styles.form_item}>
          <Input
            value={formik.values.name}
            label="Name *"
            onChange={formik.handleChange}
            error={formik.touched.name && formik.errors.name}
            onBlur={formik.handleBlur}
            name="name"
          />
          <Input
            value={formik.values.surename}
            label="Surename *"
            onChange={formik.handleChange}
            error={formik.touched.surename && formik.errors.surename}
            onBlur={formik.handleBlur}
            name="surename"
          />
        </div>

        <SelectCustom
          options={userTypeArray}
          name="profession"
          onChange={formik.setFieldValue}
          placeHolder={"Profession"}
        />
        <div className={styles.form_item}>
          <Input
            value={formik.values.email}
            label="Email *"
            onChange={formik.handleChange}
            error={formik.touched.email && formik.errors.email}
            onBlur={formik.handleBlur}
            name="email"
          />
        </div>
        <div className={styles.form_item}>
          <Input
            value={formik.values.password}
            label="Password *"
            onChange={formik.handleChange}
            error={formik.touched.password && formik.errors.password}
            onBlur={formik.handleBlur}
            name="password"
          />
          <Input
            value={formik.values.confirmPassword}
            label="Confirm Password *"
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            onBlur={formik.handleBlur}
            name="confirmPassword"
          />
        </div>
        <Input
          value={formik.values.valid}
          label="Кто проживает на дне океана?"
          onChange={formik.handleChange}
          error={formik.touched.valid && formik.errors.valid}
          onBlur={formik.handleBlur}
          name="valid"
        />

        <button type="submit">Submit</button>
        <p onClick={() => setSearchParams({ type: "signin" })}>SignIn</p>
      </form>
    </>
  );
};

export default SignUp;
