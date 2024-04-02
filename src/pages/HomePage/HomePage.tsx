import { useEffect, useState } from "react";
import EmployeesList from "../../containers/EmployeesList/EmployeesList";
import {
  EmployeeData,
  getAllEmployees,
} from "../../services/employee-services";
import styles from "./HomePage.module.scss";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { toast } from "react-toastify";

const HomePage = () => {
  const [employees, setEmployees] = useState<EmployeeData[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllEmployees()
      .then((response) => {
        setEmployees(response);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  }, []);

  const handleAddEmployee = () => {
    navigate("/new-employee");
  };

  return (
    <main>
      <Header title="Employees List" hasBackBtn={false} />
      <div className={styles.button_row}>
        <button onClick={handleAddEmployee}>Add Employee</button>
      </div>
      <div>
        <EmployeesList employees={employees} />
      </div>
    </main>
  );
};

export default HomePage;
