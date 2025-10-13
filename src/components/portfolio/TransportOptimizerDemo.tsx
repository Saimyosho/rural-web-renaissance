import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ambulance, MapPin, Clock, Award, Users, TrendingUp, Play, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Driver {
  driverId: string;
  driverName: string;
  compatible: boolean;
  score: number;
  breakdown?: {
    proximityScore: number;
    routeDeviationScore: number;
    timeWindowScore: number;
    loadBalanceScore: number;
    compatibilityScore: number;
  };
  distance?: number;
  estimatedArrivalMinutes?: number;
  status?: string;
  reasons?: string[];
}

const SAMPLE_TRIPS = [
  {
    id: "trip-1",
    patientName: "Sarah Martinez",
    pickup: {
      address: "456 Main St, Johnstown, PA 15901",
      coordinates: { lat: 40.2732, lng: -76.8867 }
    },
    dropoff: {
      address: "Conemaugh Memorial Hospital, Johnstown, PA",
      coordinates: { lat: 40.3253, lng: -78.9219 }
    },
    requirements: {
      vehicleType: "wheelchair",
      oxygenRequired: true,
      attendantNeeded: true
    },
    appointmentTime: "2:30 PM",
    label: "Wheelchair + Oxygen"
  },
  {
    id: "trip-2",
    patientName: "Michael Chen",
    pickup: {
      address: "789 Oak Ave, Johnstown, PA 15902",
      coordinates: { lat: 40.2851, lng: -76.8741 }
    },
    dropoff: {
      address: "Dialysis Center, Johnstown, PA",
      coordinates: { lat: 40.3100, lng: -78.9150 }
    },
    requirements: {
      vehicleType: "standard",
      oxygenRequired: false,
      attendantNeeded: false
    },
    appointmentTime: "10:00 AM",
    label: "Standard Transport"
  },
  {
    id: "trip-3",
    patientName: "Dorothy Williams",
    pickup: {
      address: "321 Elm St, Johnstown, PA 15904",
      coordinates: { lat: 40.2692, lng: -76.9012 }
    },
    dropoff: {
      address: "Physical Therapy, Johnstown, PA",
      coordinates: { lat: 40.3000, lng: -78.9000 }
    },
    requirements: {
      vehicleType: "stretcher",
      oxygenRequired: true,
      attendantNeeded: true
    },
    appointmentTime: "3:15 PM",
    label: "Stretcher + Medical Attendant"
  }
];

const TransportOptimizerDemo = () => {
  const [selectedTrip, setSelectedTrip] = useState<typeof SAMPLE_TRIPS[0] | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [results, setResults] = useState<{ matches: Driver[]; bestMatch: Driver } | null>(null);
  const [showDemo, setShowDemo] = useState(false);

  const optimizeRoute = async (trip: typeof SAMPLE_TRIPS[0]) => {
    setIsOptimizing(true);
    setResults(null);

    try {
      // Prepare trip data for API
      const now = new Date();
      const tripData = {
        trip: {
          ...trip,
          pickup: {
            ...trip.pickup,
            timeWindow: {
              earliest: new Date(now.getTime() + 10 * 60000).toISOString(), // 10 min from now
              latest: new Date(now.getTime() + 30 * 60000).toISOString() // 30 min from now
            }
          }
        }
      };

      const response = await fetch('/api/transport-optimizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tripData)
      });

      if (!response.ok) {
        throw new Error('Optimization failed');
      }

      const data = await response.json();
      
      // Simulate processing time for drama
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setResults({
        matches: data.matches,
        bestMatch: data.bestMatch
      });
    } catch (error) {
      console.error('Optimization error:', error);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleTripSelect = (trip: typeof SAMPLE_TRIPS[0]) => {
    setSelectedTrip(trip);
    setResults(null);
    optimizeRoute(trip);
  };

  const reset = () => {
    setSelectedTrip(null);
    setResults(null);
    setShowDemo(false);
  };

  if (!showDemo) {
    return (
      <Card className="glass-strong p-8 text-center max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white mb-4">
            <Ambulance className="w-12 h-12" />
          </div>
          <h3 className="text-3xl font-bold mb-3">Medical Transport Route Optimizer</h3>
          <p className="text-muted-foreground mb-2">
            AI-Powered Proximity-Based Driver Assignment System
          </p>
          <Badge variant="outline" className="glass mb-6">
            Portfolio Project · Built for Johnstown Area Medical Transport
          </Badge>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="glass rounded-lg p-4">
            <MapPin className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <div className="text-sm font-semibold">Real-Time GPS</div>
            <div className="text-xs text-muted-foreground">Haversine Distance</div>
          </div>
          <div className="glass rounded-lg p-4">
            <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <div className="text-sm font-semibold">Multi-Factor AI</div>
            <div className="text-xs text-muted-foreground">5 Optimization Criteria</div>
          </div>
          <div className="glass rounded-lg p-4">
            <Users className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <div className="text-sm font-semibold">Smart Matching</div>
            <div className="text-xs text-muted-foreground">Vehicle Compatibility</div>
          </div>
        </div>

        <div className="glass rounded-lg p-6 mb-6 text-left">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Key Features
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span><strong>40% Proximity Weight</strong> - Nearest driver gets priority</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span><strong>Vehicle Compatibility</strong> - Wheelchair, stretcher, oxygen</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span><strong>Time Window Validation</strong> - Ensures on-time pickups</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span><strong>Load Balancing</strong> - Distributes work fairly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span><strong>Real-Time Re-optimization</strong> - Adapts to changes</span>
            </li>
          </ul>
        </div>

        <Button
          onClick={() => setShowDemo(true)}
          size="lg"
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
        >
          <Play className="w-5 h-5 mr-2" />
          Try Live Demo
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-strong p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
              <Ambulance className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Transport Route Optimizer</h3>
              <p className="text-sm text-muted-foreground">Select a trip to see AI driver matching</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={reset}>
            <RotateCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </Card>

      {/* Trip Selection */}
      <div className="grid md:grid-cols-3 gap-4">
        {SAMPLE_TRIPS.map((trip) => (
          <Card
            key={trip.id}
            className={`glass p-4 cursor-pointer transition-all hover:scale-105 ${
              selectedTrip?.id === trip.id ? 'border-2 border-primary' : ''
            }`}
            onClick={() => handleTripSelect(trip)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-semibold">{trip.patientName}</div>
                <div className="text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 inline mr-1" />
                  {trip.appointmentTime}
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {trip.label.split(' ')[0]}
              </Badge>
            </div>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{trip.pickup.address}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {trip.requirements.vehicleType && (
                  <Badge variant="secondary" className="text-xs capitalize">
                    {trip.requirements.vehicleType}
                  </Badge>
                )}
                {trip.requirements.oxygenRequired && (
                  <Badge variant="secondary" className="text-xs">O₂</Badge>
                )}
                {trip.requirements.attendantNeeded && (
                  <Badge variant="secondary" className="text-xs">Attendant</Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Results */}
      <AnimatePresence>
        {(isOptimizing || results) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Card className="glass-strong p-6">
              <h4 className="text-lg font-bold mb-4">
                {isOptimizing ? 'Optimizing Route...' : 'Optimization Results'}
              </h4>

              {isOptimizing ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
                  <p className="text-sm text-muted-foreground">Analyzing 4 drivers...</p>
                  <p className="text-xs text-muted-foreground mt-1">Calculating proximity, compatibility, and load balance</p>
                </div>
              ) : results && (
                <div className="space-y-4">
                  {/* Best Match Highlight */}
                  <div className="glass border-2 border-primary rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <Badge className="bg-primary text-white mb-2">Best Match</Badge>
                        <h5 className="text-xl font-bold">{results.bestMatch.driverName}</h5>
                        <p className="text-sm text-muted-foreground">
                          {results.bestMatch.distance} miles away · {results.bestMatch.estimatedArrivalMinutes} min ETA
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-bold gradient-text">{results.bestMatch.score}</div>
                        <div className="text-xs text-muted-foreground">Match Score</div>
                      </div>
                    </div>
                    
                    {results.bestMatch.breakdown && (
                      <div className="grid grid-cols-5 gap-2 pt-3 border-t border-primary/20">
                        {Object.entries(results.bestMatch.breakdown).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-lg font-bold text-primary">{value}</div>
                            <div className="text-xs text-muted-foreground capitalize">
                              {key.replace('Score', '').replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* All Drivers */}
                  <div>
                    <h5 className="text-sm font-semibold mb-3">All Drivers (Ranked by Score)</h5>
                    <div className="space-y-2">
                      {results.matches.map((driver, idx) => (
                        <div
                          key={driver.driverId}
                          className={`glass rounded-lg p-3 ${
                            !driver.compatible ? 'opacity-50' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="text-lg font-bold text-muted-foreground">#{idx + 1}</div>
                              <div>
                                <div className="font-semibold">{driver.driverName}</div>
                                {driver.compatible ? (
                                  <div className="text-xs text-muted-foreground">
                                    {driver.distance}mi · {driver.estimatedArrivalMinutes}min · {driver.status}
                                  </div>
                                ) : (
                                  <div className="text-xs text-destructive">
                                    {driver.reasons?.join(', ')}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`text-2xl font-bold ${
                                driver.compatible ? 'text-primary' : 'text-muted-foreground'
                              }`}>
                                {driver.score}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Algorithm Info */}
                  <div className="glass rounded-lg p-4 text-xs text-muted-foreground">
                    <strong>Algorithm:</strong> Multi-Factor Proximity-Based Scoring<br />
                    <strong>Weights:</strong> Proximity (40%), Route Deviation (20%), Time Window (25%), Load Balance (10%), Compatibility (5%)
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Footer */}
      {!isOptimizing && !results && (
        <Card className="glass p-4 text-center text-sm text-muted-foreground">
          💡 Select a trip above to see the AI route optimizer in action
        </Card>
      )}
    </div>
  );
};

export default TransportOptimizerDemo;
