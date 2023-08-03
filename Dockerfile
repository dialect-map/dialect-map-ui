# Base image
FROM node:18.16-alpine

# Set working directory
WORKDIR /app


# Copy dependency files
COPY package.json /app
COPY package-lock.json /app

# Install dependencies
RUN npm install-clean --omit=dev && \
    npm install --global serve && \
    npm cache clean --force

# Copy all files
COPY . /app


# Build for production
RUN npm run build --silent


# State application exposed port
EXPOSE 5000

# Start app
CMD ["/bin/sh", "-c", "./scripts/parse-env.sh && serve --listen tcp://0.0.0.0:5000 --single 'build'"]
