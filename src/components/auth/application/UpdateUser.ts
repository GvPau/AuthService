import Id from "../domain/Id";
import Password from "../domain/Password";
import User from "../domain/User";
import UserSearcher from "../domain/UserSearcher";
import UserUpdater from "../domain/UserUpdater";
import Username from "../domain/Username";

export default class UpdateUser {
  private userUpdater: UserUpdater;
  private userSearcher: UserSearcher;

  constructor(userUpdater: UserUpdater, userSearcher: UserSearcher) {
    this.userUpdater = userUpdater;
    this.userSearcher = userSearcher;
  }

  async execute(id: string, username: string, password: string): Promise<void> {
    const user = (await this.userSearcher.execute(new Id(id))) as User;
    const userUpdated = this.updateUserValues(user, username, password);

    await this.userUpdater.execute(
      User.update(
        userUpdated.getId(),
        userUpdated.getUsername(),
        userUpdated.getPassword(),
      ),
    );
  }

  private updateUserValues(user: User, username: string, password: string) {
    user.setUsername(new Username(username));
    user.setPassword(new Password(password));

    return user;
  }
}
