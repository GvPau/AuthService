import Token from "./Token";

export interface TokenClaims {
  userId: string;
  username: string;
}

export default interface TokenService {
  sign(props: TokenClaims): Token;
  decode(token: Token): Promise<TokenClaims | null>;
}
