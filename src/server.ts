/* eslint-disable no-console */
import { Server } from "http";
import app from "./app";
import "dotenv/config";
import { envVars } from "./config/env";


let server: Server;

const startServer = async () => {
  try {
    server = app.listen(envVars.PORT, () => {
      console.log(`PrepHive Server is running on the port ${envVars.PORT}`)
    });
  } catch (error) {
    console.log(error)
  }
};

startServer();

process.on("unhandledRejection", (error) => {
  console.log("Unhandled rejection error detected. Server is shutting down...", error);

  if(server){
    server.close(() => {
      process.exit(1);
    })

  }else{
    process.exit(1);
  }

})

process.on("uncaughtException", (error) => {
  console.log("Uncaught exception occurred. Server is shutting down...", error);

  if(server){
    server.close(() => {
      process.exit(1);
    })
  }else{
    process.exit(1);
  }
})

process.on("SIGTERM", ()=> {
  console.log("SIGTERM signal received. Server is shutting down...");
  
  if(server){
    server.close(() => {
      process.exit(1);
    })
  }else{
    process.exit(1);
  }
})

process.on("SIGINT", () => {
  console.log("SIGINT signal received. Server is shutting down... ");

  if(server){
    server.close(() => {
      process.exit(1);
    })
  }else{
    process.exit(1);
  }
})
