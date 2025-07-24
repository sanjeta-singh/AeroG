package com.analytics.analytics_service.repository;

import com.analytics.analytics_service.model.Alert;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AlertRepository extends MongoRepository<Alert, String> { }