import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEmployee } from "../../redux/reducers/employeeSlice";
import EmployeeForm from "../employeeForm";

export default function EditEmployee() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((store) => store.employee);

  useEffect(() => {
    if(id){
        dispatch(getEmployee(id));
    }
  }, []);

  if (error) return <h2>{error}</h2>;
  if (loading) return <h2>loading...</h2>;

  return (
    <div>
      {data && Object.keys(data).length > 0 ? (
        <EmployeeForm id={id} employee={data} />
      ) : (
        <EmployeeForm />
      )}
    </div>
  );
}
