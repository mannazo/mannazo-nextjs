# 최신 LTS Node.js 이미지 사용
FROM node:22.4.0-alpine

# pnpm 설치
RUN npm install -g pnpm

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 pnpm-lock.yaml 복사
COPY package.json pnpm-lock.yaml ./

# Next.js와 필요한 의존성만 설치
RUN pnpm install --prod

# 빌드된 결과물과 필요한 파일 복사
COPY .next ./.next
COPY public ./public
COPY next.config.mjs ./

ENV NODE_ENV production

# 포트 설정
EXPOSE 3000

# 애플리케이션 실행
CMD ["pnpm", "start"]