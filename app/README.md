# 라우팅 전략

```
- 서비스 홈
	- /
- 서비스 소개
	- /about
- 회원
	- /profile
	- /profile/feedback
	- /profile/history
- 세팅
	- /setting/profile
- 여행
	- /post/trend/{} : 서비스에서 글이 많이 올라오는 여행지 (차트)
	- /post/card/{} : 숏폼형 여행자/로컬 찾기 (피드)
	- /post/list/{} : 데스크탑을 위한 다단형 여행자 찾기 (피드)
	- /post/map/{} : 지도 기반으로 여행자 표시 (지도)
	- /post/gallery/{} : 여행자가 올리는 사진 피드 (피드)
	- /post/tip/{} : 현지인이 올리는 여행 팁 (게시판)
- 쇼핑
	- /shop/guide/{} : 현지인이 올리는 여행 가이드 (가이드에게 지불하고 서비스 구매가능)
	- /shop/item/{} : 여행객을 위한 굿즈 판매 (만나주 굿즈)
- 채팅
	- /chat (또는 다른 페이지에 삽입된 컴포넌트) : LLM 기반 챗봇 연결
- 어드민
	- /admin : 어드민 (로그인필요)
	- /admin/sign-in
	- /admin/stat : 통계 (차트)
```

# 앱 라우팅 사용 예시

App Router를 사용하기 위한 방법은 `code` 경로를 참조하세요.
