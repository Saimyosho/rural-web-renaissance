import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Copy, RotateCw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useTypingEffect } from "@/hooks/use-typing-effect";

interface SampleReview {
  text: string;
  rating: number;
  label: string;
  emoji: string;
}

const SAMPLE_REVIEWS: SampleReview[] = [
  {
    text: "Amazing food and great service! Our server was attentive and the atmosphere was perfect. Will definitely be back!",
    rating: 5,
    label: "5-Star Review",
    emoji: "😊"
  },
  {
    text: "Food was good but service was really slow. Waited 20 minutes for drinks and another 40 for our meals.",
    rating: 3,
    label: "3-Star Review",
    emoji: "😐"
  },
  {
    text: "Terrible experience. Food was cold, server was rude, and they got our order completely wrong. Never coming back.",
    rating: 1,
    label: "1-Star Review",
    emoji: "😠"
  }
];

type ToneType = "professional" | "friendly" | "apologetic";

const ReviewReplierDemo = () => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [tone, setTone] = useState<ToneType>("friendly");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [usageCount, setUsageCount] = useState(0);

  // Use typing effect for generated response
  const { displayedText: displayedResponse } = useTypingEffect({
    text: response,
    speed: 30,
    delay: 100
  });

  const loadSample = (sample: SampleReview) => {
    setReviewText(sample.text);
    setRating(sample.rating);
    setResponse("");
  };

  const generateResponse = async () => {
    if (!reviewText.trim()) return;

    setIsLoading(true);
    setResponse("");
    setUsageCount(prev => prev + 1);

    try {
      // TODO: Replace with actual Copilot API call
      // For now, using mock response
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockResponses = {
        professional: `Thank you for taking the time to share your feedback. We sincerely appreciate your ${rating >= 4 ? 'kind words' : 'honest review'} and ${rating >= 4 ? 'are delighted that you had a positive experience' : 'apologize for not meeting your expectations'}. ${rating < 4 ? 'We take all feedback seriously and are committed to improving our service. We hope you\'ll give us another opportunity to serve you better.' : 'We look forward to welcoming you back soon.'}`,
        
        friendly: `Hey there! Thanks so much for the review! ${rating >= 4 ? '🎉 We\'re thrilled you had a great time!' : '😔 We\'re really sorry things didn\'t go smoothly.'} ${rating < 4 ? 'Your feedback helps us improve, and we\'d love to make it right. Hope you\'ll give us another shot!' : 'Can\'t wait to see you again soon!'}`,
        
        apologetic: `We are truly sorry ${rating >= 4 ? 'to hear you had any concerns, though we appreciate your positive feedback' : 'that we fell short of your expectations'}. ${rating < 4 ? 'This is not the experience we want for our customers. Please reach out to us directly so we can make this right and ensure this doesn\'t happen again.' : 'Your satisfaction is our priority, and we\'re grateful for your understanding.'} Thank you for giving us the chance to serve you.`
      };

      setResponse(mockResponses[tone]);
    } catch (error) {
      console.error("Error generating response:", error);
      setResponse("Oops! Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(response);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const regenerate = () => {
    setResponse("");
    generateResponse();
  };

  return (
    <Card className="glass-strong border-primary/20 p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-r from-primary to-accent rounded-lg">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold">ReviewReplier AI Demo</h3>
          <p className="text-sm text-muted-foreground">
            Generate professional responses to customer reviews instantly
          </p>
        </div>
      </div>

      {/* Sample Reviews */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-3">Quick Test Scenarios:</p>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_REVIEWS.map((sample, idx) => (
            <Button
              key={idx}
              variant="outline"
              size="sm"
              onClick={() => loadSample(sample)}
              className="text-xs"
            >
              <span className="mr-1">{sample.emoji}</span>
              {sample.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Review Input */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Customer Review:
          </label>
          <Textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Paste the customer's review here..."
            className="min-h-[120px] resize-none"
            disabled={isLoading}
          />
          <p className="text-xs text-muted-foreground mt-1">
            {reviewText.length} characters
          </p>
        </div>

        {/* Rating */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            Rating:
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="text-2xl transition-all hover:scale-110"
                disabled={isLoading}
              >
                {star <= rating ? "⭐" : "☆"}
              </button>
            ))}
            <span className="ml-3 text-sm text-muted-foreground self-center">
              ({rating} star{rating !== 1 ? 's' : ''})
            </span>
          </div>
        </div>

        {/* Tone Selector */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            Response Tone:
          </label>
          <div className="flex gap-2">
            {(["professional", "friendly", "apologetic"] as ToneType[]).map((t) => (
              <Button
                key={t}
                variant={tone === t ? "default" : "outline"}
                size="sm"
                onClick={() => setTone(t)}
                disabled={isLoading}
                className="capitalize"
              >
                {t}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <Button
        onClick={generateResponse}
        disabled={!reviewText.trim() || isLoading}
        className="w-full bg-gradient-to-r from-primary to-accent text-white mb-6"
        size="lg"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
            Generating Response...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Response
          </>
        )}
      </Button>

      {/* Response Output */}
      {(displayedResponse || isLoading) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Generated Response:</label>
            {response && !isLoading && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={regenerate}
                  className="text-xs"
                >
                  <RotateCw className="w-3 h-3 mr-1" />
                  Regenerate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="text-xs"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3 h-3 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          <div className="glass border border-primary/20 rounded-lg p-4 min-h-[120px]">
            <p className="text-sm whitespace-pre-wrap">
              {displayedResponse}
              {isLoading && !displayedResponse && (
                <span className="inline-flex gap-1">
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                  >
                    .
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                  >
                    .
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                  >
                    .
                  </motion.span>
                </span>
              )}
            </p>
          </div>

          {response && (
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{response.split(' ').length} words • {response.length} characters</span>
              <Badge variant="secondary" className="text-xs">
                {tone.charAt(0).toUpperCase() + tone.slice(1)} Tone
              </Badge>
            </div>
          )}
        </motion.div>
      )}

      {/* Usage Stats */}
      {usageCount > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-4 glass border border-primary/20 rounded-lg"
        >
          <p className="text-xs text-muted-foreground text-center">
            🎉 You've generated <span className="font-bold text-primary">{usageCount}</span> response{usageCount !== 1 ? 's' : ''} • 
            Saved approximately <span className="font-bold text-primary">{usageCount * 15}</span> minutes
          </p>
        </motion.div>
      )}
    </Card>
  );
};

export default ReviewReplierDemo;
