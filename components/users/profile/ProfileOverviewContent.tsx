'use client'

import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { Post } from '@/types/profile-postindex'

const hardcodedPosts: Post[] = [
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
  // 추가 하드코딩된 게시글 데이터...
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
];


const fetchPosts = async (page: number): Promise<Post[]> => {
  // const response = await fetch(`/api/posts?page=${page}`);
  // const data = await response.json();
  // return data;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(hardcodedPosts);
    }, 500);
  });
}

const Overview: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const { lastElementRef, isFetching } = useInfiniteScroll(() => {
    setPage(prevPage => prevPage + 1);
  })

  useEffect(() => {
    const loadPosts = async () => {
      const newPosts = await fetchPosts(page);
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
    };

    loadPosts();
  }, [page]);

  return (
    <div className="container mx-auto">
      {posts.map((post, index) => (
        <Card key={index} className="mx-auto max-w-[400px] mt-4">
    {/*<Card className="mx-auto max-w-[400px] mt-4">*/}
      <CardHeader>
        <h2 className="text-xl font-bold">{post.travelCity}</h2>
      </CardHeader>
      <CardBody>
        <p>Nationality: {post.travelNationality}</p>
        <p>Travel Period: {post.travelStartDate} - {post.travelEndDate}</p>
        <p>Status: {post.travelStatus}</p>
        <p>Preferred Gender: {post.preferredGender}</p>
        <p>Travel Style: {post.travelStyle}</p>
        <p>Travel Purpose: {post.travelPurpose}</p>
        {post.imageUrls.map((url, imgIndex) => (
          <img key={imgIndex} src={url} alt={`Image ${imgIndex + 1}`} className="mt-2" />
        ))}
      </CardBody>
      {index === posts.length - 1 && <div ref={lastElementRef}></div>}
    </Card>
  ))}
{isFetching && <p>Loading more posts...</p>}
</div>
  )
}

export default Overview