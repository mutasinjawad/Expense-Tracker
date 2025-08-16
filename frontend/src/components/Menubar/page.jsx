import React, { useState, useRef } from 'react'
import { Menu, LayoutDashboard, DollarSign, Settings2 } from 'lucide-react';

const Menubar = ({ selectedTab }) => {
    const menuRef = useRef(null);
    const [activeTab, setActiveTab] = useState('dashboard');

    const handleMenuToggle = () => {
        menuRef.current.classList.toggle('translate-x-[100%]');
    };

    const handleTabClick = (tab) => {
        selectedTab(tab);
        setActiveTab(tab);
        handleMenuToggle();
    };

    return (
        <div className='w-full h-full relative'>
            <div className='absolute top-0 right-0 p-[1.9vh] z-50'>
                <Menu className='w-5 h-5 text-zinc-800' onClick={handleMenuToggle}/>
            </div>
            <div ref={menuRef} className='absolute top-0 right-0 h-full w-full bg-white p-6 z-40 transform translate-x-[100%] transition-all duration-300'>
                <h1 className="text-3xl font-bold my-6">Expense Tracker</h1>
                <hr className="my-2 bg-zinc-500 border-zinc-300" />
                <div className='my-6 flex flex-col items-start'>
                    <span className='text-zinc-500'>Hello,</span>
                    <p className='text-2xl font-semibold text-zinc-700'>Jawad</p>
                </div>
                <hr className="my-2 bg-zinc-500 border-zinc-300" />
                <nav className='my-6 flex flex-col gap-6'>
                    <div className={`w-full h-[40px] rounded-lg flex gap-4 items-center justify-start px-2 transition-all duration-150 ${activeTab === 'dashboard' ? 'font-bold text-zinc-700 bg-lime-200' : 'text-zinc-500 bg-zinc-100'}`} onClick={() => handleTabClick('dashboard')}>
                        <LayoutDashboard />
                        <span>Dashboard</span>
                    </div>
                    <div className={`w-full h-[40px] rounded-lg flex gap-4 items-center justify-start px-2 transition-all duration-150 ${activeTab === 'expenses' ? 'font-bold text-zinc-700 bg-lime-200' : 'text-zinc-500 bg-zinc-100 '}`} onClick={() => handleTabClick('expenses')}>
                        <DollarSign />
                        <span>Expenses</span>
                    </div>
                    <div className={`w-full h-[40px] rounded-lg flex gap-4 items-center justify-start px-2 transition-all duration-150 ${activeTab === 'settings' ? 'font-bold text-zinc-700 bg-lime-200' : 'text-zinc-500 bg-zinc-100'}`} onClick={() => handleTabClick('settings')}>
                        <Settings2 />
                        <span>Settings</span>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Menubar;