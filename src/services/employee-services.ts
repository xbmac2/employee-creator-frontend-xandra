export interface EmployeeData {
  id: number;
  address: string;
  contractType: string; //change this to the or
  email: string;
  finishDate: string | null; // dates are strings not Dates?
  firstName: string;
  hoursPerWeek: number;
  lastName: string;
  middleName?: string | null;
  mobileNumber: string;
  startDate: string;
}

export const getAllEmployees = async (): Promise<EmployeeData[]> => {
  const response = await fetch("http://localhost:8080/employees");

  if (!response.ok) {
    throw new Error("Failed to get employees");
  }

  const data = await response.json();
  return data;
};

export const getEmployeeById = async (
  // employeeData: Partial<EmployeeData>
  employeeId: string
): Promise<EmployeeData> => {
  const response = await fetch(`http://localhost:8080/employees/${employeeId}`);

  if (!response.ok) {
    throw new Error("Failed to get employee");
  }

  const data = await response.json();
  return data;
};

export const deleteEmployeeById = async (
  employeeId: string
): Promise<number> => {
  const response = await fetch(
    `http://localhost:8080/employees/${employeeId}`,
    { method: "DELETE" }
  );

  if (!response.ok) {
    throw new Error("Failed to delete employee");
  }
  return response.status;
};

export const addNewEmployee = async (
  data: Partial<EmployeeData>
): Promise<EmployeeData> => {
  const response = await fetch("http://localhost:8080/employees", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create employee");
  }
  return response.json();
};

export const updateEmployee = async (
  data: Partial<EmployeeData>
): Promise<EmployeeData> => {
  const employeeId = data.id;
  const response = await fetch(
    `http://localhost:8080/employees/${employeeId}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update employee");
  }
  return response.json();
};
