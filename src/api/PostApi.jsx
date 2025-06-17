import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getAllPosts = () => {
  return api.get("/posts");
};

export const createPost = (requestBody) => {
  return api.post("/posts", requestBody);
};
export const updatePost = (id, data) => api.patch(`/posts/${id}`, data);

export const deletePost = (id) => api.delete(`/posts/${id}`);
