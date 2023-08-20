import User from "./User";
import UserAlreadyExistException from "./UserAlreadyExistException";
import UserRepository from "./UserRepository";
import Username from "./Username";

export default class UserCreator {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(user: User): Promise<void> {
    await this.guard(user.getUsername());
    await this.userRepository.save(user);
  }

  private async guard(username: Username) {
    if (await this.userRepository.exists(username)) {
      throw new UserAlreadyExistException(username.value);
    }
  }
}
