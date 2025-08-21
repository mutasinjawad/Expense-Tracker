'use client';

import React, { useEffect, useState } from 'react'

import Hero from '@/components/Hero/page';

import Sidebar from '@/components/sidebar/page.jsx'
import Menubar from '@/components/Menubar/page';

import Dashboard from '@/components/Dashboard/page';
import Expenses from '@/components/Expenses/page.jsx'
import Settings from '@/components/Settings/page.jsx';

const page = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMonitorScreen, setIsMonitorScreen] = useState(false);

  const [selectedTab, setSelectedTab] = useState('dashboard');

  const [expenses, setExpenses] = useState([]);
  
  const getExpenseStats = async () => {
      const data = await fetch('/api/expenses', {
        method: 'GET',
        credentials: 'include',
      });
      const res = await data.json();
      setExpenses(res);
  }

  const handleAuth = async () => {
    const res = await fetch('/api/auth', {
      method: 'GET',
      credentials: 'include',
    });
    if (res.ok) {
      setIsLoggedIn(true);
    }
  };

  // Handle Authentication
  useEffect(() => {
    handleAuth();
  }, []);

  // Get Expense of the user
  useEffect(() => {
    getExpenseStats();
  }, []);

  // Resize the Screen
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
    <>
      {isLoggedIn ? (
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
            {selectedTab === 'dashboard' && <Dashboard expenses={expenses} />}
            {selectedTab === 'expenses' && <Expenses expenses={expenses} onUpdate={getExpenseStats} />}
            {selectedTab === 'settings' && <Settings />}
          </div>
        </div>
      ) : (
        <div className='w-screen h-screen overflow-hidden px-[3vh] pt-[3vh]'>
          <Hero />
        </div>
      )}
    </>
  )
}

export default page