import Password from "./Password";
import PasswordNotMatchedException from "./PasswordNotMatchedException";
import TokenService from "./TokenService";
import User from "./User";

export default class UserAuthentication {
  private jwtService: TokenService;

  constructor(jwtService: TokenService) {
    this.jwtService = jwtService;
  }

  async execute(user: User, password: Password): Promise<User> {
    const isMatched = password.equals(user.getPassword());

    if (!isMatched) {
      throw new PasswordNotMatchedException(password.value);
    }

    const token = this.jwtService.sign({
      userId: user.getId().value,
      username: user.getUsername().value,
    });

    user.setToken(token);
    return user;
  }
}
