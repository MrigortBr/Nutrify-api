import { PostMarked } from "../../entities/PostMarked";

export type PublishData = {
  image: string;
  caption: string;
  markers: string[];
  idMarkers: { id: number }[];
  canSee: "*" | "onlyFollowers" | "onlyIFollow" | "followersAndIFollow";
  canComment: "*" | "onlyFollowers" | "onlyIFollow" | "followersAndIFollow" | "draft" | "archived";
  userId: number;
};

export type PublishDataToSend = {
  picture: string;
  caption: string;
  post_commentable: "*" | "onlyFollowers" | "onlyIFollow" | "followersAndIFollow" | "draft" | "archived";
  visibility: "*" | "onlyFollowers" | "onlyIFollow" | "followersAndIFollow";
  tags: string[];
  user_id: number;
};

type Convert = {
  [key: string]: string;
};

export const convertComentable: Convert = {
  "*": "*",
  onlyFollowers: "onlyFallowers",
  onlyIFollow: "onlyIFallow",
  followersAndIFollow: "followersAndIFollow",
};

export const convertVisibility: Convert = {
  "*": "*",
  onlyFollowers: "onlyFollowers",
  onlyIFollow: "onlyIFollow",
  followersAndIFollow: "followersAndIFollow",
  draft: "draft",
  archived: "archived",
};
