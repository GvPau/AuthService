import Id from "../domain/Id";
import UserRemover from "../domain/UserRemover";

export default class RemoveUser {
  private userRemover: UserRemover;

  constructor(userRemover: UserRemover) {
    this.userRemover = userRemover;
  }

  async execute(id: string): Promise<void> {
    return await this.userRemover.execute(new Id(id));
  }
}
