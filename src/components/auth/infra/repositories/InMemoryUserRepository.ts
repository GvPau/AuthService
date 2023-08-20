import CreatedAt from "../../domain/CreatedAt";
import Id from "../../domain/Id";
import Password from "../../domain/Password";
import User from "../../domain/User";
import UserRepository from "../../domain/UserRepository";
import Username from "../../domain/Username";

export default class InMemoryUserRepository implements UserRepository {
  private mapCacheUser = new Map<string, User>([
    [
      "pau",
      User.create(
        new Id("4a2e9460-63c6-4e72-8c3b-aca967c1587e"),
        new Username("pau"),
        new Password("pau"),
        new CreatedAt(new Date()),
      ),
    ],
  ]);

  async searchByUserName(username: Username): Promise<User | null> {
    return this.mapCacheUser.get(username.value) || null;
  }
}
