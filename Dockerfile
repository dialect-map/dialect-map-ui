# Base image
FROM node:13.3.0-alpine

# Set working directory and copy files
WORKDIR /app
COPY . /app

# Install dependencies and web server
RUN npm install --silent
RUN npm install --global serve

# Build for production
RUN npm run build --silent

# Tell Docker about the port `serve` will expose on
EXPOSE 5000

# Start app
CMD serve -s build
