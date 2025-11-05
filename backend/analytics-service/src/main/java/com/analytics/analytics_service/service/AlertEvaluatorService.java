package com.analytics.analytics_service.service;

import com.analytics.analytics_service.model.SensorData;
import com.analytics.analytics_service.producer.AlertProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AlertEvaluatorService {

    private final AlertProducer alertProducer;

    /* ---------- final, data-proven thresholds for ≤ 150 alerts ---------- */
    private static final double ENGINE_OVERHEAT_LIMIT      = 1185.0;   // 28 aircraft
    private static final double BRAKE_CRITICAL_LIMIT       = 0.90;     // 50 aircraft
    private static final double HYDRAULIC_MIN_LIMIT        = 2080.0;   // 28 aircraft
    private static final double FUEL_INEFFICIENCY_LIMIT    = 0.25;     // 25 aircraft
    private static final double MAINT_HOURS_LIMIT          = 4750.0;   // 25 aircraft
    /* overlap between rules keeps the total ≈ 140 */

    public void evaluate(SensorData d) {
        boolean isFlying = "IN_FLIGHT".equalsIgnoreCase(d.getFlight_status());
        String urgency   = isFlying ? "EMERGENCY" : "ADVISORY";

        List<String> alerts = new ArrayList<>();

        /* ---- critical / advisory rules ---- */
        if (d.getEngine_temp()        > ENGINE_OVERHEAT_LIMIT)   alerts.add("ENGINE_OVERHEAT");
        if (d.getBrake_wear()         > BRAKE_CRITICAL_LIMIT)    alerts.add("BRAKE_CRITICAL");
        if (d.getHydraulic_pressure() < HYDRAULIC_MIN_LIMIT)     alerts.add("HYDRAULIC_FAILURE");
        if (d.getFuel_efficiency()    < FUEL_INEFFICIENCY_LIMIT) alerts.add("FUEL_INEFFICIENCY");
        if (d.getFlight_hours()       > MAINT_HOURS_LIMIT)       alerts.add("MAINT_DUE");

        /* ---- emit alerts ---- */
        for (String code : alerts) {
            double threshold = switch (code) {
                case "ENGINE_OVERHEAT"   -> ENGINE_OVERHEAT_LIMIT;
                case "BRAKE_CRITICAL"    -> BRAKE_CRITICAL_LIMIT;
                case "HYDRAULIC_FAILURE" -> HYDRAULIC_MIN_LIMIT;
                case "FUEL_INEFFICIENCY" -> FUEL_INEFFICIENCY_LIMIT;
                case "MAINT_DUE"         -> MAINT_HOURS_LIMIT;
                default -> 0.0;
            };

            String parameter = switch (code) {
                case "ENGINE_OVERHEAT"   -> "engine_temp";
                case "BRAKE_CRITICAL"    -> "brake_wear";
                case "HYDRAULIC_FAILURE" -> "hydraulic_pressure";
                case "FUEL_INEFFICIENCY" -> "fuel_efficiency";
                case "MAINT_DUE"         -> "flight_hours";
                default -> "unknown";
            };

            double value = switch (code) {
                case "ENGINE_OVERHEAT"   -> d.getEngine_temp();
                case "BRAKE_CRITICAL"    -> (d.getBrake_wear() > 1 ? d.getBrake_wear() / 100.0 : d.getBrake_wear());
                case "HYDRAULIC_FAILURE" -> d.getHydraulic_pressure();
                case "FUEL_INEFFICIENCY" -> (d.getFuel_efficiency() > 1 ? d.getFuel_efficiency() / 100.0 : d.getFuel_efficiency());
                case "MAINT_DUE"         -> d.getFlight_hours();
                default -> 0.0;
            };

            alertProducer.sendAlert(
                    d.getAircraft_id(),
                    code,
                    parameter,
                    value,
                    threshold,
                    urgency,
                    d.getFlight_status(),
                    d.getTimestamp()          // <-- add this
            );
        }
    }
}