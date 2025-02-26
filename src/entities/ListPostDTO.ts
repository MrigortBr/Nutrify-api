type comment = {
  id: string;
  username: string;
  comment: string;
  createdAt: Date;
};

export type ListPost = {
  comments: comment[];
  page: number | string;
  nextPage: boolean;
  iCanComment: boolean;
  commentsNumber: number;
};
