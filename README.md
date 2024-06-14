### EvalApi
EvalApi is a Node.js/Express backend API for Eval, a platform where service providers can rate homeowners. This project provides a robust and secure server-side implementation for the Eval application.

Checkout the front-end - [Eval Client](https://github.com/partapparam/evalClient)


### Features
- RESTful API endpoints for managing ratings and user profiles.
- Authentication and authorization using JWT.
- Integration with a MongoDB database.

### Getting Started
- Prerequisites
  - Node.js
  - Docker

### Using Docker
- Build and run the Docker containers:
```bash
  docker-compose up --build
```
This will start the application and its dependencies in Docker containers.

### Development Environment
This project uses a development container for consistent development environments. To set up the development container:

- Ensure Docker is installed and running.
- Open the project in VS Code and run the Remote-Containers: Reopen in Container command.

### GitHub Actions
This repository uses GitHub Actions for continuous integration and deployment. These were built for open source project I was contributing to and my goal is to bring in some of their process to better use the CI/CD pipeline.
The workflows are defined in the .github/workflows directory.


