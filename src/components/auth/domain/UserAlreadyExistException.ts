export default class UserAlreadyExistException extends Error {
  constructor(value: string) {
    super(`User ${value} already exists`);
  }
}
