import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Wand2,
  MessageSquare,
  FileText,
  BarChart3,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface PortalSidebarProps {
  open: boolean;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onClose: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: string;
  adminOnly?: boolean;
  comingSoon?: boolean;
}

const PortalSidebar = ({
  open,
  collapsed,
  onToggleCollapse,
  onClose,
}: PortalSidebarProps) => {
  const location = useLocation();
  const { user } = useAuth();
  const [isSuperadmin, setIsSuperadmin] = useState(false);

  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  const checkAdminStatus = async () => {
    if (!user) return;

    try {
      const { data } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      setIsSuperadmin(data?.role === 'superadmin');
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Home className="w-5 h-5" />,
      path: '/portal/dashboard',
    },
    {
      id: 'renovation',
      label: 'AI Renovation',
      icon: <Wand2 className="w-5 h-5" />,
      path: '/portal/apps/renovation',
      badge: 'Popular',
    },
    {
      id: 'review',
      label: 'Review Agent',
      icon: <MessageSquare className="w-5 h-5" />,
      path: '/portal/apps/review-replier',
    },
    {
      id: 'content',
      label: 'Content Writer',
      icon: <FileText className="w-5 h-5" />,
      path: '/portal/apps/content-writer',
      badge: 'New',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      path: '/portal/analytics',
      adminOnly: true,
    },
  ];

  const bottomNavItems: NavItem[] = [
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="w-5 h-5" />,
      path: '/portal/profile',
      comingSoon: true,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      path: '/portal/settings',
      comingSoon: true,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  const filteredNavItems = navItems.filter(
    (item) => !item.adminOnly || isSuperadmin
  );

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: open ? 0 : -300,
          width: collapsed ? 80 : 280,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed left-0 top-0 h-screen bg-background border-r border-border z-50",
          "flex flex-col",
          "lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="lk-p-lg border-b border-border flex items-center justify-between">
          {!collapsed && (
            <Link
              to="/portal/dashboard"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm">AI Portal</div>
                <div className="text-xs text-muted-foreground">
                  {isSuperadmin ? 'Superadmin' : 'Member'}
                </div>
              </div>
            </Link>
          )}

          {/* Toggle Collapse Button - Desktop Only */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="hidden lg:flex"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>

          {/* Close Button - Mobile Only */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto lk-py-md">
          <div className="space-y-1 lk-px-sm">
            {filteredNavItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={cn(
                  "flex items-center gap-3 lk-px-md lk-py-sm rounded-lg",
                  "transition-all duration-200",
                  "hover:bg-accent/50",
                  isActive(item.path) &&
                    "bg-primary/10 text-primary font-medium",
                  collapsed && "justify-center"
                )}
                title={collapsed ? item.label : undefined}
              >
                {item.icon}
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <Badge
                        variant={item.badge === 'New' ? 'default' : 'secondary'}
                        className="text-xs px-2 py-0"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            ))}
          </div>

          {/* Divider */}
          {!collapsed && (
            <div className="my-4 lk-px-md">
              <div className="h-px bg-border" />
            </div>
          )}

          {/* Bottom Nav Items */}
          <div className="space-y-1 lk-px-sm mt-4">
            {bottomNavItems.map((item) => (
              <Link
                key={item.id}
                to={item.comingSoon ? '#' : item.path}
                onClick={(e) => {
                  if (item.comingSoon) {
                    e.preventDefault();
                    return;
                  }
                  if (window.innerWidth < 1024) onClose();
                }}
                className={cn(
                  "flex items-center gap-3 lk-px-md lk-py-sm rounded-lg",
                  "transition-all duration-200",
                  !item.comingSoon && "hover:bg-accent/50",
                  item.comingSoon && "opacity-50 cursor-not-allowed",
                  isActive(item.path) &&
                    "bg-primary/10 text-primary font-medium",
                  collapsed && "justify-center"
                )}
                title={collapsed ? item.label : undefined}
              >
                {item.icon}
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.comingSoon && (
                      <span className="text-xs text-muted-foreground">Soon</span>
                    )}
                  </>
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer - Upgrade CTA */}
        {!collapsed && !isSuperadmin && (
          <div className="lk-p-md border-t border-border">
            <div className="lk-p-md rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
              <div className="text-sm font-semibold lk-mb-xs">Upgrade to Pro</div>
              <p className="text-xs text-muted-foreground lk-mb-sm">
                Unlimited AI generations & premium features
              </p>
              <Button size="sm" className="w-full" variant="default">
                Upgrade Now
              </Button>
            </div>
          </div>
        )}
      </motion.aside>
    </>
  );
};

export default PortalSidebar;
