import { useFormik } from "formik";
import React, { useMemo, useState } from "react";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toastify } from "../toast";
import { useNavigate } from "react-router-dom";
import { setTokenInStorage } from "../../redux/reducers/tokenSlice";
import {useDispatch} from "react-redux";

export default function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // initalize inputs and memorize values
  const initialValues = useMemo(() => ({ email: "", password: "" }), []);

  // validation Schema for two inputs
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required *"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[/*\-}{$#@!%^&*()]).{8,}$/,
        "password must have at least one uppercase - at least one one digit - at least one special character"
      )
      .required("Password is required *"),
  });

  // login function
  const login = async (values) => {
    
    try {
      const { data: user } = await axios.get(`http://localhost:3000/users?email=${values.email}`);
      
      if (!user.length) {
        return toastify("Email is not found", "error");
      }
  
      const userFound = user[0];
  
      if (userFound.password !== values.password) {
        return toastify("Password is wrong", "error");
      }
  
      if (userFound.role !== "admin") {
        return toastify("You are not authorized to access dashboard", "error");
      }
  
      toastify("Login successful", "success");
      dispatch(setTokenInStorage(userFound));
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toastify("Something went wrong, please try again!", "error");
    }
  };
  

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      login(values)
    },
  });


  return (
    <div className="w-[100%] px-7 md:px-20 h-[100vh] flex items-center md:w-[50%]  mx-auto">
      <form className="w-[100%] lg:w-[95%] mx-auto" onSubmit={formik.handleSubmit}>
        <h2 className="font-semibold! text-4xl mb-10">Sign in</h2>
        <div className="relative mb-6">
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-[#635BFF] hover:border-[#635BFF] transition duration-300 ease-in-out outline-0"
          />
          <label
            htmlFor="email"
            className="absolute -top-[15px] text-sm bg-white left-3 p-1"
          >
            Email address
          </label>

          {!formik.errors.email && formik.touched.email ? (
            <FontAwesomeIcon
              className="text-green-400 absolute right-4 top-1/2 -translate-y-1/2"
              icon={faCheck}
            />
          ) : (
            ""
          )}
        </div>
        {formik.errors.email && formik.touched.email && (
          <div className="text-red-500 mb-5 mt-[-20px] text-sm">
            {formik.errors.email}
          </div>
        )}
        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-[#635BFF] hover:border-[#635BFF] transition duration-300 ease-in-out outline-0"
          />
          <label
            htmlFor="email"
            className="absolute -top-[15px] text-sm bg-white left-3 p-1"
          >
            Password
          </label>

          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="cursor-pointer"
          >
            <FontAwesomeIcon
              className="text-gray-400 text-sm absolute right-4 top-1/2 -translate-y-1/2"
              icon={showPass ? faEye : faEyeSlash}
            />
          </button>
        </div>

        {formik.errors.password && formik.touched.password && (
          <div className="text-red-500 mt-[5px] text-sm">
            {formik.errors.password}
          </div>
        )}

        <button className="bg-[#635BFF] cursor-pointer py-2 mt-5 block rounded-lg text-white w-full">
          Sign in
        </button>
      </form>
    </div>
  );
}
