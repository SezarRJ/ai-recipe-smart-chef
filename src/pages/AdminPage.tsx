
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { ModernAdminSidebar } from '../components/admin/ModernAdminSidebar';

const AdminPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
        <ModernAdminSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <SidebarTrigger className="-ml-1" />
            <div className="ml-auto">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
            </div>
          </header>
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminPage;
