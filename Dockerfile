# stage 1: Build the app
FROM node:24-alpine3.21 AS builder
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the app
RUN npm run build

# stage 2: Runtime
FROM node:24-alpine3.21
WORKDIR /app

COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy build artifacts only (no dev stuff, no src, no test)
COPY --from=builder /app/dist ./dist

# Set environment
ENV NODE_ENV=production

EXPOSE 3000

# Start the app
CMD ["node", "dist/src/index.js"]
