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

    public void sendAlert(String aircraftId,
                          String type,
                          String parameter,
                          double value,
                          double threshold) {

        Alert alert = new Alert();
        alert.setAircraftId(aircraftId);
        alert.setType(type);
        alert.setParameter(parameter);
        alert.setValue(value);
        alert.setThreshold(threshold);
        alert.setTimestamp(Instant.now());

        repository.save(alert);
        System.out.println("Persisted alert: " + alert);
    }
}