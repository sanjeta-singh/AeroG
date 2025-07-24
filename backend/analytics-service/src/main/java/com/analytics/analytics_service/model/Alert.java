package com.analytics.analytics_service.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Document(collection = "alerts")   // auto-created on first insert
public class Alert {
    @Id private String id;
    private String aircraftId;
    private String type;          // OVERHEAT, BRAKE WEAR TOO HIGH, LOW HYDRAULIC PRESSURE
    private String parameter;     // engine_temp, brake_wear, hydraulic_pressure
    private double value;
    private double threshold;
    private Instant timestamp;
}