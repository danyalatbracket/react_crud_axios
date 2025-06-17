export interface Post {
  id?: number;
  title: string;
  body: string;
  userId?: number;
}

export interface PostResponse {
  data: Post[];
}
export interface CreateOrUpdatePost {
  data: Post;
}
