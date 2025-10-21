import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { 
  Wand2, 
  MessageSquare, 
  Target,
  Sparkles,
  ArrowRight,
  User,
  BarChart3,
  FileText,
  TrendingUp
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import PortalLayout from "@/components/portal/PortalLayout";

interface UserProfile {
  company_name: string | null;
  tier: string;
  role: string;
  generation_count: number;
  generation_limit: number;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, [user]);

  const fetchUserProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const apps = [
    {
      id: 'renovation',
      icon: <Wand2 className="w-6 h-6" />,
      title: 'AI Renovation Tool',
      description: 'Transform home photos with AI-powered design',
      gradient: 'from-purple-500 to-purple-700',
      route: '/portal/apps/renovation',
      popular: true,
    },
    {
      id: 'review-replier',
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Review Response Agent',
      description: 'Auto-respond to Google, Yelp & Facebook reviews',
      gradient: 'from-emerald-500 to-teal-600',
      route: '/portal/apps/review-replier',
    },
    {
      id: 'content-writer',
      icon: <FileText className="w-6 h-6" />,
      title: 'AI Content Writer',
      description: 'Write blogs, emails, social posts & ads instantly',
      gradient: 'from-violet-500 to-purple-600',
      route: '/portal/apps/content-writer',
      popular: true,
    },
    {
      id: 'social-booking',
      icon: <Target className="w-6 h-6" />,
      title: 'Social Media & Booking',
      description: 'Auto-post content & book clients 24/7',
      gradient: 'from-blue-500 to-indigo-600',
      route: '/portal/apps/social-booking',
      comingSoon: true,
    },
    {
      id: 'competitor-intel',
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Competitor Intelligence',
      description: 'Monitor competitors & auto-adjust strategy',
      gradient: 'from-orange-500 to-red-600',
      route: '/portal/apps/competitor-intel',
      comingSoon: true,
    },
  ];

  const isSuperadmin = profile?.role === 'superadmin';
  
  const usagePercentage = profile 
    ? (profile.generation_count / profile.generation_limit) * 100 
    : 0;

  const remainingGenerations = profile 
    ? profile.generation_limit - profile.generation_count 
    : 0;

  return (
    <PortalLayout>
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome back{profile?.company_name ? `, ${profile.company_name}` : ''}!
          </h1>
          <p className="text-xl text-muted-foreground">
            Your AI-powered business tools are ready to use
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="glass-strong border-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      AI Generations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-baseline justify-between">
                        <span className="text-3xl font-bold">
                          {isSuperadmin ? '∞' : remainingGenerations}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {isSuperadmin ? 'Unlimited' : `/ ${profile?.generation_limit || 10} remaining`}
                        </span>
                      </div>
                      {!isSuperadmin && (
                        <Progress value={100 - usagePercentage} className="h-2" />
                      )}
                      {!isSuperadmin && remainingGenerations <= 2 && (
                        <p className="text-xs text-orange-500 flex items-center gap-1">
                          <BarChart3 className="w-3 h-3" />
                          Running low! Upgrade for unlimited
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="glass-strong border-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Account Type
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-bold capitalize">{profile?.tier || 'Free'}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {profile?.tier === 'free' ? '3 FREE TRIES - Then upgrade!' : 'Premium features unlocked'}
                      </p>
                      </div>
                      <User className="w-8 h-8 text-primary opacity-20" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="glass-strong border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Ready to Scale?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3 font-semibold">⚠️ Only {remainingGenerations} {remainingGenerations === 1 ? 'try' : 'tries'} left!</p>
                    <p className="text-xs text-muted-foreground mb-3">Upgrade to Pro for unlimited access</p>
                    <Button size="sm" className="w-full bg-gradient-to-r from-primary to-accent">
                      Upgrade Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
        </div>

        {/* AI Apps Grid */}
        <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-6">Your AI Apps</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {apps.map((app, index) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Card className="glass-strong border-primary/20 group hover:border-primary/40 transition-all duration-300 relative overflow-hidden h-full">
                      {app.popular && (
                        <div className="absolute top-4 right-4 z-10">
                          <Badge className="bg-gradient-to-r from-purple-500 to-purple-700">
                            Most Popular
                          </Badge>
                        </div>
                      )}
                      {app.comingSoon && (
                        <div className="absolute top-4 right-4 z-10">
                          <Badge variant="secondary">Coming Soon</Badge>
                        </div>
                      )}
                      
                      <div 
                        className={`absolute inset-0 bg-gradient-to-br ${app.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                      />
                      
                      <CardHeader>
                        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${app.gradient} text-white mb-4 group-hover:scale-110 transition-transform`}>
                          {app.icon}
                        </div>
                        <CardTitle className="text-xl">{app.title}</CardTitle>
                        <CardDescription>{app.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          onClick={() => !app.comingSoon && navigate(app.route)}
                          disabled={app.comingSoon || (!isSuperadmin && remainingGenerations === 0)}
                          className="w-full group-hover:shadow-lg transition-all"
                          variant={app.comingSoon ? "secondary" : "default"}
                        >
                          {app.comingSoon ? (
                            'Coming Soon'
                          ) : (!isSuperadmin && remainingGenerations === 0) ? (
                            'Upgrade to Use'
                          ) : (
                            <>
                              Launch App
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
        </motion.div>

        {/* Getting Started Guide for New Users */}
        {profile && profile.generation_count === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-12"
              >
                <Card className="glass-strong border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      Getting Started
                    </CardTitle>
                    <CardDescription>
                      Try your first AI app and see the magic happen
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-3 text-sm">
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                          1
                        </span>
                        <span>Click "Launch App" on the AI Renovation Tool above</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                          2
                        </span>
                        <span>Upload a home photo or use one of our samples</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                          3
                        </span>
                        <span>Describe your renovation idea and watch AI transform it</span>
                      </li>
                    </ol>
                  </CardContent>
                </Card>
              </motion.div>
        )}
      </div>
    </PortalLayout>
  );
};

export default Dashboard;
