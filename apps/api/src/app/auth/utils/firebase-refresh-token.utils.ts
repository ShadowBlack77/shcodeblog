import axios from "axios";
import { Response } from "express";
import { setAccessTokenCookie } from "./set-access-token-cookie.utils";

export const firebaseRefreshToken = async (res: Response, refreshToken: string): Promise<string> => {
  const refreshResponse = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`, {
    grant_type: "refresh_token",
    refresh_token: refreshToken
  });

  setAccessTokenCookie(res, refreshResponse.data['id_token']);

  return refreshResponse.data['id_token'];
}