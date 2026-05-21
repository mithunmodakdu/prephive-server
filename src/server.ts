import { Server } from "http";
import app from "./app";
import "dotenv/config";
import { error } from "console";

let server: Server;
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    server = app.listen(PORT, () => {
      console.log(`PrepHive Server is running on the port ${PORT}`)
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

process.on("SIGTERM", (error)=> {
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
