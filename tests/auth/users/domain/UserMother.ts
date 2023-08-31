import CreatedAt from "../../../../src/components/auth/domain/CreatedAt";
import Id from "../../../../src/components/auth/domain/Id";
import Password from "../../../../src/components/auth/domain/Password";
import User from "../../../../src/components/auth/domain/User";
import Username from "../../../../src/components/auth/domain/Username";
import Uuid from "../../../../src/components/shared/domain/Uuid";

export default class UserMother {
  static random(): User {
    return User.create(
      new Id(Uuid.random().value),
      new Username("RandomName"),
      new Password("RandomPassword"),
      new CreatedAt(new Date()),
    );
  }
}
