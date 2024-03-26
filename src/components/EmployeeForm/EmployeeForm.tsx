import { useForm } from "react-hook-form";
import styles from "./EmployeeForm.module.scss";
import { EmployeeData, addNewEmployee } from "../../services/employee-services";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const EmployeeForm = () => {
  //employee schema
  const employeeSchema = z.object({
    firstName: z.string().min(1, "First name must be at least 1 character"),
    middleName: z.string().nullable(), //.optional(),
    lastName: z.string().min(1, "Last name must be at least 1 character"),
    email: z.string().email({ message: "Invalid email address" }),
    mobileNumber: z
      .string()
      .min(10, "Mobile number must be at least 10 characters"),
    address: z.string().min(1, "Please include an address"),
    contractType: z.string().min(1, "invalid contract type"),
    startDate: z.string(), //.datetime({ offset: false }),
    endDate: z.string().optional(),
    hoursPerWeek: z.number().gt(0, "Hours per week must be greater than zero"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: "",
      middleName: null,
      lastName: "",
      email: "",
      mobileNumber: "",
      address: "",
      contractType: "",
      startDate: "",
      hoursPerWeek: 0,
      finishDate: "",
    },
  });

  console.log(errors, "errors");

  const removeEmptyFields = (
    data: Partial<EmployeeData>
  ): Partial<EmployeeData> => {
    Object.keys(data).forEach((key) => {
      if (data[key] === "") delete data[key];
    });
    return data;
  };

  const navigate = useNavigate();

  //data should be type EmployeeData from interface
  const submitEmployeeForm = (data: Partial<EmployeeData>) => {
    reset();
    const cleanedData = removeEmptyFields(data);
    console.log(cleanedData);
    addNewEmployee(data)
      .then((response) => {
        console.log(response);
        navigate(`/${response.id}`);
      })
      .catch((e) => console.log(e.message));
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(submitEmployeeForm)}>
      <h2>Personal Information</h2>
      <div>
        <label htmlFor="firstNameInput">First name</label>
        <input type="text" id="firstNameInput" {...register("firstName")} />
      </div>
      <div>
        <label htmlFor="middleNameInput">Middle name</label>
        <input type="text" id="middleNameInput" {...register("middleName")} />
      </div>
      <div>
        <label htmlFor="lastNameInput">Last name</label>
        <input type="text" id="lastNameInput" {...register("lastName")} />
      </div>
      <h2>Contact details</h2>
      <div>
        <label htmlFor="emailInput">Email</label>
        <input type="text" id="emailInput" {...register("email")} />
      </div>
      <div>
        <label>Mobile number</label>
        <input type="text" {...register("mobileNumber")} />
      </div>
      <div>
        <label>Residential Address</label>
        <input type="text" {...register("address")} />
      </div>
      <h2>Employee Status</h2>
      <div>
        <label>Type:</label>
        <span>
          <input
            type="radio"
            id="permanent"
            //name="contract_type"
            value="PERMANENT"
            {...register("contractType")}
          ></input>
          <label htmlFor="permanent">Permanent</label>
        </span>
        <span>
          <input
            type="radio"
            id="contract"
            //name="contract_type"
            value="CONTRACT"
            {...register("contractType", { required: true })}
          ></input>
          <label htmlFor="contract">Contract</label>
        </span>
        {/* <input type="text" /> */}
      </div>

      <div>
        <label>Start date:</label>{" "}
        <input type="date" {...register("startDate")} />
      </div>

      <div>
        <label>Finish date:</label>{" "}
        <input type="date" {...register("finishDate")} />
      </div>

      <div>
        {/* max is 168 */}
        <label htmlFor="hoursPerWeekInput">Hours per week:</label>{" "}
        <input
          type="number"
          min="0"
          id="hoursPerWeekInput"
          {...register("hoursPerWeek", { valueAsNumber: true })}
        />
      </div>

      <div>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default EmployeeForm;
