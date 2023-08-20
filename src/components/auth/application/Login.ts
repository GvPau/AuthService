import Password from "../domain/Password";
import UserAuthentication from "../domain/UserAuthenticator";
import UserNotFoundException from "../domain/UserNotFoundException";
import UserSearcher from "../domain/UserSearcher";
import Username from "../domain/Username";

export default class Login {
  private searcher: UserSearcher;
  private authenticator: UserAuthentication;

  constructor(searcher: UserSearcher, authenticator: UserAuthentication) {
    this.searcher = searcher;
    this.authenticator = authenticator;
  }

  async execute(username: string, password: string) {
    const user = await this.searcher.execute(new Username(username));

    if (user === null) {
      throw new UserNotFoundException(username);
    }
    return await this.authenticator.execute(user, new Password(password));
  }
}
