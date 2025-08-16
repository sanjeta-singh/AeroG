package com.aerog.bff.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.Data;

@Data
@Document(collection = "flight_data")
public class FlightData {
    @Field("aircraftId")   // maps the MongoDB key "aircraftId"
    private String aircraftId;

    private double engineTemp;
    private double brakeWear;
    private int hydraulicPressure;
    private int flightHours;
    private double fuelEfficiency;
    private int airspeed;
    private int altitude;
    private int outsideTemp;
    private String failureLabel;
    private String timestamp;        // ISO-8601 string
    private String flightStatus;     // e.g. ON_GROUND
    private String location;
}