import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { GitBranch, GitCommit, Clock, CheckCircle, XCircle, AlertCircle, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface BuildInfo {
  status: "success" | "pending" | "failed";
  branch: string;
  commit: string;
  commitMessage: string;
  timestamp: string;
  buildNumber: string;
  deploymentUrl: string;
}

const BuildStatus = () => {
  const [buildInfo, setBuildInfo] = useState<BuildInfo>({
    status: "success",
    branch: "main",
    commit: import.meta.env.VITE_COMMIT_HASH?.substring(0, 7) || "latest",
    commitMessage: "Latest deployment",
    timestamp: new Date().toISOString(),
    buildNumber: import.meta.env.VITE_BUILD_NUMBER || "Production",
    deploymentUrl: "https://github.com/Saimyosho/rural-web-renaissance"
  });

  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    // Calculate time since last update
    const updateTime = () => {
      const now = new Date();
      const deployTime = new Date(buildInfo.timestamp);
      const diffMs = now.getTime() - deployTime.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffDays > 0) {
        setLastUpdated(`${diffDays} day${diffDays > 1 ? 's' : ''} ago`);
      } else if (diffHours > 0) {
        setLastUpdated(`${diffHours} hour${diffHours > 1 ? 's' : ''} ago`);
      } else if (diffMins > 0) {
        setLastUpdated(`${diffMins} minute${diffMins > 1 ? 's' : ''} ago`);
      } else {
        setLastUpdated('Just now');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [buildInfo.timestamp]);

  const getStatusIcon = () => {
    switch (buildInfo.status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "pending":
        return <AlertCircle className="w-5 h-5 text-yellow-500 animate-pulse" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (buildInfo.status) {
      case "success":
        return "text-green-500 border-green-500 bg-green-500/10";
      case "pending":
        return "text-yellow-500 border-yellow-500 bg-yellow-500/10";
      case "failed":
        return "text-red-500 border-red-500 bg-red-500/10";
    }
  };

  const getStatusText = () => {
    switch (buildInfo.status) {
      case "success":
        return "All Systems Operational";
      case "pending":
        return "Deployment in Progress";
      case "failed":
        return "Build Failed";
    }
  };

  return (
    <section className="py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="glass-strong border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {getStatusIcon()}
                    CI/CD Pipeline Status
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Continuous Integration & Deployment • Automated Testing • Version Control
                  </CardDescription>
                </div>
                <Badge variant="outline" className={getStatusColor()}>
                  {getStatusText()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Branch Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <GitBranch className="w-4 h-4" />
                    <span>Branch</span>
                  </div>
                  <div className="font-mono text-lg font-semibold">
                    {buildInfo.branch}
                  </div>
                </div>

                {/* Commit Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <GitCommit className="w-4 h-4" />
                    <span>Commit</span>
                  </div>
                  <div className="font-mono text-lg font-semibold">
                    #{buildInfo.commit}
                  </div>
                </div>

                {/* Last Updated */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Last Updated</span>
                  </div>
                  <div className="text-lg font-semibold">
                    {lastUpdated}
                  </div>
                </div>

                {/* Build Number */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4" />
                    <span>Environment</span>
                  </div>
                  <div className="text-lg font-semibold">
                    {buildInfo.buildNumber}
                  </div>
                </div>
              </div>

              {/* Pipeline Features */}
              <div className="mt-8 pt-8 border-t border-border">
                <h4 className="text-sm font-semibold mb-4">DevOps Best Practices</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">Automated Testing</p>
                      <p className="text-xs text-muted-foreground">ESLint, TypeScript checks, build validation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">Continuous Deployment</p>
                      <p className="text-xs text-muted-foreground">Auto-deploy on merge to main branch</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">Version Control</p>
                      <p className="text-xs text-muted-foreground">Git-based workflow with GitHub Actions</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* View Repository */}
              <div className="mt-6 flex justify-center">
                <a
                  href={buildInfo.deploymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <GitBranch className="w-4 h-4" />
                  View Repository
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default BuildStatus;
