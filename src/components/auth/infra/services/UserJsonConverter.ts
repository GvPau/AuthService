import User from "../../domain/User";

interface UserJSON {
  id: string;
  username: string;
  createdAt: Date;
}

export default class UserJsonConverter {
  static transformSingle(user: User): UserJSON {
    return this.createTagValues(user);
  }

  static transformMultiples(users: User[]): UserJSON[] {
    return users.map((user) => this.createTagValues(user));
  }

  private static createTagValues(user: User): UserJSON {
    return {
      id: user.getId().value,
      username: user.getUsername().value,
      createdAt: user.getCreatedAt().value,
    };
  }
}
