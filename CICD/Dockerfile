# 최신 LTS Node.js 이미지 사용 (Next.js 14.2.4와 호환)
FROM node:20.11.1-alpine

# 작업 디렉토리 설정
WORKDIR /app

# Jenkins에서 빌드된 결과물 복사
COPY .next ./.next
COPY public ./public
COPY package.json ./

# 프로덕션 실행에 필요한 의존성만 설치
RUN npm install --only=production

# 포트 설정
EXPOSE 3000

# 애플리케이션 실행
CMD ["npm", "start"]