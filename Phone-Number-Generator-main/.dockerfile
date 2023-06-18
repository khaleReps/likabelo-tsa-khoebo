# Use the official Node.js image as the base image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to /app
COPY . .

# Set environment variables for MongoDB connection
ENV MONGO_URI mongodb+srv://techteam:1234567890@cluster0.13yxblj.mongodb.net/test

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
