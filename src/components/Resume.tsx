import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Award, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  Cloud, 
  Code2, 
  Database, 
  Download, 
  GraduationCap, 
  Mail, 
  MapPin, 
  Phone, 
  Server, 
  Shield, 
  Smartphone,
  Terminal,
  Zap
} from "lucide-react";
import { Button } from "./ui/button";

const Resume = () => {
  const [activeTab, setActiveTab] = useState<"experience" | "skills" | "education">("experience");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const experience = [
    {
      title: "IT Consultant & Systems Architect",
      company: "Independent Practice",
      location: "Remote",
      period: "2022 – Present",
      achievements: [
        "SME consulting on Windows Server infrastructure, Azure architecture, and hybrid cloud strategies",
        "Architected virtualization solutions for diverse VM workloads—from high-performance engineering workstations to cost-effective remote desktop environments",
        "Developed Python-based automation tools processing millions of records with 99.99% accuracy",
        "Implemented workflow automation pipelines reducing client operational overhead by 30+ hours weekly"
      ]
    },
    {
      title: "Cloud Systems & Virtualization Administrator",
      company: "Technology Company",
      location: "Remote",
      period: "2022 – 2023",
      achievements: [
        "Designed scalable Azure cloud infrastructure with hybrid integration supporting 200+ remote users",
        "Deployed remote work VM infrastructure with Windows 10/11 virtual desktops optimized for secure connectivity",
        "Built n8n workflow automation integrating ServiceNow, Salesforce, and Azure AD—reducing response times by 60%",
        "Administered 200+ macOS endpoints via Jamf Pro with zero-touch deployment",
        "Conducted Azure performance tuning and security hardening with continuous optimization"
      ]
    },
    {
      title: "Senior Windows & Azure Systems Administrator",
      company: "Engineering Firm",
      location: "Pennsylvania",
      period: "2021 – 2022",
      achievements: [
        "Primary SME for Windows Server, Azure cloud services, and enterprise virtualization supporting 800+ users and 1,200+ VMs",
        "Architected zero-downtime Azure migration achieving $500K annual savings with 99.95% uptime",
        "Designed GPU-accelerated Citrix Virtual Apps for AutoCAD, SolidWorks, and Revit users",
        "Orchestrated MECM (SCCM) and ServiceNow integration reducing manual intervention by 85%",
        "Developed 50+ PowerShell and Python automation scripts cutting manual workload by 85%",
        "Implemented Zero Trust security with conditional access policies and MFA enforcement"
      ]
    }
  ];

  const skills = {
    "Cloud & Infrastructure": [
      "Microsoft Azure (IaaS, PaaS, ASR)",
      "Windows Server (2016-2022)",
      "Azure Virtual Machines & Scale Sets",
      "Azure Site Recovery & Backup",
      "Active Directory & Group Policy",
      "Azure AD (Entra ID) & Hybrid Identity"
    ],
    "Virtualization": [
      "VMware vSphere 7.x/8.x",
      "Hyper-V 2019/2022",
      "Citrix Virtual Apps & Desktops",
      "GPU Virtualization (NVIDIA vGPU)",
      "High Availability & DR",
      "Load Balancing & Failover"
    ],
    "Automation & DevOps": [
      "PowerShell Advanced Scripting",
      "Python Automation",
      "Terraform & IaC",
      "Ansible Configuration",
      "Azure Automation & Runbooks",
      "CI/CD Pipelines & Git"
    ],
    "Systems Management": [
      "MECM/SCCM",
      "Microsoft Intune & Endpoint Manager",
      "ServiceNow ITSM",
      "OS Deployment Automation",
      "Patch Management & Compliance",
      "WSUS & Windows Update"
    ]
  };

  const certifications = [
    { name: "CompTIA Cloud+", status: "Active (Expires 2025)" },
    { name: "CompTIA Security+", status: "Active (Expires 2025)" },
    { name: "CompTIA Network+", status: "Active (Expires 2025)" },
    { name: "CompTIA A+", status: "Active (Expires 2024)" },
    { name: "Microsoft Azure Solutions Architect Expert", status: "In Progress" },
    { name: "AWS Certified Solutions Architect", status: "In Progress" }
  ];

  const education = [
    {
      degree: "Bachelor of Science in Information Technology",
      school: "Southern New Hampshire University",
      gpa: "3.8",
      focus: "Cloud Computing, AI/ML, and Cybersecurity"
    },
    {
      degree: "Associate of Science in Network Administration",
      school: "Pittsburgh Technical Institute",
      gpa: "3.5",
      honors: "Dean's List"
    }
  ];

  return (
    <section id="resume" className="py-32 relative overflow-hidden bg-background/50" ref={ref}>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Professional <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              10+ years architecting enterprise-scale Microsoft environments
            </p>
            
            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Greater Pittsburgh Area, PA</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:SheldonGunby@icloud.com" className="hover:text-primary transition-colors">
                  SheldonGunby@icloud.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+17244908102" className="hover:text-primary transition-colors">
                  724-490-8102
                </a>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <motion.div 
            className="glass-strong rounded-3xl p-8 md:p-12 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Server className="w-6 h-6 text-primary" />
              Professional Summary
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Senior Windows and Azure Systems Administrator with <span className="text-primary font-semibold">10+ years</span> architecting, deploying, and managing enterprise-scale Microsoft environments. Recognized Subject Matter Expert (SME) specializing in Windows Server infrastructure, Azure cloud architecture, and hybrid virtualization platforms. Expert in designing and maintaining high-performance VM environments—from GPU-accelerated virtual desktops for engineers to optimized remote work environments. Proven track record managing <span className="text-accent font-semibold">1,200+ VMs with 99.95% uptime</span>, implementing zero-downtime migrations, and orchestrating enterprise ticketing systems.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            {(["experience", "skills", "education"] as const).map((tab) => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                variant={activeTab === tab ? "default" : "outline"}
                className={`capitalize ${activeTab === tab ? "bg-gradient-to-r from-primary to-primary-glow" : ""}`}
              >
                {tab}
              </Button>
            ))}
          </div>

          {/* Experience Tab */}
          {activeTab === "experience" && (
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {experience.map((job, index) => (
                <motion.div
                  key={index}
                  className="glass-strong rounded-2xl p-8 hover-lift"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
                      <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                        <Building2 className="w-4 h-4" />
                        {job.company}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {job.period}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {job.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Skills Tab */}
          {activeTab === "skills" && (
            <motion.div 
              className="grid md:grid-cols-2 gap-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {Object.entries(skills).map(([category, items], index) => (
                <motion.div
                  key={category}
                  className="glass-strong rounded-2xl p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    {category === "Cloud & Infrastructure" && <Cloud className="w-5 h-5 text-primary" />}
                    {category === "Virtualization" && <Database className="w-5 h-5 text-accent" />}
                    {category === "Automation & DevOps" && <Terminal className="w-5 h-5 text-primary" />}
                    {category === "Systems Management" && <Smartphone className="w-5 h-5 text-accent" />}
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {items.map((skill, i) => (
                      <div key={i} className="flex items-center gap-3 glass rounded-lg p-3 hover:bg-primary/5 transition-colors">
                        <Zap className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Certifications */}
              <motion.div
                className="glass-strong rounded-2xl p-8 md:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <Award className="w-5 h-5 text-primary" />
                  Professional Certifications
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {certifications.map((cert, i) => (
                    <div key={i} className="glass rounded-lg p-4 hover:bg-accent/5 transition-colors">
                      <div className="font-semibold mb-2">{cert.name}</div>
                      <div className="text-sm text-muted-foreground">{cert.status}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Education Tab */}
          {activeTab === "education" && (
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="glass-strong rounded-2xl p-8 hover-lift"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent text-white">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{edu.degree}</h3>
                      <div className="text-primary font-semibold mb-2">{edu.school}</div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span>GPA: <span className="text-accent font-semibold">{edu.gpa}</span></span>
                        {edu.focus && <span className="text-foreground">{edu.focus}</span>}
                        {edu.honors && <span className="text-accent font-semibold">{edu.honors}</span>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Download Resume CTA */}
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all duration-500"
              onClick={() => window.print()}
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
