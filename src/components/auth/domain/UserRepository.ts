import User from "./User";
import Username from "./Username";

export default interface UserRepository {
  searchByUserName: (_username: Username) => Promise<User | null>;
  // eslint-disable-next-line semi
}
