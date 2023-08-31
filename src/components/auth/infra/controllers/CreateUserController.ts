import { Request, Response } from "express";
import BaseController from "../../../shared/infra/controllers/BaseController";
import UserAlreadyExistException from "../../domain/UserAlreadyExistException";
import UserRepositoryNotWorkingException from "../../domain/UserRepositoryNotWorkingException";
import Uuid from "../../../shared/domain/Uuid";
import CreateUser from "../../application/CreateUser";

export default class CreateUserController extends BaseController {
  private useCase: CreateUser;

  constructor(useCase: CreateUser) {
    super();
    this.useCase = useCase;
  }

  async execute(req: Request, res: Response): Promise<any> {
    try {
      const { name, password } = req.body;
      await this.useCase.execute(Uuid.random().toString(), name, password);

      return this.created(res);
    } catch (error: any) {
      const { message } = error;
      if (error instanceof UserAlreadyExistException) {
        return this.conflict(res, message);
      }
      if (error instanceof UserRepositoryNotWorkingException) {
        return this.serviceUnavailable(res, message);
      }
    }
  }
}
