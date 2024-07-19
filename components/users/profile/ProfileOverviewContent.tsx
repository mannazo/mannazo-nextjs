'use client'

// import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { useEffect, useState } from 'react'
// import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { Post } from '@/types/profile-postindex'
import axios from 'axios'
// import TravelPostCard from '@/components/posts/desktop/TravelPostCard'
import { useSession } from 'next-auth/react'
// import { Session } from 'next-auth'
// import { router } from 'next/client'
import LoadingSpinner from '@/components/commons/LoadingSpinner'
import { useRouter } from 'next/navigation'
import { MessageCircle } from 'lucide-react'
import Marquee from 'react-fast-marquee'
import Pagination from './Pagination'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Chip,
  Avatar,
  Button,
} from '@nextui-org/react'

// interface Post {
//   userId: string
//   travelNationality: string
//   travelCity: string
//   travelStartDate: string
//   travelEndDate: string
//   travelStatus: string
//   preferredGender: string
//   travelStyle: string
//   travelPurpose: string
//   imageUrls: string[]
// }

export default function Overview() {
  // const { post: postData, user } = post
  const [posts, setPosts] = useState<Post[]>([])
  const [userData, setUserData] = useState(null)
  const router = useRouter()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const postsPerPage = 9 // 한 페이지에 표시할 게시글 수

  useEffect(() => {
    //   const fetchOverview = async () => {
    //     if (status === 'authenticated') {
    //       try {
    //         const response = await axios.get(
    //           `https://mannazu.diligentp.com/post/user/${session.user.additionalInfo.serverUserId}`
    //         )
    //         // setPosts((prevPosts) => [...prevPosts, ...newPosts])
    //         setPosts(response.data.content || []) // 불러온 게시글을 상태에 설정
    //         console.log(response.data)
    //       } catch (error) {
    //         console.error('Error fetching user posts:', error)
    //       } finally {
    //         setLoading(false) // 로딩 상태 해제
    //       }
    //     }
    //   }
    //   fetchOverview()
    // }, [status, session])

    const fetchOverview = async () => {
      if (status === 'authenticated') {
        try {
          const [postResponse, userResponse] = await Promise.all([
            // axios.get(
            //   `https://mannazu.diligentp.com/post/user/${session.user.additionalInfo.serverUserId}`
            // ),
            // axios.get(
            //   `https://mannazu.diligentp.com/user/${session.user.additionalInfo.serverUserId}`
            // ),
            axios.get(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/post/user/${session.user.additionalInfo.serverUserId}`
            ),
            axios.get(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/user/${session.user.additionalInfo.serverUserId}`
            ),
          ])

          // setPosts((prevPosts) => [...prevPosts, ...newPosts])
          setPosts(postResponse.data.content || []) // 불러온 게시글을 상태에 설정
          setUserData(userResponse.data)
          console.log('Posts:', postResponse.data)
          console.log('User Data:', userResponse.data)
        } catch (error) {
          console.error('Error fetching user posts:', error)
        } finally {
          setLoading(false) // 로딩 상태 해제
        }
      }
    }
    fetchOverview()
  }, [session])

  if (loading) {
    return <LoadingSpinner />
  }

  // 페이지에 따라 표시할 게시글을 계산
  const startIndex = currentPage * postsPerPage
  const selectedPosts = posts.slice(startIndex, startIndex + postsPerPage)
  const totalPages = Math.ceil(posts.length / postsPerPage)

  return (
    <>
      <div className="my-4">
        {' '}
        {/* 여기에 마진을 추가 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {selectedPosts && selectedPosts.length > 0 ? ( // posts가 정의되어 있고 비어있지 않은지 확인
            posts.map((post, index) => (
              <Card
                key={index}
                className="h-[800px] overflow-hidden"
                isPressable
                isFooterBlurred
              >
                <CardHeader className="absolute top-1 z-10 flex-col items-start">
                  <div className="flex w-full items-center justify-between rounded-2xl bg-background/40 p-2 backdrop-blur-md">
                    {userData && (
                      <div className="flex items-center rounded-full p-1">
                        <Avatar
                          src={userData.profileImage || undefined}
                          name={userData.nickname}
                          size="sm"
                          className="mr-2"
                        />
                        <span className="font-medium text-white">
                          {userData.nickname}
                        </span>
                      </div>
                    )}
                    <Chip size="sm" color="primary" className="ml-auto">
                      {post.travelStatus}
                    </Chip>
                  </div>
                  <div className="mt-4 rounded-r-full bg-gradient-to-r from-red-500/60 to-secondary p-2 text-white">
                    <h4 className="text-xl font-bold">
                      TO: {post.travelCity}, REGION: {post.travelNationality}
                    </h4>
                  </div>
                </CardHeader>
                <CardBody className="p-0">
                  <Image
                    removeWrapper
                    alt={`Travel to ${post.travelCity}`}
                    className="z-0 h-full w-full object-cover"
                    src={post.imageUrls[0] || '/test.jpg'}
                  />
                </CardBody>
                <CardFooter className="absolute bottom-1 z-10 ml-1 flex w-[calc(100%_-_8px)] flex-col items-center justify-center overflow-hidden rounded-large border-1 border-white/20 py-3 shadow-small before:rounded-xl before:bg-white/10">
                  <div className="ute bottom-0 left-0 right-0 z-20 mb-[calc(1rem+1px)] flex items-center justify-center">
                    <p className="mx-auto max-w-[80%] cursor-context-menu rounded-2xl bg-background/40 px-4 py-2 text-center backdrop-blur-md">
                      {post.travelPurpose}
                    </p>
                  </div>
                  <div className="flex w-full flex-col items-center px-1 text-center">
                    <h4 className="mb-2 text-xl font-bold">
                      {post.travelStartDate} - {post.travelEndDate}
                    </h4>
                    <div className="mb-3 flex w-full flex-col gap-2">
                      <div className="w-full overflow-hidden">
                        <Marquee
                          gradientWidth={50}
                          speed={30}
                          pauseOnHover={true}
                        >
                          <div className="flex gap-2">
                            {post.travelStyle.split(',').map((style, index) => (
                              <Chip key={index} size="sm" color="secondary">
                                {style.trim()}
                              </Chip>
                            ))}
                          </div>
                        </Marquee>
                      </div>
                    </div>
                    <div className="my-2 h-px w-full bg-white/20"></div>
                    {/*<Button*/}
                    {/*  size="md"*/}
                    {/*  color="primary"*/}
                    {/*  variant="solid"*/}
                    {/*  startContent={<MessageCircle size={20} />}*/}
                    {/*  className="mt-2 w-full"*/}
                    {/*  onClick={handleClick}*/}
                    {/*/>*/}
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p>No posts available.</p> // posts가 비어있을 때 표시할 내용
          )}
          {/*{isFetching && <p>Loading more posts...</p>}*/}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>

    //-------------------------------------
    // <div className="container mx-auto">
    //   {posts && posts.length > 0 ? (
    //     posts.map((post, index) => (
    //       <Card
    //         key={index}
    //         className="mx-auto mt-4 h-[800px] max-w-[400px] overflow-hidden"
    //         isPressable
    //         isFooterBlurred
    //       >
    //         <CardHeader className="absolute top-1 z-10 flex-col items-start">
    //           <div className="flex w-full items-center justify-between rounded-2xl bg-background/40 p-2 backdrop-blur-md">
    //             <div className="flex items-center rounded-full p-1">
    //               <Avatar
    //                 src={'/default-profile.jpg'}
    //                 name={post.travelCity}
    //                 size="sm"
    //                 className="mr-2"
    //               />
    //               <span className="font-medium text-white">
    //                 {post.travelCity}
    //               </span>
    //             </div>
    //             <Chip size="sm" color="primary" className="ml-auto">
    //               {post.travelStatus}
    //             </Chip>
    //           </div>
    //           <div className="mt-4 rounded-r-full bg-gradient-to-r from-red-500/60 to-secondary p-2 text-white">
    //             <h4 className="text-xl font-bold">
    //               TO: {post.travelCity}, REGION: {post.travelNationality}
    //             </h4>
    //           </div>
    //         </CardHeader>
    //         <CardBody className="p-0">
    //           <Image
    //             removeWrapper
    //             alt={`Travel to ${post.travelCity}`}
    //             className="z-0 h-full w-full object-cover"
    //             src={post.imageUrls[0] || '/test.jpg'}
    //           />
    //         </CardBody>
    //         <CardFooter className="absolute bottom-1 z-10 ml-1 flex w-[calc(100%_-_8px)] flex-col items-center justify-center overflow-hidden rounded-large border-1 border-white/20 py-3 shadow-small before:rounded-xl before:bg-white/10">
    //           <div className="ute bottom-0 left-0 right-0 z-20 mb-[calc(1rem+1px)] flex items-center justify-center">
    //             <p className="mx-auto max-w-[80%] cursor-context-menu rounded-2xl bg-background/40 px-4 py-2 text-center backdrop-blur-md">
    //               {post.travelPurpose}
    //             </p>
    //           </div>
    //           <div className="flex w-full flex-col items-center px-1 text-center">
    //             <h4 className="mb-2 text-xl font-bold">
    //               {post.travelStartDate} - {post.travelEndDate}
    //             </h4>
    //             <div className="mb-3 flex w-full flex-col gap-2">
    //               <div className="w-full overflow-hidden">
    //                 <Marquee gradientWidth={50} speed={30} pauseOnHover={true}>
    //                   <div className="flex gap-2">
    //                     {post.travelStyle.split(',').map((style, index) => (
    //                       <Chip key={index} size="sm" color="secondary">
    //                         {style.trim()}
    //                       </Chip>
    //                     ))}
    //                   </div>
    //                 </Marquee>
    //               </div>
    //             </div>
    //             <div className="my-2 h-px w-full bg-white/20"></div>
    //           </div>
    //         </CardFooter>
    //       </Card>
    //     ))
    //   ) : (
    //     <p>No posts available.</p>
    //   )}
    // </div>

    //----------------------------------
    // <div className="container mx-auto">
    //   {posts && posts.length > 0 ? ( // posts가 정의되어 있고 비어있지 않은지 확인
    //     posts.map((post, index) => (
    //       <Card key={index} className="mx-auto mt-4 max-w-[400px]">
    //         {/*<Card className="mx-auto max-w-[400px] mt-4">*/}
    //         <CardHeader>
    //           <h2 className="text-xl font-bold">{post.travelCity}</h2>
    //         </CardHeader>
    //         <CardBody>
    //           <p>Nationality: {post.travelNationality}</p>
    //           <p>
    //             Travel Period: {post.travelStartDate} - {post.travelEndDate}
    //           </p>
    //           <p>Status: {post.travelStatus}</p>
    //           <p>Preferred Gender: {post.preferredGender}</p>
    //           <p>Travel Style: {post.travelStyle}</p>
    //           <p>Travel Purpose: {post.travelPurpose}</p>
    //           {/*{post.imageUrls.map((url, imgIndex) => (*/}
    //           {/* imageUrls가 있는지 확인 */}
    //           {post.imageUrls &&
    //             post.imageUrls.map((url, imgIndex) => (
    //               <img
    //                 key={imgIndex}
    //                 src={url}
    //                 alt={`Image ${imgIndex + 1}`}
    //                 className="mt-2"
    //               />
    //             ))}
    //         </CardBody>
    //       </Card>
    //     ))
    //   ) : (
    //     <p>No posts available.</p> // posts가 비어있을 때 표시할 내용
    //   )}
    //   {/*{isFetching && <p>Loading more posts...</p>}*/}
    // </div>
  )
}
