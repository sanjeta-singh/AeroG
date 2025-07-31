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
}
