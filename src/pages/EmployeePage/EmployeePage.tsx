import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  EmployeeData,
  getEmployeeById,
} from "../../services/employee-services";
import styles from "./EmployeePage.module.scss";

const EmployeePage = () => {
  const pathVariables = useParams();
  const id = pathVariables.id;
  const [employee, setEmployee] = useState<EmployeeData | null>(null);

  useEffect(() => {
    if (id === undefined) {
      return;
    }
    getEmployeeById(id).then((response) => {
      console.log(response);
      setEmployee(response);
    });
  }, []);

  return (
    <main>
      <header className={styles.header}>
        <Link to="/">Back</Link>
        <h1>Employee Details</h1>
      </header>
      <section className={styles.button_row}>
        <button>Edit</button>
        <button>Delete</button>
      </section>
      <section className={styles.profile}>
        <h2>Personal Information</h2>
        <h3>First name</h3>
        <p>{employee?.firstName}</p>
        {employee?.middleName && (
          <>
            <h3>Middle name</h3>
            <p>{employee?.middleName}</p>
          </>
        )}
        <h3>Last name</h3>
        <p>{employee?.lastName}</p>
        <h2>Contact details</h2>
        <h3>Email</h3>
        <p>{employee?.email}</p>
        <h3>Mobile number</h3>
        <p>{employee?.mobileNumber}</p>
        <h3>Residential Address</h3>
        <p>{employee?.address}</p>
        <h2>Employee Status</h2>
        <h3>Type:</h3> <p>{employee?.contractType}</p>
        <h3>Start date:</h3> <p>{employee?.startDate}</p>
        {employee?.finishDate && (
          <>
            <h3>Finish date:</h3> <p>{employee?.finishDate}</p>
          </>
        )}
        <h3>Hours per week:</h3> <p>{employee?.hoursPerWeek}</p>
      </section>
    </main>
  );
};

export default EmployeePage;
