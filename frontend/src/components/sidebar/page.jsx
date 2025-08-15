import React, {useState} from 'react'
import { LayoutDashboard, DollarSign, Settings2 } from 'lucide-react';

const Sidebar = ({ selectedTab }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const handleTabClick = (tab) => {
        selectedTab(tab);
        setActiveTab(tab);
    };
    return (
        <div className='bg-white h-full w-[15vw] overflow-hidden shadow-xl px-6'>
            <h1 className="text-2xl font-bold my-10">Expense Tracker</h1>
            <hr className="my-2 bg-zinc-500 border-zinc-300" />
            <div className='my-10 flex flex-col items-start'>
                <span className='text-lg text-zinc-500'>Hello</span>
                <p className='text-2xl font-semibold text-zinc-700'>Jawad</p>
            </div>
            <hr className="my-2 bg-zinc-500 border-zinc-300" />
            <nav className='my-10 flex flex-col gap-6'>
                <div className={`w-full h-[clamp(27px,2vw,37px)] rounded-lg flex gap-2 items-center justify-start px-2 hover:cursor-pointer transition-all duration-150 ${activeTab === 'dashboard' ? 'font-bold text-zinc-700 bg-lime-100' : 'text-zinc-500 bg-zinc-100 hover:bg-lime-50'}`} onClick={() => handleTabClick('dashboard')}>
                    <LayoutDashboard />
                    <span>Dashboard</span>
                </div>
                <div className={`w-full h-[clamp(27px,2vw,37px)] rounded-lg flex gap-2 items-center justify-start px-2 hover:cursor-pointer transition-all duration-150 ${activeTab === 'expenses' ? 'font-bold text-zinc-700 bg-lime-100' : 'text-zinc-500 bg-zinc-100 hover:bg-lime-50'}`} onClick={() => handleTabClick('expenses')}>
                    <DollarSign />
                    <span>Expenses</span>
                </div>
                <div className={`w-full h-[clamp(27px,2vw,37px)] rounded-lg flex gap-2 items-center justify-start px-2 hover:cursor-pointer transition-all duration-150 ${activeTab === 'settings' ? 'font-bold text-zinc-700 bg-lime-100' : 'text-zinc-500 bg-zinc-100 hover:bg-lime-50'}`} onClick={() => handleTabClick('settings')}>
                    <Settings2 />
                    <span>Settings</span>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar