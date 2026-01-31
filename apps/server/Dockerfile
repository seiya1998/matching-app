FROM node:24.13.0 AS build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV TZ=Asia/Tokyo
RUN corepack enable
RUN apt-get update -y && apt-get install -y ca-certificates tzdata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN pnpm install -g typescript
ENV PATH="/root/.npm-global/bin:$PATH"
WORKDIR /app
COPY ./apps/server/package.json /app/package.json
COPY ./apps/server/pnpm-lock.yaml /app/pnpm-lock.yaml
COPY ./apps/server/.npmrc /app/.npmrc
RUN pnpm install --frozen-lockfile
COPY ./apps/server/src /app/src
COPY ./apps/server/tsconfig.json /app/tsconfig.json
COPY ./apps/server/tsconfig.build.json /app/tsconfig.build.json
COPY ./apps/server/prisma /app/prisma
RUN pnpm prisma:generate
RUN pnpm build

FROM node:24.13.0-slim
ENV TZ=Asia/Tokyo
RUN apt-get update -y && apt-get install -y openssl tzdata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
COPY --from=build /app/dist /dist/
COPY --from=build /app/package.json /package.json
COPY --from=build /app/node_modules /node_modules/
COPY --from=build /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
CMD ["node", "/dist/index.js"]
EXPOSE 8080