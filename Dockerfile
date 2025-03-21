FROM harbor.registry.com/library/node:20.15.0-bullseye-slim-amd64 AS base

# deps-builder
FROM base AS deps-builder

WORKDIR /app

RUN npm install -g pnpm@9.5.0 --registry=https://registry.npmmirror.com

COPY . .

RUN pnpm install --registry=https://registry.npmmirror.com && \
    cd /app/packages/mobile && \
    pnpm build

# runner
FROM base AS runner

WORKDIR /app

COPY --from=deps-builder /app/packages/mobile/build ./build

CMD ["bash", "-c", "while true; do echo 5; sleep 2; done"]
