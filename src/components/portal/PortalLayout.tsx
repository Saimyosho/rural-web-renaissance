import { ReactNode, useState } from "react";
import { useLocation } from "react-router-dom";
import PortalSidebar from "./PortalSidebar";
import PortalHeader from "./PortalHeader";
import { cn } from "@/lib/utils";

interface PortalLayoutProps {
  children: ReactNode;
}

const PortalLayout = ({ children }: PortalLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  // Determine if we're in a full-screen app mode
  const isFullScreenApp = location.pathname.includes('/apps/');

  return (
    <div className="min-h-screen bg-background">
      {/* Portal Sidebar */}
      <PortalSidebar
        open={sidebarOpen}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          sidebarOpen && !sidebarCollapsed && "lg:ml-[280px]",
          sidebarOpen && sidebarCollapsed && "lg:ml-[80px]"
        )}
      >
        {/* Portal Header */}
        <PortalHeader
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          sidebarCollapsed={sidebarCollapsed}
        />

        {/* Page Content */}
        <main
          className={cn(
            "lk-py-lg",
            isFullScreenApp ? "px-0" : "container mx-auto lk-px-md"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default PortalLayout;
