package com.analytics.analytics_service.producer;

import com.analytics.analytics_service.model.Alert;
import com.analytics.analytics_service.repository.AlertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class AlertProducer {

    private final AlertRepository repository;

    /* 5-minute bucket = epoch seconds / 300 */
    /* 5-minute bucket = epoch seconds / 300 */
    private static long fiveMinuteBucket(long epochSec) {      // NEW signature
        return epochSec / 300;
    }

    public void sendAlert(String aircraftId,
                          String type,
                          String parameter,
                          double value,
                          double threshold,
                          String urgency,
                          String flightStatus,
                          String telemetryTimestamp) {   // epoch seconds as String

        try {
            long epochSec = Long.parseLong(telemetryTimestamp);
            String id = aircraftId + '-' + fiveMinuteBucket(epochSec) + '-' + type;

            Alert alert = new Alert();
            alert.setId(id);
            alert.setAircraftId(aircraftId);
            alert.setType(type);
            alert.setParameter(parameter);
            alert.setValue(value);
            alert.setThreshold(threshold);
            alert.setTimestamp(Instant.ofEpochSecond(epochSec)); // use telemetry time
            alert.setUrgency(urgency);
            alert.setFlightStatus(flightStatus);

            repository.save(alert);
            System.out.println("Persisted alert: " + alert);
        } catch (NumberFormatException e) {
            // Bad or missing timestamp -> skip saving to avoid noisy/burst inserts
            System.out.println("Skipping alert due to invalid telemetry timestamp: " + telemetryTimestamp);
        }
    }
}

