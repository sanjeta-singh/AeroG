package com.aerog.bff.controller;

import com.aerog.bff.repository.FlightDataRepository;
import com.aerog.bff.repository.AlertRepository;
import org.springframework.web.bind.annotation.*;
import com.aerog.bff.model.FlightData;
import com.aerog.bff.model.Alert;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Page;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class BffController {

    private final FlightDataRepository flightRepo;
    private final AlertRepository alertRepo;

    public BffController(FlightDataRepository flightRepo, AlertRepository alertRepo) {
        this.flightRepo = flightRepo;
        this.alertRepo = alertRepo;
    }

    @GetMapping("/aircraft")
    public List<FlightData> aircraft() {
        return flightRepo.findAll();   // entire collection
    }

    @GetMapping("/alerts")
    public List<Alert> alerts() {
        return alertRepo.findAll();    // entire collection
    }