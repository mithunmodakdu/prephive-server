import express from "express";
import { userRoutes } from "../modules/user/user.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes
  }
]

moduleRoutes.forEach(moduleRoute => {
  router.use(moduleRoute.path, moduleRoute.route)
})

export default router;