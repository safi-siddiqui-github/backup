# First Phase
# dev: This stage is designed for development. It installs dependencies and then copies all your files. 
# It exposes port 5173 (Vite's default dev server port) and starts the Vite dev server.

# 1️ Base Image for Development
FROM node:23-alpine AS dev

WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy all files (for development mode)
COPY . .

# Expose the port for Vite dev server
EXPOSE 5173

# Default command for development (Vite's dev server)
CMD ["npm", "run", "dev"]

# Middle Phase
# builder: This stage is used to build the production-ready version of your React app.
# It installs dependencies and then runs npm run build.
# 2️ Build Stage
FROM node:23-alpine AS builder

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all files and build the app
COPY . .
RUN npm run build

# Last Phase
# prod: This stage is the final image for production.
# It uses Nginx to serve the static files generated in the builder stage.
# 3️ Production Stage - Serve with Nginx
FROM nginx:1-alpine AS prod

# Copy build files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Default command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
