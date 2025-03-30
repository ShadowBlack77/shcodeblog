import { Response } from "express";

export const setAccessTokenCookie = (res: Response, accessToken: string): void => {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}