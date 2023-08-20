import { Router, Request, Response } from "express";
import container from "../DependencyContainer";
import LoginController from "../components/auth/infra/controllers/LoginController";

export const register = async (router: Router): Promise<void> => {
  const login: LoginController = (await container).get("Auth.controller.Login");
  router.post("/login", async (req: Request, res: Response) => {
    await login.execute(req, res);
  });
};
