package com.analytics.analytics_service.model;

import lombok.Data;

@Data
public class SensorData {
    // inside SensorData class
    private String aircraft_id;
    private double engine_temp;
    private double brake_wear;
    private int hydraulic_pressure;
    private int flight_hours;
    private double fuel_efficiency;
    private int airspeed;
    private int altitude;
    private int outside_temp;
    private String failure_label;
}
