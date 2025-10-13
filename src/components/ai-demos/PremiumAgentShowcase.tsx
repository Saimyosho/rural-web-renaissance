import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, Brain, Code, Palette, TrendingUp, 
  CheckCircle, XCircle, AlertCircle, 
  Zap, Shield, Database, Globe, MessageSquare,
  ChevronRight, Play, Pause
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";

interface AgentCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  examples: AgentExample[];
}

interface AgentExample {
  name: string;
  vendor: string;
  capabilities: string[];
  useCase: string;
  demo: React.ReactNode;
  pricing: string;
  integrations: string[];
  autonomy: number;
  safety: number;
  adoption: number;
}

const PremiumAgentShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("productivity");
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [demoProgress, setDemoProgress] = useState(0);

  const categories: AgentCategory[] = [
    {
      id: "productivity",
      name: "Productivity Copilots",
      icon: <Brain className="w-5 h-5" />,
      description: "AI assistants that enhance personal and team productivity",
      color: "from-blue-500 to-cyan-500",
      examples: [
        {
          name: "Microsoft Copilot",
          vendor: "Microsoft",
          capabilities: [
            "Email & calendar management",
            "Document creation & editing",
            "Meeting summaries",
            "Cross-app workflows"
          ],
          useCase: "Enterprise productivity suite integration",
          demo: <ProductivityDemo />,
          pricing: "$30/user/month",
          integrations: ["Office 365", "Teams", "Outlook", "OneDrive"],
          autonomy: 7,
          safety: 9,
          adoption: 9
        },
        {
          name: "ChatGPT Enterprise",
          vendor: "OpenAI",
          capabilities: [
            "Custom GPTs with tools",
            "Advanced reasoning",
            "File analysis",
            "API integrations"
          ],
          useCase: "Custom AI workflows and automation",
          demo: <ChatGPTDemo />,
          pricing: "$60/user/month",
          integrations: ["API", "Zapier", "Custom connectors"],
          autonomy: 8,
          safety: 8,
          adoption: 10
        }
      ]
    },
    {
      id: "enterprise",
      name: "Enterprise Automation",
      icon: <Zap className="w-5 h-5" />,
      description: "End-to-end business process automation",
      color: "from-purple-500 to-pink-500",
      examples: [
        {
          name: "UiPath AI Agents",
          vendor: "UiPath",
          capabilities: [
            "RPA + AI orchestration",
            "Process mining",
            "Document processing",
            "Workflow automation"
          ],
          useCase: "Back-office process automation",
          demo: <EnterpriseDemo />,
          pricing: "Enterprise (custom)",
          integrations: ["SAP", "Salesforce", "Oracle", "Custom APIs"],
          autonomy: 9,
          safety: 9,
          adoption: 8
        }
      ]
    },
    {
      id: "developer",
      name: "Developer Agents",
      icon: <Code className="w-5 h-5" />,
      description: "AI-powered coding and deployment assistants",
      color: "from-green-500 to-emerald-500",
      examples: [
        {
          name: "Replit Agent",
          vendor: "Replit",
          capabilities: [
            "App generation from prompts",
            "Real-time coding",
            "Deployment automation",
            "Debug assistance"
          ],
          useCase: "Rapid prototyping and development",
          demo: <DeveloperDemo />,
          pricing: "$25/month",
          integrations: ["GitHub", "Vercel", "AWS", "Built-in hosting"],
          autonomy: 8,
          safety: 7,
          adoption: 7
        },
        {
          name: "GitHub Copilot Workspace",
          vendor: "GitHub",
          capabilities: [
            "Code completion",
            "Test generation",
            "Documentation",
            "PR reviews"
          ],
          useCase: "AI-assisted software development",
          demo: <GitHubDemo />,
          pricing: "$10-20/month",
          integrations: ["VS Code", "JetBrains", "Neovim"],
          autonomy: 6,
          safety: 9,
          adoption: 10
        }
      ]
    },
    {
      id: "creative",
      name: "Creative Agents",
      icon: <Palette className="w-5 h-5" />,
      description: "AI for video, image, and content creation",
      color: "from-orange-500 to-red-500",
      examples: [
        {
          name: "Runway Gen-3",
          vendor: "Runway",
          capabilities: [
            "Text-to-video",
            "Video editing by prompt",
            "Motion tracking",
            "Style transfer"
          ],
          useCase: "Professional video production",
          demo: <CreativeDemo />,
          pricing: "$12-76/month",
          integrations: ["Adobe Suite", "Final Cut Pro"],
          autonomy: 7,
          safety: 8,
          adoption: 8
        }
      ]
    },
    {
      id: "vertical",
      name: "Vertical Specialists",
      icon: <TrendingUp className="w-5 h-5" />,
      description: "Industry-specific AI solutions",
      color: "from-yellow-500 to-amber-500",
      examples: [
        {
          name: "Salesforce Agentforce",
          vendor: "Salesforce",
          capabilities: [
            "Lead qualification",
            "Customer support automation",
            "Sales forecasting",
            "CRM workflows"
          ],
          useCase: "Sales and customer service automation",
          demo: <VerticalDemo />,
          pricing: "$2/conversation",
          integrations: ["Salesforce CRM", "Service Cloud", "Marketing Cloud"],
          autonomy: 8,
          safety: 9,
          adoption: 9
        }
      ]
    }
  ];

  const currentCategory = categories.find(c => c.id === selectedCategory) || categories[0];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4" variant="outline">
            <Bot className="w-4 h-4 mr-2" />
            Premium AI Agent Showcase
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Interactive Demo:</span> What's Possible
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore production-ready AI agents across 5 categories. See what you can build and integrate when you work with us.
          </p>
        </motion.div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={selectedCategory === category.id ? `bg-gradient-to-r ${category.color}` : ""}
              onClick={() => {
                setSelectedCategory(category.id);
                setActiveDemo(null);
              }}
            >
              {category.icon}
              <span className="ml-2">{category.name}</span>
            </Button>
          ))}
        </div>

        {/* Category Description */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <p className="text-lg text-muted-foreground">
            {currentCategory.description}
          </p>
        </motion.div>

        {/* Agent Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {currentCategory.examples.map((agent, index) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-strong h-full hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <CardTitle className="text-xl">{agent.name}</CardTitle>
                      <CardDescription>by {agent.vendor}</CardDescription>
                    </div>
                    <Badge className={`bg-gradient-to-r ${currentCategory.color}`}>
                      {agent.pricing}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    "{agent.useCase}"
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Capabilities */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Key Capabilities:</h4>
                    <ul className="space-y-1">
                      {agent.capabilities.slice(0, 4).map((cap, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2">
                    <MetricBadge label="Autonomy" value={agent.autonomy} />
                    <MetricBadge label="Safety" value={agent.safety} />
                    <MetricBadge label="Adoption" value={agent.adoption} />
                  </div>

                  {/* Integrations */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Integrates with:</h4>
                    <div className="flex flex-wrap gap-2">
                      {agent.integrations.map((int, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          <Globe className="w-3 h-3 mr-1" />
                          {int}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Demo Button */}
                  <Button
                    className="w-full"
                    variant={activeDemo === agent.name ? "secondary" : "default"}
                    onClick={() => setActiveDemo(activeDemo === agent.name ? null : agent.name)}
                  >
                    {activeDemo === agent.name ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Close Demo
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Launch Interactive Demo
                      </>
                    )}
                  </Button>

                  {/* Demo Area */}
                  <AnimatePresence>
                    {activeDemo === agent.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-primary/20 pt-4"
                      >
                        {agent.demo}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Comparison Matrix */}
        <ComparisonMatrix category={currentCategory} />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="glass-strong p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Build Your Custom AI Agent?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We integrate these premium agents into your workflows, customize them for your business,
              and build bespoke solutions when off-the-shelf won't cut it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                <MessageSquare className="w-5 h-5 mr-2" />
                Schedule Consultation
              </Button>
              <Button size="lg" variant="outline">
                <ChevronRight className="w-5 h-5 mr-2" />
                View Pricing
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

// Metric Badge Component
const MetricBadge = ({ label, value }: { label: string; value: number }) => {
  const getColor = (val: number) => {
    if (val >= 8) return "text-green-500 border-green-500";
    if (val >= 6) return "text-yellow-500 border-yellow-500";
    return "text-orange-500 border-orange-500";
  };

  return (
    <div className="text-center">
      <div className={`text-2xl font-bold ${getColor(value)}`}>{value}/10</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
};

// Demo Components (simplified)
const ProductivityDemo = () => (
  <div className="space-y-3">
    <div className="bg-muted/30 rounded p-3">
      <p className="text-sm font-semibold mb-2">📧 Task: "Schedule meeting with team"</p>
      <div className="space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-3 h-3 text-green-500" />
          <span>Checked calendars for 5 people</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-3 h-3 text-green-500" />
          <span>Found optimal time: Tue 2pm</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-3 h-3 text-green-500" />
          <span>Sent invites + created agenda</span>
        </div>
      </div>
    </div>
    <Badge variant="outline" className="w-full justify-center">
      ⏱️ Saved 15 minutes of coordination
    </Badge>
  </div>
);

const ChatGPTDemo = () => (
  <div className="space-y-3">
    <div className="bg-muted/30 rounded p-3">
      <p className="text-sm font-semibold mb-2">💡 Task: "Analyze Q4 sales data"</p>
      <div className="space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-3 h-3 text-green-500" />
          <span>Processed 10,000 rows</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-3 h-3 text-green-500" />
          <span>Identified top 3 trends</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-3 h-3 text-green-500" />
          <span>Generated executive summary</span>
        </div>
      </div>
    </div>
    <Badge variant="outline" className="w-full justify-center">
      📊 Analysis complete in 30 seconds
    </Badge>
  </div>
);

const EnterpriseDemo = () => (
  <div className="space-y-3">
    <div className="bg-muted/30 rounded p-3">
      <p className="text-sm font-semibold mb-2">🏢 Workflow: Invoice Processing</p>
      <Progress value={85} className="mb-2" />
      <div className="space-y-1 text-xs">
        <div>✓ Extract data from PDF</div>
        <div>✓ Validate against PO</div>
        <div>✓ Route for approval</div>
        <div className="text-muted-foreground">⏳ Awaiting payment...</div>
      </div>
    </div>
  </div>
);

const DeveloperDemo = () => (
  <div className="space-y-3">
    <div className="bg-muted/30 rounded p-3 font-mono text-xs">
      <div className="text-green-500">$ replit-agent "Build a todo app"</div>
      <div className="mt-2 space-y-1">
        <div>✓ Created React components</div>
        <div>✓ Set up Supabase backend</div>
        <div>✓ Deployed to production</div>
        <div className="text-primary">🚀 https://my-todo-app.repl.co</div>
      </div>
    </div>
  </div>
);

const GitHubDemo = () => (
  <div className="space-y-3">
    <div className="bg-muted/30 rounded p-3 font-mono text-xs">
      <div className="text-muted-foreground">// Writing function...</div>
      <div className="text-primary mt-1">function calculateTotal(items) {`{`}</div>
      <div className="text-muted-foreground ml-4">// Copilot suggests:</div>
      <div className="ml-4">return items.reduce((sum, item) =&gt;</div>
      <div className="ml-6">sum + (item.price * item.quantity), 0);</div>
      <div>{`}`}</div>
    </div>
  </div>
);

const CreativeDemo = () => (
  <div className="space-y-3">
    <div className="bg-muted/30 rounded p-3">
      <p className="text-sm font-semibold mb-2">🎬 Prompt: "Professional product demo"</p>
      <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded flex items-center justify-center">
        <Play className="w-12 h-12 opacity-50" />
      </div>
      <p className="text-xs text-muted-foreground mt-2">Generated 30s video in 2 minutes</p>
    </div>
  </div>
);

const VerticalDemo = () => (
  <div className="space-y-3">
    <div className="bg-muted/30 rounded p-3">
      <p className="text-sm font-semibold mb-2">🎯 Lead Qualification</p>
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span>Company Size:</span>
          <Badge variant="outline">✓ Qualified</Badge>
        </div>
        <div className="flex justify-between">
          <span>Budget:</span>
          <Badge variant="outline">✓ $50k+</Badge>
        </div>
        <div className="flex justify-between">
          <span>Timeline:</span>
          <Badge variant="outline">⚠️ Urgent</Badge>
        </div>
      </div>
      <Button size="sm" className="w-full mt-2">
        Route to Sales Rep
      </Button>
    </div>
  </div>
);

// Comparison Matrix Component
const ComparisonMatrix = ({ category }: { category: AgentCategory }) => (
  <Card className="glass-strong p-6">
    <CardHeader>
      <CardTitle>Quick Comparison: {category.name}</CardTitle>
      <CardDescription>How these agents stack up</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-primary/20">
              <th className="text-left py-2">Agent</th>
              <th className="text-center py-2">Autonomy</th>
              <th className="text-center py-2">Safety</th>
              <th className="text-center py-2">Adoption</th>
              <th className="text-right py-2">Pricing</th>
            </tr>
          </thead>
          <tbody>
            {category.examples.map((agent, i) => (
              <tr key={i} className="border-b border-muted">
                <td className="py-3 font-semibold">{agent.name}</td>
                <td className="text-center">
                  <Progress value={agent.autonomy * 10} className="w-16 mx-auto" />
                </td>
                <td className="text-center">
                  <Progress value={agent.safety * 10} className="w-16 mx-auto" />
                </td>
                <td className="text-center">
                  <Progress value={agent.adoption * 10} className="w-16 mx-auto" />
                </td>
                <td className="text-right text-primary font-semibold">{agent.pricing}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);

export default PremiumAgentShowcase;
