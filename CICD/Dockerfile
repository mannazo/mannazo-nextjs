# 최신 LTS Node.js 이미지 사용
FROM node:22.4.0-alpine

# 작업 디렉토리 설정
WORKDIR /app

# .npmrc 파일 복사
COPY .npmrc ./

# 빌드된 결과물과 필요한 파일 복사
COPY .next ./.next
COPY package.json package-lock.json ./

# 포트 설정
EXPOSE 3000

# 애플리케이션 실행
CMD ["npm", "start"]