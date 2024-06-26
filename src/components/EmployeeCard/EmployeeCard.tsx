import { Link } from "react-router-dom";
import { EmployeeData } from "../../services/employee-services";
import styles from "./EmployeeCard.module.scss";

export interface EmployeeCardProps {
  employee: EmployeeData;
}

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  return (
    <article className={styles.card}>
      <span>
        <h3>
          {employee.firstName} {employee.middleName ?? null} {employee.lastName}
        </h3>
        <p>{employee.contractType} - 10yrs</p>
        <p>{employee.email}</p>
      </span>
      <span>
        <Link to={`${employee.id}`}>View</Link>
      </span>
    </article>
  );
};

export default EmployeeCard;
