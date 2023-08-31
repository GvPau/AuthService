import CreatedAt from "../domain/CreatedAt";
import Id from "../domain/Id";
import Password from "../domain/Password";
import User from "../domain/User";
import UserCreator from "../domain/UserCreator";
import Username from "../domain/Username";

export default class CreateUser {
  private userCreator: UserCreator;

  constructor(userCreator: UserCreator) {
    this.userCreator = userCreator;
  }

  async execute(id: string, username: string, password: string): Promise<void> {
    return await this.userCreator.execute(
      User.create(
        new Id(id),
        new Username(username),
        new Password(password),
        new CreatedAt(new Date()),
      ),
    );
  }
}
