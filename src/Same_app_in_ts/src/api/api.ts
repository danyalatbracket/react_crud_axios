import axios from "axios";
import type {
  CreateOrUpdatePost,
  Post,
  PostResponse,
} from "../interfaces/post";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getAllPosts = (): Promise<PostResponse> => {
  return api.get("/posts");
};

export const createPost = (requestBody: Post): Promise<CreateOrUpdatePost> => {
  return api.post("/posts", requestBody);
};
export const updatePost = (
  id: number,
  data: Post
): Promise<CreateOrUpdatePost> => api.patch(`/posts/${id}`, data);

export const deletePost = (id: number | undefined): Promise<null> =>
  api.delete(`/posts/${id}`);
