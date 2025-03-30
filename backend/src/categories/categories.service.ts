import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';

@Injectable()
export class CategoriesService {

  constructor(@InjectFirebaseAdmin() private readonly _firebase: FirebaseAdmin) {}

  async getAll() {
    try {
      const categoriesSnapshot = await this._firebase.firestore.collection('categories').get();

      const categories = categoriesSnapshot.docs.flatMap((doc) => doc.data());

      return categories;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
