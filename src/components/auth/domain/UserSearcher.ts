import Id from "./Id";
import User from "./User";
import UserNotFoundException from "./UserNotFoundException";
import UserRepository from "./UserRepository";

export default class UserSearcher {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(id: Id): Promise<User | null> {
    const user = await this.userRepository.search([id]);
    if (user[0] === null) {
      throw new UserNotFoundException(id.value);
    }
    return user[0];
  }
}
