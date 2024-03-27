import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import Header from "../../components/Header/Header";
import { addNewEmployee } from "../../services/employee-services";

const CreateEmployeePage = () => {
  return (
    <main>
      <Header title="Create New Employee" hasBackBtn={true} />

      <EmployeeForm btnText="Submit" submitFunc={addNewEmployee} />
    </main>
  );
};

export default CreateEmployeePage;
