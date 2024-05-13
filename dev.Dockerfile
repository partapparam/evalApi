# This is a Dockerfile for the Development Container

# Use the Node base image
FROM mcr.microsoft.com/devcontainers/typescript-node:20
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install git

# Set the working directory for the app
WORKDIR /workspace/eval-api
# Copy only the dependency files for installation
COPY package.json package.json
COPY package-lock.json package-lock.json
# copy all files
COPY . . 
RUN npm install