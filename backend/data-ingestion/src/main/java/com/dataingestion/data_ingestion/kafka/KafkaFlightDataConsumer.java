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

                // Split the line into parts
                String[] parts = line.split(",");
                System.out.println("parts.length = " + parts.length);
                System.out.println("parts = " + Arrays.toString(parts));

                // ✅ SKIP header line (if accidentally sent through Kafka)
                if (parts[0].trim().equalsIgnoreCase("engine_temp")) {
                    System.out.println("Header row detected — skipping.");
                    return;
                }

                // Check if the line has exactly 10 parts
                if (parts.length != 10) {
                    System.err.println("Invalid message length: " + parts.length + " - " + Arrays.toString(parts));
                    return;
                }

                // Create a new FlightData object from the parts
                FlightData data = FlightData.builder()
                        .aircraftId(parts[9].trim())                                  // ✅ aircraftID is at index 9
                        .engineTemp(Double.parseDouble(parts[0].trim()))              // ✅ engine_temp is at index 0
                        .brakeWear(Double.parseDouble(parts[1].trim()))               // ✅ brake_wear is at index 1
                        .hydraulicPressure(Integer.parseInt(parts[2].trim()))         // ✅
                        .flightHours(Integer.parseInt(parts[3].trim()))               // ✅ "4108"
                        .fuelEfficiency(Double.parseDouble(parts[4].trim()))          // ✅ "0.72"
                        .airspeed(Integer.parseInt(parts[5].trim()))
                        .altitude(Integer.parseInt(parts[6].trim()))
                        .outsideTemp(Integer.parseInt(parts[7].trim()))
                        .failureLabel(parts[8].trim())                                // ✅
                        .build();



                System.out.println("Saving to MongoDB...");

                // Save the data to MongoDB
                System.out.println("Checking MongoDB connection...");
                System.out.println("Repo count (before insert): " + flightDataRepository.count());

                flightDataRepository.save(data);
                System.out.println("Saved successfully");

            } catch (Exception e) {
                e.printStackTrace(); // Shows full error in terminal
            }
        }
    }
