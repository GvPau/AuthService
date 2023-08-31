import User from "./User";
import Username from "./Username";

export default interface UserRepository {
  searchByUserName: (_username: Username) => Promise<User | null>;
  exists: (_username: Username) => Promise<boolean>;
  save: (_user: User) => Promise<void>;
  // eslint-disable-next-line semi
}
