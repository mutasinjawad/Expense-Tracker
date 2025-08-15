import React, { useState, useEffect } from 'react'
import { Plus } from 'lucide-react';
import Link from 'next/link';

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const getExpenseStats = async () => {
        const data = await fetch('/api/expenses');
        const res = await data.json();
        console.log(res);
        setExpenses(res);
    }

    function calculateTotalExpenses() {
        return expenses.reduce((acc, expense) => acc + expense.amount, 0);
    }

    function averageExpense() {
        const total = calculateTotalExpenses();
        return total / expenses.length || 0;
    }

    function formatReadableDateTime(isoString) {
        const date = new Date(isoString);

        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    }

    useEffect(() => {
        getExpenseStats();
    }, []);

    return (
        <div className='w-full h-full p-6 flex flex-col'>
            <div className='w-full h-fit flex flex-col items-start mb-6'>
                <h1 className='text-4xl font-black mb-4 uppercase'>Expenses</h1>
                <div className='w-full h-fit flex items-center justify-start gap-6'>
                    <div className='h-[200px] w-[33.33%] bg-zinc-200 rounded-xl flex flex-col items-center justify-center select-none hover:bg-lime-200 transition-all duration-200'>
                        <h2 className='text-zinc-500'>Total Expenses</h2>
                        <p className='text-3xl font-bold text-zinc-800'>${calculateTotalExpenses()}</p>
                    </div>
                    <div className='h-[200px] w-[33.33%] bg-zinc-200 rounded-xl flex flex-col items-center justify-center select-none hover:bg-lime-200 transition-all duration-200'>
                        <h2 className='text-zinc-500'>Average Expenses</h2>
                        <p className='text-3xl font-bold text-zinc-800'>${averageExpense()}</p>
                    </div>
                    <div className='h-[200px] w-[33.33%] bg-zinc-200 rounded-xl flex flex-col items-center justify-center select-none hover:bg-lime-200 transition-all duration-200'>
                        <h2 className='text-zinc-500'>This Month</h2>
                        <p className='text-3xl font-bold text-zinc-800'>${expenses.filter(expense => new Date(expense.date).getMonth() === new Date().getMonth()).reduce((acc, expense) => acc + expense.amount, 0)}</p>
                    </div>
                </div>
            </div>

            <div className='w-full h-fit flex items-center justify-end mb-6'>
                <Link href='/add-expense'>
                    <button className='flex gap-2 bg-lime-200 text-zinc-800 font-semibold py-2 px-3 rounded-lg hover:bg-lime-300 transition-all duration-200 hover:cursor-pointer'>
                        <Plus />
                        Add Expense
                    </button>
                </Link>
            </div>
            {/* Expense List */}
            <div className='w-full flex flex-1 flex-col items-start justify-start gap-6'>
                <div className='w-full h-[clamp(35px,4vw,70px)] bg-black rounded-xl flex items-center justify-start gap-6 px-6'>
                    <span className='text-zinc-200 w-[35%]'>Title</span>
                    <span className='text-zinc-200 w-[20%]'>Category</span>
                    <span className='text-zinc-200 w-[30%]'>Date</span>
                    <span className='text-zinc-200 w-[15%]'>Amount</span>
                </div>
                <div className='flex w-full flex-1 flex-col items-start justify-start overflow-y-auto'>
                    {expenses.map((expense, index) => 
                        <div key={index} className='mb-6 w-full h-[clamp(35px,4vw,70px)] bg-white flex items-center justify-start rounded-lg px-6 text-zinc-700 gap-6'>
                            <div className='w-[35%]'>
                                <h1>{expense.title}</h1>
                            </div>
                            <div className='w-[20%]'>
                            <p>{expense.category}</p>
                            </div>
                            <div className='w-[30%]'>
                                <p>{formatReadableDateTime(expense.date)}</p>
                            </div>
                            <div className='w-[15%]'>
                                <p>${expense.amount}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default Expenses