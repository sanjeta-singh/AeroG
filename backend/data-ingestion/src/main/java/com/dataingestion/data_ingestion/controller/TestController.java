package com.dataingestion.data_ingestion.controller;

import com.dataingestion.data_ingestion.model.FlightData;
import com.dataingestion.data_ingestion.repository.FlightDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @Autowired
    private FlightDataRepository repo;

    @GetMapping("/test-insert")
    public String testInsert() {
        FlightData data = FlightData.builder()
                .engineTemp(100.0)
                .brakeWear(0.5)
                .hydraulicPressure(2500)
                .flightHours(4000)
                .fuelEfficiency(0.7)
                .airspeed(700)
                .altitude(30000)
                .outsideTemp(-20)
                .failureLabel("no_issue")
                .build();

        repo.save(data);
        return "Inserted";
    }
}
