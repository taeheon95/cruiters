import { Express, Router } from "express";
import { UserRepositoryImpl } from "./User.repository";
import { UserServiceImpl } from "./User.service";
import { UserController } from "./User.controller";
import { PrismaClient } from "@prisma/client";

function userModule(app: Express, prisma: PrismaClient) {
  const userRepository = new UserRepositoryImpl(prisma);
  const userService = new UserServiceImpl(userRepository);
  const userController = new UserController(userService);

  const router = Router();
  router.use((res, req, next) => {});
  router.get("/:id", userController.getUser);
  router.get("/", userController.getUserList);
  router.post("/", userController.postUser);
  router.put("/:id", userController.putUser);
  router.delete("/:id", userController.deleteUser);

  app.use("/user", router);
}

export default userModule;
