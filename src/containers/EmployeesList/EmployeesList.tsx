import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import { EmployeeData } from "../../services/employee-services";
import styles from "./EmployeesList.module.scss";

export interface EmployeesListProps {
  employees: EmployeeData[] | null;
}

const EmployeesList = ({ employees }: EmployeesListProps) => {
  return (
    <section className={styles.list}>
      {employees ? (
        employees.map((employee) => {
          return <EmployeeCard key={employee.id} employee={employee} />;
        })
      ) : (
        <p>Could not load employees</p>
      )}
    </section>
  );
};

export default EmployeesList;
