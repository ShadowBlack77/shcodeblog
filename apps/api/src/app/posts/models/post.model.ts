import { Timestamp } from 'firebase-admin/firestore';

export interface PostModel {
  readonly title: string;
  readonly description: string;
  readonly mainImage: string;
  readonly category: string;
  readonly featured: boolean;
  readonly contentSegments: [{
    readonly id: string;
    readonly type: string;
    readonly content: string;
    readonly code: string;
    readonly image: string;
  }],
  readonly author: string;
  readonly authorImage: string;
  readonly readTime: string;
  readonly likedBy: string[];
  readonly timestamps: Timestamp;
}