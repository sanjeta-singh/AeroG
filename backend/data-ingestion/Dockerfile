FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/data-ingestion-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-Dspring.kafka.consumer.bootstrap-servers=kafka:29092","-jar","/app/app.jar"]