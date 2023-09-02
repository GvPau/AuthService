import { Router, Request, Response } from "express";
import container from "../DependencyContainer";
import LoginController from "../components/auth/infra/controllers/LoginController";
import CreateUserController from "../components/auth/infra/controllers/CreateUserController";
import FindUserController from "../components/auth/infra/controllers/FindUserController";
import RemoveUserController from "../components/auth/infra/controllers/RemoveUserController";

export const register = async (router: Router): Promise<void> => {
  // Login
  const login: LoginController = (await container).get("Auth.controller.Login");
  router.post("/login", async (req: Request, res: Response) => {
    await login.execute(req, res);
  });

  // User Creation
  const createUser: CreateUserController = (await container).get(
    "Auth.controller.CreateUser",
  );
  router.post("/users", async (req: Request, res: Response) => {
    await createUser.execute(req, res);
  });

  // User Finder
  const findUser: FindUserController = (await container).get("Auth.controller.FindUser");
  router.get("/users/:id", async (req: Request, res: Response) => {
    await findUser.execute(req, res);
  });

  // User Remover
  const removeUser: RemoveUserController = (await container).get(
    "Auth.controller.RemoveUser",
  );
  router.delete("/users/:id", async (req: Request, res: Response) => {
    await removeUser.execute(req, res);
  });
};
