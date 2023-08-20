import { Request, Response } from "express";
import BaseController from "../../../shared/infra/controllers/BaseController";
import Login from "../../application/Login";

export default class LoginController extends BaseController {
  private useCase: Login;

  constructor(useCase: Login) {
    super();
    this.useCase = useCase;
  }

  async execute(req: Request, res: Response): Promise<any> {
    try {
      const { name, password } = req.body;
      const user = await this.useCase.execute(name, password);

      return this.ok(res, {
        token: user.getToken().value,
      });
    } catch (error: any) {
      const { message } = error;
      return this.fail(res, message);
    }
  }
}
