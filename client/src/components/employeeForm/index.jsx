import { faCheck, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { addEmployee, updateEmployee } from "../../redux/reducers/employeeSlice";

function EmployeeForm({employee = {},id = null}) {
    
    const [showPass, setShowPass] = useState(false);
    const dispatch = useDispatch();
    if(!id){
        employee = {};
    }
    
  const initialValues = {
      name: employee.name || "",
      email: employee.email || "",
      password: employee.password || "",
      role: employee.role || "employee",
      department: employee.department || "",
      position: employee.position || "",
      salary: employee.salary || "",
      status: employee.status || "active",
    }

  // validation Schema for inputs
  const validationSchema = Yup.object({
    name: Yup.string().min(6 , "min characters is 6 !").required("username is required *"),
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required *"),
    password: id
        ? Yup.string().notRequired()
        : Yup.string()
            .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[/*\-}{$#@!%^&*()]).{8,}$/,
        "Password must have at least one uppercase, one digit, and one special character"
        )
        .required("Password is required *"),
    role: Yup.string()
        .oneOf(['admin', 'employee'], 'Role must be either Admin or Employee')
        .required('Role is required *'),
    department: Yup.string()
    .oneOf(['HR', 'Engineering', 'Finance'], 'Invalid department')
    .required('Department is required *'),
    position: Yup.string()
    .min(3, 'Position must be at least 3 characters')
    .required('Position is required *'),
    salary: Yup.number().min(1000, 'Salary must be at least 1000 EGP')
    .required('Salary is required *'),
    status: Yup.string()
        .oneOf(['active', 'inactive'], 'Status must be either Active or Inactive')
        .required('Status is required *'),
  });
  
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values , {resetForm}) => {
        if(id){
            dispatch(updateEmployee({values,id}));
        }else{
            dispatch(addEmployee(values));
            resetForm()
        }
    },
  });


  return (
    <form
      className="w-[90%] lg:w-[50%] mt-10 mb-20 mx-auto"
      onSubmit={formik.handleSubmit}>
      <h2 className="font-semibold! text-center text-4xl mb-10">{id ? "Edit Employee" : "Add Employee"}</h2>
      <div className="relative mb-6">
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
          className="absolute -top-[15px] text-sm bg-white left-3 p-1">
          Username
        </label>

      </div>
      {formik.errors.name && formik.touched.name && (
        <div className="text-red-500 mb-5 mt-[-20px] text-sm">
          {formik.errors.name}
        </div>
      )}

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
          className="absolute -top-[15px] text-sm bg-white left-3 p-1">
          Email address
        </label>
      </div>
      {formik.errors.email && formik.touched.email && (
        <div className="text-red-500 mb-5 mt-[-20px] text-sm">
          {formik.errors.email}
        </div>
      )}

        {!id &&

            <>
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
            </>
        }

        <div className="relative mt-6 mb-6">
          <select
            id="role"
            name="role"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.role}
            className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-[#635BFF] hover:border-[#635BFF] transition duration-300 ease-in-out outline-0 appearance-none">
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
        {formik.errors.role && formik.touched.role && (
          <div className="text-red-500 mb-5 mt-[-20px] text-sm">
            {formik.errors.role}
          </div>
        )}

        
        <div className="relative mb-6">
          <select
            id="department"
            name="department"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.department}
            className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-[#635BFF] hover:border-[#635BFF] transition duration-300 ease-in-out outline-0 appearance-none">
            <option value="" disabled>Select a department</option>
            <option value="Finance">Finance</option>
            <option value="Engineering">Engineering</option>
            <option value="HR">HR</option>
          </select>
          <label
            htmlFor="department"
            className="absolute -top-[15px] text-sm bg-white left-3 p-1"
          >
            Department
          </label>
        </div>
        {formik.errors.department && formik.touched.department && (
          <div className="text-red-500 mb-5 mt-[-20px] text-sm">
            {formik.errors.department}
          </div>
        )}

<div className="relative mb-6">
        <input
          type="text"
          id="position"
          name="position"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.position}
          className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-[#635BFF] hover:border-[#635BFF] transition duration-300 ease-in-out outline-0"
        />
        <label
          htmlFor="position"
          className="absolute -top-[15px] text-sm bg-white left-3 p-1">
          Position
        </label>

      </div>
      {formik.errors.position && formik.touched.position && (
        <div className="text-red-500 mb-5 mt-[-20px] text-sm">
          {formik.errors.position}
        </div>
      )}

        <div className="relative mb-6">
        <input
          type="number"
          id="salary"
          name="salary"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.salary}
          className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-[#635BFF] hover:border-[#635BFF] transition duration-300 ease-in-out outline-0"
        />
        <label
          htmlFor="salary"
          className="absolute -top-[15px] text-sm bg-white left-3 p-1">
          Salary
        </label>
        </div>
        {formik.errors.salary && formik.touched.salary && (
            <div className="text-red-500 mb-5 mt-[-20px] text-sm">
            {formik.errors.salary}
            </div>
        )}
        
        <div className="relative mb-6">
          <select
            id="status"
            name="status"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.status}
            className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-[#635BFF] hover:border-[#635BFF] transition duration-300 ease-in-out outline-0 appearance-none">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <label
            htmlFor="status"
            className="absolute -top-[15px] text-sm bg-white left-3 p-1"
          >
            Status
          </label>
        </div>
        {formik.errors.status && formik.touched.status && (
          <div className="text-red-500 mb-5 mt-[-20px] text-sm">
            {formik.errors.status}
          </div>
        )}
      <button type="submit" onClick={() => console.log("Submitting...")} className={`${id ? 'bg-yellow-400' : 'bg-[#635BFF]'} cursor-pointer py-2 mt-5 block rounded-lg text-white w-full`}>
        {id ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default EmployeeForm;
