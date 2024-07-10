# NextJS App Router 예시

NextJS의 App Router 사용 예시

```
code/
  README.md
  layout.tsx
  page.tsx
  loading.tsx
  not-found.tsx
  error.tsx
  page.module.css
  [slug]/
    page.tsx
  blog/
    [[...slug]]/
      page.tsx
```

## 파일 구조 설명

- `layout.tsx`: 전체 레이아웃을 정의합니다. 모든 페이지에 적용됩니다.

  - 적용 스코프: 전체 애플리케이션

- `page.tsx`: 루트 경로 ('/')의 페이지 컴포넌트입니다.

  - 적용 스코프: 루트 URL ('/')

- `loading.tsx`: 페이지나 컴포넌트가 로딩 중일 때 표시됩니다.

  - 적용 스코프: 해당 폴더와 하위 폴더의 모든 라우트

- `not-found.tsx`: 404 에러 페이지입니다.

  - 적용 스코프: 해당 폴더와 하위 폴더의 모든 라우트

- `error.tsx`: 에러 발생 시 표시되는 페이지입니다.

  - 적용 스코프: 해당 폴더와 하위 폴더의 모든 라우트

- `page.module.css`: CSS 모듈 예시 파일입니다.

  - 적용 스코프: 이 CSS 모듈을 import하는 컴포넌트

- `[slug]/page.tsx`: 동적 라우팅 예시입니다. (예: /products/1, /products/2)

  - 적용 스코프: '/[slug]' 패턴의 모든 URL (예: /product/1, /product/2)

- `blog/[[...slug]]/page.tsx`: 선택적 캐치올 라우팅 예시입니다. (예: /blog, /blog/2023, /blog/2023/01)
  - 적용 스코프: '/blog'로 시작하는 모든 URL (예: /blog, /blog/2023, /blog/2023/01)

각 파일의 자세한 설명은 해당 파일 내의 주석을 참조하세요.

## 주의사항

- `layout.tsx`, `loading.tsx`, `not-found.tsx`, `error.tsx`는 해당 폴더와 모든 하위 폴더에 적용됩니다.
  하위 폴더에 동일한 파일이 있으면 해당 폴더부터는 하위 폴더의 파일이 우선 적용됩니다.

- 동적 라우팅 (`[slug]`)과 캐치올 라우팅 (`[[...slug]]`)은 URL의 구조에 따라 적절히 선택하여 사용해야 합니다.

- CSS 모듈 (`.module.css`)은 컴포넌트 레벨의 스타일링을 제공하며, 클래스 이름 충돌을 방지합니다.
