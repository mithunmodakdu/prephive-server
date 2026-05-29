export interface ICreateStudentPayload {
  password: string;
  student: {
    email: string;
    name: string;
    profilePhoto?: string;
    address?: string;
  };
}

