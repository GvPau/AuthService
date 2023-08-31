export default class UserRepositoryNotWorkingException extends Error {
  constructor() {
    super(`An error occurred in the tag repository`);
  }
}
