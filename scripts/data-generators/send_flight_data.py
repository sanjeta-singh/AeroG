# scripts/data-generators/send_flight_data.py
import pandas as pd
import time
import json
from kafka import KafkaProducer

csv_path = "aircraft_data.csv"
df = pd.read_csv(csv_path)

# keep original 9 columns
df.columns = [
    "engine_temp", "brake_wear", "hydraulic_pressure",
    "flight_hours", "fuel_efficiency", "airspeed",
    "altitude", "outside_temp", "failure_label"
]

# 501 unique tail numbers (non-repeating)
TAIL_NUMBERS = [
    f"{model}-{i:03d}"
    for model in ["A320", "A330", "A350", "B737", "B777", "B787", "E190", "E195"]
    for i in range(1, 64)
][:501]

try:
    producer = KafkaProducer(
       bootstrap_servers='kafka:9092',        value_serializer=lambda v: json.dumps(v).encode('utf-8')
    )
    print("Connected to Kafka broker at kafka:9092")
except Exception as e:
    print(f"Failed to connect: {e}")
    exit(1)

def simulate_aircraft_data():
    for idx, row in df.iterrows():
        data = row.to_dict()
        data["aircraft_id"] = TAIL_NUMBERS[idx]
        print("Sending:", data)
        producer.send('aerog-data', value=data)
        time.sleep(0.1)

if __name__ == "__main__":
    simulate_aircraft_data()
    producer.flush()
    print("All 501 rows sent with unique aircraft_id.")