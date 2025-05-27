
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
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { WasfahLogo } from '../icons/WasfahLogo';
import { AdminLogoutLink } from './AdminLogoutLink';
import { getAdminRole, isSuperAdminAuthenticated } from '@/lib/adminAuth';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive: boolean;
  requireSuperAdmin?: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, isActive, requireSuperAdmin = false }: SidebarItemProps) => {
  const isSuperAdmin = isSuperAdminAuthenticated();
  const adminRole = getAdminRole();
  
  // Show basic items to all authenticated admins
  if (!requireSuperAdmin || isSuperAdmin) {
    return (
      <Link
        to={href}
        className={cn(
          'flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-slate-700/50 text-white/90 hover:text-white',
          isActive && 'bg-slate-700/70 text-white',
          requireSuperAdmin && 'border-l-2 border-yellow-400'
        )}
      >
        <Icon className="h-5 w-5" />
        <span className="text-sm font-medium">{label}</span>
        {requireSuperAdmin && <Crown className="h-4 w-4 text-yellow-400 ml-auto" />}
      </Link>
    );
  }
  
  return null;
};

export const AdminSidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const adminRole = getAdminRole();
  const isSuperAdmin = isSuperAdminAuthenticated();

  // Show sidebar for all authenticated admins
  if (!adminRole) {
    return null;
  }

  const mainItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: ChefHat, label: 'Recipes', href: '/admin/recipes' },
    { icon: ShoppingBag, label: 'Ingredients', href: '/admin/ingredients' },
    { icon: Image, label: 'Ingredient Images', href: '/admin/ingredient-images' },
    { icon: Globe, label: 'Translations', href: '/admin/translations' },
    { icon: CreditCard, label: 'Subscriptions', href: '/admin/subscriptions' },
    { icon: Award, label: 'Rewards', href: '/admin/rewards' },
    { icon: Languages, label: 'Languages', href: '/admin/languages' },
    { icon: BarChart, label: 'Analytics', href: '/admin/analytics' },
    { icon: Bell, label: 'Communications', href: '/admin/communications' },
    // Super admin only items
    { icon: UserCog, label: 'User Types', href: '/admin/user-types', requireSuperAdmin: true },
    { icon: DollarSign, label: 'Accounting', href: '/admin/accounting', requireSuperAdmin: true },
    { icon: Cpu, label: 'Integrations', href: '/admin/integrations', requireSuperAdmin: true },
    { icon: Server, label: 'System', href: '/admin/system', requireSuperAdmin: true },
    { icon: Shield, label: 'Security', href: '/admin/security', requireSuperAdmin: true },
    { icon: Wrench, label: 'Maintenance', href: '/admin/maintenance', requireSuperAdmin: true },
    { icon: Settings, label: 'Settings', href: '/admin/settings', requireSuperAdmin: true },
  ];

  return (
    <div className="w-64 hidden md:flex flex-col h-screen bg-gray-900 border-r dark:border-gray-700 sticky top-0">
      <div className="p-4 flex items-center">
        <WasfahLogo className="h-8 w-8" />
        <span className="ml-2 font-bold text-xl text-white">Wasfah Admin</span>
        {adminRole === 'superadmin' && (
          <Crown className="h-5 w-5 text-yellow-400 ml-2" />
        )}
      </div>
      
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
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
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold",
              adminRole === 'superadmin' ? 'bg-yellow-500' : 'bg-wasfah-bright-teal'
            )}>
              {adminRole === 'superadmin' ? 'SA' : 'A'}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white flex items-center">
                {adminRole === 'superadmin' ? 'Super Admin' : 'Admin User'}
                {adminRole === 'superadmin' && <Crown className="h-4 w-4 text-yellow-400 ml-1" />}
              </p>
              <p className="text-xs text-gray-300">
                {adminRole === 'superadmin' ? 'superadmin@wasfahai.com' : 'admin@wasfahai.com'}
              </p>
            </div>
          </div>
          <AdminLogoutLink />
        </div>
      </div>
    </div>
  );
};
