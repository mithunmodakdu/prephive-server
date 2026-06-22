import express from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { scheduleRoutes } from "../modules/schedule/schedule.route";
import { batchRoutes } from "../modules/batch/batch.routes";
import { subjectRoutes } from "../modules/subject/subject.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes
  },
  {
    path: "/auth",
    route: authRoutes
  },
  {
    path: "/schedules",
    route: scheduleRoutes
  },
  {
    path: "/batches",
    route: batchRoutes
  },
  {
    path: "/subjects",
    route: subjectRoutes
  }
]

moduleRoutes.forEach(moduleRoute => {
  router.use(moduleRoute.path, moduleRoute.route)
})

export default router;