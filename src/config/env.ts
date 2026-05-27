import dotenv from "dotenv";

dotenv.config();

interface IEnvVars {
  PORT: string;
  NODE_ENV: "development" | "production";
}

const loadEnvVars = (): IEnvVars => {

  const requiredEnvVars: string[] = ["PORT", "NODE_ENV"];

  requiredEnvVars.forEach((key) => {
    if(!process.env[key]){
      throw new Error(`${key} is missing in required env variables.`)
    }
  })

  return {
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
  }
}

export const envVars = loadEnvVars();
