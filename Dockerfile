# Use the official Node.js 18 image as the base image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a smaller base image for the runtime
FROM node:18-alpine AS runtime

# Set working directory
WORKDIR /app

# Copy built application and dependencies from the base stage
COPY --from=base /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./

# Expose port 5000
EXPOSE 5000

# Start the application
CMD ["node", "dist/index.js"]
