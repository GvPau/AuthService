import InMemoryUserRepository from "../../../../src/components/auth/infra/repositories/InMemoryUserRepository";
import UserMother from "../domain/UserMother";
import UserSearcher from "../../../../src/components/auth/domain/UserSearcher";
import UserUpdater from "../../../../src/components/auth/domain/UserUpdater";
import UpdateUser from "../../../../src/components/auth/application/UpdateUser";

describe("Update User", () => {
  it("should update a user", async () => {
    // Arrange
    const user = UserMother.random();
    const userRepository = new InMemoryUserRepository();
    userRepository.save(user);

    const userSearcher = new UserSearcher(userRepository);
    const userSearcherSpy = jest.spyOn(userSearcher, "execute").mockResolvedValue(user);

    const userUpdater = new UserUpdater(userRepository);
    const userUpdaterSpy = jest.spyOn(userUpdater, "execute");

    const updateUser = new UpdateUser(userUpdater, userSearcher);

    // Act
    await updateUser.execute(user.getId().value, "New Username", "New Password");

    // Assert
    expect(userSearcherSpy).toHaveBeenCalled();
    expect(userUpdaterSpy).toHaveBeenCalled();
  });
});
