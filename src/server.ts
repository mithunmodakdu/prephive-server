import { Server } from "http";
import app from "./app";
import "dotenv/config";

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
