import { Express, Router } from "express";
import { UserRepository, UserRepositoryImpl } from "./User.repository";
import { UserService, UserServiceImpl } from "./User.service";
import { UserController } from "./User.controller";
import { PrismaClient } from "@prisma/client";

export default (app: Express, prisma: PrismaClient) => {
  const userRepository: UserRepository = new UserRepositoryImpl(prisma);
  const userService: UserService = new UserServiceImpl(userRepository);
  const userController = new UserController(userService);
  const router = Router();

  router.get("/:id", async (req, resp) => {
    const result = await userController.getUser(req.params);
    resp.json(result);
  });
  router.get("/", async (_, resp) => {
    const result = await userController.getUserList();
    resp.json(result);
  });
  router.post("/", async (req, resp) => {
    const result = await userController.postUser(req.body);
    resp.setHeader("location", `/user/${result.id.toString()}`);
    resp.status(201).json({
      ...result,
      id: Number(result.id),
    });
  });
  router.put("/:id", async (req, resp) => {
    const result = await userController.putUser(req.params, req.body);
    resp.json(result);
  });
  router.delete("/:id", async (req, resp) => {
    const result = await userController.deleteUser(req.params);
    resp.status(204).json(result);
  });

  app.use("/user", router);
};
