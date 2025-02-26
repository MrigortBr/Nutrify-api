import { PostMarked } from "../../entities/PostMarked";

export type PublishData = {
  image: string;
  caption: string;
  markers: string[];
  idMarkers: { id: number }[];
  canSee: "*" | "onlyFallowers" | "onlyIFallow" | "fallowersAndIFallow";
  canComment: "*" | "onlyFallowers" | "onlyIFallow" | "fallowersAndIFallow" | "draft" | "archived";
  userId: number;
};

export type PublishDataToSend = {
  picture: string;
  caption: string;
  post_commentable: "*" | "onlyFallowers" | "onlyIFallow" | "fallowersAndIFallow" | "draft" | "archived";
  visibility: "*" | "onlyFallowers" | "onlyIFallow" | "fallowersAndIFallow";
  tags: string[];
  user_id: number;
};

type Convert = {
  [key: string]: string;
};

export const convertComentable: Convert = {
  "*": "*",
  onlyFallowers: "onlyFallowers",
  onlyIFallow: "onlyIFallow",
  fallowersAndIFallow: "fallowersAndIFallow",
};

export const convertVisibility: Convert = {
  "*": "*",
  onlyFallowers: "onlyFallowers",
  onlyIFallow: "onlyIFallow",
  fallowersAndIFallow: "fallowersAndIFallow",
  draft: "draft",
  archived: "archived",
};
