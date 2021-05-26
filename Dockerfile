# Base image
FROM node:15.14-alpine

# Set working directory and copy files
WORKDIR /app
COPY . /app

# Install dependencies and web server
RUN npm install --silent --only=prod
RUN npm install --global serve

# Build for production
RUN npm run build --silent

# Tell Docker about the port `serve` will expose on
EXPOSE 5000

# Start app
CMD ["/bin/sh", "-c", "./scripts/parse-env.sh && serve --listen tcp://0.0.0.0:5000 --single 'build'"]
