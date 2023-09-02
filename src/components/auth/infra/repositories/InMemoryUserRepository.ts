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
    [
      "5a2e9460-63c6-4e72-8c3b-aca967c1587e",
      User.create(
        new Id("5a2e9460-63c6-4e72-8c3b-aca967c1587e"),
        new Username("pau2"),
        new Password("pau2"),
        new CreatedAt(new Date()),
      ),
    ],
  ]);

  async searchByUserName(username: Username): Promise<User | null> {
    return this.mapCacheUser.get(username.value) || null;
  }

  async exists(username: Username): Promise<boolean> {
    return !!this.mapCacheUser.get(username.value);
  }

  async existsById(id: Id): Promise<boolean> {
    return !!this.mapCacheUser.get(id.value);
  }

  async save(user: User): Promise<void> {
    this.mapCacheUser.set(user.getUsername().value, user);
  }

  async saveById(user: User): Promise<void> {
    this.mapCacheUser.set(user.getId().value, user);
  }

  async search(ids: Id[]): Promise<User[]> {
    const users: User[] = [];
    ids.forEach((id) => {
      const user = this.mapCacheUser.get(id.value);
      if (user) {
        users.push(user);
      }
    });

    return users;
  }

  async delete(id: Id): Promise<void> {
    this.mapCacheUser.delete(id.value);
  }
}
