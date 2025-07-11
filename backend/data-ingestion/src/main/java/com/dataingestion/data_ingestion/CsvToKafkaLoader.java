package com.dataingestion.data_ingestion;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@Component
public class CsvToKafkaLoader implements ApplicationRunner {

    private final KafkaTemplate<String, String> kafkaTemplate;

    public CsvToKafkaLoader(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        Path path = Path.of("C:\\Users\\Sanjay Singh\\AeroG\\scripts\\data-generators\\aircraft_data.csv");


        List<String> lines = Files.readAllLines(path);

        for (String line : lines) {
            kafkaTemplate.send("aerog-data", line);
            System.out.println("Sent to Kafka: " + line);
        }
    }
}
