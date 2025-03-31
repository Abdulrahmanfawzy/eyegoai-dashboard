import { useFormik } from 'formik';
import React from 'react'
import * as Yup from 'yup';
import { updateAdminPassword } from '../../../redux/reducers/adminSlice';
import { useDispatch } from 'react-redux';

export default function Setting() {
    const dispatch = useDispatch();

    const initialValues = {
        password: "",
        confirmPass: "",
      };
    
      const validationSchema = Yup.object({
        password: Yup.string()
          .matches(
            /^(?=.*[A-Z])(?=.*[0-9])(?=.*[/*\-}{$#@!%^&*()]).{8,}$/,
            "password must have at least one uppercase - at least one one digit - at least one special character"
          )
          .required("Password is required *"),
          confirmPass: Yup.string()
          .oneOf([Yup.ref('password')], "Passwords must match")
          .required("Confirm password is required *"),        
      });
    
      const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values) => {
            dispatch(updateAdminPassword({values , id: window.localStorage.getItem("adminId")}));
        },
      });


  return (
    <div className="bg-white shadow-sm w-[95%] lg:w-[65%] mx-auto mt-30 text-left rounded-2xl">
    <div className="pb-3 border-b border-b-gray-300 py-6 p-5">
        <h2 className="text-xl font-semibold mb-[-5px]">Update Password</h2>
        <section className="text-gray-500 mt-2 text-sm">
            Your password could be edited
        </section>
    </div>

    <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-wrap mt-2 p-5 justify-between border-b border-b-gray-200 items-start">

            <div className="relative w-[100%] sm:w-[48%] mb-6">
                <input
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-[#635BFF] hover:border-[#635BFF] transition duration-300 ease-in-out outline-0"
                />
                <label
                htmlFor="password"
                className="absolute -top-[15px] text-sm bg-white left-3 p-1"
                >
                Password
                </label>

                {formik.errors.password && formik.touched.password && (
                <div className="text-red-500 mt-[5px] text-sm">
                    {formik.errors.password}
                </div>
                )}
            </div>

            <div className="relative w-[100%] sm:w-[48%] mb-6">
                <input
                type="password"
                id="confirmPass"
                name="confirmPass"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPass}
                className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-[#635BFF] hover:border-[#635BFF] transition duration-300 ease-in-out outline-0"
                />
                <label
                htmlFor="confirmPass"
                className="absolute -top-[15px] text-sm bg-white left-3 p-1"
                >
                Confirm Password
                </label>

                {formik.errors.confirmPass && formik.touched.confirmPass && (
                <div className="text-red-500 mt-[5px] text-sm">
                    {formik.errors.confirmPass}
                </div>
                )}
            </div>

        </div>

        <div className="text-right mr-5 mb-3">
        <button
            type="submit"
            onClick={() => console.log("Submitting...")}
            className={`bg-[#635BFF] cursor-pointer py-2 mt-5  rounded-lg text-white mb-5 px-4`}>
            Update password
        </button>
        </div>
    </form>
    </div>
  )
}
