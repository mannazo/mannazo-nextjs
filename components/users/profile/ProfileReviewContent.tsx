'use client'

import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { Review } from '@/types/review'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import LoadingSpinner from '@/components/commons/LoadingSpinner'

// const hardcodedReviews: Review[] = [
//   {
//     id: '1',
//     reviewerUserId: 'user1',
//     revieweeUserId: 'user2',
//     rating: 5,
//     comment: 'Excellent!',
//     nickname: 'user1',
//     date: '2024-07-12',
//   },
//   {
//     id: '2',
//     reviewerUserId: 'user3',
//     revieweeUserId: 'user2',
//     rating: 4,
//     comment: 'Very good',
//     nickname: 'user3',
//     date: '2024-07-13',
//   },
//   {
//     id: '3',
//     reviewerUserId: 'user4',
//     revieweeUserId: 'user2',
//     rating: 3,
//     comment: 'Average',
//     nickname: 'user4',
//     date: '2024-07-14',
//   },
//   // reviewerUserId: "user4", revieweeUserId: "user2", rating: 3, comment: "Average",
//   // 추가 리뷰 데이터...
// ]

const calculateAverageRating = (reviews: Review[]) => {
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
  return (totalRating / reviews.length).toFixed(2)
}

// const fetchReviews = async (page: number): Promise<Review[]> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(hardcodedReviews)
//     }, 500)
//   })
// }

const ProfileReviewContent: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [page, setPage] = useState(1)
  const { lastElementRef, isFetching } = useInfiniteScroll(() => {
    setPage((prevPage) => prevPage + 1)
  })
  const [userData, setUserData] = useState<Record<string, any>>({})
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      if (status === 'authenticated') {
        try {
          const userId = 'user2' // 실제 사용자의 ID로 대체 필요
          // 리뷰 데이터 가져오기
          const response = await axios.get(
            // `https://mannazu.diligentp.com/review/reviewee/${session.user.additionalInfo.serverUserId}`
            `http://192.168.0.184:8080/review/reviewee/${session.user.additionalInfo.serverUserId}`
            // 'http://192.168.0.184:8080/review/reviewee/84e85f43-a007-43c5-a03e-dd7974922ee1'
          )
          console.log('Server Response:', response.data)
          // const fetchedReviews = response.data
          const fetchedReviews: Review[] = response.data
          // 리뷰 데이터에 닉네임 추가 및 상태 업데이트
          const updateReviews = await Promise.all(
            fetchedReviews.map(async (review) => {
              try {
                // 리뷰어의 사용자 데이터 가져오기
                const userResponse = await axios.get(
                  `https://mannazu.diligentp.com/user/${review.reviewerId}`
                  // `http://192.168.0.184:8080/user/${review.reviewerUserId}`
                )
                const user = userResponse.data
                console.log('user: ', userResponse.data)
                // 리뷰어의 닉네임을 리뷰 데이터에 추가
                return { ...review, nickname: userResponse.data.nickname }
              } catch (error) {
                console.error('Error fetching userdata: ', error)
                return review // 에러 발생 시 원래 리뷰 데이터 반환
              }
            })
          )

          setReviews((prevReviews) => [...prevReviews, ...updateReviews])
          setLoading(false)
        } catch (error) {
          console.error('Error fetching reviews: ', error)
          setLoading(false)
        }
      }
    }

    fetchReviews()
  }, [status, page])
  //         // setReviews((prevReviews) => [...prevReviews, ...fetchedReviews])
  //         setReviews([...fetchedReviews])
  //         console.log(response.data)
  //         console.log('reviews: ')
  //         console.log(reviews)
  //         ///////
  //         reviews.map((review) => {
  //           console.log('reviewUserId:')
  //           console.log(review.reviewerUserId)
  //           // response = axios.get();
  //           // response.data.nickname;
  //           // review.nickname = nick;
  //           axios
  //             .get(
  //               `https://mannazu.diligentp.com/user/${review.reviewerUserId}`
  //             )
  //             .then((response) => {
  //               console.log('User data: ', response.data)
  //               review.nickname = response.data.nickname
  //             })
  //             .catch((error) => {
  //               console.error('Error fetching user data:', error)
  //             })
  //         })
  //
  //         ///////
  //
  //         // Fetch reviewer user data
  //         // const reviewerIds = fetchedReviews
  //         const reviewerIds = reviews
  //           .map((review: Review) => review.reviewerUserId)
  //           .filter((id) => id !== undefined) // filter out undefined ids
  //         // const uniqueReviewerIds = [...new Set(reviewerIds)]
  //
  //         // const userRequests = uniqueReviewerIds.map((id) =>
  //         const userRequests = reviewerIds.map((id) =>
  //           axios.get(
  //             // `http://192.168.0.184:8080/user/${id}`
  //             `https://mannazu.diligentp.com/user/${id}`
  //           )
  //         )
  //         const userResponses = await Promise.all(userRequests)
  //         const users = userResponses.reduce(
  //           (acc, response) => {
  //             const user = response.data
  //             acc[user.id] = user
  //             return acc
  //           },
  //           {} as Record<string, any>
  //         )
  //         setUserData(users)
  //       } catch (error) {
  //         console.error('Error fetching reviews:', error)
  //       } finally {
  //         setLoading(false)
  //       }
  //     }
  //   }
  //
  //   fetchReviews()
  // }, [status, page])
  //
  // //       }
  // //       }
  // //         })
  // //       } catch (error) {
  // //         console.error('Error fetching reviews:', error)
  // //       } finally {
  // //         setLoading(false)
  // //       }
  // //     }
  // //   }
  // //
  // //   fetchReviews()
  // // }, [status, page])
  //
  // // if (loading) {
  // //   return <LoadingSpinner />
  // // }
  //
  // // useEffect(() => {
  // //   const loadReviews = async () => {
  // //     const newReviews = await fetchReviews(page)
  // //     setReviews((prevReviews) => [...prevReviews, ...newReviews])
  // //   }
  // //
  // //   loadReviews()
  // // }, [page])

  return (
    <>
      <div className="container mx-auto">
        <Card className="mx-auto mt-4 max-w-[400px]">
          <CardHeader>
            <h2 className="text-xl font-bold">Average Rating</h2>
          </CardHeader>
          <CardBody>
            <p>{calculateAverageRating(reviews)}</p>
          </CardBody>
        </Card>

        {reviews && reviews.length > 0 ? (
          reviews.map((review, index) => (
            <Card key={review.reviewId} className="mx-auto mt-4 max-w-[400px]">
              <CardHeader>
                <h2 className="text-xl font-bold">
                  {/*{userData[review.reviewerId]?.nickname || 'Unknown'}*/}
                  {review.nickname || 'Unknown'}
                </h2>
                {/*<p>{review.date}</p>*/}
              </CardHeader>
              <CardBody>
                <p>Rating: {review.rating}</p>
                <p>Comment: {review.comment}</p>
                <p>Date: {review.createdAt}</p>
              </CardBody>
              {/*{index === reviews.length - 1 && <div ref={lastElementRef}></div>}*/}
            </Card>
          ))
        ) : (
          <p>No reviews available.</p> // 리뷰가 없을 때 표시할 내용
        )}
        {isFetching && <p>Loading more reviews...</p>}
      </div>

      {/*<div className="container mx-auto">*/}
      {/*  <Card className="mx-auto mt-4 max-w-[400px]">*/}
      {/*    <CardHeader>*/}
      {/*      <h2 className="text-xl font-bold">Average Rating</h2>*/}
      {/*    </CardHeader>*/}
      {/*    <CardBody>*/}
      {/*      <p>{calculateAverageRating(reviews)}</p>*/}
      {/*    </CardBody>*/}
      {/*  </Card>*/}

      {/*  {reviews.map((review, index) => (*/}
      {/*    <Card key={review.id} className="mx-auto mt-4 max-w-[400px]">*/}
      {/*      <CardHeader>*/}
      {/*        <h2 className="text-xl font-bold">{review.nickname}</h2>*/}
      {/*        <p>{review.date}</p>*/}
      {/*      </CardHeader>*/}
      {/*      <CardBody>*/}
      {/*        <p>Rating: {review.rating}</p>*/}
      {/*        <p>Comment: {review.comment}</p>*/}
      {/*      </CardBody>*/}
      {/*      {index === reviews.length - 1 && <div ref={lastElementRef}></div>}*/}
      {/*    </Card>*/}
      {/*  ))}*/}
      {/*  {isFetching && <p>Loading more reviews...</p>}*/}
      {/*</div>*/}
    </>
  )
}

export default ProfileReviewContent
