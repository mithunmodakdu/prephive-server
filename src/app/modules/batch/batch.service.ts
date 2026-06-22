import { IBatch } from "./batch.interface"

const createBatch = async(payload: Partial<IBatch>) => {
  console.log(payload)
}

export const BatchServices ={
  createBatch
}