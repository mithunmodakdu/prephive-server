import dotenv from "dotenv";

dotenv.config();

interface IEnvVars {
  PORT: string;
  NODE_ENV: "development" | "production";
  DATABASE_URL: string;
  BCRYPT_SALT_ROUND: string;
}

const loadEnvVars = (): IEnvVars => {

  const requiredEnvVars: string[] = ["PORT", "NODE_ENV", "DATABASE_URL", "BCRYPT_SALT_ROUND"];

  requiredEnvVars.forEach((key) => {
    if(!process.env[key]){
      throw new Error(`${key} is missing in required env variables.`)
    }
  })

  return {
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    DATABASE_URL: process.env.DATABASE_URL as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string
  }
}

export const envVars = loadEnvVars();
