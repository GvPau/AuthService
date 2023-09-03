import CreatedAt from "./CreatedAt";
import Id from "./Id";
import Password from "./Password";
import Token from "./Token";
import Username from "./Username";

export default class User {
  private id: Id;
  private username: Username;
  private password: Password;
  private token?: Token;
  private createdAt?: CreatedAt;

  private constructor(
    id: Id,
    username: Username,
    password: Password,
    createdAt?: CreatedAt,
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.createdAt = createdAt;
  }

  static create(
    id: Id,
    username: Username,
    password: Password,
    createdAt: CreatedAt,
  ): User {
    return new User(id, username, password, createdAt);
  }

  static update(id: Id, username: Username, password: Password): User {
    return new User(id, username, password);
  }

  getId(): Id {
    return this.id;
  }

  getUsername(): Username {
    return this.username;
  }

  getPassword(): Password {
    return this.password;
  }

  getToken(): Token {
    return this.token as Token;
  }

  setToken(token: Token): void {
    this.token = token;
  }

  getCreatedAt(): CreatedAt {
    return this.createdAt as CreatedAt;
  }

  setUsername(username: Username): void {
    this.username = username;
  }

  setPassword(password: Password): void {
    this.password = password;
  }
}
