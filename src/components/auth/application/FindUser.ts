import Id from "../domain/Id";
import User from "../domain/User";
import UserFinder from "../domain/UserFinder";

export default class FindUser {
  private userFinder: UserFinder;

  constructor(userFinder: UserFinder) {
    this.userFinder = userFinder;
  }

  async execute(id: string): Promise<User> {
    return this.userFinder.execute(new Id(id));
  }
}
