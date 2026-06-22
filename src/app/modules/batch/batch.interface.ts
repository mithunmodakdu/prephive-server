export interface IBatch {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface ICreateBatchPayload {
  name: string;
  description: string;
}

