import { useForm } from "react-hook-form";
import styles from "./EmployeeForm.module.scss";

const EmployeeForm = () => {
  const { register, handleSubmit, reset } = useForm();

  //data should be type EmployeeData from interface
  const submitEmployeeForm = (data) => {
    reset();
    console.log(data);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(submitEmployeeForm)}>
      <h2>Personal Information</h2>
      <div>
        <label htmlFor="firstNameInput">First name</label>
        <input type="text" {...register("firstName")} />
      </div>
      <div>
        <label htmlFor="middleNameInput">Middle name</label>
        <input type="text" {...register("middleName")} />
      </div>
      <div>
        <label htmlFor="lastName">Last name</label>
        <input type="text" {...register("lastName")} />
      </div>
      <h2>Contact details</h2>
      <div>
        <label htmlFor="emailInput">Email</label>
        <input type="text" {...register("email")} />
      </div>
      <div>
        <label>Mobile number</label>
        <input type="text" />
      </div>
      <div>
        <label>Residential Address</label>
        <input type="text" />
      </div>
      <h2>Employee Status</h2>
      <div>
        <label>Type:</label> <input type="text" />
      </div>
      <div>
        <label>Start date:</label> <input type="text" />
      </div>

      <div>
        <label>Finish date:</label> <input type="text" />
      </div>

      <div>
        <label>Hours per week:</label> <input type="text" />
      </div>

      <div>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default EmployeeForm;
