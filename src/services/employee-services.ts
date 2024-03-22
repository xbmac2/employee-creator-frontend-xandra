export interface EmployeeData {
  id: number;
  address: string;
  contractType: string; //change this to the or
  email: string;
  finishDate: string | null; // dates are strings not Dates?
  firstName: string;
  hoursPerWeek: number;
  isOngoing: boolean;
  lastName: string;
  middleName: string | null;
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
