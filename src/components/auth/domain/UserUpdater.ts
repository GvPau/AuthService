import Id from "./Id";
import User from "./User";
import UserNotFoundException from "./UserNotFoundException";
import UserRepository from "./UserRepository";

export default class UserUpdater {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(user: User): Promise<void> {
    this.guard(user.getId());
    await this.userRepository.update(user);
  }

  private async guard(id: Id) {
    const user = this.userRepository.search([id]);
    if (!user) {
      throw new UserNotFoundException(id.value);
    }
  }
}
