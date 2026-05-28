import dotenv from "dotenv";

dotenv.config();

interface IEnvVars {
  PORT: string;
  NODE_ENV: "development" | "production";
  DATABASE_URL: string;
  BCRYPT_SALT_ROUND: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
}

const loadEnvVars = (): IEnvVars => {

  const requiredEnvVars: string[] = ["PORT", "NODE_ENV", "DATABASE_URL", "BCRYPT_SALT_ROUND", "CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"];

  requiredEnvVars.forEach((key) => {
    if(!process.env[key]){
      throw new Error(`${key} is missing in required env variables.`)
    }
  })

  return {
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    DATABASE_URL: process.env.DATABASE_URL as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
  }
}

export const envVars = loadEnvVars();
