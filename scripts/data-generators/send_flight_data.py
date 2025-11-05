import csv, os, time, json, random
from kafka import KafkaProducer
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

CSV_PATH = "aircraft_data.csv"
TOPIC    = "aerog-data"

producer = KafkaProducer(
    bootstrap_servers="kafka:29092",
    value_serializer=lambda v: v  # raw bytes
)

# ---------- realistic pools ----------
AIRCRAFT_FAMILIES = [
    "A320", "A321", "A319", "A350", "A330",
    "B737", "B738", "B739", "B787", "B777",
    "CRJ700", "CRJ900", "E190", "E195"
]
AIRPORTS = ["DEL", "BOM", "BLR", "MAA", "COK", "PNQ", "GOI", "IXC", "CCU", "HYD"]

def generate_aircraft_id():
    family = random.choice(AIRCRAFT_FAMILIES)
    tail   = ''.join(random.choices('ABCDEFGHIJKLMNOPQRSTUVWXYZ', k=3))
    return f"{family}-{tail}"

def generate_row():
    return {
        "engine_temp"        : random.randint(350, 450),
        "brake_wear"         : random.randint(0, 100),
        "hydraulic_pressure" : random.randint(2800, 3200),
        "flight_hours"       : random.randint(8000, 12000),      # int only
        "fuel_efficiency"    : random.randint(50, 80),           # int only
        "airspeed"           : random.randint(220, 280),
        "altitude"           : random.randint(15000, 35000),
        "outside_temp"       : random.randint(-60, -30),
        "failure_label"      : random.choice(["NONE","LOW","MEDIUM","HIGH","EMERGENCY"]),
        "aircraft_id"        : generate_aircraft_id(),
        "timestamp"          : int(time.time()),
        "flight_status"      : random.choice(["IN_FLIGHT","LANDING","ON_GROUND"]),
        "location"           : random.choice(AIRPORTS)
    }

# ---------- watchdog tailer (optional) ----------
class CsvTailer(FileSystemEventHandler):
    def __init__(self, path):
        self.path   = path
        self.offset = os.stat(path).st_size

    def on_modified(self, evt):
        if evt.src_path.endswith(os.path.basename(self.path)):
            print("file modified event:", evt.src_path, flush=True)
            with open(self.path, "r", newline="") as f:
                f.seek(self.offset)
                for row in csv.DictReader(f):
                    producer.send(TOPIC, json.dumps(row).encode('utf-8'))
                    print("Sent JSON:", json.dumps(row), flush=True)
                self.offset = f.tell()

# ---------- kick-off ----------
if __name__ == "__main__":
    try:
        print("=== producer started ===", flush=True)
        handler = CsvTailer(CSV_PATH)
        obs = Observer()
        obs.schedule(handler, "/app", recursive=False)
        obs.start()

        with open(CSV_PATH, "a", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=generate_row().keys())
            if os.stat(CSV_PATH).st_size == 0:
                writer.writeheader()
            while True:
                row = generate_row()
                writer.writerow(row)
                f.flush()
                producer.send(TOPIC, json.dumps(row).encode('utf-8'))
                print("Sent JSON:", json.dumps(row), flush=True)
                time.sleep(0.5)
    except Exception as e:
        print("CRASH:", e, flush=True)
        raise