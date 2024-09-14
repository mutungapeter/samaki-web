# Stage 1: Install dependencies and build the Next.js app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Set up the production environment
FROM node:18-alpine AS runner

# Set NODE_ENV to production
ENV NODE_ENV production
ENV NEXT_PUBLIC_SERVER_URI = "http://34.173.224.151:8001/apis"

# Set working directory
WORKDIR /app

# Copy the built app from the previous stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public

# Install only production dependencies
RUN npm install --only=production

# Expose port 3000
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]
