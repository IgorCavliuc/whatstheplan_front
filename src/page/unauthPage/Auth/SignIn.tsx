import styles from "./styles.module.scss";
import { Input } from "../../../ui";
import { useFormik } from "formik";
import * as Yup from "yup";
import useUserStore from "../../../zustand/user";
import { useNavigate, useSearchParams } from "react-router-dom";
import { signin } from "../../../service";
import { useState } from "react";
import { BigLoading } from "../../../component/PageLoading";
import { setCookie } from "../../../utils";

export const SignIn = () => {
  const addUser = useUserStore((state) => state.addUser);
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setFieldError }) => {
      setIsLoading(true);

      try {
        const data = await signin(values);
        if (data.message && data.message.email) {
          setFieldError("email", data.message.email);
        }
        if (data.access_token) {
          setCookie("access_token", data.access_token);
          setTimeout(() => {
            setIsLoading(false);
            navigate("/");
            addUser(data);
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

  return (
    <>
      {isLoading && <BigLoading />}
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <label>SignIn</label>
        <Input
          value={formik.values.email}
          label="Email"
          onChange={formik.handleChange}
          error={formik.errors.email}
          active={formik.touched.email}
          onBlur={formik.handleBlur}
          name="email"
        />
        <Input
          value={formik.values.password}
          label="Password"
          onChange={formik.handleChange}
          error={formik.errors.password}
          active={formik.touched.password}
          onBlur={formik.handleBlur}
          name="password"
        />

        <button type="submit">Submit</button>
        <p onClick={() => setSearchParams({ type: "signup" })}>SignUp</p>
      </form>
    </>
  );
};

export default SignIn;
