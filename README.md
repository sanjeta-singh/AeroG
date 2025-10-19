
① csv-producer (Python)  
   ├─ invents a fake aircraft row  
   ├─ appends it to /app/aircraft_data.csv  (container-local)  
   └─ immediately sends the same row as JSON to Kafka topic *aerog-data* via  
      bootstrap-server kafka:29092 (Docker internal name).

② Kafka (container “kafka”)  
   ├─ receives the JSON byte array  
   ├─ writes it to the *aerog-data* topic partition  
   └─ waits for consumers.

③ ingestion-service (Spring-Boot)  
   ├─ boots up, subscribes to *aerog-data* from offset “earliest”  
   ├─ deserializes JSON → POJO  
   ├─ adds a MongoDB _id  
   └─ inserts the document into *raw_telemetry* collection in Azure Cosmos DB.

④ analytics-service (Spring-Boot)  
   ├─ *reads the same topic independently*  
   ├─ runs rule engine (e.g. if engine_temp > 440 → MEDIUM alert)  
   ├─ builds an *alert* document  
   └─ inserts it into *alerts* collection in the same Cosmos DB.

⑤ React front-end (not shown in this compose)  
   ├─ polls Spring REST endpoint every second  
   ├─ endpoint queries *alerts* collection  
   └─ dashboard cards rotate with fresh alerts.

--------------------------------------------------------
3.  Network shortcuts
--------------------------------------------------------
- kafka:29092  – only works *inside Docker*; outside you’d use localhost:9092.  
- MongoDB URI uses the *public Azure hostname*, so it leaves Docker and goes over the internet.  
- No volume for csv-producer → CSV never lands on Windows → no disk flood.

--------------------------------------------------------
4.  What we actually see
--------------------------------------------------------
- Terminal logs: “Sent JSON: …” (csv-producer)  
- Terminal logs: “Saving telemetry …” (ingestion)  
- Terminal logs: “Alert created …” (analytics)  
- Browser: http://localhost:3000 rotating cards.

The CSV is just a *temporary buffer* inside the container; the *Kafka topic* is the real pipeline backbone.
