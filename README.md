# AeroG Project Analysis

## Overview
AeroG is a microservices-based application designed to monitor and analyze aircraft data in real-time. The system ingests flight telemetry, processes it for alerts and status updates via Kafka and Spring Boot services, and visualizes the data on a React dashboard.

## Workflow & Architecture

![AeroG Architecture](docs/Telemetry%20Producer%20Kafka-2025-12-15-080824.png)
The project follows an event-driven architecture with the following data flow:

1.  **Core Infrastructure (Kafka & Zookeeper)**:
    *   **Foundation**: The project is built around **Apache Kafka** as the central event streaming backbone.
    *   **Zookeeper** handles the cluster coordination and state management.
    *   This "Always-On" layer ensures that data producers and consumers are fully decoupled; the producer doesn't need to know who is listening.

2.  **Data Ingestion Layer**:
    *   **Ingestion Service**: Serves as the **Persistent Gateway**. It validates incoming data (from CSVs or APIs) and pushes it to Kafka. Crucially, it also acts as the "Data Lake" writer, saving a raw copy of every single message to **MongoDB** for historical replay and audit.
    *   **Python Producer**: Simulates external systems (aircraft sensors) by pumping live JSON telemetry into the system.

3.  **Real-time Processing (Analytics)**:
    *   The **Analytics Service** subscribes to the `aerog-data` topic.
    *   It filters the noise and **interprets** the data, checking for threshold breaches (alerts) and updating the "current state" of the fleet.
    *   Verified results are written to a separate collection/db logic in MongoDB for fast retrieval.

4.  **Integration Layer (BFF)**:
    *   The **Backend-for-Frontend** sits between the raw database and the UI.
    *   It abstracts complexity, aggregating data from multiple MongoDB collections into clean, frontend-ready JSON responses (REST API).

5.  **Docker Orchestration**:
    *   **Containerization**: Every backend component (Ingestion, Analytics, Kafka, Zookeeper) is containerized using **Docker**.
    *   **Networking**: Services communicate via a dedicated Docker network, using service names (e.g., `kafka:29092`) instead of IP addresses.
    *   **Consistency**: This ensures the entire environment runs identically on any machine, eliminating "it works on my machine" issues.

6.  **Visualization Layer (Frontend)**:
    *   The **React Dashboard** provides the human interface.
    *   It continuously polls the BFF to display real-time gauges, charts, and critical alerts to the end-user.

## Project Services (`pipeline-compose.yml`)

The `pipeline-compose.yml` file defines the core backend and infrastructure services:

| Service Name | Port | Description |
| :--- | :--- | :--- |
| **zookeeper** | `2181` | Coordination service for Kafka. |
| **kafka** | `9092` / `29092` | Event streaming platform. `9092` is exposed to the host (localhost). `29092` is used internally by other Docker services. |
| **ingestion-service** | `8081` | Core data entry service. Seeds data on startup AND persists all live Kafka stream data to MongoDB. Builds from `backend/data-ingestion`. |
| **analytics-service** | `8082` | Intelligence service. Evaluates live stream for alerts and business rules. Builds from `backend/analytics-service`. |
| **csv-producer** | N/A | Python script (`scripts/data-generators`) that continuously produces flight data to Kafka. |

> **Note**: The **Frontend** and **BFF** (running on port `8087`) are part of the ecosystem but are not currently defined in `pipeline-compose.yml`. They typically run locally or via a separate configuration.

## Backend Technical Stack
*   **Framework**: Spring Boot (Java)
*   **Messaging**: Apache Kafka
*   **Database**: MongoDB (Cloud Hosted)
*   **Containerization**: Docker & Docker Compose

## Frontend Technical Stack
*   **Framework**: React.js
*   **Connections**: REST API (polling via `fetch`)

## How to Run (Backend Pipeline)
To start the core data infrastructure and background services (Kafka, Zookeeper, Ingestion, Analytics):
```bash
docker-compose -f pipeline-compose.yml up --build
```

## How to Run (User-Facing Services)
The **Frontend** and **BFF** are designed to be run separately (often for development convenience or separate deployment lifecycles).

### 1. Backend-for-Frontend (BFF)
This service connects the Frontend to the MongoDB database.
```bash
cd backend/bff
./mvnw spring-boot:run
# Runs on port 8087
```

### 2. Frontend (React)
This is the visualization dashboard.
```bash
cd frontend
npm install
npm start
# Opens at http://localhost:3000
```

## Architecture Note: Why are these separate?
You might notice that `pipeline-compose.yml` only includes the data processing layer. This is intentional:
*   **Pipeline Scope**: `pipeline-compose.yml` is dedicated to the "Always-On" **Data Pipeline** (Ingestion -> Kafka -> Processing -> Storage). These services form the stable backbone of the system.
*   **Development Cycle**: The **Frontend** and **BFF** are user-facing components that often require frequent updates, hot-reloading (for React), and different scaling strategies. Keeping them separate allows developers to iterate on the UI without restarting the heavy Kafka infrastructure.
