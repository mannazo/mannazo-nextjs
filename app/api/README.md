# API 디렉토리 구조 설명

프로젝트 루트에 위치한 `api/` 디렉토리는 서버리스 API 함수를 위한 공간입니다. 이 디렉토리는 `app/` 디렉토리와 동등한 레벨에 위치하며, 백엔드 로직을 구현하는 데 사용됩니다.

## 주요 특징

1. 위치: 프로젝트 루트 디렉토리 (app/ 디렉토리와 같은 레벨)
2. 용도: 서버리스 API 엔드포인트 구현
3. 파일 명명 규칙: `route.js` 또는 `route.ts`

## 디렉토리 구조 예시

```
/
├── app/
│   └── ...
├── api/
│   ├── hello/
│   │   └── route.js
│   ├── users/
│   │   ├── [id]/
│   │   │   └── route.js
│   │   └── route.js
│   └── auth/
│       └── [...nextauth]/
│           └── route.js
└── ...
```

## 파일 설명

1. `api/hello/route.js`

   - `/api/hello` 엔드포인트를 처리합니다.
   - 간단한 "Hello, World!" API나 상태 확인용으로 사용할 수 있습니다.

2. `api/users/route.js`

   - `/api/users` 엔드포인트를 처리합니다.
   - 사용자 목록 조회, 새 사용자 생성 등의 작업을 수행할 수 있습니다.

3. `api/users/[id]/route.js`

   - `/api/users/:id` 형태의 동적 라우트를 처리합니다.
   - 특정 사용자 정보 조회, 수정, 삭제 등의 작업을 수행할 수 있습니다.

4. `api/auth/[...nextauth]/route.js`
   - NextAuth.js와 같은 인증 라이브러리를 사용할 때 필요한 캐치올 라우트입니다.
   - 다양한 인증 관련 엔드포인트를 처리합니다.

## 사용 방법

각 `route.js` 파일에서는 HTTP 메서드에 따른 함수를 export하여 API 로직을 구현합니다.

예시:

```javascript
export async function GET(request) {
  // GET 요청 처리 로직
}

export async function POST(request) {
  // POST 요청 처리 로직
}
```

## 주의사항

이 api/ 디렉토리의 파일들은 서버에서만 실행되며, 클라이언트 번들에 포함되지 않습니다.
민감한 정보(DB 접속 정보, API 키 등)를 안전하게 다룰 수 있는 공간입니다.
App Router의 기능(레이아웃, 로딩 UI 등)은 이 API 라우트에 적용되지 않습니다.
