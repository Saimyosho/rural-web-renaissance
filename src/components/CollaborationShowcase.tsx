import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Users, MessageSquare, Calendar, Video, Mail, Phone, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

const CollaborationShowcase = () => {
  const collaborationTools = [
    { name: "Video Calls", icon: <Video className="w-5 h-5" />, platform: "Zoom/Google Meet", use: "Face-to-face collaboration" },
    { name: "Project Management", icon: <Calendar className="w-5 h-5" />, platform: "Jira/Trello", use: "Task tracking & sprints" },
    { name: "Real-time Chat", icon: <MessageSquare className="w-5 h-5" />, platform: "Slack/Discord", use: "Quick communication" },
    { name: "Design Collaboration", icon: <Users className="w-5 h-5" />, platform: "Figma", use: "Live design review" }
  ];

  const communicationChannels = [
    {
      channel: "Email",
      icon: <Mail className="w-6 h-6" />,
      response: "Within 24 hours",
      bestFor: "Detailed inquiries, formal communication",
      color: "text-blue-500"
    },
    {
      channel: "Phone/SMS",
      icon: <Phone className="w-6 h-6" />,
      response: "Immediate",
      bestFor: "Urgent matters, quick questions",
      color: "text-green-500"
    },
    {
      channel: "Video Call",
      icon: <Video className="w-6 h-6" />,
      response: "By appointment",
      bestFor: "Project kickoffs, demos, training",
      color: "text-purple-500"
    },
    {
      channel: "Live Chat",
      icon: <MessageSquare className="w-6 h-6" />,
      response: "During business hours",
      bestFor: "Quick updates, status checks",
      color: "text-accent"
    }
  ];

  const projectPhases = [
    {
      phase: "Discovery",
      duration: "1-2 weeks",
      activities: ["Requirements gathering", "Stakeholder interviews", "Competitive analysis"],
      collaboration: "Daily check-ins"
    },
    {
      phase: "Planning",
      duration: "1 week",
      activities: ["Project roadmap", "Resource allocation", "Timeline creation"],
      collaboration: "Planning sessions"
    },
    {
      phase: "Design & Development",
      duration: "4-8 weeks",
      activities: ["Iterative design", "Agile sprints", "Weekly demos"],
      collaboration: "Sprint reviews"
    },
    {
      phase: "Testing & Launch",
      duration: "1-2 weeks",
      activities: ["QA testing", "User acceptance", "Deployment"],
      collaboration: "Final reviews"
    },
    {
      phase: "Support & Iteration",
      duration: "Ongoing",
      activities: ["Analytics monitoring", "User feedback", "Improvements"],
      collaboration: "Monthly reviews"
    }
  ];

  const teamRoles = [
    { role: "Full-Stack Developer", skills: ["React", "Node.js", "Database", "DevOps"], icon: "👨‍💻" },
    { role: "UX/UI Designer", skills: ["Figma", "User Research", "Prototyping", "Testing"], icon: "🎨" },
    { role: "Business Analyst", skills: ["Requirements", "Documentation", "Stakeholder Mgmt"], icon: "📊" },
    { role: "Project Manager", skills: ["Agile", "Scrum", "Timeline Mgmt", "Communication"], icon: "📋" }
  ];

  const testimonials = [
    {
      quote: "Outstanding collaboration and communication throughout the entire project. Always responsive and professional.",
      author: "Sarah Johnson",
      role: "Small Business Owner",
      rating: 5
    },
    {
      quote: "The agile approach and regular demos kept us aligned. Felt like true partnership, not just a vendor relationship.",
      author: "Mike Chen",
      role: "Marketing Director",
      rating: 5
    },
    {
      quote: "Transparent process with clear milestones. The project management tools made it easy to track progress in real-time.",
      author: "Emily Rodriguez",
      role: "Operations Manager",
      rating: 5
    }
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
            <Users className="w-4 h-4 mr-2" />
            Collaboration Excellence
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Cross-Functional Collaboration
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transparent communication, modern tools, and collaborative workflows ensuring project success
          </p>
        </motion.div>

        {/* Communication Channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {communicationChannels.map((channel, index) => (
            <motion.div
              key={channel.channel}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass-strong border-primary/20 h-full hover:border-primary/40 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className={`p-3 rounded-lg bg-primary/10 ${channel.color} w-fit mb-2`}>
                    {channel.icon}
                  </div>
                  <CardTitle className="text-lg">{channel.channel}</CardTitle>
                  <Badge variant="outline" className="w-fit">{channel.response}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{channel.bestFor}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Collaboration Tools */}
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
                Modern Collaboration Tools
              </CardTitle>
              <CardDescription>
                Technology-enabled workflows for seamless team collaboration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {collaborationTools.map((tool, index) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-6 rounded-lg glass border border-primary/10 hover:border-primary/30 transition-all"
                  >
                    <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mb-3">
                      {tool.icon}
                    </div>
                    <h4 className="font-semibold mb-1">{tool.name}</h4>
                    <Badge variant="secondary" className="mb-2 text-xs">{tool.platform}</Badge>
                    <p className="text-sm text-muted-foreground">{tool.use}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Project Phases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <Card className="glass-strong border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-accent" />
                Project Timeline & Collaboration
              </CardTitle>
              <CardDescription>
                Structured phases with continuous stakeholder engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectPhases.map((phase, index) => (
                  <motion.div
                    key={phase.phase}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="p-6 rounded-lg glass border border-primary/10 hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-lg mb-1">{phase.phase}</h4>
                        <Badge variant="outline">{phase.duration}</Badge>
                      </div>
                      <Badge className="bg-primary/10 text-primary">{phase.collaboration}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {phase.activities.map((activity, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-muted-foreground">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Team Roles */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="glass-strong border-primary/20 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-bridge" />
                  Cross-Functional Team
                </CardTitle>
                <CardDescription>Diverse expertise for comprehensive solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamRoles.map((member, index) => (
                    <motion.div
                      key={member.role}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 rounded-lg glass-strong border border-primary/10"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-3xl">{member.icon}</div>
                        <h5 className="font-semibold">{member.role}</h5>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Client Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="glass-strong border-primary/20 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-green-500" />
                  Client Testimonials
                </CardTitle>
                <CardDescription>Collaboration success stories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.author}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 rounded-lg glass-strong border border-green-500/20"
                    >
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-500">⭐</span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 italic">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-sm">{testimonial.author}</p>
                          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="glass-strong border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">Ready to Collaborate?</CardTitle>
              <CardDescription className="text-base">
                Let's discuss your project and create something amazing together
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-gradient-to-r from-primary to-bridge hover:shadow-glow"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Start a Conversation
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="glass border-primary/50"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule a Call
                </Button>
              </div>
              <div className="flex justify-center gap-6 mt-8">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default CollaborationShowcase;
