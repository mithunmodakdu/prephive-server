
export interface ISubject {
  id: string;
  name: string;
  code?: string | null;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateSubjectInput {
  name: string;
  code?: string;
  description?: string;
}


