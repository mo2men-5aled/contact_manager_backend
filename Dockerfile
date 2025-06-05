# Use Node base image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the code
COPY . .

# Build TypeScript
RUN npm run build

RUN mkdir -p dist/src/docs
COPY src/docs/swagger.yaml dist/src/docs/swagger.yaml

# Expose port
EXPOSE 5000

# Start the app
CMD ["node", "dist/server.js"]
