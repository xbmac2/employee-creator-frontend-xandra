import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  EmployeeData,
  deleteEmployeeById,
  getEmployeeById,
  updateEmployee,
} from "../../services/employee-services";
import styles from "./EmployeePage.module.scss";
import Header from "../../components/Header/Header";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";

const EmployeePage = () => {
  const pathVariables = useParams();
  const id = pathVariables.id;
  const [employee, setEmployee] = useState<EmployeeData | null>(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (id === undefined) {
      return;
    }
    getEmployeeById(id)
      .then((response) => {
        console.log(response);
        setEmployee(response);
      })
      .catch((e) => {
        console.log(e.message);
        setError(e.message);
      });
  }, []);

  const handleDelete = () => {
    if (id !== undefined)
      deleteEmployeeById(id).then((response) => {
        console.log(response);
        navigate("/");
      });
  };

  return (
    <main>
      <Header title="Employee Details" hasBackBtn={true} />
      {employee && (
        <section className={styles.button_row}>
          <button onClick={handleDelete}>Delete</button>
        </section>
      )}
      <section className={styles.list_section}>
        {error && <p className={styles.message}>{error}</p>}
        {employee && (
          <EmployeeForm
            employee={employee}
            setEmployee={setEmployee}
            btnText="Update"
            submitFunc={updateEmployee}
          />
        )}
      </section>
    </main>
  );
};

export default EmployeePage;
