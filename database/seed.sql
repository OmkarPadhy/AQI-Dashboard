DROP TABLE IF EXISTS air_quality_readings;

CREATE TABLE air_quality_readings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  timestamp timestamptz DEFAULT now(),
  pm25 float NOT NULL,
  pm10 float NOT NULL,
  temperature float NOT NULL,
  humidity float NOT NULL,
  device_id text NOT NULL,
  confidence float DEFAULT 1.0
);

INSERT INTO air_quality_readings (pm25, pm10, temperature, humidity, device_id, confidence)
VALUES
(42, 78, 30.5, 62, 'device_01', 0.95),
(55, 90, 31.1, 60, 'device_01', 0.92),
(68, 110, 32.0, 58, 'device_01', 0.88),
(75, 130, 33.2, 55, 'device_01', 0.85);
