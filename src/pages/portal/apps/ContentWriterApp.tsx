import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  ArrowLeft,
  Loader2,
  Copy,
  Check,
  AlertCircle,
  Sparkles,
  Mail,
  Share2,
  Megaphone,
  FileEdit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import WireframeBackground from "@/components/WireframeBackground";

const ContentWriterApp = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState("");
  const [contentType, setContentType] = useState("general");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const contentTypes = [
    {
      id: 'blog',
      icon: <FileEdit className="w-6 h-6" />,
      title: 'Blog Post',
      description: 'Long-form article',
      gradient: 'from-blue-500 to-cyan-600',
      example: 'Tips for choosing the perfect paint color'
    },
    {
      id: 'social',
      icon: <Share2 className="w-6 h-6" />,
      title: 'Social Media',
      description: 'Facebook/Instagram post',
      gradient: 'from-pink-500 to-rose-600',
      example: 'Weekend sale on bathroom remodels'
    },
    {
      id: 'email',
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      description: 'Professional email',
      gradient: 'from-purple-500 to-indigo-600',
      example: 'Following up on renovation quote'
    },
    {
      id: 'ad',
      icon: <Megaphone className="w-6 h-6" />,
      title: 'Ad Copy',
      description: 'Advertising text',
      gradient: 'from-orange-500 to-red-600',
      example: 'Spring renovation special offer'
    },
  ];

  const generateContent = async () => {
    if (!prompt.trim()) {
      setError("Please tell me what you want me to write!");
      return;
    }

    if (prompt.trim().length < 5) {
      setError("Please be more specific! Tell me more details.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedContent("");

    try {
      const response = await fetch('/api/content-writer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user?.id,
          prompt: prompt,
          content_type: contentType,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedContent(data.content);
        setRemaining(data.remaining);
      } else {
        setError(data.error || 'Failed to generate content');
      }
    } catch (err) {
      setError('Something went wrong. Please try again!');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const startOver = () => {
    setPrompt("");
    setGeneratedContent("");
    setError(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <WireframeBackground variant="dots" density="low" animate={true} />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />

      <div className="relative z-20">
        {/* Header */}
        <div className="border-b border-border/40 bg-background/80 backdrop-blur-xl">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link to="/portal/dashboard">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <div className="h-6 w-px bg-border" />
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="font-semibold">AI Content Writer</span>
                </div>
              </div>
              {remaining !== null && (
                <Badge variant="outline">
                  {remaining} {remaining === 1 ? 'try' : 'tries'} left
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Intro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                ✨ AI Content Writer
              </h1>
              <p className="text-xl text-muted-foreground">
                Tell me what you want. I'll write it. Simple as that.
              </p>
            </motion.div>

            {/* Error Alert */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-6"
                >
                  <Alert variant="destructive">
                    <AlertCircle className="w-4 h-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            {!generatedContent ? (
              <div className="space-y-8">
                {/* Step 1: Choose Type */}
                <Card className="glass-strong border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                        1
                      </span>
                      What do you want to write?
                    </CardTitle>
                    <CardDescription>
                      Pick one (don't worry, it's easy to switch)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {contentTypes.map((type) => (
                        <motion.button
                          key={type.id}
                          onClick={() => setContentType(type.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-6 rounded-xl border-2 transition-all text-left ${
                            contentType === type.id
                              ? 'border-primary bg-primary/10 shadow-lg'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${type.gradient} text-white mb-3`}>
                            {type.icon}
                          </div>
                          <h3 className="font-semibold text-lg mb-1">{type.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{type.description}</p>
                          <p className="text-xs text-muted-foreground italic">
                            Example: "{type.example}"
                          </p>
                        </motion.button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Step 2: Tell Me What You Want */}
                <Card className="glass-strong border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                        2
                      </span>
                      Tell me what you want me to write
                    </CardTitle>
                    <CardDescription>
                      Just type what you're thinking. The more details, the better!
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Example: Write about our spring bathroom renovation sale with 15% off. Mention we use eco-friendly materials and offer free design consultations."
                      rows={6}
                      className="text-base resize-none"
                    />
                    
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <p className="text-sm font-semibold flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        Pro Tips:
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Be specific about what you want</li>
                        <li>Mention key details (prices, dates, offers)</li>
                        <li>Include your business name if relevant</li>
                        <li>Don't worry about perfect grammar - I'll fix it!</li>
                      </ul>
                    </div>

                    <Button
                      onClick={generateContent}
                      disabled={isGenerating || !prompt.trim()}
                      size="lg"
                      className="w-full text-lg h-14 bg-gradient-to-r from-primary to-accent"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Writing your content...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 mr-2" />
                          Write It For Me!
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              /* Generated Content View */
              <div className="space-y-6">
                <Card className="glass-strong border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500" />
                        Your Content is Ready!
                      </span>
                      <Button
                        onClick={startOver}
                        variant="outline"
                        size="sm"
                      >
                        Write Something Else
                      </Button>
                    </CardTitle>
                    <CardDescription>
                      Feel free to edit before using
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      value={generatedContent}
                      onChange={(e) => setGeneratedContent(e.target.value)}
                      rows={15}
                      className="text-base font-mono"
                    />

                    <div className="flex gap-3">
                      <Button
                        onClick={copyToClipboard}
                        className="flex-1"
                        size="lg"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-5 h-5 mr-2" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-5 h-5 mr-2" />
                            Copy to Clipboard
                          </>
                        )}
                      </Button>
                      
                      <Button
                        onClick={generateContent}
                        disabled={isGenerating}
                        variant="outline"
                        size="lg"
                      >
                        {isGenerating ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5 mr-2" />
                            Regenerate
                          </>
                        )}
                      </Button>
                    </div>

                    {remaining !== null && remaining <= 1 && (
                      <Alert>
                        <AlertCircle className="w-4 h-4" />
                        <AlertDescription>
                          ⚠️ You only have {remaining} {remaining === 1 ? 'try' : 'tries'} left!
                          <Button variant="link" className="ml-2 p-0 h-auto">
                            Upgrade for unlimited access
                          </Button>
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentWriterApp;
