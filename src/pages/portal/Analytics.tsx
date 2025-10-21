import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  TrendingUp,
  Users,
  DollarSign,
  Sparkles,
  AlertTriangle,
  BarChart3,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import WireframeBackground from "@/components/WireframeBackground";

interface OverviewStats {
  total_users: number;
  active_users_7d: number;
  total_ai_generations: number;
  paid_users: number;
  mrr_estimate: number;
  conversion_rate: number;
}

interface RevenueMetrics {
  mrr: number;
  arr: number;
  paid_users: number;
  avg_ltv: number;
  tier_breakdown: {
    pro: number;
    enterprise: number;
  };
}

const Analytics = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSuperadmin, setIsSuperadmin] = useState(false);
  const [overviewStats, setOverviewStats] = useState<OverviewStats | null>(null);
  const [revenueMetrics, setRevenueMetrics] = useState<RevenueMetrics | null>(null);
  const [dailySignups, setDailySignups] = useState<any[]>([]);
  const [churnRisk, setChurnRisk] = useState<any[]>([]);

  useEffect(() => {
    checkAccess();
  }, [user]);

  const checkAccess = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      // Check if user is superadmin
      const { data, error } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (data?.role !== 'superadmin') {
        navigate("/portal/dashboard");
        return;
      }

      setIsSuperadmin(true);
      await fetchAnalyticsData();
    } catch (error) {
      console.error('Error checking access:', error);
      navigate("/portal/dashboard");
    }
  };

  const fetchAnalyticsData = async () => {
    if (!user) return;

    try {
      // Fetch overview stats
      const overviewRes = await fetch(`/api/analytics?user_id=${user.id}&endpoint=overview`);
      const overviewData = await overviewRes.json();
      if (overviewData.success) {
        setOverviewStats(overviewData.data);
      }

      // Fetch revenue metrics
      const revenueRes = await fetch(`/api/analytics?user_id=${user.id}&endpoint=revenue`);
      const revenueData = await revenueRes.json();
      if (revenueData.success) {
        setRevenueMetrics(revenueData.data);
      }

      // Fetch daily signups
      const signupsRes = await fetch(`/api/analytics?user_id=${user.id}&endpoint=signups&days=30`);
      const signupsData = await signupsRes.json();
      if (signupsData.success) {
        setDailySignups(signupsData.data.slice(0, 7)); // Last 7 days
      }

      // Fetch churn risk
      const churnRes = await fetch(`/api/analytics?user_id=${user.id}&endpoint=churn`);
      const churnData = await churnRes.json();
      if (churnData.success) {
        setChurnRisk(churnData.data.slice(0, 10)); // Top 10 at risk
      }

    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!isSuperadmin) {
    return null;
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
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Analytics</span>
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">
                    👑 Superadmin Only
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Page Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                📊 Business Intelligence
              </h1>
              <p className="text-xl text-muted-foreground">
                Data-driven insights for growth & monetization
              </p>
            </motion.div>

            {/* Overview Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="glass-strong border-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Total Users
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {overviewStats?.total_users.toLocaleString() || 0}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {overviewStats?.active_users_7d || 0} active (7d)
                    </p>
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
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      AI Generations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {overviewStats?.total_ai_generations.toLocaleString() || 0}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Total across all apps
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="glass-strong border-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      MRR
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      ${revenueMetrics?.mrr.toLocaleString() || 0}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      ${revenueMetrics?.arr.toLocaleString() || 0} ARR
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="glass-strong border-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Conversion Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {overviewStats?.conversion_rate || 0}%
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {overviewStats?.paid_users || 0} paid users
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Revenue Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-12"
            >
              <Card className="glass-strong border-primary/20">
                <CardHeader>
                  <CardTitle>💰 Revenue Metrics</CardTitle>
                  <CardDescription>Current financial performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Monthly Recurring Revenue</p>
                      <p className="text-2xl font-bold">${revenueMetrics?.mrr.toLocaleString() || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Annual Recurring Revenue</p>
                      <p className="text-2xl font-bold">${revenueMetrics?.arr.toLocaleString() || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Avg Customer LTV</p>
                      <p className="text-2xl font-bold">${revenueMetrics?.avg_ltv.toLocaleString() || 0}</p>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-3">Tier Breakdown</p>
                    <div className="flex gap-4">
                      <Badge variant="outline">Pro: {revenueMetrics?.tier_breakdown.pro || 0}</Badge>
                      <Badge variant="outline">Enterprise: {revenueMetrics?.tier_breakdown.enterprise || 0}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Signups */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-12"
            >
              <Card className="glass-strong border-primary/20">
                <CardHeader>
                  <CardTitle>📈 Daily Signups (Last 7 Days)</CardTitle>
                  <CardDescription>New user acquisition trend</CardDescription>
                </CardHeader>
                <CardContent>
                  {dailySignups.length > 0 ? (
                    <div className="space-y-3">
                      {dailySignups.map((day, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                          <div>
                            <p className="font-medium">{new Date(day.signup_date).toLocaleDateString()}</p>
                            <p className="text-sm text-muted-foreground">
                              {day.source} • {day.campaign}
                            </p>
                          </div>
                          <Badge variant="secondary">{day.signups} signups</Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No signup data yet</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Churn Risk */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="glass-strong border-destructive/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    ⚠️ Churn Risk (Top 10)
                  </CardTitle>
                  <CardDescription>Users at risk of leaving</CardDescription>
                </CardHeader>
                <CardContent>
                  {churnRisk.length > 0 ? (
                    <div className="space-y-3">
                      {churnRisk.map((user, index) => (
                        <Alert key={index} variant={user.churn_risk_level === 'high' ? 'destructive' : 'default'}>
                          <AlertDescription className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{user.company_name || 'Anonymous'}</p>
                              <p className="text-sm">
                                {user.naics_code} • {user.generation_count}/{user.generation_limit} used
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge variant={
                                user.churn_risk_level === 'high' ? 'destructive' :
                                user.churn_risk_level === 'medium' ? 'default' : 'secondary'
                              }>
                                {Math.round(user.days_inactive)} days inactive
                              </Badge>
                            </div>
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      🎉 No users at risk!
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Coming Soon Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-12"
            >
              <Alert>
                <Sparkles className="w-4 h-4" />
                <AlertDescription>
                  <strong>More insights coming soon:</strong> Conversion funnels, AI usage by app, industry benchmarks, and ML-powered predictions.
                </AlertDescription>
              </Alert>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
