"""
Medical Transport Route Optimizer API
Demonstrates AI-powered proximity-based driver assignment
Built for: Demo Portfolio Project
"""

from http.server import BaseHTTPRequestHandler
import json
import math
from datetime import datetime, timedelta
from typing import List, Dict, Tuple
import random

# Sample data for demo
DEMO_DRIVERS = [
    {
        "id": "driver-1",
        "name": "John Smith",
        "status": "available",
        "location": {"lat": 40.2732, "lng": -76.8867},  # Johnstown, PA area
        "vehicle": {
            "type": ["standard", "wheelchair"],
            "oxygenEquipped": True,
            "capacity": 2
        },
        "currentLoad": 0,
        "certifications": ["basic", "medical-attendant"]
    },
    {
        "id": "driver-2",
        "name": "Sarah Johnson",
        "status": "on-route",
        "location": {"lat": 40.2851, "lng": -76.8741},
        "vehicle": {
            "type": ["standard", "wheelchair", "stretcher"],
            "oxygenEquipped": True,
            "capacity": 1
        },
        "currentLoad": 1,
        "certifications": ["basic", "medical-attendant", "advanced"]
    },
    {
        "id": "driver-3",
        "name": "Mike Davis",
        "status": "available",
        "location": {"lat": 40.2692, "lng": -76.9012},
        "vehicle": {
            "type": ["standard"],
            "oxygenEquipped": False,
            "capacity": 3
        },
        "currentLoad": 0,
        "certifications": ["basic"]
    },
    {
        "id": "driver-4",
        "name": "Emily Brown",
        "status": "break",
        "location": {"lat": 40.2801, "lng": -76.8934},
        "vehicle": {
            "type": ["standard", "wheelchair"],
            "oxygenEquipped": True,
            "capacity": 2
        },
        "currentLoad": 0,
        "certifications": ["basic", "medical-attendant"]
    }
]

def calculate_distance(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
    """Calculate distance between two points in miles using Haversine formula"""
    R = 3959  # Earth's radius in miles
    
    lat1_rad = math.radians(lat1)
    lat2_rad = math.radians(lat2)
    delta_lat = math.radians(lat2 - lat1)
    delta_lng = math.radians(lng2 - lng1)
    
    a = (math.sin(delta_lat / 2) ** 2 +
         math.cos(lat1_rad) * math.cos(lat2_rad) *
         math.sin(delta_lng / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    
    distance = R * c
    return round(distance, 2)

def calculate_proximity_score(distance: float) -> float:
    """Score based on distance (0-100, higher is better)"""
    # Closer = higher score
    # 0 miles = 100, 10+ miles = 0
    if distance == 0:
        return 100
    score = max(0, 100 - (distance * 10))
    return round(score, 2)

def calculate_time_window_score(
    estimated_arrival: datetime,
    window_start: datetime,
    window_end: datetime
) -> float:
    """Score based on time window fit (0-100)"""
    if estimated_arrival < window_start:
        # Too early - penalize slightly
        minutes_early = (window_start - estimated_arrival).total_seconds() / 60
        return max(50, 100 - minutes_early * 2)
    elif estimated_arrival > window_end:
        # Too late - heavy penalty
        minutes_late = (estimated_arrival - window_end).total_seconds() / 60
        return max(0, 100 - minutes_late * 5)
    else:
        # Perfect fit
        return 100

def calculate_load_balance_score(current_load: int, max_capacity: int) -> float:
    """Score based on driver workload (0-100)"""
    if max_capacity == 0:
        return 0
    utilization = current_load / max_capacity
    # Prefer drivers with some capacity but not empty
    if utilization == 0:
        return 80  # Empty drivers get good but not perfect score
    elif utilization < 0.5:
        return 100  # Optimal utilization
    elif utilization < 0.8:
        return 70  # Getting busy
    else:
        return 30  # Nearly full

def is_compatible(driver: Dict, trip: Dict) -> Tuple[bool, List[str]]:
    """Check if driver is compatible with trip requirements"""
    reasons = []
    
    # Status check
    if driver["status"] not in ["available", "on-route"]:
        reasons.append(f"Driver is {driver['status']}")
        return False, reasons
    
    # Vehicle type
    required_type = trip["requirements"]["vehicleType"]
    if required_type not in driver["vehicle"]["type"]:
        reasons.append(f"Vehicle doesn't support {required_type}")
        return False, reasons
    
    # Oxygen
    if trip["requirements"]["oxygenRequired"] and not driver["vehicle"]["oxygenEquipped"]:
        reasons.append("Vehicle lacks oxygen equipment")
        return False, reasons
    
    # Capacity
    if driver["currentLoad"] >= driver["vehicle"]["capacity"]:
        reasons.append("Driver at full capacity")
        return False, reasons
    
    # Certifications
    if trip["requirements"]["attendantNeeded"]:
        if "medical-attendant" not in driver["certifications"]:
            reasons.append("Driver lacks medical attendant certification")
            return False, reasons
    
    return True, []

def calculate_driver_match(driver: Dict, trip: Dict) -> Dict:
    """Calculate comprehensive match score for driver-trip pair"""
    
    # Check compatibility first
    compatible, incompatibility_reasons = is_compatible(driver, trip)
    if not compatible:
        return {
            "driverId": driver["id"],
            "driverName": driver["name"],
            "compatible": False,
            "reasons": incompatibility_reasons,
            "score": 0
        }
    
    # Calculate distance
    distance = calculate_distance(
        driver["location"]["lat"],
        driver["location"]["lng"],
        trip["pickup"]["coordinates"]["lat"],
        trip["pickup"]["coordinates"]["lng"]
    )
    
    # Estimate travel time (assuming 30 mph average)
    travel_time_minutes = (distance / 30) * 60
    estimated_arrival = datetime.now() + timedelta(minutes=travel_time_minutes)
    
    # Calculate component scores
    proximity_score = calculate_proximity_score(distance)
    
    time_window_score = calculate_time_window_score(
        estimated_arrival,
        datetime.fromisoformat(trip["pickup"]["timeWindow"]["earliest"]),
        datetime.fromisoformat(trip["pickup"]["timeWindow"]["latest"])
    )
    
    load_balance_score = calculate_load_balance_score(
        driver["currentLoad"],
        driver["vehicle"]["capacity"]
    )
    
    # Route deviation score (simplified - assumes 20% for on-route, 100% for available)
    route_deviation_score = 20 if driver["status"] == "on-route" else 100
    
    # Calculate weighted total score
    total_score = (
        proximity_score * 0.40 +
        route_deviation_score * 0.20 +
        time_window_score * 0.25 +
        load_balance_score * 0.10 +
        100 * 0.05  # Compatibility bonus
    )
    
    return {
        "driverId": driver["id"],
        "driverName": driver["name"],
        "compatible": True,
        "score": round(total_score, 2),
        "breakdown": {
            "proximityScore": proximity_score,
            "routeDeviationScore": route_deviation_score,
            "timeWindowScore": time_window_score,
            "loadBalanceScore": load_balance_score,
            "compatibilityScore": 100
        },
        "distance": distance,
        "estimatedArrivalMinutes": round(travel_time_minutes, 1),
        "estimatedArrival": estimated_arrival.isoformat(),
        "currentLocation": driver["location"],
        "status": driver["status"],
        "vehicle": driver["vehicle"]
    }

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        """Handle POST request for route optimization"""
        try:
            # Read request body
            content_length = int(self.headers['Content-Length'])
            body = self.rfile.read(content_length)
            request_data = json.loads(body.decode('utf-8'))
            
            trip = request_data.get('trip')
            if not trip:
                self.send_error(400, "Missing trip data")
                return
            
            # Calculate matches for all drivers
            matches = []
            for driver in DEMO_DRIVERS:
                match = calculate_driver_match(driver, trip)
                matches.append(match)
            
            # Sort by score (highest first)
            matches.sort(key=lambda x: x['score'], reverse=True)
            
            # Get best match
            best_match = matches[0] if matches else None
            
            # Prepare response
            response = {
                "success": True,
                "trip": trip,
                "matches": matches,
                "bestMatch": best_match,
                "timestamp": datetime.now().isoformat(),
                "optimization": {
                    "algorithm": "Proximity-Based Multi-Factor Scoring",
                    "weights": {
                        "proximity": 0.40,
                        "routeDeviation": 0.20,
                        "timeWindow": 0.25,
                        "loadBalance": 0.10,
                        "compatibility": 0.05
                    }
                }
            }
            
            # Send response
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())
            
        except Exception as e:
            self.send_error(500, f"Internal error: {str(e)}")
    
    def do_OPTIONS(self):
        """Handle CORS preflight"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_GET(self):
        """Handle GET request - return demo info"""
        response = {
            "service": "Medical Transport Route Optimizer",
            "version": "1.0.0",
            "description": "AI-powered proximity-based driver assignment system",
            "endpoints": {
                "POST /api/transport-optimizer": "Calculate optimal driver for trip"
            },
            "demoDrivers": len(DEMO_DRIVERS),
            "features": [
                "Real-time proximity calculation",
                "Multi-factor scoring algorithm",
                "Vehicle compatibility checking",
                "Time window validation",
                "Load balancing",
                "Haversine distance formula"
            ]
        }
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(response, indent=2).encode())
