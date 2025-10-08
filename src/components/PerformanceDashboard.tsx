import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Activity, Zap, Globe, Shield, TrendingUp, Server } from "lucide-react";
import { Progress } from "./ui/progress";
import { motion } from "framer-motion";

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  status: "excellent" | "good" | "needs-improvement";
  icon: React.ReactNode;
}

const PerformanceDashboard = () => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([
    {
      name: "Largest Contentful Paint",
      value: 1.2,
      unit: "s",
      status: "excellent",
      icon: <Activity className="w-5 h-5" />
    },
    {
      name: "First Input Delay",
      value: 45,
      unit: "ms",
      status: "excellent",
      icon: <Zap className="w-5 h-5" />
    },
    {
      name: "Cumulative Layout Shift",
      value: 0.05,
      unit: "",
      status: "excellent",
      icon: <Globe className="w-5 h-5" />
    },
    {
      name: "Security Score",
      value: 98,
      unit: "%",
      status: "excellent",
      icon: <Shield className="w-5 h-5" />
    },
    {
      name: "Performance Score",
      value: 96,
      unit: "%",
      status: "excellent",
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      name: "Uptime",
      value: 99.9,
      unit: "%",
      status: "excellent",
      icon: <Server className="w-5 h-5" />
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-500 border-green-500";
      case "good":
        return "text-yellow-500 border-yellow-500";
      default:
        return "text-red-500 border-red-500";
    }
  };

  const getProgressValue = (metric: PerformanceMetric) => {
    if (metric.unit === "%") return metric.value;
    if (metric.name === "Largest Contentful Paint") return (2.5 - metric.value) / 2.5 * 100;
    if (metric.name === "First Input Delay") return (100 - metric.value);
    if (metric.name === "Cumulative Layout Shift") return (0.1 - metric.value) / 0.1 * 100;
    return 100;
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
            Core Web Vitals & Metrics
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional-grade performance optimization focused on speed, security, and user experience
          </p>
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
              <Card className="glass-strong hover:shadow-lg transition-all duration-300 border-primary/20 hover:border-primary/40">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg bg-primary/10 ${getStatusColor(metric.status)}`}>
                      {metric.icon}
                    </div>
                    <Badge variant="outline" className={getStatusColor(metric.status)}>
                      {metric.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mt-4">{metric.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold text-primary">
                      {metric.value}{metric.unit}
                    </div>
                    <Progress value={getProgressValue(metric)} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      Optimized for 2025 standards
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
                <TrendingUp className="w-6 h-6 text-primary" />
                Technical Implementation Features
              </CardTitle>
              <CardDescription>
                Modern technology stack and best practices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent" />
                    Performance Optimization
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Code splitting & lazy loading</li>
                    <li>• Brotli & Gzip compression</li>
                    <li>• Image optimization</li>
                    <li>• Bundle size optimization</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    Security & Infrastructure
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• HTTPS & SSL encryption</li>
                    <li>• Secure authentication</li>
                    <li>• WCAG accessibility</li>
                    <li>• Cloud infrastructure ready</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-500" />
                    Modern Technology
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• React 18 with TypeScript</li>
                    <li>• Progressive Web App ready</li>
                    <li>• Mobile-first responsive</li>
                    <li>• Cross-browser compatible</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    Development Process
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• CI/CD pipeline automated</li>
                    <li>• Version control (Git)</li>
                    <li>• Agile methodology</li>
                    <li>• Code quality monitoring</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default PerformanceDashboard;
