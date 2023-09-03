import { Request, Response } from "express";
import BaseController from "../../../shared/infra/controllers/BaseController";
import UpdateUser from "../../../auth/application/UpdateUser";
import UserNotFoundException from "../../../auth/domain/UserNotFoundException";
import UserRepositoryNotWorkingException from "../../../auth/domain/UserRepositoryNotWorkingException";

export default class UpdateUserController extends BaseController {
  private useCase: UpdateUser;

  constructor(useCase: UpdateUser) {
    super();
    this.useCase = useCase;
  }

  async execute(req: Request, res: Response): Promise<any> {
    try {
      const { username, password } = req.body;
      const { id } = req.params;
      await this.useCase.execute(id, username, password);

      return this.ok(res);
    } catch (error: any) {
      const { message } = error;
      if (error instanceof UserNotFoundException) {
        this.clientError(res, message);
      }
      if (error instanceof UserRepositoryNotWorkingException) {
        this.serviceUnavailable(res, message);
      }
    }
  }
}
