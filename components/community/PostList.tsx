import { Table, User, Link } from '@nextui-org/react'
import NextLink from 'next/link'

export default function PostList({ posts }) {
  return (
    <Table aria-label="게시글 목록">
      <Table.Header>
        <Table.Column>제목</Table.Column>
        <Table.Column>작성자</Table.Column>
        <Table.Column>미리보기</Table.Column>
      </Table.Header>
      <Table.Body>
        {posts.map((post) => (
          <Table.Row key={post.id}>
            <Table.Cell>
              <NextLink href={`/posts/${post.id}`} passHref>
                <Link color="primary">
                  <span style={{ fontWeight: 'bold' }}>{post.title}</span>
                </Link>
              </NextLink>
            </Table.Cell>
            <Table.Cell>
              <User
                avatarProps={{ src: post.authorImage }}
                name={post.authorName}
              >
                <NextLink href={`/profile/${post.authorUUID}`} passHref>
                  <User.Link>{post.authorName}</User.Link>
                </NextLink>
              </User>
            </Table.Cell>
            <Table.Cell>
              <span
                style={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  display: 'block',
                }}
              >
                {post.previewText}
              </span>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export async function getServerSideProps() {
  // 실제로는 여기서 API 호출 등을 통해 데이터를 가져옵니다.
  const tempPosts = [
    {
      id: 1,
      title: 'Next.js와 NextUI로 멋진 웹 앱 만들기',
      authorName: '김개발',
      authorImage: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD...', // 실제 base64 이미지 데이터로 대체해야 합니다
      authorUUID: '550e8400-e29b-41d4-a716-446655440000',
      content:
        '<p>Next.js와 NextUI를 사용하면 빠르고 아름다운 웹 애플리케이션을 만들 수 있습니다. 이 글에서는 기본적인 설정부터...</p>',
      previewText:
        'Next.js와 NextUI를 사용하면 빠르고 아름다운 웹 애플리케이션을 만들 수 있습니다. 이 글에서는 기본적인 설정부터...',
    },
    {
      id: 2,
      title: 'React Hook의 모든 것',
      authorName: '이리액트',
      authorImage: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD...', // 실제 base64 이미지 데이터로 대체해야 합니다
      authorUUID: '550e8400-e29b-41d4-a716-446655440001',
      content:
        '<p>React Hook은 함수형 컴포넌트에서 상태 관리와 생명주기 기능을 사용할 수 있게 해주는 강력한 기능입니다. useState, useEffect...</p>',
      previewText:
        'React Hook은 함수형 컴포넌트에서 상태 관리와 생명주기 기능을 사용할 수 있게 해주는 강력한 기능입니다. useState, useEffect...',
    },
    {
      id: 3,
      title: 'TypeScript로 타입 안전성 확보하기',
      authorName: '박타입',
      authorImage: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD...', // 실제 base64 이미지 데이터로 대체해야 합니다
      authorUUID: '550e8400-e29b-41d4-a716-446655440002',
      content:
        '<p>TypeScript를 사용하면 JavaScript 프로젝트에 정적 타입을 추가할 수 있습니다. 이는 개발 단계에서 많은 버그를 잡아내고...</p>',
      previewText:
        'TypeScript를 사용하면 JavaScript 프로젝트에 정적 타입을 추가할 수 있습니다. 이는 개발 단계에서 많은 버그를 잡아내고...',
    },
  ]

  return {
    props: {
      posts: tempPosts,
    },
  }
}
