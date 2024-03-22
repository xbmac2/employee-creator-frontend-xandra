import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import { EmployeeData } from "../../services/employee-services";

export interface EmployeesListProps {
  employees: EmployeeData[] | null;
}

const EmployeesList = ({ employees }: EmployeesListProps) => {
  return (
    <section>
      {employees &&
        employees.map((employee) => {
          return <EmployeeCard key={employee.id} employee={employee} />;
        })}
    </section>
  );
};

export default EmployeesList;
