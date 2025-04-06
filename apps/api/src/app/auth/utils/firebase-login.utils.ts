import axios from "axios";
import { SignInDto } from "../models/sign-in-dto.model";
import { FirebaseResponseSignIn } from "../models/firebase-response-sign-in.model";

export const firebaseLogin = async (signInDto: SignInDto): Promise<FirebaseResponseSignIn> => {
  const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`, {
    email: signInDto.email,
    password: signInDto.password,
    returnSecureToken: true
  });

  const data = await response.data;

  return data;
}