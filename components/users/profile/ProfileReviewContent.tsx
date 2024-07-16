'use client'

import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { Review } from '@/types/review'

const hardcodedReviews: Review[] = [
  { id: "1", reviewerUserId: "user1", revieweeUserId: "user2", rating: 5, comment: "Excellent!", nickname: "user1", date: "2024-07-12" },
  { id: "2", reviewerUserId: "user3", revieweeUserId: "user2", rating: 4, comment: "Very good", nickname: "user3", date: "2024-07-13" },
  { id: "3", reviewerUserId: "user4", revieweeUserId: "user2", rating: 3, comment: "Average", nickname: "user4", date: "2024-07-14" },
  // 추가 리뷰 데이터...
];

const calculateAverageRating = (reviews: Review[]) => {
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (totalRating / reviews.length).toFixed(2);
}

const fetchReviews = async (page: number): Promise<Review[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(hardcodedReviews);
    }, 500);
  });
}

const ProfileReviewContent: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const { lastElementRef, isFetching } = useInfiniteScroll(() => {
    setPage(prevPage => prevPage + 1);
  });

  useEffect(() => {
    const loadReviews = async () => {
      const newReviews = await fetchReviews(page);
      setReviews(prevReviews => [...prevReviews, ...newReviews]);
    };

    loadReviews();
  }, [page]);

  return (
    <div className="container mx-auto">
      <Card className="mx-auto max-w-[400px] mt-4">
        <CardHeader>
          <h2 className="text-xl font-bold">Average Rating</h2>
        </CardHeader>
        <CardBody>
          <p>{calculateAverageRating(reviews)}</p>
        </CardBody>
      </Card>

      {reviews.map((review, index) => (
        <Card key={review.id} className="mx-auto max-w-[400px] mt-4">
          <CardHeader>
            <h2 className="text-xl font-bold">{review.nickname}</h2>
            <p>{review.date}</p>
          </CardHeader>
          <CardBody>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
          </CardBody>
          {index === reviews.length - 1 && <div ref={lastElementRef}></div>}
        </Card>
      ))}
      {isFetching && <p>Loading more reviews...</p>}
    </div>
  )
}

export default ProfileReviewContent