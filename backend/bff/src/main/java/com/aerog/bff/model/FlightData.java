package com.aerog.bff.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "flight_data")
public class FlightData {
    private double engineTemp;
    private double brakeWear;
    private int hydraulicPressure;
    private int flightHours;
    private double fuelEfficiency;
    private int airspeed;
    private int altitude;
    private int outsideTemp;
    private String failureLabel;
}