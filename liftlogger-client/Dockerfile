# Use Node.js as the base image
FROM node:14

# Set the working directory
WORKDIR /application

COPY . /application

RUN npm i -g @angular/cli

# Install dependencies
RUN npm install

# Build the Angular application
RUN npm run build

# Expose the port 4200 to run the application
EXPOSE 4200

# Set the default command to run the built Angular application
CMD ["npm", "start"]
