#!/bin/bash
# Human Patient Monitoring System - API Testing Examples
# These curl commands demonstrate how to interact with the n8n webhook endpoint
# for sending vital signs data from ESP32 or other IoT devices

# Set your n8n webhook URL (replace with your actual ngrok or server URL)
N8N_WEBHOOK_URL="https://your-n8n-instance.ngrok.io/webhook/esp-vitals"

echo "🏥 Human Patient Monitoring System - API Testing"
echo "================================================"
echo "N8N Webhook URL: $N8N_WEBHOOK_URL"
echo ""

# Test 1: Normal vital signs
echo "📊 Test 1: Normal vital signs for Room 101"
curl -X POST "$N8N_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "device_key": "dev-101-monitor",
    "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)'",
    "temperature": 36.8,
    "spo2": 98,
    "bpm": 72,
    "blood_pressure_systolic": 120,
    "blood_pressure_diastolic": 80,
    "respiratory_rate": 16,
    "ecg": {
      "samples": [0.1, 0.3, 0.8, 1.2, 0.9, 0.4, 0.1, -0.1, 0.0, 0.1],
      "sample_rate": 500
    }
  }'

echo -e "\n"

# Test 2: Warning level vitals
echo "⚠️  Test 2: Warning level vitals for Room 102"
curl -X POST "$N8N_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "device_key": "dev-102-monitor",
    "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)'",
    "temperature": 38.2,
    "spo2": 92,
    "bpm": 95,
    "blood_pressure_systolic": 145,
    "blood_pressure_diastolic": 92,
    "respiratory_rate": 22,
    "ecg": {
      "samples": [0.1, 0.4, 0.9, 1.4, 1.1, 0.5, 0.1, -0.1, 0.0, 0.1],
      "sample_rate": 500
    }
  }'

echo -e "\n"

# Test 3: Critical vitals
echo "🚨 Test 3: Critical vitals for Room 103"
curl -X POST "$N8N_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "device_key": "dev-103-monitor",
    "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)'",
    "temperature": 39.5,
    "spo2": 85,
    "bpm": 140,
    "blood_pressure_systolic": 180,
    "blood_pressure_diastolic": 110,
    "respiratory_rate": 28,
    "ecg": {
      "samples": [0.2, 0.5, 1.1, 1.8, 1.5, 0.7, 0.2, -0.2, 0.0, 0.2],
      "sample_rate": 500
    }
  }'

echo -e "\n"

# Test 4: Pulse oximeter data only
echo "💓 Test 4: Pulse oximeter data for Room 201"
curl -X POST "$N8N_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "device_key": "dev-201-pulse",
    "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)'",
    "spo2": 96,
    "bpm": 78
  }'

echo -e "\n"

# Test 5: Batch data (multiple readings)
echo "📈 Test 5: Batch vital signs data for Room 202"
curl -X POST "$N8N_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "device_key": "dev-202-monitor",
    "batch": true,
    "readings": [
      {
        "timestamp": "'$(date -u -d '5 minutes ago' +%Y-%m-%dT%H:%M:%S.%3NZ)'",
        "temperature": 36.9,
        "spo2": 97,
        "bpm": 74
      },
      {
        "timestamp": "'$(date -u -d '4 minutes ago' +%Y-%m-%dT%H:%M:%S.%3NZ)'",
        "temperature": 37.0,
        "spo2": 96,
        "bpm": 76
      },
      {
        "timestamp": "'$(date -u -d '3 minutes ago' +%Y-%m-%dT%H:%M:%S.%3NZ)'",
        "temperature": 37.1,
        "spo2": 95,
        "bpm": 78
      }
    ]
  }'

echo -e "\n"

# Test 6: Device status update
echo "🔧 Test 6: Device status update for Room 301"
curl -X POST "$N8N_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "device_key": "dev-301-monitor",
    "device_status": {
      "status": "active",
      "battery_level": 78,
      "last_seen": "'$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)'",
      "firmware_version": "2.1.4"
    }
  }'

echo -e "\n"

# Test 7: Error condition simulation
echo "❌ Test 7: Device error condition for Room 302"
curl -X POST "$N8N_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "device_key": "dev-302-monitor",
    "error": {
      "code": "SENSOR_FAILURE",
      "message": "Temperature sensor not responding",
      "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)'"
    }
  }'

echo -e "\n"

# Test 8: Simulated ESP32 data with WiFi info
echo "📡 Test 8: ESP32 device data with WiFi info"
curl -X POST "$N8N_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "device_key": "esp32-bed-001",
    "device_info": {
      "mac_address": "24:6F:28:AB:CD:EF",
      "ip_address": "192.168.1.100",
      "wifi_rssi": -45,
      "free_heap": 123456,
      "uptime": 3600
    },
    "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)'",
    "temperature": 37.2,
    "spo2": 94,
    "bpm": 82,
    "ecg": {
      "samples": [0.15, 0.35, 0.85, 1.25, 0.95, 0.45, 0.15, -0.05, 0.05, 0.15],
      "sample_rate": 500,
      "quality": "good"
    }
  }'

echo -e "\n"

echo "✅ All test requests sent!"
echo ""
echo "📝 Notes:"
echo "- Replace N8N_WEBHOOK_URL with your actual n8n webhook endpoint"
echo "- Ensure your n8n workflow is configured to handle these payloads"
echo "- Check your Supabase dashboard for inserted data"
echo "- Monitor the dashboard for real-time updates"
echo ""
echo "🔗 Setup Instructions:"
echo "1. Set up n8n with webhook trigger"
echo "2. Configure n8n to insert data into Supabase"
echo "3. Use ngrok to expose n8n if running locally: ngrok http 5678"
echo "4. Update N8N_WEBHOOK_URL with your ngrok URL"
echo ""
echo "💡 ESP32 Integration:"
echo "Use these examples as reference for your ESP32 code to send"
echo "HTTP POST requests with patient vital signs data."