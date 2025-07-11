package com.dataingestion.data_ingestion.repository;

import com.dataingestion.data_ingestion.model.FlightData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlightDataRepository extends MongoRepository<FlightData, String> {
    // You can add custom query methods here later if needed
}
