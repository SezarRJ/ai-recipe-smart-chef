
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ChefHat, 
  ShoppingBag, 
  CreditCard, 
  Server, 
  BarChart, 
  Settings, 
  Shield, 
  Bell, 
  Wrench,
  Languages,
  Award,
  DollarSign,
  Cpu,
  UserCog,
  Crown,
  Image,
  Globe,
  MessageSquare,
  Megaphone,
  Users2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { WasfahLogo } from '../icons/WasfahLogo';
import { AdminLogoutLink } from './AdminLogoutLink';
import { getAdminRole, isSuperAdminAuthenticated } from '@/lib/adminAuth';
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
} from "@/components/ui/sidebar";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive: boolean;
  requireSuperAdmin?: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, isActive, requireSuperAdmin = false }: SidebarItemProps) => {
  const isSuperAdmin = isSuperAdminAuthenticated();
  
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link
          to={href}
          className={cn(
            requireSuperAdmin && !isSuperAdmin && 'opacity-50 pointer-events-none',
            requireSuperAdmin && 'border-l-2 border-yellow-400/60'
          )}
          title={requireSuperAdmin && !isSuperAdmin ? 'Super Admin required' : ''}
        >
          <Icon className="h-4 w-4" />
          <span>{label}</span>
          {requireSuperAdmin && <Crown className="h-3 w-3 text-yellow-400 ml-auto" />}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export const ModernAdminSidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const adminRole = getAdminRole();
  const isSuperAdmin = isSuperAdminAuthenticated();

  const mainItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin', requireSuperAdmin: false },
    { icon: Users, label: 'Users', href: '/admin/users', requireSuperAdmin: false },
    { icon: UserCog, label: 'User Types', href: '/admin/user-types', requireSuperAdmin: true },
    { icon: ChefHat, label: 'Recipes', href: '/admin/recipes', requireSuperAdmin: false },
    { icon: ShoppingBag, label: 'Ingredients', href: '/admin/ingredients', requireSuperAdmin: false },
  ];

  const contentItems = [
    { icon: Image, label: 'Ingredient Images', href: '/admin/ingredient-images', requireSuperAdmin: false },
    { icon: Image, label: 'Image Control', href: '/admin/images', requireSuperAdmin: false },
    { icon: Globe, label: 'Translations', href: '/admin/translations', requireSuperAdmin: false },
    { icon: Languages, label: 'Languages', href: '/admin/languages', requireSuperAdmin: false },
  ];

  const businessItems = [
    { icon: CreditCard, label: 'Subscriptions', href: '/admin/subscriptions', requireSuperAdmin: false },
    { icon: DollarSign, label: 'Accounting', href: '/admin/accounting', requireSuperAdmin: true },
    { icon: Award, label: 'Rewards', href: '/admin/rewards', requireSuperAdmin: false },
    { icon: MessageSquare, label: 'Communications', href: '/admin/communications', requireSuperAdmin: false },
    { icon: Megaphone, label: 'Advertisements', href: '/admin/advertisements', requireSuperAdmin: false },
    { icon: Users2, label: 'Community', href: '/admin/community', requireSuperAdmin: false },
  ];

  const systemItems = [
    { icon: Cpu, label: 'Integrations', href: '/admin/integrations', requireSuperAdmin: true },
    { icon: Server, label: 'System', href: '/admin/system', requireSuperAdmin: true },
    { icon: BarChart, label: 'Analytics', href: '/admin/analytics', requireSuperAdmin: false },
    { icon: Shield, label: 'Security', href: '/admin/security', requireSuperAdmin: true },
    { icon: Wrench, label: 'Maintenance', href: '/admin/maintenance', requireSuperAdmin: true },
    { icon: Settings, label: 'Settings', href: '/admin/settings', requireSuperAdmin: true },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="w-8 h-8 bg-wasfah-bright-teal rounded-lg flex items-center justify-center">
            <WasfahLogo className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm">Wasfah Admin</span>
            {adminRole === 'superadmin' && (
              <div className="flex items-center">
                <Crown className="h-3 w-3 text-yellow-400 mr-1" />
                <span className="text-xs text-yellow-600">Super Admin</span>
              </div>
            )}
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarItem
                  key={item.href}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)}
                  requireSuperAdmin={item.requireSuperAdmin}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Content</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {contentItems.map((item) => (
                <SidebarItem
                  key={item.href}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)}
                  requireSuperAdmin={item.requireSuperAdmin}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Business</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {businessItems.map((item) => (
                <SidebarItem
                  key={item.href}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)}
                  requireSuperAdmin={item.requireSuperAdmin}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarItem
                  key={item.href}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)}
                  requireSuperAdmin={item.requireSuperAdmin}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center min-w-0">
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0",
                adminRole === 'superadmin' ? 'bg-yellow-500' : 'bg-wasfah-bright-teal'
              )}>
                {adminRole === 'superadmin' ? 'SA' : 'A'}
              </div>
              <div className="ml-2 min-w-0">
                <p className="text-xs font-medium flex items-center">
                  {adminRole === 'superadmin' ? 'Super Admin' : 'Admin User'}
                  {adminRole === 'superadmin' && <Crown className="h-2 w-2 text-yellow-400 ml-1" />}
                </p>
              </div>
            </div>
            <AdminLogoutLink />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
