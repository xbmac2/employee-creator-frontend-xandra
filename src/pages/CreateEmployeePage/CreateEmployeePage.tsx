import { Link } from "react-router-dom";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import styles from "./CreateEmployeePage.module.scss";

const CreateEmployeePage = () => {
  return (
    <main>
      <header className={styles.header}>
        <Link to="/">Back</Link>
        <h1>Create New Employee</h1>
      </header>

      <EmployeeForm />
    </main>
  );
};

export default CreateEmployeePage;
