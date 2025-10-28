# Use official Node.js LTS base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy app source
COPY . .

# Expose port (app reads PORT env var)
EXPOSE 4000

# Start the app
CMD ["node", "index.js"]
