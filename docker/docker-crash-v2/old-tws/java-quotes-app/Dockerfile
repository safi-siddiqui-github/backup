#1 Base Image (OS)
FROM openjdk:17-jdk-alpine

#2 Working Directory
WORKDIR /app

#3 Copy Code from host to container
COPY src/Main.java Main.java
COPY quotes.txt quotes.txt

#4 Compile code
RUN javac Main.java

#5 Expose port for http
EXPOSE 8000

#6 Serve app / keep it running
CMD ["java", "Main"]
