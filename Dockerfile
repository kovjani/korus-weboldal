# Use a lightweight Node.js base image
FROM node:20-alpine AS builder

# Set a working directory
WORKDIR /app

# Install dependencies first (leverages build cache)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build artifacts
COPY . ./
RUN npm run build && \
    mkdir -p dist-server/server/views && \
    cp -R src/server/views/* dist-server/server/views/

# --------------------------------------------------------
# Runtime image (smaller surface area, production-ready)
# --------------------------------------------------------
FROM node:20-alpine AS runner
WORKDIR /app

# Copy just the runtime assets
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
RUN npm ci  # Install all deps for development support

# Copy built output + public assets
COPY --from=builder /app/dist-server ./dist-server
COPY --from=builder /app/public ./public

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist-server/server/app.js"]
