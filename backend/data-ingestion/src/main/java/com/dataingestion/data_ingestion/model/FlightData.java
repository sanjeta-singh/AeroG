package com.dataingestion.data_ingestion.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "flight_data")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FlightData {

    @Id
    private String id; // This will be managed by MongoDB

    private double engineTemp;
    private double brakeWear;
    private int hydraulicPressure;
    private int flightHours;
    private double fuelEfficiency;
    private int airspeed;
    private int altitude;
    private int outsideTemp;
    private String failureLabel;
    private String aircraftId;
    private String timestamp;
    private String flightStatus;
    private String location;
}

/*@Document(collection = "flight_data")
@Data @Builder
public class FlightData {
    private String aircraftId;   // ← new column
    private Double engineTemp;
    private Double brakeWear;
    private Integer hydraulicPressure;
    private Integer flightHours;
    private Double fuelEfficiency;
    private Integer airspeed;
    private Integer altitude;
    private Integer outsideTemp;
    private String failureLabel;
}
3. Update the parser in KafkaFlightDataConsumer
        java
        Copy
@KafkaListener(topics = "aerog-data", groupId = "aerog")
public void listen(String payload) {
        String[] parts = payload.split(",");
        if (parts.length != 10) return;  // expect 10 columns now

        FlightData data = FlightData.builder()
        .aircraftId(parts[0].trim())
        .engineTemp(Double.parseDouble(parts[1].trim()))
        .brakeWear(Double.parseDouble(parts[2].trim()))
        .hydraulicPressure(Integer.parseInt(parts[3].trim()))
        .flightHours(Integer.parseInt(parts[4].trim()))
        .fuelEfficiency(Double.parseDouble(parts[5].trim()))
        .airspeed(Integer.parseInt(parts[6].trim()))
        .altitude(Integer.parseInt(parts[7].trim()))
        .outsideTemp(Integer.parseInt(parts[8].trim()))
        .failureLabel(parts[9].trim())
        .build();

        flightDataRepository.save(data);
        }
        4. Re-deploy / re-run
        Docker (fresh data):
        bash
        Copy
        docker compose down
        docker compose up --build
        Local (fresh data):
        bash
        Copy
        mvn clean package -DskipTests
        mvn spring-boot:run
        Every record will now contain aircraftId and will be inserted into MongoDB Atlas as new documents.
        Copy
        Share
@Id
private String id; // Auto-generated
        should i delete this line from model?
        Copy
        Keep the @Id line.
        Spring Data requires it to create the primary key (_id) for MongoDB.
        Without it the repository will not know which field is the identifier, and you’ll get “Unable to determine a field that represents the identifier”.
        So do not delete it.
        Copy
        Share
        but im already putting aircraftid so why do i need it ?
        Copy
        Because aircraftId is business data (can repeat, can be missing, can change), while @Id is technical metadata (must be unique and immutable).
        If you want aircraftId to be the MongoDB _id, do this:
        java
        Copy
@Id
private String aircraftId;
        Then remove the extra private String id; field.
        Spring will use aircraftId as the primary key and MongoDB will enforce uniqueness for it.
        Copy
        Share*/

