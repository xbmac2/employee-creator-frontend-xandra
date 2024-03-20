// write interface of Employee entity instead of any
export const getAllEmployees = async (): Promise<any> => {
  const response = await fetch("http://localhost:8080/employees");

  if (!response.ok) {
    throw new Error("Failed to get employees");
  }

  const data = await response.json();
  return data;
};
