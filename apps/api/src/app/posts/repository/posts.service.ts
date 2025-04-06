import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';
import { Response } from 'express';
import { UserService } from '../../user/repository/user.service';
import { PostModel } from '../models/post.model';

@Injectable()
export class PostsService {

  constructor(@InjectFirebaseAdmin() private readonly _firebase: FirebaseAdmin, private readonly _userService: UserService) {}

  async getAll(featured: string, category: string, page: string, size: string): Promise<PostModel[]> {
    try {

      if (!page) {
        page = '1';
      }

      if (!size) {
        size = '10';
      }

      const postsSnapshot = await this._firebase.firestore.collection('posts').get();

      const posts: PostModel[] = postsSnapshot.docs.flatMap((doc) => doc.data());

      const filteredPosts = posts.filter(
        (post) => ((category === 'all' || category === undefined) ? post : post.category.toLowerCase() === category) && 
        ((featured === undefined || featured === 'all') ? post : post.featured === (featured === 'true'))
      ).slice(((parseInt(page) - 1) * parseInt(size)), parseInt(page) * parseInt(size));

      return filteredPosts;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async get(id: string): Promise<PostModel> {
    try {
      const post = (await this._firebase.firestore.collection('posts').doc(id).get()).data() as PostModel;

      return post;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async count(): Promise<{ allPosts: number }> {
    try {
      const postsSnapshot = await this._firebase.firestore.collection('posts').get();

      return { allPosts: postsSnapshot.docs.length }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async likeHandler(postId: string, res: Response) {
    try {
      const userId = res.locals.user.uid;
  
      const postRef = this._firebase.firestore.collection('posts').doc(postId);
      const postSnap = await postRef.get();
      const postData = postSnap.data();
  
      if (!postData) {
        throw new NotFoundException('Post not found');
      }
  
      const isAlreadyLiked = postData.likedBy.some((user) => user.uid === userId);
  
      const updatedLikedBy = isAlreadyLiked
        ? postData.likedBy.filter((user) => user.uid !== userId)
        : [...postData.likedBy, { uid: userId }];
  
      await postRef.update({ likedBy: updatedLikedBy });
      await this._userService.saveLikedPostId(userId, postId);
  
      return res.status(200).json({ likedBy: updatedLikedBy });
    } catch (error) {
      console.error('Error in likeHandler:', error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  }
  

  async saveHandler(postId: string, res: Response) {
    try {
      const userId = res.locals.user.uid;

      const postRef = this._firebase.firestore.collection('posts').doc(postId);
      const postSnap = await postRef.get();
      const postData = postSnap.data();

      if (!postData) {
        throw new NotFoundException('Post not found');
      }

      const isAlreadySaved = postData.savedBy.some((user) => user.uid === userId);

      const updatedSavedBy = isAlreadySaved
        ? postData.savedBy.filter((user) => user.uid !== userId)
        : [...postData.savedBy, { uid: userId }];


      await postRef.update({ savedBy: updatedSavedBy });
      await this._userService.saveSavedPostId(userId, postId);

      return res.status(200).json({ savedBy: updatedSavedBy });
    } catch (error) {
      return res.status(500).json({ error: 'Something went wrong' });
    }
  }
}
