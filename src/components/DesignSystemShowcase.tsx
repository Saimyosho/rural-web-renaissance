import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Palette, Type, Layout, Accessibility, Eye, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const DesignSystemShowcase = () => {
  const colorPalette = [
    { name: "Primary", value: "#01b4d2", usage: "Brand identity, CTAs, links" },
    { name: "Bridge", value: "#aa55f7", usage: "Secondary actions, highlights" },
    { name: "Accent", value: "#f59b00", usage: "Emphasis, success states" },
    { name: "Background", value: "#0a0a0a", usage: "Main background" },
    { name: "Foreground", value: "#fafafa", usage: "Text, icons" }
  ];

  const typography = [
    { level: "H1", size: "4xl-7xl", weight: "Bold", usage: "Hero headlines" },
    { level: "H2", size: "3xl-5xl", weight: "Bold", usage: "Section titles" },
    { level: "H3", size: "2xl-3xl", weight: "Semibold", usage: "Subsections" },
    { level: "Body", size: "base-lg", weight: "Regular", usage: "Paragraph text" },
    { level: "Caption", size: "sm-xs", weight: "Regular", usage: "Helper text" }
  ];

  const spacing = [
    { token: "xs", value: "0.25rem", usage: "Tight spacing" },
    { token: "sm", value: "0.5rem", usage: "Component padding" },
    { token: "md", value: "1rem", usage: "Default spacing" },
    { token: "lg", value: "1.5rem", usage: "Section gaps" },
    { token: "xl", value: "2rem", usage: "Large margins" },
    { token: "2xl", value: "3rem", usage: "Section padding" }
  ];

  const designPrinciples = [
    {
      icon: "🎯",
      title: "User-Centered",
      description: "Every design decision is driven by user research and empathy for user needs"
    },
    {
      icon: "♿",
      title: "Accessible",
      description: "WCAG 2.1 AA compliant with keyboard navigation and screen reader support"
    },
    {
      icon: "📱",
      title: "Responsive",
      description: "Mobile-first approach ensuring seamless experience across all devices"
    },
    {
      icon: "⚡",
      title: "Performance",
      description: "Optimized animations and interactions for smooth 60fps performance"
    },
    {
      icon: "🎨",
      title: "Consistent",
      description: "Unified design language with reusable components and patterns"
    },
    {
      icon: "🔄",
      title: "Iterative",
      description: "Continuous improvement based on user feedback and analytics"
    }
  ];

  const components = [
    { name: "Buttons", count: 8, variants: "Primary, Secondary, Outline, Ghost" },
    { name: "Cards", count: 5, variants: "Standard, Glass, Strong, Hover" },
    { name: "Forms", count: 12, variants: "Input, Select, Textarea, Checkbox" },
    { name: "Navigation", count: 6, variants: "Header, Sidebar, Tabs, Breadcrumb" },
    { name: "Feedback", count: 7, variants: "Toast, Alert, Dialog, Progress" },
    { name: "Layout", count: 9, variants: "Grid, Flex, Container, Section" }
  ];

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
            <Palette className="w-4 h-4 mr-2" />
            Design Excellence
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Comprehensive Design System
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional design system with consistent typography, colors, spacing, and reusable components
          </p>
        </motion.div>

        {/* Design Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <Card className="glass-strong border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-6 h-6 text-primary" />
                Design Principles
              </CardTitle>
              <CardDescription>
                Core principles guiding every design decision
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {designPrinciples.map((principle, index) => (
                  <motion.div
                    key={principle.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="p-6 rounded-lg glass hover:shadow-lg transition-all border border-primary/10 hover:border-primary/30"
                  >
                    <div className="text-4xl mb-4">{principle.icon}</div>
                    <h4 className="font-semibold text-lg mb-2">{principle.title}</h4>
                    <p className="text-sm text-muted-foreground">{principle.description}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Color Palette */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="glass-strong border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-6 h-6 text-accent" />
                Color Palette
              </CardTitle>
              <CardDescription>Brand colors and usage guidelines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {colorPalette.map((color, index) => (
                  <motion.div
                    key={color.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="space-y-3"
                  >
                    <div
                      className="w-full h-24 rounded-lg shadow-lg"
                      style={{ backgroundColor: color.value }}
                    />
                    <div>
                      <h4 className="font-semibold text-sm">{color.name}</h4>
                      <p className="text-xs text-muted-foreground font-mono">{color.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{color.usage}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Typography */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="glass-strong border-primary/20 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="w-6 h-6 text-primary" />
                  Typography Scale
                </CardTitle>
                <CardDescription>Consistent type system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {typography.map((type, index) => (
                    <motion.div
                      key={type.level}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 rounded-lg glass-strong border border-primary/10"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{type.level}</Badge>
                        <span className="text-xs text-muted-foreground">{type.weight}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Size: {type.size}</p>
                      <p className="text-xs text-muted-foreground">{type.usage}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Spacing System */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="glass-strong border-primary/20 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layout className="w-6 h-6 text-bridge" />
                  Spacing System
                </CardTitle>
                <CardDescription>Consistent spacing tokens</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {spacing.map((space, index) => (
                    <motion.div
                      key={space.token}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 rounded-lg glass-strong border border-primary/10"
                    >
                      <div className="flex items-center gap-4 mb-2">
                        <Badge variant="outline" className="font-mono">{space.token}</Badge>
                        <div
                          className="h-6 bg-primary rounded"
                          style={{ width: space.value }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-mono text-muted-foreground">{space.value}</span>
                        <span className="text-xs text-muted-foreground">{space.usage}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Component Library */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="glass-strong border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-accent" />
                Component Library
              </CardTitle>
              <CardDescription>
                57+ reusable components with consistent styling and behavior
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {components.map((component, index) => (
                  <motion.div
                    key={component.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-6 rounded-lg glass hover:shadow-lg transition-all border border-primary/10 hover:border-primary/30"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{component.name}</h4>
                      <Badge variant="secondary">{component.count}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{component.variants}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Accessibility Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8"
        >
          <Card className="glass-strong border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Accessibility className="w-6 h-6 text-green-500" />
                Accessibility Compliance
              </CardTitle>
              <CardDescription>
                WCAG 2.1 Level AA standards implementation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg glass-strong border border-green-500/20">
                  <div className="text-2xl font-bold text-green-500 mb-1">4.5:1</div>
                  <p className="text-sm text-muted-foreground">Color Contrast Ratio</p>
                </div>
                <div className="p-4 rounded-lg glass-strong border border-green-500/20">
                  <div className="text-2xl font-bold text-green-500 mb-1">100%</div>
                  <p className="text-sm text-muted-foreground">Keyboard Accessible</p>
                </div>
                <div className="p-4 rounded-lg glass-strong border border-green-500/20">
                  <div className="text-2xl font-bold text-green-500 mb-1">AAA</div>
                  <p className="text-sm text-muted-foreground">Screen Reader Support</p>
                </div>
                <div className="p-4 rounded-lg glass-strong border border-green-500/20">
                  <div className="text-2xl font-bold text-green-500 mb-1">ARIA</div>
                  <p className="text-sm text-muted-foreground">Semantic Labels</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default DesignSystemShowcase;
