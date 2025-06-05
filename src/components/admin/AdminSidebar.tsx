
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
  
  return (
    <Link
      to={href}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-white/90 hover:text-white hover:bg-slate-700/50',
        isActive && 'bg-slate-700/70 text-white shadow-sm',
        requireSuperAdmin && !isSuperAdmin && 'opacity-50 pointer-events-none',
        requireSuperAdmin && 'border-l-3 border-yellow-400/60'
      )}
      title={requireSuperAdmin && !isSuperAdmin ? 'Super Admin required' : ''}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="text-sm font-medium truncate">{label}</span>
      {requireSuperAdmin && <Crown className="h-4 w-4 text-yellow-400 ml-auto shrink-0" />}
    </Link>
  );
};

export const AdminSidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const adminRole = getAdminRole();
  const isSuperAdmin = isSuperAdminAuthenticated();

  const mainItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: UserCog, label: 'User Types', href: '/admin/user-types', requireSuperAdmin: true },
    { icon: ChefHat, label: 'Recipes', href: '/admin/recipes' },
    { icon: ShoppingBag, label: 'Ingredients', href: '/admin/ingredients' },
    { icon: Image, label: 'Ingredient Images', href: '/admin/ingredient-images' },
    { icon: Globe, label: 'Translations', href: '/admin/translations' },
    { icon: CreditCard, label: 'Subscriptions', href: '/admin/subscriptions' },
    { icon: DollarSign, label: 'Accounting', href: '/admin/accounting', requireSuperAdmin: true },
    { icon: Award, label: 'Rewards', href: '/admin/rewards' },
    { icon: Languages, label: 'Languages', href: '/admin/languages' },
    { icon: Cpu, label: 'Integrations', href: '/admin/integrations', requireSuperAdmin: true },
    { icon: Server, label: 'System', href: '/admin/system', requireSuperAdmin: true },
    { icon: BarChart, label: 'Analytics', href: '/admin/analytics' },
    { icon: Bell, label: 'Communications', href: '/admin/communications' },
    { icon: Shield, label: 'Security', href: '/admin/security', requireSuperAdmin: true },
    { icon: Wrench, label: 'Maintenance', href: '/admin/maintenance', requireSuperAdmin: true },
    { icon: Settings, label: 'Settings', href: '/admin/settings', requireSuperAdmin: true },
  ];

  return (
    <div className="w-64 flex flex-col h-screen bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700 sticky top-0 shadow-xl">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-wasfah-bright-teal rounded-lg flex items-center justify-center">
            <WasfahLogo className="h-6 w-6 text-white" />
          </div>
          <div className="ml-3">
            <span className="font-bold text-lg text-white">Wasfah Admin</span>
            {adminRole === 'superadmin' && (
              <div className="flex items-center mt-1">
                <Crown className="h-4 w-4 text-yellow-400 mr-1" />
                <span className="text-xs text-yellow-400 font-medium">Super Admin</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600">
        {/* Main Items */}
        <div className="space-y-1">
          <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Main
          </div>
          {mainItems.slice(0, 4).map((item) => (
            <SidebarItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)}
              requireSuperAdmin={item.requireSuperAdmin}
            />
          ))}
        </div>

        {/* Content Management */}
        <div className="space-y-1 pt-4">
          <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Content
          </div>
          {mainItems.slice(4, 8).map((item) => (
            <SidebarItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)}
              requireSuperAdmin={item.requireSuperAdmin}
            />
          ))}
        </div>

        {/* Business */}
        <div className="space-y-1 pt-4">
          <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Business
          </div>
          {mainItems.slice(8, 13).map((item) => (
            <SidebarItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)}
              requireSuperAdmin={item.requireSuperAdmin}
            />
          ))}
        </div>

        {/* System */}
        <div className="space-y-1 pt-4">
          <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            System
          </div>
          {mainItems.slice(13).map((item) => (
            <SidebarItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)}
              requireSuperAdmin={item.requireSuperAdmin}
            />
          ))}
        </div>
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-gray-700 bg-gray-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center min-w-0">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0",
              adminRole === 'superadmin' ? 'bg-yellow-500' : 'bg-wasfah-bright-teal'
            )}>
              {adminRole === 'superadmin' ? 'SA' : 'A'}
            </div>
            <div className="ml-3 min-w-0">
              <p className="text-sm font-medium text-white flex items-center">
                {adminRole === 'superadmin' ? 'Super Admin' : 'Admin User'}
                {adminRole === 'superadmin' && <Crown className="h-3 w-3 text-yellow-400 ml-1" />}
              </p>
              <p className="text-xs text-gray-300 truncate">
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
