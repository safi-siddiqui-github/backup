# Base Image
FROM node:23-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install ALL dependencies (including dev dependencies)
RUN npm install

# Copy the rest of the files
COPY . .

# Production Stage (Smaller Final Image)
FROM node:23-alpine

# Set working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app .

# Expose the port Express runs on
EXPOSE 3000

# Default command (for production)
CMD ["npm", "run", "start"]
