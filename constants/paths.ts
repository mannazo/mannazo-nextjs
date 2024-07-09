//docs 경로의 'paths 관리 방법'을 참조하세요

//API 서버 주소
export const API_SERVER = 'https://mannazo.diligentp.com'

//라우팅을 위한 상수들
export const HOME = '/'
export const SAFETY = '/safety'

//여행자 조회하기
export const TRIP = '/trip'
export const TRIP_LIST_BY_LOCATION = `${TRIP}/list?location=:location`
export const TRIP_VIEW = `${TRIP}/:id`
export const TRIP_ADD_FORM = `${TRIP}/form`

//쭈니(로컬, 현지인) 조회하기
export const LOCAL = '/local'
export const LOCAL_LIST_BY_LOCATION = `${LOCAL}/list?location=:location`
export const LOCAL_VIEW_INTRO = `${LOCAL}/:id`

//채팅
export const CHAT = '/chat'
export const CHATLIST = `${CHAT}/list`

//Auth: 사인인, 사인아웃, 사인업
export const AUTH = '/auth'
export const AUTH_SIGN_IN = `${AUTH}/sign-in`
export const AUTH_SIGN_OUT = `${AUTH}/sign-out`
export const AUTH_SIGN_UP_FORM = `${AUTH}/sign-up-form`

//Profile: 회원정보 조회, 수정, 탈퇴 등
export const PROFILE = '/profile'
export const PROFILE_VIEW = `${PROFILE}/:id`

//MyPage: 나만 보는 개인정보 편집
export const MYPAGE = '/mypage'
export const ACCOUNT = 'account'
