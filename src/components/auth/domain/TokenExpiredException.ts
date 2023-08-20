export default class TokenExpiredException extends Error {
  constructor() {
    super(`Token signature expired`);
  }
}
