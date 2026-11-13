FROM node:24-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable && pnpm install --prod --frozen-lockfile

COPY src ./src

ENV NODE_ENV=production

EXPOSE 3000

CMD ["pnpm", "start"]
