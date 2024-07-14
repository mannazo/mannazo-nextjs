import type { NextApiRequest, NextApiResponse } from 'next';
import { Post } from '@/types/profile-postindex'

const posts: Post[] = [
  {
    userId: "94760f77-9e64-4322-be0b-d4f6d7956299",
    travelNationality: "china",
    travelCity: "베이징",
    travelStartDate: "2024-07-12",
    travelEndDate: "2024-07-24",
    travelStatus: "등록",
    preferredGender: "상관없음",
    travelStyle: "맛집탐방",
    travelPurpose: "현지 음식",
    imageUrls: [
      "http://example.com/image1.jpg",
      "http://example.com/image2.jpg"
    ]
  },
  // 추가 게시글 데이터...
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page } = req.query;
  const pageSize = 10;
  const pageNumber = parseInt(page as string, 10) || 1;
  const start = (pageNumber - 1) * pageSize;
  const end = start + pageSize;

  res.status(200).json(posts.slice(start, end));
}