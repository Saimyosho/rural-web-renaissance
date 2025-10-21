import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Star,
  Send,
  RefreshCw,
  CheckCircle,
  Clock,
  ThumbsUp,
  Edit,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import WireframeBackground from "@/components/WireframeBackground";

interface Review {
  platform: string;
  review_id: string;
  author: string;
  rating: number;
  text: string;
  timestamp: number;
  profile_photo?: string;
  ai_response?: string;
  response_edited?: boolean;
}

const ReviewReplierApp = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [generatedResponse, setGeneratedResponse] = useState("");
  const [editedResponse, setEditedResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Platform connection states
  const [platform, setPlatform] = useState<'google' | 'yelp'>('google');
  const [placeId, setPlaceId] = useState("");
  const [businessId, setBusinessId] = useState("");
  const [businessName, setBusinessName] = useState("your business");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);

    try {
      const identifier = platform === 'google' ? placeId : businessId;
      
      if (!identifier) {
        setError(`Please enter your ${platform === 'google' ? 'Place ID' : 'Business ID'}`);
        return;
      }

      const response = await fetch('/api/review-agent/fetch-reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, identifier }),
      });

      const data = await response.json();

      if (data.success) {
        setReviews(data.reviews);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(data.error || 'Failed to fetch reviews');
      }
    } catch (err) {
      setError('Failed to connect to review platform');
    } finally {
      setLoading(false);
    }
  };

  const generateResponse = async (review: Review) => {
    setIsGenerating(true);
    setError(null);
    setSelectedReview(review);

    try {
      const response = await fetch('/api/review-agent/generate-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          review_text: review.text,
          rating: review.rating,
          business_name: businessName,
          user_id: user?.id,
          ...review
        }),
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedResponse(data.response);
        setEditedResponse(data.response);
        
        // Update review in list
        setReviews(prev => prev.map(r => 
          r.review_id === review.review_id 
            ? { ...r, ai_response: data.response } 
            : r
        ));
      } else {
        setError(data.error || 'Failed to generate response');
      }
    } catch (err) {
      setError('Failed to generate AI response');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateBulkResponses = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/review-agent/bulk-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviews,
          business_name: businessName,
          user_id: user?.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Update reviews with generated responses
        const updatedReviews = reviews.map(review => {
          const match = data.responses.find((r: any) => r.review_id === review.review_id);
          return match ? { ...review, ai_response: match.ai_response } : review;
        });
        
        setReviews(updatedReviews);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(data.error || 'Failed to generate responses');
      }
    } catch (err) {
      setError('Failed to generate bulk responses');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
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
                  <MessageSquare className="w-5 h-5 text-emerald-500" />
                  <span className="font-semibold">Review Response Agent</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Success/Error Alerts */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-6"
                >
                  <Alert className="border-green-500/50 bg-green-500/10">
                    <CheckCircle className="w-4 h-4" />
                    <AlertDescription>
                      Reviews fetched successfully!
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}

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

            <Tabs defaultValue="reviews" className="space-y-6">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <Card className="glass-strong border-primary/20">
                  <CardHeader>
                    <CardTitle>Connect Your Platforms</CardTitle>
                    <CardDescription>
                      Link your business accounts to fetch and respond to reviews
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Business Name
                        </label>
                        <Input
                          placeholder="Your Business Name"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Platform
                        </label>
                        <Select value={platform} onValueChange={(v: any) => setPlatform(v)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="google">Google Business</SelectItem>
                            <SelectItem value="yelp">Yelp</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {platform === 'google' && (
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Google Place ID
                          </label>
                          <Input
                            placeholder="ChIJN1t_tDeuEmsRUsoy..."
                            value={placeId}
                            onChange={(e) => setPlaceId(e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Find your Place ID in Google Business Profile
                          </p>
                        </div>
                      )}

                      {platform === 'yelp' && (
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Yelp Business ID
                          </label>
                          <Input
                            placeholder="your-business-name-city"
                            value={businessId}
                            onChange={(e) => setBusinessId(e.target.value)}
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Found in your Yelp business URL
                          </p>
                        </div>
                      )}

                      <Button
                        onClick={fetchReviews}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Fetching...
                          </>
                        ) : (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Fetch Reviews
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Reviews List */}
                  <div className="space-y-4">
                    <Card className="glass-strong border-primary/20">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="w-5 h-5" />
                            Recent Reviews ({reviews.length})
                          </CardTitle>
                          {reviews.length > 0 && (
                            <Button
                              onClick={generateBulkResponses}
                              disabled={loading}
                              size="sm"
                              variant="outline"
                            >
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Generate All
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {reviews.length === 0 ? (
                          <div className="text-center py-12">
                            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                            <p className="text-muted-foreground">
                              No reviews yet. Connect a platform to get started.
                            </p>
                            <Button
                              onClick={() => document.querySelector('[value="settings"]')?.dispatchEvent(new Event('click'))}
                              variant="outline"
                              className="mt-4"
                            >
                              Connect Platform
                            </Button>
                          </div>
                        ) : (
                          reviews.map((review) => (
                            <motion.div
                              key={review.review_id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                selectedReview?.review_id === review.review_id
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border hover:border-primary/50'
                              }`}
                              onClick={() => setSelectedReview(review)}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-sm font-bold">
                                    {review.author[0]}
                                  </div>
                                  <div>
                                    <p className="font-medium text-sm">{review.author}</p>
                                    <div className="flex gap-1">{renderStars(review.rating)}</div>
                                  </div>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {review.platform}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-3">
                                {review.text}
                              </p>
                              {review.ai_response && (
                                <div className="mt-2 flex items-center gap-2 text-xs text-green-600">
                                  <CheckCircle className="w-3 h-3" />
                                  Response generated
                                </div>
                              )}
                              {!review.ai_response && (
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    generateResponse(review);
                                  }}
                                  disabled={isGenerating}
                                  size="sm"
                                  className="mt-2 w-full"
                                >
                                  {isGenerating ? (
                                    <>
                                      <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                                      Generating...
                                    </>
                                  ) : (
                                    <>
                                      <MessageSquare className="w-3 h-3 mr-2" />
                                      Generate Response
                                    </>
                                  )}
                                </Button>
                              )}
                            </motion.div>
                          ))
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Response Editor */}
                  <Card className="glass-strong border-primary/20 lg:sticky lg:top-6 h-fit">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Edit className="w-5 h-5" />
                        AI Response
                      </CardTitle>
                      <CardDescription>
                        {selectedReview 
                          ? `Response for ${selectedReview.author}`
                          : 'Select a review to generate a response'
                        }
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedReview ? (
                        <>
                          {/* Original Review */}
                          <div className="p-4 border border-border rounded-lg bg-muted/30">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex gap-1">{renderStars(selectedReview.rating)}</div>
                              <span className="text-xs text-muted-foreground">
                                {selectedReview.platform}
                              </span>
                            </div>
                            <p className="text-sm">{selectedReview.text}</p>
                          </div>

                          {/* Generated Response */}
                          {generatedResponse ? (
                            <>
                              <Textarea
                                value={editedResponse}
                                onChange={(e) => setEditedResponse(e.target.value)}
                                rows={6}
                                className="resize-none"
                              />

                              <div className="flex gap-2">
                                <Button
                                  onClick={() => copyToClipboard(editedResponse)}
                                  variant="outline"
                                  className="flex-1"
                                >
                                  {isCopied ? (
                                    <>
                                      <Check className="w-4 h-4 mr-2" />
                                      Copied!
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-4 h-4 mr-2" />
                                      Copy
                                    </>
                                  )}
                                </Button>
                                <Button
                                  onClick={() => generateResponse(selectedReview)}
                                  disabled={isGenerating}
                                  variant="outline"
                                >
                                  <RefreshCw className="w-4 h-4" />
                                </Button>
                              </div>
                            </>
                          ) : (
                            <div className="text-center py-8">
                              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                              <Button
                                onClick={() => generateResponse(selectedReview)}
                                disabled={isGenerating}
                                className="bg-gradient-to-r from-emerald-500 to-teal-600"
                              >
                                {isGenerating ? (
                                  <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Generating...
                                  </>
                                ) : (
                                  <>
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    Generate AI Response
                                  </>
                                )}
                              </Button>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-center py-12 text-muted-foreground">
                          Select a review from the list to generate a response
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewReplierApp;
