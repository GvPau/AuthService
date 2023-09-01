import { Request, Response } from "express";
import BaseController from "../../../shared/infra/controllers/BaseController";
import UserRepositoryNotWorkingException from "../../domain/UserRepositoryNotWorkingException";
import FindUser from "../../application/FindUser";
import UserNotFoundException from "../../domain/UserNotFoundException";
import UuidNotValidException from "../../../shared/domain/UuidNotValidException";
import UserJsonConverter from "../services/UserJsonConverter";

export default class FindUserController extends BaseController {
  private useCase: FindUser;

  constructor(useCase: FindUser) {
    super();
    this.useCase = useCase;
  }

  async execute(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const user = await this.useCase.execute(id);

      return this.ok(res, UserJsonConverter.transformSingle(user));
    } catch (error: any) {
      const message = error.message;
      if (error instanceof UserRepositoryNotWorkingException) {
        return this.serviceUnavailable(res, message);
      }
      if (error instanceof UserNotFoundException) {
        return this.notFound(res, message);
      }
      if (error instanceof UuidNotValidException) {
        return this.clientError(res, message);
      }
      return this.fail(res, message);
    }
  }
}
