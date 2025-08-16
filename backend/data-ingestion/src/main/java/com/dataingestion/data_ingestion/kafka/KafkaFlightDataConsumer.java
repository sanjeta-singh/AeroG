package com.dataingestion.data_ingestion.kafka;

import java.util.Arrays;
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

    @KafkaListener(topics = "aerog-data", groupId = "aerog")
    public void listen(ConsumerRecord<String, String> record) {
        try {
            String line = record.value().trim();
            System.out.println("Received: " + line);

            // Split the line into parts (keep it like your working version)
            String[] parts = record.value().trim().split(",", -1);
            System.out.println("parts.length = " + parts.length);
            System.out.println("parts = " + Arrays.toString(parts));

            // Skip header line if it sneaks in
            if (parts[0].trim().equalsIgnoreCase("engine_temp")) {
                System.out.println("Header row detected — skipping.");
                return;
            }

            // Expect exactly 13 fields as per your schema
            // engine_temp, brake_wear, hydra   ulic_pressure, flight_hours,
            // fuel_efficiency, airspeed, altitude, outside_temp,
            // failure_label, aircraftID, timestamp, flight_status, location
            if (parts.length != 13) {
                System.err.println("Invalid message length: " + parts.length + " - " + Arrays.toString(parts));
                return;
            }

            // Map exactly by your specified indexing
            FlightData data = FlightData.builder()
                    .id(null)
                    .engineTemp(Double.parseDouble(parts[0].trim()))
                    .brakeWear(Double.parseDouble(parts[1].trim()))
                    .hydraulicPressure(Integer.parseInt(parts[2].trim()))
                    .flightHours(Integer.parseInt(parts[3].trim()))
                    .fuelEfficiency(Double.parseDouble(parts[4].trim()))
                    .airspeed(Integer.parseInt(parts[5].trim()))
                    .altitude(Integer.parseInt(parts[6].trim()))
                    .outsideTemp(Integer.parseInt(parts[7].trim()))
                    .failureLabel(parts[8].trim())
                    .aircraftId(parts[9].trim())
                    .timestamp(parts[10].trim())
                    .flightStatus(parts[11].trim())
                    .location(parts[12].trim())
                    .build();

            System.out.println("Saving to MongoDB...");
            System.out.println("Repo count (before insert): " + flightDataRepository.count());
            flightDataRepository.save(data);
            System.out.println("Saved successfully");

        } catch (Exception e) {
            e.printStackTrace(); // Shows full error in terminal
        }
    }
}
