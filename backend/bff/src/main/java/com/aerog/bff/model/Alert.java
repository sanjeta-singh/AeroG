package com.aerog.bff.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "alerts")
public class Alert {
    @Id private String id;
    private String aircraftId;
    private String type;
    private String parameter;
    private int value;
    private int threshold;
    private String timestamp;
}