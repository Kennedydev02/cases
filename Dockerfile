# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.18.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM node:${NODE_VERSION}-slim as build

WORKDIR /app

# Install build dependencies
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential \
    node-gyp \
    pkg-config \
    python-is-python3

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Create .env file from environment variables
RUN echo "REACT_APP_FIREBASE_API_KEY=$REACT_APP_FIREBASE_API_KEY" >> .env && \
    echo "REACT_APP_FIREBASE_AUTH_DOMAIN=$REACT_APP_FIREBASE_AUTH_DOMAIN" >> .env && \
    echo "REACT_APP_FIREBASE_PROJECT_ID=$REACT_APP_FIREBASE_PROJECT_ID" >> .env && \
    echo "REACT_APP_FIREBASE_STORAGE_BUCKET=$REACT_APP_FIREBASE_STORAGE_BUCKET" >> .env && \
    echo "REACT_APP_FIREBASE_MESSAGING_SENDER_ID=$REACT_APP_FIREBASE_MESSAGING_SENDER_ID" >> .env && \
    echo "REACT_APP_FIREBASE_APP_ID=$REACT_APP_FIREBASE_APP_ID" >> .env

# Build the application
RUN npm run build

# Production stage
FROM node:${NODE_VERSION}-slim

WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy built files from build stage
COPY --from=build /app/build ./build

# Expose port 8080 (Fly.io preferred port)
EXPOSE 8080

# Start the application on port 8080
CMD ["serve", "-s", "build", "-l", "8080"]
