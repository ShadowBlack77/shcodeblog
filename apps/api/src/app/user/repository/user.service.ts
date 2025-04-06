import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Timestamp } from 'firebase-admin/firestore';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';

@Injectable()
export class UserService {

  constructor(@InjectFirebaseAdmin() private readonly _firebase: FirebaseAdmin) {}

  async createUserDoc(
    uid: string,
    displayName: string, 
    email: string,
    role: string,
    photoURL: string,
    emailVerified: boolean
  ): Promise<void> {
    try {

      const userRef = this._firebase.firestore.collection('users').doc(uid);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        await userRef.create({
          uid: uid,
          displayName,
          email,
          role,
          photoURL,
          emailVerified,
          createdAt: Timestamp.now(),
          likedPosts: [],
          savedPosts: []
        });
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getUser(uid: string) {
    try {
      const user = (await this._firebase.firestore.collection('users').doc(uid).get()).data();

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async saveLikedPostId(userId: string, postId: string) {
    try {
      const user = await this.getUser(userId);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isAlreadyLiked = user.likedPosts.some((post) => post.id === postId);

      const updatedLikedPost = isAlreadyLiked 
        ? user.likedPosts.filter((post) => post.id !== postId)
        : [...user.likedPosts, { id: postId }];

        await this._firebase.firestore.collection('users').doc(userId).update({ likedPosts: updatedLikedPost });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async saveSavedPostId(userId: string, postId: string) {
    try {
      const user = await this.getUser(userId);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isAlreadySaved = user.savedPosts.some((post) => post.id === postId);

      const updatedSavedPost = isAlreadySaved
        ? user.savedPosts.filter((post) => post.id !== postId)
        : [...user.savedPosts, { id: postId }];

      await this._firebase.firestore.collection('users').doc(userId).update({ savedPosts: updatedSavedPost });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
