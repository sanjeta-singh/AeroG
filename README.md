✈️ How the AeroG Data Ingestion Pipeline Works
1. Sensor Data Generation
A data generator script simulates aircraft telemetry (e.g., engine temperature, fuel efficiency, altitude). This is packaged into a Docker container and continuously produces data records in CSV string format.

Each record looks like:
72.5,12.0,3000,1200,8.5,550,35000,-40,Normal

2. Kafka Topic (aerog-data)
The generated data is published to a Kafka topic named aerog-data. Kafka acts as a message broker, allowing decoupling between producers (data generator) and consumers (data processors).
Kafka is running in a Docker container
It’s coordinated by Zookeeper (also containerized)

3. Kafka Consumer (Spring Boot Ingestion Service)
A Spring Boot application subscribes to the aerog-data Kafka topic. This service is also containerized and configured to connect to kafka:29092 (the Docker network hostname for Kafka).
What it does:
Reads each Kafka message (CSV string)
Splits the string by comma
Validates the length and format
Maps it into a FlightData object (with fields like engineTemp, brakeWear, altitude, etc.)

4. Data Storage (MongoDB)
After parsing, the Spring Boot app stores each flight data object in MongoDB using a repository class. MongoDB may be running in a separate container or on the host, depending on your setup.

5. Logging & Debugging
The consumer service logs:
Every received message
Parsed values
Success or failure of saving to MongoDB
Repository counts before/after insert (for monitoring)

6. Docker Orchestration
All components — Kafka, Zookeeper, data generator, ingestion service — are run via Docker Compose, which:
Spins up all services together
Handles container networking automatically
Makes inter-service communication possible using service names (e.g., kafka:29092)
