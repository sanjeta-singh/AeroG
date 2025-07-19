import pandas as pd
import time
from kafka import KafkaProducer
import json

# Load the CSV
csv_path = "aircraft_data.csv"
df = pd.read_csv(csv_path)

# Ensure headers match Java field names (optional cleanup)
df.columns = [
    "engine_temp", "brake_wear", "hydraulic_pressure",
    "flight_hours", "fuel_efficiency", "airspeed",
    "altitude", "outside_temp", "failure_label"
]

# Initialize Kafka Producer
try:
    producer = KafkaProducer(
        bootstrap_servers='kafka:9092',
        value_serializer=lambda v: json.dumps(v).encode('utf-8')
    )
    print("Connected to Kafka broker at kafka:9092")
except Exception as e:
    print(f"Failed to connect to Kafka broker: {e}")
    exit(1)

# Simulate streaming
def simulate_aircraft_data():
    for _, row in df.iterrows():
        data = row.to_dict()
        print("Sending:", data)
        producer.send('aerog-data', value=data)
        time.sleep(1)  # You can reduce this for faster testing

# Run
if __name__ == "__main__":
    simulate_aircraft_data()