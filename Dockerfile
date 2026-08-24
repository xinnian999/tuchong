FROM node:22
LABEL maintainer="xinnian999"
LABEL org.opencontainers.image.source="https://github.com/xinnian999/tuchong"
LABEL org.opencontainers.image.title="Tuchong"
LABEL org.opencontainers.image.description="Tuchong (图虫), a local-first multi-model AI image generation tool"
WORKDIR /app
RUN npm i -g pnpm
COPY ./package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm build:node
EXPOSE 9999
CMD ["node", ".bin/node.js"]
