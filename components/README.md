# Components

이 디렉토리는 프로젝트의 재사용 가능한 React 컴포넌트들을 포함합니다.

## 구조

- `common/`: 앱 전반에 걸쳐 사용되는 공통 컴포넌트
- `layout/`: 레이아웃 관련 컴포넌트
- `forms/`: 폼 관련 컴포넌트
- `ui/`: UI 요소 컴포넌트

## 사용 가이드라인

- 각 컴포넌트는 자체 폴더 내에 위치하며, 관련 스타일과 테스트 파일을 포함합니다.
- 프롭스 타입을 명확히 정의하고 문서화하세요.
- 가능한 한 순수 함수형 컴포넌트를 사용하세요.

## 예시

```jsx
// Button.js
export const Button = ({ children, onClick }) => (
  <button onClick={onClick}>{children}</button>
)
```
