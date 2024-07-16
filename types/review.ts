export interface Review {
  id: string;
  reviewerUserId: string;
  revieweeUserId: string;
  rating: number;
  comment: string;
  nickname: string;
  date: string;
}