package com.aerog.bff.repository;

import com.aerog.bff.model.Alert;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AlertRepository extends MongoRepository<Alert, String> {
}