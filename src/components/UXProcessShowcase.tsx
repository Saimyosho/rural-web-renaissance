import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Users, Target, Lightbulb, Layers, TestTube2, Rocket, BarChart3, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const UXProcessShowcase = () => {
  const uxProcess = [
    {
      step: 1,
      title: "Definition",
      icon: <Target className="w-6 h-6" />,
      description: "Define project goals, constraints, and success metrics",
      deliverables: ["Project Brief", "Stakeholder Alignment", "Success Criteria"]
    },
    {
      step: 2,
      title: "Research",
      icon: <Users className="w-6 h-6" />,
      description: "Deep user research and market analysis",
      deliverables: ["User Interviews", "Surveys", "Competitive Analysis"]
    },
    {
      step: 3,
      title: "Analysis",
      icon: <BarChart3 className="w-6 h-6" />,
      description: "Synthesize research into actionable insights",
      deliverables: ["User Personas", "Journey Maps", "Pain Points"]
    },
    {
      step: 4,
      title: "Planning",
      icon: <Layers className="w-6 h-6" />,
      description: "Create information architecture and user flows",
      deliverables: ["Site Maps", "User Flows", "Wireframes"]
    },
    {
      step: 5,
      title: "Design",
      icon: <Lightbulb className="w-6 h-6" />,
      description: "Create high-fidelity visual designs",
      deliverables: ["UI Designs", "Design System", "Style Guide"]
    },
    {
      step: 6,
      title: "Prototyping",
      icon: <Layers className="w-6 h-6" />,
      description: "Build interactive prototypes for testing",
      deliverables: ["Clickable Prototypes", "Micro-interactions", "Animations"]
    },
    {
      step: 7,
      title: "Testing",
      icon: <TestTube2 className="w-6 h-6" />,
      description: "Validate designs with real users",
      deliverables: ["Usability Tests", "A/B Tests", "Heatmaps"]
    },
    {
      step: 8,
      title: "Launch & Iterate",
      icon: <Rocket className="w-6 h-6" />,
      description: "Deploy and continuously improve",
      deliverables: ["Production Release", "Analytics", "Iterations"]
    }
  ];

  const userPersonas = [
    {
      name: "Small Business Owner",
      age: "35-50",
      goals: ["Establish online presence", "Automate operations", "Grow customer base"],
      painPoints: ["Limited budget", "No technical expertise", "Time constraints"]
    },
    {
      name: "Rural Entrepreneur",
      age: "28-45",
      goals: ["Reach wider market", "Professional branding", "Compete with urban businesses"],
      painPoints: ["Limited local resources", "Poor internet infrastructure", "Lack of tech support"]
    },
    {
      name: "Service Provider",
      age: "30-55",
      goals: ["Online booking system", "Client management", "Digital payments"],
      painPoints: ["Manual processes", "Missed appointments", "Payment tracking"]
    }
  ];

  const researchMethods = [
    { method: "User Interviews", icon: "💬", insight: "Deep qualitative understanding" },
    { method: "Surveys", icon: "📊", insight: "Quantitative data at scale" },
    { method: "Usability Testing", icon: "🧪", insight: "Real user behavior validation" },
    { method: "A/B Testing", icon: "🔀", insight: "Data-driven design decisions" },
    { method: "Analytics Review", icon: "📈", insight: "Usage patterns and trends" },
    { method: "Heatmaps", icon: "🔥", insight: "Visual attention patterns" }
  ];

  const psychologyPrinciples = [
    { principle: "Hick's Law", application: "Simplified navigation with fewer choices" },
    { principle: "Miller's Law", application: "Chunked information in groups of 5-7 items" },
    { principle: "Fitts's Law", application: "Large, easily clickable targets for key actions" },
    { principle: "Gestalt Principles", application: "Visual grouping and hierarchy" },
    { principle: "Color Psychology", application: "Emotion and action through color" },
    { principle: "Progressive Disclosure", application: "Information revealed as needed" }
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
            <Users className="w-4 h-4 mr-2" />
            UX/UI Leadership
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            8-Step UX Design Process
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive user experience methodology from research to launch with continuous iteration
          </p>
        </motion.div>

        {/* UX Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {uxProcess.map((process, index) => (
            <motion.div
              key={process.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass-strong border-primary/20 h-full hover:border-primary/40 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      {process.icon}
                    </div>
                    <Badge variant="outline">Step {process.step}</Badge>
                  </div>
                  <CardTitle className="text-lg">{process.title}</CardTitle>
                  <CardDescription className="text-sm">{process.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Deliverables:</p>
                    {process.deliverables.map((deliverable, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>{deliverable}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* User Personas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="glass-strong border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                User Personas
              </CardTitle>
              <CardDescription>
                Research-driven personas representing target user segments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {userPersonas.map((persona, index) => (
                  <motion.div
                    key={persona.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="p-6 rounded-lg glass border border-primary/10"
                  >
                    <div className="text-4xl mb-3">👤</div>
                    <h4 className="font-semibold text-lg mb-1">{persona.name}</h4>
                    <Badge variant="outline" className="mb-4">{persona.age}</Badge>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-green-500 mb-1">Goals:</p>
                        {persona.goals.map((goal, i) => (
                          <p key={i} className="text-xs text-muted-foreground mb-1">• {goal}</p>
                        ))}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-red-500 mb-1">Pain Points:</p>
                        {persona.painPoints.map((point, i) => (
                          <p key={i} className="text-xs text-muted-foreground mb-1">• {point}</p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Research Methods */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="glass-strong border-primary/20 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-accent" />
                  Research Methodology
                </CardTitle>
                <CardDescription>Multi-method approach to user insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {researchMethods.map((method, index) => (
                    <motion.div
                      key={method.method}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg glass hover:bg-primary/5 transition-all"
                    >
                      <div className="text-2xl">{method.icon}</div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-sm mb-1">{method.method}</h5>
                        <p className="text-xs text-muted-foreground">{method.insight}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Psychology Principles */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="glass-strong border-primary/20 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-bridge" />
                  Psychology-Based Design
                </CardTitle>
                <CardDescription>Cognitive principles in action</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {psychologyPrinciples.map((item, index) => (
                    <motion.div
                      key={item.principle}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-3 rounded-lg glass-strong border border-primary/10"
                    >
                      <h5 className="font-semibold text-sm mb-1">{item.principle}</h5>
                      <p className="text-xs text-muted-foreground">{item.application}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Continuous Improvement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="glass-strong border-primary/20 bg-gradient-to-br from-accent/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="w-6 h-6 text-accent" />
                Continuous Improvement Cycle
              </CardTitle>
              <CardDescription>
                Data-driven iteration and optimization based on user feedback and analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="p-6 rounded-lg glass border border-accent/20 text-center"
                >
                  <div className="text-3xl mb-3">📊</div>
                  <h4 className="font-semibold mb-2">Measure</h4>
                  <p className="text-sm text-muted-foreground">Collect analytics and user feedback</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="p-6 rounded-lg glass border border-accent/20 text-center"
                >
                  <div className="text-3xl mb-3">🔍</div>
                  <h4 className="font-semibold mb-2">Analyze</h4>
                  <p className="text-sm text-muted-foreground">Identify improvement opportunities</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="p-6 rounded-lg glass border border-accent/20 text-center"
                >
                  <div className="text-3xl mb-3">🎨</div>
                  <h4 className="font-semibold mb-2">Design</h4>
                  <p className="text-sm text-muted-foreground">Create improved solutions</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="p-6 rounded-lg glass border border-accent/20 text-center"
                >
                  <div className="text-3xl mb-3">🚀</div>
                  <h4 className="font-semibold mb-2">Deploy</h4>
                  <p className="text-sm text-muted-foreground">Launch and validate changes</p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default UXProcessShowcase;
