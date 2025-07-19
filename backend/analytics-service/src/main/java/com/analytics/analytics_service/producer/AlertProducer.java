package com.analytics.analytics_service.producer;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AlertProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final String ALERT_TOPIC = "alerts";

    public void sendAlert(String alertMessage) {
        System.out.println("Sending alert: " + alertMessage);
        kafkaTemplate.send(ALERT_TOPIC, alertMessage);
    }
}
