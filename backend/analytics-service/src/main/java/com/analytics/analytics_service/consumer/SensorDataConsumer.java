package com.analytics.analytics_service.consumer;

import com.analytics.analytics_service.model.SensorData;
import com.analytics.analytics_service.service.AlertEvaluatorService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SensorDataConsumer {

    private final AlertEvaluatorService evaluatorService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @KafkaListener(topics = "aerog-data", groupId = "analytics-group")
    public void listen(String message) {
        System.out.println("Received from aerog-data: " + message);
        try {
            SensorData data = objectMapper.readValue(message, SensorData.class);
            evaluatorService.evaluate(data);
        } catch (Exception e) {
            System.out.println("Failed to parse JSON: " + message);
            e.printStackTrace();
        }
    }
}
