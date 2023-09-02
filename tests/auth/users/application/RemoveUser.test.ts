import UserMother from "../domain/UserMother";
import InMemoryUserRepository from "../../../../src/components/auth/infra/repositories/InMemoryUserRepository";
import UserRemover from "../../../../src/components/auth/domain/UserRemover";
import RemoveUser from "../../../../src/components/auth/application/RemoveUser";
import UserNotFoundException from "../../../../src/components/auth/domain/UserNotFoundException";

describe("Remove User", () => {
  it("should remove a user", async () => {
    // Arrange
    const user = UserMother.random();
    const userRepository = new InMemoryUserRepository();
    userRepository.saveById(user);
    const userRemover = new UserRemover(userRepository);
    const userRemoverSpy = jest.spyOn(userRemover, "execute");
    const removeUser = new RemoveUser(userRemover);

    // Act
    await removeUser.execute(user.getId().value);

    // Assert
    expect(userRemoverSpy).toHaveBeenCalled();
  });

  it("should throw an expection when user is not found", () => {
    // Arrange
    const userRepository = new InMemoryUserRepository();
    const userRemover = new UserRemover(userRepository);

    const removeUser = new RemoveUser(userRemover);

    // Act
    const exepctWrapper = expect(async () => {
      await removeUser.execute("f5cc5afc-e95d-407d-b86f-21f1bb89451d");
    }).rejects;

    // Assert
    exepctWrapper.toThrow(UserNotFoundException);
  });
});
