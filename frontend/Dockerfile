# ---- Stage 1: Build React App ----
FROM node:18-alpine AS build

WORKDIR /app

# Copy dependency files from frontend directory
COPY frontend/package*.json .  

RUN npm config set registry https://registry.npmjs.org/

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy frontend source code
COPY frontend/ .  

# Build the React app
RUN npm run build

# ---- Stage 2: Serve using Nginx ----
FROM nginx:stable-alpine

# Remove default Nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy custom Nginx config from root dir
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built frontend from previous stage
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
