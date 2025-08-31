import type { Dispatch, SetStateAction } from "react";

export interface IPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export type UsePostsReturn = [
  IPost[] | undefined,
  boolean,
  string,
  Dispatch<SetStateAction<string>>,
  (id: number, updated: Partial<IPost>) => void,
];

export interface IEditPost {
    selectedPost: IPost;
    setSelectedPost: (post: IPost) => void;
    handleSave: (data:IPost) => void;
    handleClose: () => void;
}