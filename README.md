✈ Flight Monitoring System — Detailed Architecture

① Python Telemetry Producer (csv-producer container)
A lightweight Python program simulates an aircraft’s live sensor data stream by randomly generating flight parameters such as altitude, airspeed, engine temperature, and fuel level. For each new telemetry reading, the producer serializes the data into a JSON message and publishes it to the Kafka topic aerog-data using Kafka’s internal hostname kafka:29092, ensuring reliable delivery inside the Docker network. The producer continuously emits fresh values, mimicking real-time aircraft telemetry feed behavior.

② Kafka Broker (kafka container)
Apache Kafka acts as the central event-streaming backbone for the system. When a JSON message arrives from the producer, Kafka stores it in the aerog-data topic on a persistent partition, guaranteeing ordered storage and high write throughput. Messages remain in the topic until consumed by downstream microservices, enabling decoupled and scalable data processing. Kafka ensures durability, fault tolerance, and the ability for multiple consumers to independently read the same stream.

③ Ingestion Service (Spring Boot microservice)
On startup, the ingestion-service automatically connects to Kafka, subscribes to the aerog-data topic starting from the earliest offset to capture every event, and listens for new telemetry messages in real time. Each Kafka message is deserialized into a strongly typed POJO model. Before database insertion, the service enriches the record with a unique MongoDB _id. It then writes the processed telemetry into the raw_telemetry collection in Azure Cosmos DB (Mongo API), providing scalable document storage optimized for high-volume time-series data.

④ Analytics Service (Spring Boot microservice)
Running in parallel, this service independently consumes the same aerog-data Kafka topic, ensuring a separation of concerns between raw data storage and real-time evaluation. The analytics engine applies domain rules — for example, detecting abnormal conditions such as engine_temperature > 440°C, resulting in a MEDIUM severity alert. When triggered, the service constructs a structured alert payload containing rule details, timestamp, aircraft ID, and severity. These alerts are then written to the alerts collection in Azure Cosmos DB for immediate access by user-facing applications.

⑤ React Monitoring Dashboard (outside current compose)
A front-end web UI continuously calls the Spring Boot REST API (typically every 1 second) to fetch the latest alerts from Cosmos DB. New alert entries are displayed in easily readable dashboard widgets or rotating status cards to give operators a live situational view of aircraft health. This ensures aircrew or engineers can quickly react to anomalies detected by the real-time analytics engine.
