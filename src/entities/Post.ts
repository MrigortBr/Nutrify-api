export enum PostStatus {
  ALL = "*",
  ONLY_FOLLOWERS = "onlyFallowers",
  ONLY_I_FOLLOW = "onlyIFallow",
  FOLLOWERS_AND_I_FOLLOW = "fallowersAndIFallow",
}

export enum VisibilityStatus {
  ALL = "*",
  ONLY_FOLLOWERS = "onlyFallowers",
  ONLY_I_FOLLOW = "onlyIFallow",
  FOLLOWERS_AND_I_FOLLOW = "fallowersAndIFallow",
  DRAFT = "draft",
  ARCHIVED = "archived",
  PUBLISHED = "published",
}

export type updatePost = {
  caption: string;
  userMark: string[];
  post_commentable: PostStatus;
  visibility: VisibilityStatus;
  tags: string[];
};

export interface Post {
  id: number;
  user_id: number;
  post_commentable: PostStatus;
  visibility: VisibilityStatus;
  picture: Buffer;
  caption: string;
  posted_at?: Date | null;
  created_at: Date;
  userMark: string[];
  tags?: string[];
}
