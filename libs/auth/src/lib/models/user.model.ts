export interface User {
  readonly uid: string;
  readonly displayName: string;
  readonly email: string;
  readonly photoURL: string;
  readonly createdAt: { _seconds: number, _nanoseconds: number };
  readonly likedPosts: { id: string }[];
  readonly role: string;
  readonly savedPosts: { id: string }[];
  readonly emailVerified: boolean;
}