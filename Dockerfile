# ===================================================
# Stage 1: Build & Dependencies
# ===================================================
FROM node:22-alpine AS builder

WORKDIR /app

# Enable corepack for pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy manifest & lockfile
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* .npmrc* ./

# Install all dependencies (including devDependencies needed for build)
RUN pnpm install --frozen-lockfile

# Copy source code and config
COPY . .

# Build production bundle with @sveltejs/adapter-node
RUN pnpm build

# Prune dev dependencies for lean runtime
RUN pnpm prune --prod

# ===================================================
# Stage 2: Production Runner
# ===================================================
FROM node:22-alpine AS runner

WORKDIR /app

# Run as non-root user for security
USER node

# Copy built application and production dependencies from builder
COPY --from=builder --chown=node:node /app/build ./build
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/package.json ./package.json

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:3000/', (res) => { process.exit(res.statusCode === 200 ? 0 : 1); });"

CMD ["node", "build"]
