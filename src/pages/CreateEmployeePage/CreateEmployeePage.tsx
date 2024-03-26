import { Link } from "react-router-dom";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import styles from "./CreateEmployeePage.module.scss";
import Header from "../../components/Header/Header";

const CreateEmployeePage = () => {
  return (
    <main>
      <Header title="Create New Employee" hasBackBtn={true} />

      <EmployeeForm />
    </main>
  );
};

export default CreateEmployeePage;
