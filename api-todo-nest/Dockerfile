
# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]



### Build container with below in bash while in api-todo-nest folder
# docker build -t api-todo-nest .

### Run the container with
# -d means detached mode - Runs the container in the background (detached mode). - The terminal will not be attached to the container's output, allowing you to continue using the terminal for other tasks.
# -p means port mapping - Maps a port on your host machine to a port inside the container.
# docker run -d -p 1200:120 --name api-todo-nest api-todo-nest - Syntax: -p <host_port>:<container_port>.
# docker run -d -p 3003:3000 api-todo-nest











# # Use an official Node.js image to build the app
# FROM node:22-alpine AS build

# # Set the working directory
# # The WORKDIR /app is just a directory inside the container where the build process happens. It doesn't need to reflect your actual project's directory structure (e.g., /src/app) because:
# # During the build process, all files from your project (api-todo-nest) are copied into this /app directory.
# WORKDIR /app

# # Copy package.json and package-lock.json - used for layer caching and improving build time
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy all of the app's source code
# COPY . .

# # Build the Angular app
# RUN npm run build

# # Use an official Nginx image to serve the app
# FROM nginx:alpine

# # Copy Nginx configuration
# COPY nginx.conf /etc/nginx/nginx.conf

# # Set working directory for Nginx
# # the WORKDIR path in your Dockerfile refers to the filesystem inside the Docker container,  not your host system (Windows, macOS, or Linux)
# # WORKDIR /usr/share/nginx/html

# # Copy built Angular app from the build stage to Nginx's default directory
# COPY --from=build /app/dist /usr/share/nginx/html

# # Expose port 120
# EXPOSE 120

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]











### Build container with below in bash while in api-todo-nest folder
# docker build -t api-todo-nest .

### Run the container with
# docker run -d -p 1200:120 --name api-todo-nest api-todo-nest

# http://localhost:9090

# for a list of active containers and their size
# docker images

# TO EXPLORE THE CONTAINER FILE SYSTEM
# docker ps 
#docker exec -it api-todo-nest sh
# ls
# cd /usr/share/nginx/html
# altough index.html is in the directory the angular index.html and main.js are in the html/browser directory
    # therefor why seeing nginx splash instead of angular app on localhost:8080
# exit
