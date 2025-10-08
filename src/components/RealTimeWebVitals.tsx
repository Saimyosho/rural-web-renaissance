import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Activity, Zap, Globe, Shield, TrendingUp, Server, AlertCircle } from "lucide-react";
import { Progress } from "./ui/progress";
import { motion } from "framer-motion";
import { onCLS, onLCP, onFCP, onTTFB, onINP, Metric } from "web-vitals";

interface WebVitalMetric {
  name: string;
  value: number;
  unit: string;
  status: "good" | "needs-improvement" | "poor";
  icon: React.ReactNode;
  rating: string;
  description: string;
}

const RealTimeWebVitals = () => {
  const [metrics, setMetrics] = useState<WebVitalMetric[]>([
    {
      name: "Largest Contentful Paint",
      value: 0,
      unit: "s",
      status: "good",
      icon: <Activity className="w-5 h-5" />,
      rating: "Measuring...",
      description: "Loading performance"
    },
    {
      name: "Cumulative Layout Shift",
      value: 0,
      unit: "",
      status: "good",
      icon: <Globe className="w-5 h-5" />,
      rating: "Measuring...",
      description: "Visual stability"
    },
    {
      name: "First Contentful Paint",
      value: 0,
      unit: "s",
      status: "good",
      icon: <TrendingUp className="w-5 h-5" />,
      rating: "Measuring...",
      description: "First paint time"
    },
    {
      name: "Time to First Byte",
      value: 0,
      unit: "ms",
      status: "good",
      icon: <Server className="w-5 h-5" />,
      rating: "Measuring...",
      description: "Server response"
    },
    {
      name: "Interaction to Next Paint",
      value: 0,
      unit: "ms",
      status: "good",
      icon: <AlertCircle className="w-5 h-5" />,
      rating: "Measuring...",
      description: "Responsiveness"
    }
  ]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateMetric = (metric: Metric) => {
      const { name, value, rating } = metric;
      
      setMetrics((prev) => {
        const index = prev.findIndex((m) => {
          if (name === "LCP") return m.name === "Largest Contentful Paint";
          if (name === "CLS") return m.name === "Cumulative Layout Shift";
          if (name === "FCP") return m.name === "First Contentful Paint";
          if (name === "TTFB") return m.name === "Time to First Byte";
          if (name === "INP") return m.name === "Interaction to Next Paint";
          return false;
        });

        if (index === -1) return prev;

        const newMetrics = [...prev];
        const displayValue = name === "CLS" ? value : 
                           name === "TTFB" || name === "INP" ? value :
                           value / 1000;
        
        newMetrics[index] = {
          ...newMetrics[index],
          value: Math.round(displayValue * 100) / 100,
          status: rating as "good" | "needs-improvement" | "poor",
          rating: rating.charAt(0).toUpperCase() + rating.slice(1)
        };

        return newMetrics;
      });

      setIsLoading(false);
    };

    // Register Web Vitals observers
    onLCP(updateMetric);
    onCLS(updateMetric);
    onFCP(updateMetric);
    onTTFB(updateMetric);
    onINP(updateMetric);

    // Set a timeout to stop loading state after 5 seconds
    const timeout = setTimeout(() => setIsLoading(false), 5000);

    return () => clearTimeout(timeout);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-500 border-green-500 bg-green-500/10";
      case "needs-improvement":
        return "text-yellow-500 border-yellow-500 bg-yellow-500/10";
      case "poor":
        return "text-red-500 border-red-500 bg-red-500/10";
      default:
        return "text-gray-500 border-gray-500 bg-gray-500/10";
    }
  };

  const getProgressValue = (metric: WebVitalMetric) => {
    const { name, value, status } = metric;
    
    if (value === 0) return 0;
    
    // Calculate progress based on thresholds
    if (name === "Largest Contentful Paint") {
      return Math.min((2.5 / (value || 0.1)) * 100, 100);
    }
    if (name === "Interaction to Next Paint") {
      return Math.min((200 / (value || 1)) * 100, 100);
    }
    if (name === "Cumulative Layout Shift") {
      return Math.min((0.1 / (value || 0.001)) * 100, 100);
    }
    if (name === "First Contentful Paint") {
      return Math.min((1.8 / (value || 0.1)) * 100, 100);
    }
    if (name === "Time to First Byte") {
      return Math.min((800 / (value || 1)) * 100, 100);
    }
    
    return status === "good" ? 100 : status === "needs-improvement" ? 60 : 30;
  };

  const overallScore = () => {
    const goodCount = metrics.filter(m => m.status === "good" && m.value > 0).length;
    const totalMeasured = metrics.filter(m => m.value > 0).length;
    
    if (totalMeasured === 0) return 0;
    return Math.round((goodCount / totalMeasured) * 100);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4" variant="outline">
            <Activity className="w-4 h-4 mr-2" />
            Real-Time Performance Monitoring
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Live Web Vitals Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Real-time performance metrics measured from your actual browsing experience
          </p>
          
          {isLoading && (
            <Badge variant="outline" className="animate-pulse">
              Collecting metrics...
            </Badge>
          )}
          
          <div className="mt-6">
            <Card className="glass-strong border-primary/20 max-w-md mx-auto">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">
                    {overallScore()}%
                  </div>
                  <p className="text-sm text-muted-foreground">Overall Performance Score</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="glass-strong hover:shadow-lg transition-all duration-300 border-primary/20 hover:border-primary/40 h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${getStatusColor(metric.status)}`}>
                      {metric.icon}
                    </div>
                    <Badge variant="outline" className={getStatusColor(metric.status)}>
                      {metric.rating}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mt-4">{metric.name}</CardTitle>
                  <CardDescription>{metric.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold text-primary">
                      {metric.value > 0 ? `${metric.value}${metric.unit}` : "Measuring..."}
                    </div>
                    <Progress 
                      value={getProgressValue(metric)} 
                      className="h-2"
                    />
                    <p className="text-xs text-muted-foreground">
                      {metric.status === "good" && "✓ Exceeds 2025 standards"}
                      {metric.status === "needs-improvement" && "⚠ Room for improvement"}
                      {metric.status === "poor" && "✗ Needs optimization"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <Card className="glass-strong border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                About Web Vitals
              </CardTitle>
              <CardDescription>
                Core Web Vitals are Google's standardized metrics for measuring user experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    Loading (LCP)
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Measures perceived load speed. Good: ≤ 2.5s
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent" />
                    Interactivity (INP)
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Measures responsiveness. Good: ≤ 200ms
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-500" />
                    Visual Stability (CLS)
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Measures visual stability. Good: ≤ 0.1
                  </p>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> These metrics are measured in real-time from your current browsing session. 
                  Performance may vary based on network conditions, device capabilities, and browser optimizations.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default RealTimeWebVitals;
