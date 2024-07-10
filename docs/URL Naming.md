URL Segment Naming 에서 단수형과 복수형 네이밍에 대한 명확한 규칙은 없지만, 일반적으로 다음과 같은 기준을 고려합니다.

1. 일관성:
   가장 중요한 것은 선택한 규칙을 일관되게 적용하는 것입니다.

2. RESTful 규칙:

   - 복수형을 사용하는 것이 RESTful API 설계의 일반적인 관행입니다.
   - 예: /users, /products, /orders

3. 리소스의 특성:

   - 컬렉션을 나타내는 경우: 복수형 사용
     예: /articles, /comments
   - 단일 리소스를 나타내는 경우: 단수형 사용
     예: /profile, /dashboard

4. 의미적 명확성:

   - 복수형이 더 명확한 경우: /news (뉴스 항목들의 집합)
   - 단수형이 더 자연스러운 경우: /about, /contact

5. 비가산 명사:

   - 'information', 'feedback' 같은 비가산 명사는 단수형 사용
   - 예: /information, /feedback

6. 동사 기반 액션:

   - 동사로 표현되는 액션은 주로 단수형 사용
   - 예: /login, /logout, /register

7. 계층 구조:

   - /user/{id}/posts - 특정 사용자의 게시물 목록
   - /post/{id}/comments - 특정 게시물의 댓글 목록

8. 업계 표준:
   - 해당 도메인에서 일반적으로 사용되는 용어 준수

권장 사항:

- 복수형을 기본으로 사용하되, 의미상 단수형이 더 적절한 경우 예외 적용
- 팀 내에서 합의된 규칙을 문서화하고 일관되게 적용
- API 버저닝을 고려하여 설계
