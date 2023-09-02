import Id from "./Id";
import User from "./User";
import Username from "./Username";

export default interface UserRepository {
  searchByUserName: (_username: Username) => Promise<User | null>;
  exists: (_username: Username) => Promise<boolean>;
  existsById: (_id: Id) => Promise<boolean>;
  save: (_user: User) => Promise<void>;
  search: (_userIds: Id[]) => Promise<User[]>;
  delete: (_id: Id) => Promise<void>;
  // eslint-disable-next-line semi
}
