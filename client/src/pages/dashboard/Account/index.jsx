import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { toastify } from "../../../components/toast";
import { useDispatch, useSelector } from "react-redux";
import { getAdmin } from "../../../redux/reducers/adminSlice";

export default function Account() {
    const [user,setUser] = useState({});
  const dispatch = useDispatch();
  const {loading , error , data} = useSelector(store => store.admin);
    
  useEffect(() => {
    dispatch(getAdmin(window.localStorage.getItem("adminId")));
    setUser(data)
  }, [user]);

  const saveDetails = async (values) => {
    try {
      const { data } = await axios.patch(`http://localhost:3000/users/${window.localStorage.getItem("adminId")}` , values);
      setUser(data);
      toastify("profile updated successfully", "success");
    } catch (error) {
        console.log(error);
    }
  };

  const initialValues = {
    name: data.name || "",
    email: data.email || "",
    location: data.location || "",
    role: data.role || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Min characters are 3")
      .required("Username is required *"),
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required *"),
    location: Yup.string()
      .min(3, "Min characters are 3")
      .required("Location is required *"),
    role: Yup.string()
      .oneOf(["admin", "employee"], "Role must be either Admin or Employee")
      .required("Role is required *"),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      saveDetails(values);
    },
  });

  return (
    <div className="w-[96%] mx-auto my-10">
      <h2 className="text-3xl mb-5 font-semibold">Account</h2>
      {Object.keys(data).length > 0 && (
        <div className="flex flex-wrap gap-4 justify-between">
          <div className="bg-white text-center shadow-sm w-[100%] lg:w-[40%] p-10 rounded-2xl">
            <div className="mb-3">
              <img
                src={data.avatar}
                className="w-[150px] h-[150px] mx-auto rounded-full"
                alt="profile image"
              />
            </div>
            <h2 className="text-2xl font-medium">{data.name}</h2>
            <section className="text-gray-500 mt-2">{data.location}</section>
          </div>

          <div className="bg-white shadow-sm w-[100%] lg:w-[58%] text-left rounded-2xl">
            <div className="pb-3 border-b border-b-gray-300 p-5">
              <h2 className="text-xl font-semibold mb-[-5px]">Profile</h2>
              <section className="text-gray-500 mt-2 text-sm">
                The information can be edited
              </section>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-wrap mt-2 p-5 justify-between border-b border-b-gray-200 items-start">
                <div className="relative w-[100%] sm:w-[48%] mb-6">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-[#635BFF] hover:border-[#635BFF] transition duration-300 ease-in-out outline-0"
                  />
                  <label
                    htmlFor="name"
                    className="absolute -top-[15px] text-sm bg-white left-3 p-1"
                  >
                    Username
                  </label>

                  {formik.errors.name && formik.touched.name && (
                    <div className="text-red-500 mt-[5px] text-sm">
                      {formik.errors.name}
                    </div>
                  )}
                </div>

                <div className="relative w-[100%] sm:w-[48%] mb-6">
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

                  {formik.errors.email && formik.touched.email && (
                    <div className="text-red-500 mt-[5px] text-sm">
                      {formik.errors.email}
                    </div>
                  )}
                </div>

                <div className="relative w-[100%] sm:w-[48%] mb-3">
                  <input
                    type="text"
                    id="location"
                    name="location"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.location}
                    className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-[#635BFF] hover:border-[#635BFF] transition duration-300 ease-in-out outline-0"
                  />
                  <label
                    htmlFor="location"
                    className="absolute -top-[15px] text-sm bg-white left-3 p-1"
                  >
                    Location
                  </label>

                  {formik.errors.location && formik.touched.location && (
                    <div className="text-red-500 mt-[5px] text-sm">
                      {formik.errors.location}
                    </div>
                  )}
                </div>

                <div className="relative w-[100%] sm:w-[48%] mb-3">
                  <select
                    id="role"
                    name="role"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.role}
                    className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-[#635BFF] hover:border-[#635BFF] transition duration-300 ease-in-out outline-0 appearance-none"
                  >
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                  </select>
                  <label
                    htmlFor="role"
                    className="absolute -top-[15px] text-sm bg-white left-3 p-1"
                  >
                    Role
                  </label>
                </div>
              </div>

              <div className="text-right mr-5 mb-3">
                <button
                  type="submit"
                  onClick={() => console.log("Submitting...")}
                  className={`bg-[#635BFF] cursor-pointer py-2 mt-5  rounded-lg text-white mb-3 px-4`}
                >
                  Save details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
