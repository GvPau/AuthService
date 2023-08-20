export default class PasswordNotMatchedException extends Error {
  constructor(value: string) {
    super(`Password ${value} does not match`);
  }
}
