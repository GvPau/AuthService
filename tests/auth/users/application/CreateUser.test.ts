import InMemoryUserRepository from "../../../../src/components/auth/infra/repositories/InMemoryUserRepository";
import UserMother from "../domain/UserMother";
import UserCreator from "../../../../src/components/auth/domain/UserCreator";
import CreateUser from "../../../../src/components/auth/application/CreateUser";

describe("Create Template", () => {
  it("should create a user", async () => {
    // Arrange
    const user = UserMother.random();
    const userRepository = new InMemoryUserRepository();
    const userCreator = new UserCreator(userRepository);
    const userCreatorSpy = jest.spyOn(userCreator, "execute");

    const createUser = new CreateUser(userCreator);

    // Act
    await createUser.execute(
      user.getId().value,
      user.getUsername().value,
      user.getPassword().value,
    );

    // Asset
    expect(userCreatorSpy).toHaveBeenCalled();
  });
});
