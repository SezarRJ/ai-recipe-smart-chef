
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  Users,
  ChefHat,
  Carrot,
  BarChart3,
  Settings,
  Shield,
  Plug,
  UserCheck,
  Calculator,
  Server,
  Wrench,
  Gift,
  MessageSquare,
  Megaphone,
  Bell,
  Library,
  Languages,
  Globe,
  ImageIcon,
  CreditCard,
  HelpCircle,
  LogOut,
  Crown,
  Zap
} from 'lucide-react';
import { getAdminRole, adminLogout, isSuperAdminAuthenticated } from '@/lib/adminAuth';

export const ModernAdminSidebar = () => {
  const location = useLocation();
  const adminRole = getAdminRole();
  const isSuperAdmin = isSuperAdminAuthenticated();

  const handleLogout = () => {
    adminLogout();
    window.location.href = '/login';
  };

  // Core admin items available to all admins
  const coreItems = [
    {
      title: 'Dashboard',
      url: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Users',
      url: '/admin/users',
      icon: Users,
    },
    {
      title: 'Recipes',
      url: '/admin/recipes',
      icon: ChefHat,
    },
    {
      title: 'Ingredients',
      url: '/admin/ingredients',
      icon: Carrot,
    },
    {
      title: 'Images',
      url: '/admin/images',
      icon: ImageIcon,
    },
    {
      title: 'Analytics',
      url: '/admin/analytics',
      icon: BarChart3,
    }
  ];

  // Content management items
  const contentItems = [
    {
      title: 'Content Library',
      url: '/admin/content-library',
      icon: Library,
    },
    {
      title: 'Translations',
      url: '/admin/translations',
      icon: Languages,
    },
    {
      title: 'Languages',
      url: '/admin/languages',
      icon: Globe,
    },
    {
      title: 'Ingredient Images',
      url: '/admin/ingredient-images',
      icon: ImageIcon,
    }
  ];

  // Business & Operations items
  const businessItems = [
    {
      title: 'User Types',
      url: '/admin/user-types',
      icon: UserCheck,
    },
    {
      title: 'Accounting',
      url: '/admin/accounting',
      icon: Calculator,
    },
    {
      title: 'Subscriptions',
      url: '/admin/subscriptions',
      icon: CreditCard,
    },
    {
      title: 'Rewards',
      url: '/admin/rewards',
      icon: Gift,
    },
    {
      title: 'Advertisements',
      url: '/admin/advertisements',
      icon: Megaphone,
    }
  ];

  // Communication items
  const communicationItems = [
    {
      title: 'Communications',
      url: '/admin/communications',
      icon: MessageSquare,
    },
    {
      title: 'Notifications',
      url: '/admin/notification-system',
      icon: Bell,
    },
    {
      title: 'Support Tickets',
      url: '/admin/support-tickets',
      icon: HelpCircle,
    }
  ];

  // System & Security items (Super Admin only)
  const systemItems = [
    {
      title: 'Settings',
      url: '/admin/settings',
      icon: Settings,
    },
    {
      title: 'Security',
      url: '/admin/security',
      icon: Shield,
    },
    {
      title: 'Integrations',
      url: '/admin/integrations',
      icon: Plug,
    },
    {
      title: 'System',
      url: '/admin/system',
      icon: Server,
    },
    {
      title: 'Maintenance',
      url: '/admin/maintenance',
      icon: Wrench,
    }
  ];

  const renderMenuItems = (items: typeof coreItems) => {
    return items.map((item) => (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton 
          asChild 
          isActive={location.pathname === item.url}
          className="w-full justify-start"
        >
          <Link to={item.url} className="flex items-center gap-3 px-3 py-2">
            <item.icon className="h-4 w-4" />
            <span className="font-medium">{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));
  };

  return (
    <Sidebar variant="inset" className="border-r border-gray-200 dark:border-gray-800">
      <SidebarHeader className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-wasfah-bright-teal text-white">
            <ChefHat className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Wasfah AI</h2>
            <div className="flex items-center gap-2">
              <Badge variant={isSuperAdmin ? "destructive" : "default"} className="text-xs">
                {isSuperAdmin ? (
                  <>
                    <Crown className="h-3 w-3 mr-1" />
                    Super Admin
                  </>
                ) : (
                  <>
                    <Shield className="h-3 w-3 mr-1" />
                    Admin
                  </>
                )}
              </Badge>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        {/* Core Management */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 px-3 py-2">
            Core Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderMenuItems(coreItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Content Management */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 px-3 py-2">
            Content Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderMenuItems(contentItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Business & Operations */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 px-3 py-2">
            Business & Operations
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderMenuItems(businessItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Communications */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 px-3 py-2">
            Communications
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderMenuItems(communicationItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System & Security (Super Admin Only) */}
        {isSuperAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 px-3 py-2 flex items-center gap-2">
              <Zap className="h-3 w-3" />
              System & Security
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {renderMenuItems(systemItems)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="space-y-2">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Logged in as: {adminRole}
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500">
            Admin credentials:
          </div>
          <div className="text-xs font-mono text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 p-2 rounded">
            admin@wasfahai.com / admin123
          </div>
          <div className="text-xs font-mono text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 p-2 rounded">
            superadmin@wasfahai.com / superadmin123
          </div>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
