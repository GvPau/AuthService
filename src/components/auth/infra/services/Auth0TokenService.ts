import Token from "../../domain/Token";
import TokenExpiredException from "../../domain/TokenExpiredException";
import { TokenClaims } from "../../domain/TokenService";
import jsonwebtoken from "jsonwebtoken";

export default class Auth0tokenService {
  async sign(props: TokenClaims): Promise<Token> {
    return new Token(
      jsonwebtoken.sign(props, process.env.APP_SECRET || "", {
        expiresIn: process.env.TOKEN_EXPIRY_TIME,
      }),
    );
  }

  async decode(token: Token): Promise<TokenClaims | null> {
    return new Promise((resolve, reject) => {
      jsonwebtoken.verify(token.value, process.env.APP_SECRET || "", (err, decoded) => {
        if (err) {
          return reject(new TokenExpiredException());
        }
        return resolve(decoded as TokenClaims);
      });
    });
  }
}
