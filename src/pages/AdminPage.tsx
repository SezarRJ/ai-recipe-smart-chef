
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { ModernAdminSidebar } from '../components/admin/ModernAdminSidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Settings, User, Menu } from 'lucide-react';

const AdminPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <ModernAdminSidebar />
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-4 px-6 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <SidebarTrigger className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-br from-wasfah-bright-teal to-wasfah-teal rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                  Wasfah Admin
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Dashboard & Management
                </p>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                System Online
              </Badge>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <User className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>
          
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminPage;
