# Use the official Node.js image as the build stage
FROM node:14 as build-stage

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application's dependencies
RUN npm install

# Copy the rest of the application's code into the working directory
COPY . .

# Build the React application
RUN npm run build

# Use the official Nginx image as the production stage
FROM nginx:1.21

# Copy the build output from the build stage to the Nginx directory
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose the Nginx server's port
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
