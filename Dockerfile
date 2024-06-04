# Use Node.js version 20.x
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 (assuming your application runs on port 3000)
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:dev"]
