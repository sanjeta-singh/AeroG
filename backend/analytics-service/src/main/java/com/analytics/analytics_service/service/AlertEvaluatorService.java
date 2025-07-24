package com.analytics.analytics_service.service;

import com.analytics.analytics_service.model.SensorData;
import com.analytics.analytics_service.producer.AlertProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AlertEvaluatorService {

    private final AlertProducer alertProducer;

    public void evaluate(SensorData data) {
        System.out.println("Evaluating: " + data);

        if (data.getEngine_temp() > 1000) {
            alertProducer.sendAlert(
                    data.getAircraft_id(),
                    "OVERHEAT",
                    "engine_temp",
                    data.getEngine_temp(),
                    1000.0);
        }

        if (data.getBrake_wear() > 0.7) {
            alertProducer.sendAlert(
                    data.getAircraft_id(),
                    "BRAKE WEAR TOO HIGH",
                    "brake_wear",
                    data.getBrake_wear(),
                    0.7);
        }

        if (data.getHydraulic_pressure() < 2500) {
            alertProducer.sendAlert(
                    data.getAircraft_id(),
                    "LOW HYDRAULIC PRESSURE",
                    "hydraulic_pressure",
                    data.getHydraulic_pressure(),
                    2500.0);
        }
    }
}