export interface IAuthToken {
  token: string;
  refreshToken: string;
  tokenExpiresAt: Date;
}

export interface IAuthRefreshTokenInput {
  refreshToken: string;
}
