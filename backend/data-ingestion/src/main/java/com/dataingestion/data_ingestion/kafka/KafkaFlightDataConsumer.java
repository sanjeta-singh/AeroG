package com.dataingestion.data_ingestion.kafka;

import com.fasterxml.jackson.databind.JsonNode;          // NEW
import com.fasterxml.jackson.databind.ObjectMapper;     // NEW
import com.dataingestion.data_ingestion.model.FlightData;
import com.dataingestion.data_ingestion.repository.FlightDataRepository;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaFlightDataConsumer {

    @Autowired
    private FlightDataRepository flightDataRepository;

    private final ObjectMapper mapper = new ObjectMapper();   // NEW

    @KafkaListener(topics = "aerog-data", groupId = "aerog")
public void listen(ConsumerRecord<String, String> record) {
    try {
        JsonNode root = mapper.readTree(record.value());

        if (root.get("aircraft_id") == null || root.get("timestamp") == null) {
            System.out.println("Skipping record due to missing aircraft_id/timestamp: " + record.value());
            return;
        }

        FlightData data = FlightData.builder()
                .id(null)
                .engineTemp(root.get("engine_temp").asDouble())
                .brakeWear(root.get("brake_wear").asDouble())
                .hydraulicPressure(root.get("hydraulic_pressure").asInt())
                .flightHours(root.get("flight_hours").asInt())
                .fuelEfficiency(root.get("fuel_efficiency").asDouble())
                .airspeed(root.get("airspeed").asInt())
                .altitude(root.get("altitude").asInt())
                .outsideTemp(root.get("outside_temp").asInt())
                .failureLabel(root.get("failure_label").asText())
                .aircraftId(root.get("aircraft_id").asText())
                .timestamp(root.get("timestamp").asText())
                .flightStatus(root.get("flight_status").asText())
                .location(root.get("location").asText())
                .build();

        flightDataRepository.save(data);
        System.out.println("Saved telemetry for aircraft " + data.getAircraftId());
    } catch (Exception e) {
        e.printStackTrace();
    }
}
}