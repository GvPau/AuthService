import { Router, Request, Response } from "express";
import container from "../DependencyContainer";
import LoginController from "../components/auth/infra/controllers/LoginController";
import CreateUserController from "../components/auth/infra/controllers/CreateUserController";

export const register = async (router: Router): Promise<void> => {
  const login: LoginController = (await container).get("Auth.controller.Login");
  router.post("/login", async (req: Request, res: Response) => {
    await login.execute(req, res);
  });

  const createUser: CreateUserController = (await container).get(
    "Auth.controller.CreateUser",
  );
  router.post("/users", async (req: Request, res: Response) => {
    await createUser.execute(req, res);
  });
};
