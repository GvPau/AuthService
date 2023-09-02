import { Request, Response } from "express";

import RemoveUser from "../../../auth/application/RemoveUser";
import UserNotFoundException from "../../../auth/domain/UserNotFoundException";
import BaseController from "../../../shared/infra/controllers/BaseController";
import UserRepositoryNotWorkingException from "../../../auth/domain/UserRepositoryNotWorkingException";
import UuidNotValidException from "../../../shared/domain/UuidNotValidException";

export default class RemoveUserController extends BaseController {
  private useCase: RemoveUser;

  constructor(useCase: RemoveUser) {
    super();
    this.useCase = useCase;
  }

  async execute(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      await this.useCase.execute(id);

      return this.ok(res);
    } catch (error: any) {
      const { message } = error;
      if (error instanceof UserNotFoundException) {
        return this.notFound(res, message);
      }
      if (error instanceof UserRepositoryNotWorkingException) {
        return this.serviceUnavailable(res, message);
      }
      if (error instanceof UuidNotValidException) {
        return this.clientError(res, message);
      }

      return this.fail(res, message);
    }
  }
}
