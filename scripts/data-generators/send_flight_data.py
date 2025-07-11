import pandas as pd
import time
from kafka import KafkaProducer
import json

# STEP 1: Load CSV
csv_path = "aircraft_data.csv"
df = pd.read_csv(csv_path)

# STEP 2: Initialize Kafka Producer
producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

# STEP 3: Simulate sending data to Kafka
def simulate_aircraft_data():
    for index, row in df.iterrows():
        data = row.to_dict()  # Convert row to dictionary
        print(f"📤 Sending to Kafka: {data}")
        producer.send('aerog-flight-data', value=data)
        time.sleep(2)

# STEP 4: Run it
if __name__ == "__main__":
    simulate_aircraft_data()

