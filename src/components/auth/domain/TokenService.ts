import Token from "./Token";

export interface TokenClaims {
  userId: string;
  username: string;
}

export default interface TokenService {
  sign(_props: TokenClaims): Token;
  decode(_token: Token): Promise<TokenClaims | null>;
  // eslint-disable-next-line semi
}
