# 최신 LTS Node.js 이미지 사용
FROM node:22.4.0-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 빌드된 결과물과 필요한 파일 복사
COPY package.json pnpm-lock.yaml ./
COPY .next ./.next
COPY public ./public
COPY next.config.mjs ./
COPY node_modules ./node_modules

# 의존성 설치
# RUN npm install -g pnpm && pnpm install --prod

# 프로덕션 모드
ENV NODE_ENV production

# 포트 설정
EXPOSE 3000

# 애플리케이션 실행
CMD ["npx", "next", "start"]