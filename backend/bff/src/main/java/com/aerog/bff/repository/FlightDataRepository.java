package com.aerog.bff.repository;

import com.aerog.bff.model.FlightData;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FlightDataRepository extends MongoRepository<FlightData, String> {
}