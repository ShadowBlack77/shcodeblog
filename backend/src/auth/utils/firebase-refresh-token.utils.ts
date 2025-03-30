import axios from "axios";
import { setAccessTokenCookie } from "./set-access-token-cookie.utils";
import { Response } from "express";

export const firebaseRefreshToken = async (res: Response, refreshToken: string): Promise<string> => {
  try {
    const refreshResponse = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`, {
      grant_type: "refresh_token",
      refresh_token: refreshToken
    });

    setAccessTokenCookie(res, refreshResponse.data['id_token']);

    return refreshResponse.data['id_token'];
  } catch (error) {
    throw error;
  }
}