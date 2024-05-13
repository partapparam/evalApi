# This is a Dockerfile for the Development Container

# Use the Node base image
ARG VARIANT="node:20"
FROM mcr.microsoft.com/devcontainers/typescript-node:20 AS eval-api-dev-base

USER vscode

# Set the working directory for the app
WORKDIR /workspaces/eval-api

# Use a multi-stage build to install dependencies
FROM eval-api-dev-base AS eval-api-dev-dependencies

# Copy only the dependency files for installation
COPY package.json package.json
COPY package-lock.json package-lock.json

# copy all files
COPY . . 

# Install the Poetry dependencies (this layer will be cached as long as the dependencies don't change)
RUN npm install --upgrade