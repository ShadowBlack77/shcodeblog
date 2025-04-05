export interface Post {
  readonly id: string;
  readonly author: string;
  readonly authorImage: string;
  readonly category: string;
  readonly contentSegments: { id: string; content: string; type: string, code?: string }[];
  readonly createdAt: { _seconds: number, _nanoseconds: number };
  readonly description: string;
  readonly featured: boolean;
  readonly likedBy: { uid: string }[];
  readonly mainImage: string;
  readonly mainImagePreview: string;
  readonly readTime: string;
  readonly savedBy: { uid: string }[];
  readonly title: string;
}