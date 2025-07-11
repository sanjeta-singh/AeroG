/*
package com.dataingestion.data_ingestion;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    @KafkaListener(topics = "aerog-flight-data")
    public void consume(ConsumerRecord<String, String> record) {
        String message = record.value();
        System.out.println("Received: " + message);
    }
}
*/
