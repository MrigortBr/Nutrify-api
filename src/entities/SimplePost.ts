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

export type comments = {
  pictureUser: string;
  username: string;
  comment: string;
};

export interface SimplePost {
  id?: string;
  pictureUser: string; //
  username: string; //
  iCanComment: boolean;
  iLike?: boolean;
  commentState: string;
  picture: string; //
  caption: string; //
  created_at: Date; //
  userMark: { username: string; picture: string }[];
  likes: number;
  commentsNumber: number;
  comments?: comments[];
}
