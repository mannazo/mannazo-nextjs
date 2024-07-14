# 최신 LTS Node.js 이미지 사용
FROM node:22.4.0-alpine

# pnpm 설치
RUN npm install -g pnpm

# 작업 디렉토리 설정
WORKDIR /app

# 빌드된 결과물과 필요한 파일 복사
COPY .next ./
COPY package.json ./
COPY pnpm-lock.yaml ./

# 프로덕션 의존성 설치
RUN pnpm install --prod

# 포트 설정
EXPOSE 3000

# 애플리케이션 실행
CMD ["npm", "start"]