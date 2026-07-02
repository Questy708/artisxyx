# ─── Railway / Docker multi-stage build for xCelero Labs (Next.js 16 + Prisma) ──
# Fixes "Application failed to respond" on Railway by:
#  1. Using bun consistently (project uses bun.lock)
#  2. Running prisma generate at build time
#  3. Copying the generated Prisma client into standalone output
#  4. Setting HOSTNAME=0.0.0.0 so Railway's health check can reach the server
#  5. Using `node server.js` at runtime (standalone server is a Node script)
#  6. Creating a /data directory for SQLite (mount a Railway volume there)

# ═══ Stage 1: Install deps ═══
FROM oven/bun:1 AS deps
WORKDIR /app

# Copy prisma schema BEFORE install — postinstall runs "prisma generate"
# which needs the schema file to exist.
COPY package.json bun.lock* ./
COPY prisma ./prisma
RUN bun install --frozen-lockfile

# ═══ Stage 2: Build ═══
FROM oven/bun:1 AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client BEFORE build so Next.js can trace it into standalone
RUN bunx prisma generate

# Build Next.js (output: "standalone" in next.config.ts creates .next/standalone)
RUN bun run build

# Copy the generated Prisma client into standalone (Next.js tracing misses it)
# This prevents "Cannot find module @prisma/client" at runtime
RUN cp -r node_modules/.prisma ./.next/standalone/node_modules/.prisma 2>/dev/null || \
    (mkdir -p .next/standalone/node_modules/.prisma && \
     cp -r node_modules/.prisma/* .next/standalone/node_modules/.prisma/)
RUN cp -r node_modules/@prisma ./.next/standalone/node_modules/@prisma 2>/dev/null || \
    (mkdir -p .next/standalone/node_modules/@prisma && \
     cp -r node_modules/@prisma/* .next/standalone/node_modules/@prisma/)

# ═══ Stage 3: Runtime (minimal) ═══
FROM oven/bun:1 AS runtime
WORKDIR /app

ENV NODE_ENV=production
# Railway assigns PORT via env var — Next.js standalone reads process.env.PORT
ENV PORT=3000
# CRITICAL: bind to 0.0.0.0 not localhost, so Railway's external health check works
ENV HOSTNAME=0.0.0.0

# Copy standalone server + static assets + public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Copy Prisma schema (needed at runtime for query engine path resolution)
COPY --from=builder /app/prisma ./prisma

# Create writable directory for SQLite (mount a Railway Volume at /data)
RUN mkdir -p /data

EXPOSE 3000

# Use `node` not `bun` — the standalone server.js is a Node script and this
# avoids any bun runtime edge cases with Next.js server.
CMD ["node", "server.js"]
