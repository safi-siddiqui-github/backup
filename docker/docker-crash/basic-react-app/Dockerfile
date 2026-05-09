# Base image
FROM node:alpine3.20

# create a user with permission to run the app
# -S - Create a system user
# -G - add user to the group
# this is done to avoid running the app as root
# if app i srun in root, any vulneribility in the app can be exploited to gain access to the host system
# Its good practive to run the app as non-root user
RUN addgroup app && adduser -S -G app app

# Set the user to run the app
USER app

# Set the working directory to /app
WORKDIR /app

# Copy pakcage json files to working directory
# this is done before copying the rest of the files to take advantage of docker's cache
# if package.json fiels havent changes, docker will use the cache dependencies
COPY package*.json ./

# sometimes the owneship of the files in working directory is changed to root
# and thus the app cant accessthe files and throw an error
# EACCESS: permission denied
# to avoid this, change the ownership of the files to root user
USER root

# change the ownership of the /app directory to the app user
# chown -R <user>:<group> <directory>
# chown commadn changes the uer and/or group ownership for given file
RUN chown -R app:app .

# Change the user back to app user
USER app

# install dependencies
RUN npm install

# Copy the rest of files to working directory
COPY . .

# expose port 5173 to tell docker
# the container listens to specified network port at runtime
EXPOSE 5173

# command to run the app
CMD npm run dev
