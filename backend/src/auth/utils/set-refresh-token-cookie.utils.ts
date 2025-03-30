import { Response } from "express";

export const setRefreshTokenCookie = (res: Response, refreshToken: string): void => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}