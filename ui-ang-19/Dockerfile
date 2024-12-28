# Use an official Node.js image to build the app
FROM node:22-alpine AS build

# Set the working directory
# The WORKDIR /app is just a directory inside the container where the build process happens. It doesn't need to reflect your actual project's directory structure (e.g., /src/app) because:
# During the build process, all files from your project (ui-ang-19) are copied into this /app directory.
WORKDIR /app

# Copy package.json and package-lock.json - used for layer caching and improving build time
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all of the app's source code
COPY . .

# Build the Angular app
RUN npm run build

# Use an official Nginx image to serve the app
FROM nginx:alpine

# Set working directory for Nginx
# the WORKDIR path in your Dockerfile refers to the filesystem inside the Docker container,  not your host system (Windows, macOS, or Linux)
WORKDIR /usr/share/nginx/html

# Copy built Angular app from the build stage to Nginx's default directory
COPY --from=build /app/dist/ui-ang-19/browser/* ./

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]


### Build container with below in bash while in ui-ang-19 folder
# docker build -t ui-ang-19 .

### Run the container with
# docker run -d -p 8080:80 --name angular-DanUI-container ui-ang-19

# http://localhost:8080

# for a list of active containers and their size
# docker images

# TO EXPLORE THE CONTAINER FILE SYSTEM
# docker ps 
#docker exec -it ui-ang-19 sh
# ls
# cd /usr/share/nginx/html
# altough index.html is in the directory the angular index.html and main.js are in the html/browser directory
    # therefor why seeing nginx splash instead of angular app on localhost:8080
# exit
