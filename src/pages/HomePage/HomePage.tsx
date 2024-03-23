import { useEffect, useState } from "react";
import EmployeesList from "../../containers/EmployeesList/EmployeesList";
import {
  EmployeeData,
  getAllEmployees,
} from "../../services/employee-services";
import styles from "./HomePage.module.scss";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [employees, setEmployees] = useState<EmployeeData[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllEmployees().then((response) => {
      console.log(response);
      setEmployees(response);
    });
  }, []);

  const handleAddEmployee = () => {
    navigate("/new-employee");
  };

  return (
    <main>
      <header className={styles.header}>
        <h1>Employees List</h1>
      </header>
      <div className={styles.button_row}>
        <button onClick={handleAddEmployee}>Add Employee</button>
      </div>

      <EmployeesList employees={employees} />
    </main>
  );
};

export default HomePage;
