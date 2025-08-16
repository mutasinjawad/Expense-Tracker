import React, { useState, useEffect } from 'react'

import Overview from '@/components/UI/Overview/page.jsx'
import Chart from '@/components/UI/Chart/page.jsx'
import BarChart from '@/components/UI/Barchart/page.jsx'
import Linechart from '@/components/UI/Linechart/page.jsx'

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);

    const getExpenseStats = async () => {
        const data = await fetch('/api/expenses');
        const res = await data.json();
        setExpenses(res);
    }

    useEffect(() => {
        getExpenseStats();
    }, []);

    return (
        <div className='w-full h-full flex flex-col'>
            <div className='w-full md:h-[26vh] h-[15vh] p-[1.9vh]'>
                <Overview expenses={expenses} text="Dashboard" />
            </div>
            <div className='w-full lg:h-full h-[50%] flex lg:flex-row flex-col gap-6 items-center justify-center px-[1.9vh] lg:mb-0 mb-[1.9vh]'>
                <Chart expenses={expenses} />
                <BarChart expenses={expenses} />
            </div>
            <div className='w-full h-full px-[1.9vh]'>
                <Linechart expenses={expenses} />
            </div>
        </div>
    )
}

export default Dashboard;