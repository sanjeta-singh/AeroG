FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY target/data-ingestion-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-Dspring.kafka.consumer.bootstrap-servers=kafka:29092","-jar","/app/app.jar"]