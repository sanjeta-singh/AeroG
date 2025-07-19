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
            alertProducer.sendAlert("OVERHEAT: Engine temperature critical!");
        }

        if (data.getBrake_wear() > 0.7) {
            alertProducer.sendAlert("BRAKE WEAR TOO HIGH");
        }

        if (data.getHydraulic_pressure() < 2500) {
            alertProducer.sendAlert("LOW HYDRAULIC PRESSURE");
        }
    }
}
