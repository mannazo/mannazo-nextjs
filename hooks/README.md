# Hooks

이 디렉토리는 커스텀 React 훅을 포함합니다.

## 사용 가이드라인

- 각 훅은 단일 책임 원칙을 따라야 합니다.
- 훅 이름은 'use'로 시작해야 합니다.
- (TypeScript 전환하는 경우) TypeScript를 사용하는 경우, 입력과 출력 타입을 명확히 정의하세요.

## 예시

```javascript
// useLocalStorage.js
export const useLocalStorage = (key, initialValue) => {
  // 훅 구현
};