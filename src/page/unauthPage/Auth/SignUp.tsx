import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputCustom, MultiSwitch, SelectCustom } from "../../../ui/";
import styles from "./styles.module.scss";
import { useSearchParams } from "react-router-dom";
import { signup } from "../../../service";
import { BigLoading } from "../../../component/PageLoading";
import { setCookie } from "../../../utils";

const SignUp = ({ setLocalUser }: any) => {
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
            setSearchParams({ type: "congratulation" });
            setIsLoading(false);
            setLocalUser(data.user);
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
          onChange={(value) => formik.setFieldValue("userType", value)}
        />
        <div className={styles.form_item}>
          <InputCustom
            value={formik.values.name}
            label="Name *"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            name="name"
          />
          <InputCustom
            value={formik.values.surename}
            label="Surename *"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.surename && Boolean(formik.errors.surename)}
            helperText={formik.touched.surename && formik.errors.surename}
            name="surename"
          />
        </div>

        <SelectCustom
          options={userTypeArray}
          name="profession"
          onChange={(value) => formik.setFieldValue("profession", value)}
          placeHolder={"Profession"}
        />
        <div className={styles.form_item}>
          <InputCustom
            value={formik.values.email}
            label="Email *"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            name="email"
          />
        </div>
        <div className={styles.form_item}>
          <InputCustom
            value={formik.values.password}
            label="Password *"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            name="password"
          />
          <InputCustom
            value={formik.values.confirmPassword}
            label="Confirm Password *"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            name="confirmPassword"
          />
        </div>
        <InputCustom
          value={formik.values.valid}
          label="Кто проживает на дне океана?"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.valid && Boolean(formik.errors.valid)}
          helperText={formik.touched.valid && formik.errors.valid}
          name="valid"
        />

        <button type="submit" className={styles.button_submit}>
          Submit
        </button>
        <p onClick={() => setSearchParams({ type: "signin" })}>SignIn</p>
      </form>
    </>
  );
};

export default SignUp;
