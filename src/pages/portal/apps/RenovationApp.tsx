import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wand2,
  Upload,
  ArrowLeft,
  Download,
  Sparkles,
  Loader2,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle,
  Crown,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import WireframeBackground from "@/components/WireframeBackground";

interface UserProfile {
  role: string;
  generation_count: number;
  generation_limit: number;
}

const RenovationApp = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchUserProfile();
  }, [user, navigate]);

  const fetchUserProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('role, generation_count, generation_limit')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError("Failed to load your profile. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError("Please select a valid image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be less than 10MB");
      return;
    }

    setOriginalFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImage(reader.result as string);
      setError(null);
      setGeneratedImage(null);
      setSuccess(false);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!originalFile || !prompt.trim()) {
      setError("Please upload an image and enter a renovation prompt");
      return;
    }

    if (!profile) {
      setError("Profile not loaded");
      return;
    }

    // Check if user has generations remaining (skip for superadmin)
    const isSuperadmin = profile.role === 'superadmin';
    const remainingGens = profile.generation_limit - profile.generation_count;
    
    if (!isSuperadmin && remainingGens <= 0) {
      setError("You've reached your generation limit. Upgrade to continue!");
      return;
    }

    setGenerating(true);
    setError(null);
    setProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 1000);

      // Prepare form data
      const formData = new FormData();
      formData.append('image', originalFile);
      formData.append('prompt', prompt);
      formData.append('userId', user!.id);

      // Call API
      const response = await fetch('/api/virtual-design', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Generation failed');
      }

      const data = await response.json();
      
      // Set generated image
      setGeneratedImage(data.generatedImageUrl);
      setSuccess(true);

      // Update local profile
      if (!isSuperadmin) {
        setProfile(prev => prev ? {
          ...prev,
          generation_count: prev.generation_count + 1
        } : null);
      }

      // Refresh profile from database
      await fetchUserProfile();

    } catch (err) {
      const error = err as Error;
      setError(error.message || "Failed to generate image. Please try again.");
      setProgress(0);
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `renovation-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setOriginalImage(null);
    setOriginalFile(null);
    setGeneratedImage(null);
    setPrompt("");
    setError(null);
    setSuccess(false);
    setProgress(0);
  };

  const isSuperadmin = profile?.role === 'superadmin';
  const remainingGens = profile ? profile.generation_limit - profile.generation_count : 0;
  const usagePercent = profile ? (profile.generation_count / profile.generation_limit) * 100 : 0;

  const promptSuggestions = [
    "Add a modern attached garage",
    "Paint the exterior light gray with white trim",
    "Add a front porch with white columns",
    "Modernize with large windows and clean lines",
    "Add stone accent wall and landscaping",
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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
                  <Wand2 className="w-5 h-5 text-primary" />
                  <span className="font-semibold">AI Renovation Tool</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {isSuperadmin ? (
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">
                    <Crown className="w-3 h-3 mr-1" />
                    Superadmin
                  </Badge>
                ) : (
                  <Badge variant="outline">
                    {remainingGens} / {profile?.generation_limit} remaining
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Usage Alert */}
            {!isSuperadmin && remainingGens <= 2 && remainingGens > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <Alert className="border-orange-500/50 bg-orange-500/10">
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription>
                    You have {remainingGens} generation{remainingGens === 1 ? '' : 's'} remaining this month.
                    <Button variant="link" className="ml-2 p-0 h-auto">
                      Upgrade for unlimited
                    </Button>
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            {!isSuperadmin && remainingGens === 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <Alert className="border-red-500/50 bg-red-500/10">
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription>
                    You've reached your monthly limit.
                    <Button variant="link" className="ml-2 p-0 h-auto">
                      Upgrade to Pro for unlimited generations
                    </Button>
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Upload Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="glass-strong border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="w-5 h-5" />
                      Upload Image
                    </CardTitle>
                    <CardDescription>
                      Upload a photo of the property you want to renovate
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />

                    {!originalImage ? (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:border-primary/50 transition-colors"
                      >
                        <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG up to 10MB
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="relative rounded-lg overflow-hidden">
                          <img
                            src={originalImage}
                            alt="Original"
                            className="w-full h-auto"
                          />
                          <Button
                            onClick={handleReset}
                            variant="secondary"
                            size="sm"
                            className="absolute top-2 right-2"
                          >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Change Image
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Renovation Prompt
                          </label>
                          <Textarea
                            placeholder="Describe your renovation (e.g., 'Add a modern garage, paint walls light gray')"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            rows={4}
                            disabled={generating}
                          />
                          <div className="flex flex-wrap gap-2">
                            {promptSuggestions.map((suggestion, idx) => (
                              <Button
                                key={idx}
                                variant="outline"
                                size="sm"
                                onClick={() => setPrompt(suggestion)}
                                disabled={generating}
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        </div>

                        {error && (
                          <Alert variant="destructive">
                            <AlertCircle className="w-4 h-4" />
                            <AlertDescription>{error}</AlertDescription>
                          </Alert>
                        )}

                        <Button
                          onClick={handleGenerate}
                          disabled={generating || !prompt.trim() || (remainingGens === 0 && !isSuperadmin)}
                          className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-glow"
                          size="lg"
                        >
                          {generating ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4 mr-2" />
                              Generate Renovation
                            </>
                          )}
                        </Button>

                        {generating && (
                          <div className="space-y-2">
                            <Progress value={progress} className="h-2" />
                            <p className="text-xs text-center text-muted-foreground">
                              AI is transforming your image... ({progress}%)
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Result Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="glass-strong border-primary/20 h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wand2 className="w-5 h-5" />
                      AI Generated Result
                    </CardTitle>
                    <CardDescription>
                      Your renovated property will appear here
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AnimatePresence mode="wait">
                      {!generatedImage ? (
                        <motion.div
                          key="empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="border-2 border-dashed border-border rounded-lg p-12 text-center h-[400px] flex flex-col items-center justify-center"
                        >
                          <Sparkles className="w-12 h-12 text-muted-foreground mb-4" />
                          <p className="text-sm text-muted-foreground">
                            Upload an image and generate to see results
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="result"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="space-y-4"
                        >
                          {success && (
                            <Alert className="border-green-500/50 bg-green-500/10">
                              <CheckCircle className="w-4 h-4" />
                              <AlertDescription>
                                Renovation generated successfully!
                              </AlertDescription>
                            </Alert>
                          )}

                          <div className="relative rounded-lg overflow-hidden">
                            <img
                              src={generatedImage}
                              alt="Generated"
                              className="w-full h-auto"
                            />
                          </div>

                          <div className="flex gap-2">
                            <Button
                              onClick={handleDownload}
                              className="flex-1"
                              variant="outline"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                            <Button
                              onClick={handleReset}
                              className="flex-1"
                            >
                              <RefreshCw className="w-4 h-4 mr-2" />
                              New Renovation
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* How it Works */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-12"
            >
              <Card className="glass-strong border-primary/20">
                <CardHeader>
                  <CardTitle>How It Works</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="inline-flex p-3 rounded-full bg-primary/20 mb-4">
                        <Upload className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">1. Upload</h3>
                      <p className="text-sm text-muted-foreground">
                        Upload a photo of the property you want to renovate
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex p-3 rounded-full bg-primary/20 mb-4">
                        <Wand2 className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">2. Describe</h3>
                      <p className="text-sm text-muted-foreground">
                        Tell our AI what renovations you'd like to see
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex p-3 rounded-full bg-primary/20 mb-4">
                        <Download className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">3. Download</h3>
                      <p className="text-sm text-muted-foreground">
                        Get your AI-generated renovation in seconds
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenovationApp;
