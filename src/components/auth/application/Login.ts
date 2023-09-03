import User from "../domain/User";
import Username from "../domain/Username";
import Password from "../domain/Password";
import LoginSearcher from "../domain/LoginSearcher";
import UserAuthentication from "../domain/UserAuthenticator";
import UserNotFoundException from "../domain/UserNotFoundException";

export default class Login {
  private loginSearcher: LoginSearcher;
  private authenticator: UserAuthentication;

  constructor(loginSearcher: LoginSearcher, authenticator: UserAuthentication) {
    this.loginSearcher = loginSearcher;
    this.authenticator = authenticator;
  }

  async execute(username: string, password: string): Promise<User> {
    const user = await this.loginSearcher.execute(new Username(username));

    if (user === null) {
      throw new UserNotFoundException(username);
    }
    return await this.authenticator.execute(user, new Password(password));
  }
}
