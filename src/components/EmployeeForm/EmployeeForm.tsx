import { Controller, useForm } from "react-hook-form";
import styles from "./EmployeeForm.module.scss";
import { EmployeeData } from "../../services/employee-services";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
//import "react-phone-input-2/lib/semantic-ui.css";
//import "react-phone-input-2/lib/bootstrap.css";

export interface EmployeeFormProps {
  employee?: Partial<EmployeeData>;
  setEmployee?: (value: any) => unknown;
  btnText: string;
  submitFunc: (value: Partial<EmployeeData>) => unknown;
}

const EmployeeForm = ({
  employee,
  setEmployee,
  btnText,
  submitFunc,
}: EmployeeFormProps) => {
  const employeeSchema = z
    .object({
      id: z.number().optional(),
      firstName: z.string().min(1, "First name must be at least 1 character"),
      middleName: z.string().nullable(),
      lastName: z.string().min(1, "Last name must be at least 1 character"),
      email: z.string().email({ message: "Invalid email address" }),
      mobileNumber: z
        .string()
        .min(10, "Mobile number must be at least 10 characters"),
      address: z.string().min(1, "Please include an address"),
      contractType: z
        .string({ invalid_type_error: "Select contract type" })
        .min(1, "Contract type is required"),
      startDate: z.coerce.date(),
      finishDate: z.coerce.date().nullable().optional(),
      hoursPerWeek: z
        .number()
        .gt(0, "Hours per week must be greater than zero")
        .lte(168, "Too many hours"),
    })
    .superRefine(({ startDate, finishDate }, ctx) => {
      if (finishDate && finishDate < startDate) {
        ctx.addIssue({
          message: "Finish date cannot be earlier than start date",
          path: ["finishDate"],
          code: "custom",
        });
      }
    });

  const employeeDefaultValues = employee
    ? {
        id: employee.id,
        firstName: employee.firstName,
        middleName: employee.middleName,
        lastName: employee.lastName,
        email: employee.email,
        mobileNumber: employee.mobileNumber,
        address: employee.address,
        contractType: employee.contractType,
        startDate: employee.startDate
          ? employee.startDate.substring(0, 10)
          : "",
        hoursPerWeek: employee.hoursPerWeek,
        finishDate: employee.finishDate
          ? employee.finishDate.substring(0, 10)
          : "",
      }
    : {
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
      };

  const {
    register,
    control,
    handleSubmit,
    watch,
    unregister,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: employeeDefaultValues,
  });

  console.log(errors, "errors");

  const nullifyEmptyFields = (
    data: Partial<EmployeeData>
  ): Partial<EmployeeData> => {
    Object.keys(data).forEach((key) => {
      if (data[key] === "") {
        data[key] = null;
      }
    });

    return data;
  };

  const navigate = useNavigate();
  //conditional rendering by watching radio buttons
  const type = watch("contractType");

  const submitEmployeeForm = (data: Partial<EmployeeData>) => {
    const cleanedData = nullifyEmptyFields(data);
    console.log(cleanedData);
    submitFunc(cleanedData)
      .then((response: EmployeeData) => {
        console.log(response);
        if (setEmployee) {
          setEmployee(response);
        }
        navigate(`/employee/${response.id}`);
        toast.success("Success");
      })
      .catch((e) => {
        console.log(e.message);
        toast.error(e.message);
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitEmployeeForm)}>
      <h2>Personal Information</h2>
      <div>
        <label htmlFor="firstNameInput">First name</label>
        <input type="text" id="firstNameInput" {...register("firstName")} />
        {errors.firstName && (
          <small className={styles.error}>{errors.firstName.message}</small>
        )}
      </div>
      <div>
        <label htmlFor="middleNameInput">Middle name</label>
        <input type="text" id="middleNameInput" {...register("middleName")} />
      </div>
      <div>
        <label htmlFor="lastNameInput">Last name</label>
        <input type="text" id="lastNameInput" {...register("lastName")} />
        {errors.lastName && (
          <small className={styles.error}>{errors.lastName.message}</small>
        )}
      </div>
      <h2>Contact details</h2>
      <div>
        <label htmlFor="emailInput">Email</label>
        <input type="text" id="emailInput" {...register("email")} />
        {errors.email && (
          <small className={styles.error}>{errors.email.message}</small>
        )}
      </div>
      <div>
        <label>Mobile number</label>
        {/* <input type="text" />
        <PhoneInput country="au" disableDropdown disableCountryCode /> */}
        <Controller
          control={control}
          name="mobileNumber"
          rules={{ required: true }}
          render={({ field: { ref, ...field } }) => (
            <PhoneInput
              {...field}
              inputProps={{
                ref,
                required: true,
              }}
              country={"au"}
              specialLabel={""}
              value={employee ? employee.mobileNumber : null}
              placeholder=""
              disableDropdown
              onlyCountries={["au"]}
              disableCountryCode={true}
            />
          )}
        />
        {errors.mobileNumber && (
          <small className={styles.error}>{errors.mobileNumber.message}</small>
        )}
      </div>
      <div>
        <label>Residential Address</label>
        <input type="text" {...register("address")} />
        {errors.address && (
          <small className={styles.error}>{errors.address.message}</small>
        )}
      </div>
      <h2>Employee Status</h2>
      <div>
        <label>Type:</label>
        <span>
          <input
            type="radio"
            id="permanent"
            value="PERMANENT"
            {...register("contractType")}
            onClick={() => unregister("finishDate")}
          ></input>
          <label htmlFor="permanent">Permanent</label>
        </span>
        <span>
          <input
            type="radio"
            id="contract"
            value="CONTRACT"
            {...register("contractType", { required: true })}
          ></input>
          <label htmlFor="contract">Contract</label>
        </span>

        {errors.contractType && (
          <small className={styles.error}>{errors.contractType.message}</small>
        )}
      </div>

      <div>
        <label>Start date:</label>{" "}
        <input type="date" {...register("startDate")} />
        {errors.startDate && (
          <small className={styles.error}>{errors.startDate.message}</small>
        )}
      </div>

      {type === "CONTRACT" && (
        <div>
          <label>Finish date:</label>{" "}
          <input type="date" {...register("finishDate")} />
          {errors.finishDate && (
            <small className={styles.error}>{errors.finishDate.message}</small>
          )}
        </div>
      )}

      <div>
        <label htmlFor="hoursPerWeekInput">Hours per week:</label>{" "}
        <input
          type="number"
          min="0"
          id="hoursPerWeekInput"
          {...register("hoursPerWeek", { valueAsNumber: true })}
        />
        {errors.hoursPerWeek && (
          <small className={styles.error}>{errors.hoursPerWeek.message}</small>
        )}
      </div>

      <div>
        <button>{btnText}</button>
      </div>
    </form>
  );
};

export default EmployeeForm;
