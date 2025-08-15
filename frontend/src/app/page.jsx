'use client';

import React, { useState } from 'react'
import Sidebar from '@/components/sidebar/page.jsx'
import Expenses from '@/components/Expenses/page.jsx'

const page = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');

  return (
    <div className='flex max-w-screen h-screen overflow-hidden bg-gray-50'>
      <Sidebar selectedTab={setSelectedTab} />
      <div className='h-full flex flex-1 items-center justify-center'>
        {selectedTab === 'dashboard' && <div>Dashboard Content</div>}
        {selectedTab === 'expenses' && <Expenses />}
        {selectedTab === 'settings' && <div>Settings Content</div>}
      </div>
    </div>
  )
}

export default page