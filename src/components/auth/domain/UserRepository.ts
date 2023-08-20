import User from "./User";
import Username from "./Username";

export default interface UserRepository {
  searchByUserName: (username: Username) => Promise<User | null>;
}
