export interface Comment {
  id?: number;
  postId: number;
  userId?: number;
  content: string;
  username?: string;
}
