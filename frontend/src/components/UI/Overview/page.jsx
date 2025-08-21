import React from 'react'

const Overview = ({ expenses, text }) => {
    function calculateTotalExpenses() {
        return expenses.reduce((acc, expense) => acc + expense.amount, 0).toFixed(2);
    }

    function averageExpense() {
        const total = calculateTotalExpenses();
        return (total / expenses.length || 0).toFixed(2);
    }

    return (
        <div className='w-full h-full'>
            <h1 className='md:text-[3vh] text-[2.5vh] font-black md:mb-[1.7vh] mb-[0.8vh] uppercase leading-none'>{text}</h1>
            <div className='w-full md:h-[15vh] h-[10vh] flex items-center justify-start gap-[1.3vw]'>
                <div className='md:h-[15vh] h-[10vh] w-[33.33%] bg-zinc-200 rounded-xl flex flex-col items-center justify-center select-none hover:bg-lime-200 transition-all duration-200'>
                    <h2 className='md:text-base text-xs text-zinc-500 text-center'>Total</h2>
                    <p className='md:text-3xl text-xl font-bold text-zinc-800'>${calculateTotalExpenses()}</p>
                </div>
                <div className='md:h-[15vh] h-[10vh] w-[33.33%] bg-zinc-200 rounded-xl flex flex-col items-center justify-center select-none hover:bg-lime-200 transition-all duration-200'>
                    <h2 className='md:text-base text-xs text-zinc-500 text-center'>Average</h2>
                    <p className='md:text-3xl text-xl font-bold text-zinc-800'>${averageExpense()}</p>
                </div>
                <div className='md:h-[15vh] h-[10vh] w-[33.33%] bg-zinc-200 rounded-xl flex flex-col items-center justify-center select-none hover:bg-lime-200 transition-all duration-200'>
                    <h2 className='md:text-base text-xs text-zinc-500 text-center'>This Month</h2>
                    <p className='md:text-3xl text-xl font-bold text-zinc-800'>${expenses.filter(expense => new Date(expense.date).getMonth() === new Date().getMonth()).reduce((acc, expense) => acc + expense.amount, 0).toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}

export default Overview