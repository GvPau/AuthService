export default class UserNotFoundException extends Error {
  constructor(value: string) {
    super(`User ${value} does not exist`);
  }
}
