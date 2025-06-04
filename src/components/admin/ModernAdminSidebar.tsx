
import { Calendar, Home, Inbox, Search, Settings, Users, ChefHat, ShoppingBag, BarChart, Globe, Image, Database, CreditCard, Shield, Bell, Languages, Award, DollarSign, Cpu, Crown, UserCog, Wrench, HeadphonesIcon, Activity, Package, MessageSquare, Lock, Cog } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { WasfahLogo } from "../icons/WasfahLogo"
import { getAdminRole, isSuperAdminAuthenticated } from '@/lib/adminAuth'
import { AdminLogoutLink } from './AdminLogoutLink'
import { cn } from '@/lib/utils'

const menuItems = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", url: "/admin", icon: Home },
      { title: "Analytics", url: "/admin/analytics", icon: BarChart },
    ]
  },
  {
    title: "User Management",
    items: [
      { title: "Users", url: "/admin/users", icon: Users },
      { title: "User Types", url: "/admin/user-types", icon: UserCog, requireSuperAdmin: true },
    ]
  },
  {
    title: "Content Management",
    items: [
      { title: "Recipes", url: "/admin/recipes", icon: ChefHat },
      { title: "Ingredients", url: "/admin/ingredients", icon: ShoppingBag },
      { title: "Ingredient Images", url: "/admin/ingredient-images", icon: Image },
      { title: "Image Control", url: "/admin/image-control", icon: Package },
      { title: "Advertisements", url: "/admin/advertisements", icon: MessageSquare },
      { title: "Content Library", url: "/admin/content-library", icon: Database },
    ]
  },
  {
    title: "Localization",
    items: [
      { title: "Translations", url: "/admin/translations", icon: Globe },
      { title: "Languages", url: "/admin/languages", icon: Languages },
    ]
  },
  {
    title: "Business",
    items: [
      { title: "Subscriptions", url: "/admin/subscriptions", icon: CreditCard },
      { title: "Accounting", url: "/admin/accounting", icon: DollarSign, requireSuperAdmin: true },
      { title: "Rewards", url: "/admin/rewards", icon: Award },
    ]
  },
  {
    title: "Communication",
    items: [
      { title: "Communications", url: "/admin/communications", icon: Bell },
      { title: "Support Tickets", url: "/admin/support", icon: HeadphonesIcon },
      { title: "Community", url: "/admin/community", icon: Activity },
      { title: "Notifications", url: "/admin/notifications", icon: Bell },
    ]
  },
  {
    title: "System",
    items: [
      { title: "System Health", url: "/admin/system", icon: Database, requireSuperAdmin: true },
      { title: "Integrations", url: "/admin/integrations", icon: Cpu, requireSuperAdmin: true },
      { title: "Security", url: "/admin/security", icon: Lock, requireSuperAdmin: true },
      { title: "Maintenance", url: "/admin/maintenance", icon: Wrench, requireSuperAdmin: true },
      { title: "Settings", url: "/admin/settings", icon: Cog, requireSuperAdmin: true },
    ]
  },
]

export function ModernAdminSidebar() {
  const location = useLocation()
  const adminRole = getAdminRole()
  const isSuperAdmin = isSuperAdminAuthenticated()

  return (
    <Sidebar className="border-r bg-gradient-to-b from-gray-900 to-gray-800">
      <SidebarHeader className="border-b border-gray-700 p-4">
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
      </SidebarHeader>
      
      <SidebarContent className="overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600">
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-gray-400 uppercase tracking-wider text-xs font-semibold px-3 py-2">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = location.pathname === item.url || 
                                 (item.url !== '/admin' && location.pathname.startsWith(item.url))
                  const isDisabled = item.requireSuperAdmin && !isSuperAdmin
                  
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={cn(
                          "text-white/90 hover:text-white hover:bg-slate-700/50 transition-all duration-200",
                          isActive && "bg-slate-700/70 text-white shadow-sm",
                          isDisabled && "opacity-50 pointer-events-none",
                          item.requireSuperAdmin && "border-l-3 border-yellow-400/60"
                        )}
                      >
                        <Link to={item.url} className="flex items-center gap-3">
                          <item.icon className="h-5 w-5 shrink-0" />
                          <span className="text-sm font-medium truncate">{item.title}</span>
                          {item.requireSuperAdmin && (
                            <Crown className="h-4 w-4 text-yellow-400 ml-auto shrink-0" />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t border-gray-700 bg-gray-800/50">
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
      </SidebarFooter>
    </Sidebar>
  )
}
