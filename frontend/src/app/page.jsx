'use client';

import React, { useEffect, useState } from 'react'
import Sidebar from '@/components/sidebar/page.jsx'
import Menubar from '@/components/Menubar/page';

import Dashboard from '@/components/Dashboard/page';
import Expenses from '@/components/Expenses/page.jsx'

const page = () => {
  const [isMonitorScreen, setIsMonitorScreen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('dashboard');

  useEffect(() => {
    const handleResize = () => {
      setIsMonitorScreen(window.innerWidth > 1024);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='relative flex max-w-screen h-screen overflow-hidden bg-gray-50'>
      {isMonitorScreen && (
        <Sidebar selectedTab={setSelectedTab} />
      )}
      {!isMonitorScreen && (
        <div className='absolute top-0 right-0 w-full h-full'>
          <Menubar selectedTab={setSelectedTab} />
        </div>
      )}
      <div className='h-full flex flex-1 items-center justify-center'>
        {selectedTab === 'dashboard' && <Dashboard />}
        {selectedTab === 'expenses' && <Expenses />}
        {selectedTab === 'settings' && <div>Settings Content</div>}
      </div>
    </div>
  )
}

export default page