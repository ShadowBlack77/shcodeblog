export class SignInAuthDto {
  user: {
    uid: string;
    displayName: string;
    email: string;
    emailVerified: boolean;
    photoURL: string;
    stsTokenManager: {
      accessToken: string;
      refreshToken: string
    }
  }
}