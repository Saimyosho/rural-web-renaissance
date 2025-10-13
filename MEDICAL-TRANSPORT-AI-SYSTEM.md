# Medical Transport AI Scheduling & Optimization System

## 🚑 System Overview

An AI-powered medical transport scheduling system that dynamically assigns drivers to patients based on proximity, vehicle requirements, and real-time route optimization.

---

## 🎯 Core Requirement

**Dynamic Proximity-Based Assignment:**
> "When scheduling or de-scheduling drivers along their routes, if a driver is nearer, it should give priority pickup to that driver for that patient."

---

## 🧠 AI Scheduling & Optimization Engine

### **Primary Function**
Solve a complex variant of the **Vehicle Routing Problem (VRP)** with:
- Dynamic requests (real-time bookings)
- Real-time constraints (traffic, driver availability)
- Multiple optimization criteria (proximity, time windows, vehicle type)

---

## 🏗️ System Architecture

### **1. Real-Time Location Tracking**

#### **GPS Data Collection**
```typescript
interface DriverLocation {
  driverId: string;
  latitude: number;
  longitude: number;
  heading: number;
  speed: number;
  timestamp: Date;
  accuracy: number;
}

// Continuous GPS stream from driver mobile apps
// Update frequency: Every 10-30 seconds when active
```

#### **Fleet Visibility**
- Live map showing all active drivers
- Real-time position updates
- Driver status (available, on-trip, break, offline)
- Current route visualization

---

### **2. Dynamic Trip Pool**

#### **Trip Request Structure**
```typescript
interface TripRequest {
  tripId: string;
  status: 'unassigned' | 'assigned' | 'in-progress' | 'completed';
  
  // Patient Information
  patient: {
    id: string;
    name: string;
    phone: string;
    specialNeeds: SpecialNeeds[];
  };
  
  // Trip Details
  pickup: {
    address: string;
    coordinates: { lat: number; lng: number };
    timeWindow: { earliest: Date; latest: Date };
  };
  
  dropoff: {
    address: string;
    coordinates: { lat: number; lng: number };
    appointmentTime: Date;
    facility: string;
  };
  
  // Requirements
  requirements: {
    vehicleType: 'standard' | 'wheelchair' | 'stretcher' | 'ambulatory';
    attendantNeeded: boolean;
    oxygenRequired: boolean;
    bariatric: boolean;
  };
  
  // Metadata
  priority: 'routine' | 'urgent' | 'emergency';
  createdAt: Date;
  scheduledFor: Date;
}

type SpecialNeeds = 
  | 'wheelchair' 
  | 'stretcher' 
  | 'oxygen' 
  | 'bariatric' 
  | 'dialysis'
  | 'oncology';
```

#### **Trip Pool Management**
- Unassigned trips waiting for driver assignment
- Newly created bookings
- Trips freed by cancellations
- Rescheduled trips
- Priority queue based on urgency and time windows

---

### **3. Proximity Scoring & Driver Matching**

#### **Multi-Factor Scoring Algorithm**

```typescript
interface DriverMatch {
  driverId: string;
  score: number; // 0-100 (higher is better)
  breakdown: {
    proximityScore: number;      // 40% weight
    routeDeviationScore: number; // 20% weight
    timeWindowScore: number;     // 25% weight
    loadBalanceScore: number;    // 10% weight
    compatibilityScore: number;  // 5% weight (binary: 0 or 100)
  };
  estimatedPickupTime: Date;
  totalTravelTime: number; // minutes
  routeDeviation: number;  // miles
}

function calculateDriverMatch(
  driver: Driver,
  trip: TripRequest,
  currentTime: Date
): DriverMatch {
  // 1. Check compatibility first (must pass)
  if (!isCompatible(driver, trip)) {
    return null; // Driver cannot take this trip
  }
  
  // 2. Calculate proximity score (0-100)
  const proximityScore = calculateProximityScore(
    driver.currentLocation,
    trip.pickup.coordinates
  );
  
  // 3. Calculate route deviation (0-100)
  const routeDeviationScore = calculateRouteDeviation(
    driver.currentRoute,
    trip.pickup.coordinates,
    trip.dropoff.coordinates
  );
  
  // 4. Check time window feasibility (0-100)
  const timeWindowScore = calculateTimeWindowScore(
    driver,
    trip,
    currentTime
  );
  
  // 5. Assess driver load balance (0-100)
  const loadBalanceScore = calculateLoadBalance(
    driver.currentLoad,
    driver.maxCapacity
  );
  
  // 6. Weighted total score
  const totalScore = (
    proximityScore * 0.40 +
    routeDeviationScore * 0.20 +
    timeWindowScore * 0.25 +
    loadBalanceScore * 0.10 +
    100 * 0.05 // compatibility bonus
  );
  
  return {
    driverId: driver.id,
    score: totalScore,
    breakdown: {
      proximityScore,
      routeDeviationScore,
      timeWindowScore,
      loadBalanceScore,
      compatibilityScore: 100
    },
    estimatedPickupTime: calculateETA(driver, trip.pickup),
    totalTravelTime: calculateTotalTime(driver, trip),
    routeDeviation: calculateDeviation(driver, trip)
  };
}
```

#### **Compatibility Checks**

```typescript
function isCompatible(driver: Driver, trip: TripRequest): boolean {
  // Vehicle type match
  if (!driver.vehicle.types.includes(trip.requirements.vehicleType)) {
    return false;
  }
  
  // Oxygen capability
  if (trip.requirements.oxygenRequired && !driver.vehicle.oxygenEquipped) {
    return false;
  }
  
  // Weight capacity (bariatric)
  if (trip.requirements.bariatric && !driver.vehicle.bariatricCapable) {
    return false;
  }
  
  // Driver availability
  if (driver.status !== 'available' && driver.status !== 'on-route') {
    return false;
  }
  
  // Certification check
  if (trip.requirements.attendantNeeded && !driver.certifications.includes('medical-attendant')) {
    return false;
  }
  
  // Time window feasibility
  const canReachOnTime = canReachPickupInTime(driver, trip);
  if (!canReachOnTime) {
    return false;
  }
  
  return true;
}
```

---

### **4. Continuous Re-Optimization**

#### **Trigger Events**
```typescript
enum OptimizationTrigger {
  // Periodic
  SCHEDULED_INTERVAL = 'scheduled_interval',    // Every 3-5 minutes
  
  // Event-driven
  NEW_BOOKING = 'new_booking',                  // New trip request
  CANCELLATION = 'cancellation',                 // Trip cancelled
  DRIVER_AVAILABLE = 'driver_available',         // Driver finishes trip
  DRIVER_DELAY = 'driver_delay',                // Driver reports delay
  TRAFFIC_UPDATE = 'traffic_update',            // Significant traffic change
  DRIVER_LOCATION_UPDATE = 'location_update',   // Major position change
  EMERGENCY_REQUEST = 'emergency'                // Priority trip added
}

class ReOptimizationEngine {
  async reoptimize(trigger: OptimizationTrigger, context: any) {
    console.log(`Re-optimization triggered by: ${trigger}`);
    
    // 1. Fetch current state
    const drivers = await this.getActiveDrivers();
    const unassignedTrips = await this.getUnassignedTrips();
    const assignedRoutes = await this.getCurrentRoutes();
    
    // 2. Identify impacted trips/drivers
    const impactedScope = this.determineScope(trigger, context);
    
    // 3. Run optimization algorithm
    const newAssignments = await this.optimizeAssignments(
      drivers,
      unassignedTrips,
      assignedRoutes,
      impactedScope
    );
    
    // 4. Compare with current assignments
    const changes = this.detectChanges(
      assignedRoutes,
      newAssignments
    );
    
    // 5. Apply beneficial changes
    if (this.isWorthReassigning(changes)) {
      await this.applyChanges(changes);
      await this.notifyDrivers(changes);
      await this.updateDispatchers(changes);
    }
    
    return changes;
  }
  
  private isWorthReassigning(changes: AssignmentChange[]): boolean {
    // Only reassign if improvement is significant
    // Avoid constant flip-flopping that annoys drivers
    const threshold = 5; // 5 minutes improvement minimum
    
    return changes.some(change => 
      change.timeSavings > threshold ||
      change.priority === 'emergency'
    );
  }
}
```

---

### **5. Automated Driver Alerts**

#### **Push Notification System**
```typescript
interface DriverNotification {
  type: 'new_trip' | 'route_update' | 'trip_removed' | 'schedule_change';
  priority: 'high' | 'medium' | 'low';
  
  trip: TripRequest;
  action: 'pickup' | 'dropoff' | 'route_change';
  
  message: string;
  estimatedArrival: Date;
  
  // Navigation
  navigationLink: string; // Deep link to maps app
  
  // Actions
  acceptDeadline?: Date; // For optional trips
  requiresConfirmation: boolean;
}

// Example notifications
const notifications = {
  newTripNearby: {
    title: "🚑 New Pickup - 2.3 miles away",
    body: "Patient: Sarah J. - Wheelchair - Pickup at 2:15 PM",
    action: "View Details",
    sound: "urgent.mp3"
  },
  
  routeOptimized: {
    title: "📍 Route Updated",
    body: "Trip added to your route. New ETA: 3:45 PM",
    action: "View Route",
    sound: "notification.mp3"
  },
  
  urgentReassignment: {
    title: "⚡ Urgent Reassignment",
    body: "Emergency pickup - 1.1 miles from current location",
    action: "Accept",
    sound: "emergency.mp3",
    vibrate: [200, 100, 200]
  }
};
```

---

## 📱 System Components

### **1. Dispatcher Portal (Web)**

#### **Features**
- **Live Fleet Map**
  - Real-time driver locations
  - Color-coded by status
  - Current routes visualized
  - Traffic overlay

- **Trip Management**
  - Create new bookings
  - View unassigned trips
  - Manual assignment override
  - Drag-and-drop assignment

- **AI Assignment Dashboard**
  - View AI recommendations
  - Score breakdown for matches
  - One-click assignment approval
  - Override with notes

- **Real-Time Monitoring**
  - Trip status updates
  - Driver check-ins
  - Delay notifications
  - ETA tracking

#### **UI Mockup**
```
┌─────────────────────────────────────────────────────┐
│  Medical Transport Dispatch Portal                  │
├──────────────────┬──────────────────────────────────┤
│                  │                                  │
│  UNASSIGNED (5)  │  LIVE FLEET MAP                 │
│                  │  ┌──────────────────────────┐   │
│  🚑 Trip #1847   │  │                          │   │
│  Sarah Johnson   │  │    🚗 Driver A          │   │
│  Wheelchair      │  │         (On Route)       │   │
│  2:15 PM pickup  │  │                          │   │
│                  │  │  🚗 Driver B             │   │
│  [Assign] [...]  │  │      (Available)         │   │
│                  │  │                          │   │
│  AI Suggests:    │  │         🚗 Driver C      │   │
│  Driver B (95%)  │  │          (Break)         │   │
│  • 2.1 mi away   │  │                          │   │
│  • 8 min ETA     │  └──────────────────────────┘   │
│  [Assign Driver B│                                  │
│                  │  ACTIVE TRIPS (12)              │
│  ─────────────── │  ┌──────────────────────────┐   │
│                  │  │ Driver A - John Smith    │   │
│  ACTIVE DRIVERS  │  │ ⏰ Pickup in 5 min       │   │
│  • Available: 8  │  │ 📍 En route to pickup    │   │
│  • On Trip: 12   │  └──────────────────────────┘   │
│  • Break: 3      │                                  │
│                  │  ┌──────────────────────────┐   │
└──────────────────┴──┴──────────────────────────┴───┘
```

---

### **2. Driver Mobile App**

#### **Features**
- **Route Management**
  - Today's schedule
  - Turn-by-turn navigation
  - Trip sequence optimization
  - Estimated arrival times

- **Trip Actions**
  - Check-in at pickup
  - Mark patient loaded
  - Start trip to dropoff
  - Complete trip
  - Report delays/issues

- **Real-Time Updates**
  - New trip notifications
  - Route changes
  - Schedule updates
  - Emergency alerts

- **Communication**
  - Message dispatcher
  - Call patient
  - Report status
  - Emergency button

#### **UI Screens**
```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ TODAY'S ROUTE   │  │ ACTIVE TRIP     │  │ NEW ASSIGNMENT  │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤
│                 │  │                 │  │                 │
│ Next Stop:      │  │ Sarah Johnson   │  │ 🚑 New Pickup   │
│ 📍 123 Oak St   │  │ Wheelchair      │  │                 │
│ ⏰ 2:15 PM      │  │                 │  │ Patient:        │
│                 │  │ Pickup:         │  │ Mike Davis      │
│ Patient:        │  │ 123 Oak St      │  │                 │
│ Sarah Johnson   │  │ ✅ Completed    │  │ Distance:       │
│ Wheelchair      │  │                 │  │ 2.3 miles       │
│                 │  │ En Route To:    │  │                 │
│ [Navigate] [☎️] │  │ Regional Hosp   │  │ ETA: 8 min      │
│                 │  │                 │  │                 │
│ ───────────     │  │ [Navigation]    │  │ Type: Standard  │
│                 │  │                 │  │                 │
│ Upcoming (3):   │  │ Actions:        │  │ [Accept]        │
│ • 3:00 PM       │  │ [Arrived]       │  │ [Decline]       │
│ • 4:15 PM       │  │ [Issue]         │  │                 │
│ • 5:30 PM       │  │ [Call Patient]  │  │ Why nearby:     │
│                 │  │                 │  │ "On same route" │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

---

## 🔧 Technical Implementation

### **Technology Stack**

#### **Backend**
```javascript
{
  "core": "Node.js + TypeScript",
  "framework": "NestJS or Express",
  "database": "PostgreSQL + PostGIS",
  "caching": "Redis",
  "messaging": "RabbitMQ or AWS SQS",
  "realtime": "Socket.io or AWS IoT Core",
  
  "optimization": {
    "algorithm": "OR-Tools (Google)",
    "alternatives": ["OSRM", "GraphHopper", "Vroom"]
  },
  
  "maps": {
    "primary": "Google Maps Platform",
    "apis": [
      "Directions API",
      "Distance Matrix API",
      "Geocoding API",
      "Roads API (snap to road)"
    ]
  },
  
  "hosting": "AWS or Azure",
  "compute": "ECS or Kubernetes",
  "serverless": "Lambda for event triggers"
}
```

#### **Frontend**
```javascript
{
  "dispatcher": {
    "framework": "React + TypeScript",
    "maps": "Google Maps React",
    "state": "Redux Toolkit",
    "realtime": "Socket.io client",
    "ui": "Material-UI or Ant Design"
  },
  
  "mobile": {
    "framework": "React Native",
    "maps": "react-native-maps",
    "navigation": "React Navigation",
    "background": "react-native-background-geolocation",
    "push": "Firebase Cloud Messaging"
  }
}
```

---

### **Database Schema**

```sql
-- Drivers
CREATE TABLE drivers (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  phone VARCHAR(20),
  email VARCHAR(255),
  status VARCHAR(20), -- available, on_trip, break, offline
  current_location GEOGRAPHY(POINT),
  last_location_update TIMESTAMP,
  certifications TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- Vehicles
CREATE TABLE vehicles (
  id UUID PRIMARY KEY,
  driver_id UUID REFERENCES drivers(id),
  type VARCHAR(50)[], -- standard, wheelchair, stretcher
  capacity INTEGER,
  oxygen_equipped BOOLEAN,
  bariatric_capable BOOLEAN,
  license_plate VARCHAR(20),
  vin VARCHAR(50)
);

-- Trips
CREATE TABLE trips (
  id UUID PRIMARY KEY,
  status VARCHAR(20),
  driver_id UUID REFERENCES drivers(id),
  
  -- Patient
  patient_name VARCHAR(255),
  patient_phone VARCHAR(20),
  special_needs TEXT[],
  
  -- Locations
  pickup_address VARCHAR(500),
  pickup_location GEOGRAPHY(POINT),
  pickup_time_earliest TIMESTAMP,
  pickup_time_latest TIMESTAMP,
  
  dropoff_address VARCHAR(500),
  dropoff_location GEOGRAPHY(POINT),
  appointment_time TIMESTAMP,
  
  -- Requirements
  vehicle_type VARCHAR(50),
  oxygen_required BOOLEAN,
  attendant_needed BOOLEAN,
  bariatric BOOLEAN,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  scheduled_for TIMESTAMP,
  actual_pickup_time TIMESTAMP,
  actual_dropoff_time TIMESTAMP
);

-- Driver Routes (Current assignments)
CREATE TABLE driver_routes (
  id UUID PRIMARY KEY,
  driver_id UUID REFERENCES drivers(id),
  trip_id UUID REFERENCES trips(id),
  sequence_order INTEGER,
  estimated_arrival TIMESTAMP,
  actual_arrival TIMESTAMP,
  status VARCHAR(20)
);

-- PostGIS indexes for spatial queries
CREATE INDEX idx_driver_location ON drivers USING GIST(current_location);
CREATE INDEX idx_pickup_location ON trips USING GIST(pickup_location);
CREATE INDEX idx_dropoff_location ON trips USING GIST(dropoff_location);
```

---

### **Optimization Algorithm**

```typescript
import { VehicleRoutingProblem } from '@google/or-tools';

class RoutingOptimizer {
  async optimize(
    drivers: Driver[],
    trips: TripRequest[]
  ): Promise<OptimizedRoutes> {
    
    // 1. Build distance/time matrix
    const matrix = await this.buildDistanceMatrix(
      drivers.map(d => d.currentLocation),
      trips.flatMap(t => [t.pickup.coordinates, t.dropoff.coordinates])
    );
    
    // 2. Define constraints
    const constraints = {
      vehicleCapacities: drivers.map(d => d.vehicle.capacity),
      timeWindows: trips.map(t => ({
        start: t.pickup.timeWindow.earliest,
        end: t.pickup.timeWindow.latest
      })),
      vehicleTypes: this.buildCompatibilityMatrix(drivers, trips),
      maxRouteTime: 8 * 60, // 8 hours max per driver
    };
    
    // 3. Set optimization objective
    const objective = {
      minimizeDistance: 0.4,  // Weight: minimize total miles
      minimizeTime: 0.3,      // Weight: minimize total time
      balanceLoad: 0.2,       // Weight: balance trips per driver
      minimizeLateness: 0.1   // Weight: reduce appointment delays
    };
    
    // 4. Run OR-Tools solver
    const solution = await VehicleRoutingProblem.solve({
      matrix,
      constraints,
      objective,
      timeLimit: 5000 // 5 seconds max
    });
    
    // 5. Convert solution to route assignments
    return this.convertToRoutes(solution, drivers, trips);
  }
  
  private async buildDistanceMatrix(
    origins: Coordinate[],
    destinations: Coordinate[]
  ): Promise<number[][]> {
    // Google Maps Distance Matrix API
    const response = await googleMaps.distanceMatrix({
      origins,
      destinations,
      mode: 'driving',
      traffic_model: 'best_guess',
      departure_time: 'now'
    });
    
    return response.rows.map(row =>
      row.elements.map(el => el.duration.value)
    );
  }
}
```

---

## 📊 Performance Metrics

### **System Requirements**
- **Response Time**: < 3 seconds for assignment
- **GPS Update Frequency**: 10-30 seconds
- **Re-optimization Interval**: 3-5 minutes
- **Push Notification Latency**: < 1 second
- **Concurrent Users**: 100+ drivers, 20+ dispatchers
- **Daily Trip Volume**: 500-2000 trips

### **Success KPIs**
- **On-Time Pickup Rate**: > 95%
- **Miles per Trip**: Minimize (efficiency)
- **Driver Utilization**: 80-90%
- **Empty Miles**: < 15%
- **Patient Wait Time**: < 10 min average
- **No-Shows Due to Delays**: < 2%

---

## 💰 Cost Estimate

### **Development**
- **Backend System**: 400-600 hours
- **Dispatcher Portal**: 200-300 hours
- **Driver Mobile App**: 300-400 hours
- **Testing & QA**: 200 hours
- **Total**: 1100-1500 hours @ $100-150/hr = **$110K-$225K**

### **Monthly Operating Costs**
- **Hosting (AWS/Azure)**: $500-1500/month
- **Google Maps API**: $500-2000/month (usage-based)
- **SMS Notifications**: $100-300/month
- **Push Notifications**: $50-100/month
- **Database**: $200-500/month
- **Total**: **$1,350-$4,400/month**

---

## 🚀 Implementation Roadmap

### **Phase 1: MVP (3-4 months)**
- [ ] Core database & API
- [ ] Basic dispatcher portal
- [ ] Driver mobile app (iOS/Android)
- [ ] Manual trip assignment
- [ ] GPS tracking
- [ ] Basic routing

### **Phase 2: AI Optimization (2-3 months)**
- [ ] Proximity-based matching
- [ ] Automated assignment
- [ ] Route optimization engine
- [ ] Real-time re-optimization
- [ ] Push notifications

### **Phase 3: Advanced Features (2-3 months)**
- [ ] Predictive analytics
- [ ] Machine learning improvements
- [ ] Traffic integration
- [ ] Historical data analysis
- [ ] Reporting & analytics

### **Total Timeline**: 7-10 months for full system

---

## 📞 Contact

**Developer**: Sheldon Gunby  
**Email**: Sheldongunby@icloud.com  
**Specialization**: AI-powered logistics & optimization systems

---

**Document Created**: October 12, 2025  
**System Type**: Medical Transport AI Scheduling Platform  
**Status**: Specification & Planning Phase
