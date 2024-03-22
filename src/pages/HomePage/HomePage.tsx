import { useEffect, useState } from "react";
import EmployeesList from "../../containers/EmployeesList/EmployeesList";
import {
  EmployeeData,
  getAllEmployees,
} from "../../services/employee-services";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  const [employees, setEmployees] = useState<EmployeeData[] | null>(null);

  useEffect(() => {
    getAllEmployees().then((response) => {
      console.log(response);
      setEmployees(response);
    });
  }, []);

  return (
    <main>
      <header className={styles.header}>
        <h1>Employees List</h1>
      </header>

      <EmployeesList employees={employees} />
    </main>
  );
};

export default HomePage;
