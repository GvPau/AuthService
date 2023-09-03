import User from "./User";
import UserNotFoundException from "./UserNotFoundException";
import UserRepository from "./UserRepository";
import Username from "./Username";

export default class LoginSearcher {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(username: Username): Promise<User | null> {
    const user = await this.userRepository.searchByUserName(username);
    if (user === null) {
      throw new UserNotFoundException(username.value);
    }
    return user;
  }
}
