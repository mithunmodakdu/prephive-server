export interface ICreateStudentPayload {
  password: string;
  student: {
    email: string;
    name: string;
    address?: string;
  };
}