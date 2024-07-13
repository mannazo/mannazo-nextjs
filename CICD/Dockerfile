# 최신 LTS Node.js 이미지 사용
FROM node:20.11.1-alpine

# 작업 디렉토리 설정
WORKDIR /app

# Jenkins에서 빌드된 결과물 복사
COPY .next ./.next
COPY public ./public
COPY package.json ./
COPY pnpm-lock.yaml ./  # pnpm lock 파일 추가

# 포트 설정
EXPOSE 3000

# 애플리케이션 실행
CMD ["node", "server.js"]