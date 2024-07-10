# Utilities

이 디렉토리는 프로젝트 전반에 걸쳐 사용되는 유틸리티 함수들을 포함합니다.

## 카테고리

(예시)

- `formatters/`: 날짜, 통화 등의 포맷팅 함수
- `validators/`: 입력 유효성 검사 함수
- `helpers/`: 기타 헬퍼 함수

## 사용 가이드라인

- 각 유틸리티 함수는 순수 함수여야 합니다.
- 함수명은 그 기능을 명확히 표현해야 합니다.
- 복잡한 로직의 경우 주석을 추가하세요.

## 예시

```javascript
// formatters/date.js
export const formatDate = (date, format = 'YYYY-MM-DD') => {
  // 날짜 포맷팅 로직
}
```
