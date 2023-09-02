import Id from "./Id";
import UserNotFoundException from "./UserNotFoundException";
import UserRepository from "./UserRepository";

export default class UserRemover {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(id: Id): Promise<void> {
    await this.guard(id);
    return await this.userRepository.delete(id);
  }

  private async guard(id: Id) {
    if (!(await this.userRepository.existsById(id))) {
      throw new UserNotFoundException(id.value);
    }
  }
}
