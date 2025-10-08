import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { GitBranch, GitCommit, CheckCircle2, Clock, Users, Rocket, Code2, TestTube } from "lucide-react";
import { motion } from "framer-motion";

const DevProcessShowcase = () => {
  const cicdStages = [
    { name: "Code", icon: <Code2 className="w-5 h-5" />, status: "completed", duration: "2m" },
    { name: "Test", icon: <TestTube className="w-5 h-5" />, status: "completed", duration: "3m" },
    { name: "Build", icon: <GitCommit className="w-5 h-5" />, status: "completed", duration: "5m" },
    { name: "Deploy", icon: <Rocket className="w-5 h-5" />, status: "completed", duration: "2m" }
  ];

  const recentCommits = [
    { message: "feat: Added performance monitoring dashboard", author: "Sheldon", time: "2 hours ago", hash: "b1074d7" },
    { message: "fix: Optimized Core Web Vitals metrics", author: "Sheldon", time: "5 hours ago", hash: "a8932c1" },
    { message: "docs: Updated design system documentation", author: "Sheldon", time: "1 day ago", hash: "c7456ef" }
  ];

  const metrics = [
    { label: "Code Coverage", value: "94%", icon: <TestTube className="w-4 h-4" />, color: "text-green-500" },
    { label: "Build Time", value: "12m", icon: <Clock className="w-4 h-4" />, color: "text-blue-500" },
    { label: "Deployments", value: "142", icon: <Rocket className="w-4 h-4" />, color: "text-purple-500" },
    { label: "Contributors", value: "1", icon: <Users className="w-4 h-4" />, color: "text-accent" }
  ];

  const agileProcess = [
    { phase: "Sprint Planning", description: "2-week sprints with clear goals and deliverables", icon: "📋" },
    { phase: "Daily Standups", description: "Progress tracking and blocker resolution", icon: "☕" },
    { phase: "Code Review", description: "Peer review for quality assurance", icon: "👀" },
    { phase: "Sprint Review", description: "Demo and stakeholder feedback", icon: "🎯" },
    { phase: "Retrospective", description: "Continuous improvement process", icon: "🔄" }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background/50 to-background">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4" variant="outline">
            <GitBranch className="w-4 h-4 mr-2" />
            Development Excellence
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Agile & DevOps Methodology
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional development process with CI/CD automation, version control, and collaborative workflows
          </p>
        </motion.div>

        {/* CI/CD Pipeline Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="glass-strong border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="w-6 h-6 text-green-500" />
                    CI/CD Pipeline Status
                  </CardTitle>
                  <CardDescription>Automated deployment workflow</CardDescription>
                </div>
                <Badge className="bg-green-500/10 text-green-500 border-green-500">
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  All Systems Operational
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {cicdStages.map((stage, index) => (
                  <motion.div
                    key={stage.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex flex-col items-center p-4 rounded-lg glass hover:shadow-lg transition-all"
                  >
                    <div className="p-3 rounded-full bg-green-500/10 text-green-500 mb-3">
                      {stage.icon}
                    </div>
                    <h4 className="font-semibold mb-1">{stage.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {stage.duration}
                    </Badge>
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-2" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Commits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-strong border-primary/20 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitCommit className="w-6 h-6 text-primary" />
                  Recent Updates
                </CardTitle>
                <CardDescription>Latest commits and changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCommits.map((commit, index) => (
                    <motion.div
                      key={commit.hash}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-all"
                    >
                      <div className="p-2 rounded bg-primary/10">
                        <GitBranch className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{commit.message}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span>{commit.author}</span>
                          <span>•</span>
                          <span>{commit.time}</span>
                          <Badge variant="outline" className="text-xs">
                            {commit.hash}
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Development Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-strong border-primary/20 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  Development Metrics
                </CardTitle>
                <CardDescription>Quality and productivity indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {metrics.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 rounded-lg glass-strong border border-primary/10 hover:border-primary/30 transition-all"
                    >
                      <div className={`flex items-center gap-2 mb-2 ${metric.color}`}>
                        {metric.icon}
                        <span className="text-xs font-medium">{metric.label}</span>
                      </div>
                      <div className="text-2xl font-bold">{metric.value}</div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-primary" />
                    Version Control
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Professional Git workflow with feature branches and pull requests
                  </p>
                  <Badge variant="outline">
                    Latest: b1074d7c0b4d34feb2d6a678be9449dcf71a48a7
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Agile Methodology */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="glass-strong border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6 text-accent" />
                Agile Development Process
              </CardTitle>
              <CardDescription>
                Iterative development with continuous feedback and improvement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {agileProcess.map((process, index) => (
                  <motion.div
                    key={process.phase}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="p-4 rounded-lg glass hover:shadow-lg transition-all border border-primary/10 hover:border-primary/30"
                  >
                    <div className="text-3xl mb-3">{process.icon}</div>
                    <h4 className="font-semibold mb-2 text-sm">{process.phase}</h4>
                    <p className="text-xs text-muted-foreground">{process.description}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default DevProcessShowcase;
