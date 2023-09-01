import UserFinder from "../../../../src/components/auth/domain/UserFinder";
import InMemoryUserRepository from "../../../../src/components/auth/infra/repositories/InMemoryUserRepository";
import UserMother from "../domain/UserMother";
import FindUser from "../../../../src/components/auth/application/FindUser";
import UserNotFoundException from "../../../../src/components/auth/domain/UserNotFoundException";

describe("User Finder", () => {
  it("should find a user based on its id", async () => {
    // Arrange
    const user = UserMother.random();
    const userRepository = new InMemoryUserRepository();
    userRepository.saveById(user);
    const userFinder = new UserFinder(userRepository);
    const userFinderSpy = jest.spyOn(userFinder, "execute");
    const findUser = new FindUser(userFinder);

    // Act
    const result = await findUser.execute(user.getId().value);

    // Assert
    expect(userFinderSpy).toHaveBeenCalled();
    expect(result).toEqual(user);
  });

  it("should return an exception when user is not found", async () => {
    // Arrange
    const userRepository = new InMemoryUserRepository();
    const userFinder = new UserFinder(userRepository);
    const findUser = new FindUser(userFinder);

    // Act
    const expectWrapper = expect(async () => {
      await findUser.execute("f5cc5afc-e95d-407d-b86f-21f1bb89451d");
    }).rejects;

    // Assert
    expectWrapper.toThrow(UserNotFoundException);
  });
});
