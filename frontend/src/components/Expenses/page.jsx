import React, { useState, useEffect, use } from 'react'
import { Plus, Trash, SquarePen, CookingPot, Car, ShoppingBag, Clapperboard, Cross, PlugZap, AlignJustify, BadgeInfo, ArrowDownNarrowWide } from 'lucide-react';

import Overview from '../UI/Overview/page';

import FilterExpenseForm from '../FilterExpenseForm/page';
import AddExpenseForm from '../AddExpenseForm/page';
import EditExpenseForm from '../EditExpenseForm/page';

const Expenses = () => {
    const [isMobileScreen, setIsMobileScreen] = useState(false);

    const [expenses, setExpenses] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const visibleExpenses = filteredExpenses.length > 0 ? expenses.filter((e) => filteredExpenses.includes(e.category)) : expenses;

    const [isFilterFormOpen, setIsFilterFormOpen] = useState(false);
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState([]);

    const categoryBadge = {Food : CookingPot, Transport : Car, Shopping : ShoppingBag, Entertainment : Clapperboard, Healthcare : Cross, Utilities : PlugZap, Others : AlignJustify}

    const getExpenseStats = async () => {
        const data = await fetch('/api/expenses');
        const res = await data.json();
        setExpenses(res);
    }

    function calculateTotalExpenses() {
        return expenses.reduce((acc, expense) => acc + expense.amount, 0);
    }

    function averageExpense() {
        const total = calculateTotalExpenses();
        return (total / expenses.length || 0).toFixed(2);
    }

    function formatReadableDateTime(isoString) {
        const [year, month, day] = isoString.split('T')[0].split('-');
        const date = new Date(Date.UTC(year, month - 1, day));

        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC'
        });
    }

    const handleDeleteExpenses = async () => {
        if (selectedExpense.length === 0) return;

        const confirmed = window.confirm(`Are you sure you want to delete ${selectedExpense.length} expense(s)?`);
        if (!confirmed) return;

        const response = await fetch('/api/expenses', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids: selectedExpense.map(e => e._id) }),
        });

        const data = await response.json();
        if (data.success) {
            alert('Expenses deleted successfully');
            setExpenses(prev => prev.filter(expense => !selectedExpense.some(e => e._id === expense._id)));
            setSelectedExpense([]);
        } else {
            alert('Failed to delete expenses');
        }
    };

    useEffect(() => {
        getExpenseStats();
    }, []);

    useEffect(() => {
        const handleResize = () => {
          setIsMobileScreen(window.innerWidth < 768);
        };
    
        window.addEventListener('resize', handleResize);
        handleResize();
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='relative w-full h-full'>
            <div className='w-full h-full p-[1.9vh] flex flex-col'>
                <div className='w-full md:h-[20vh] h-[15vh] flex flex-col items-start md:mb-[1.9vh] mb-[1.2vh]'>
                    <Overview expenses={expenses} text="Expenses" />
                </div>

                {/* Functional Buttons */}
                <div className='w-full h-[3.5vh] flex items-center justify-between md:mb-[1.9vh] mb-[1.2vh] gap-[1.3vw]'>
                    <div className='flex items-center justify-start'>
                        {expenses.length > 0 && (
                            <button className={`flex gap-[0.5vw] text-zinc-800 font-semibold py-[0.7vh] md:px-[0.7vw] px-[1.5vw] rounded-lg transition-all duration-200 hover:cursor-pointer ${filteredExpenses.length > 0 ? 'bg-lime-200' : 'hover:bg-lime-300 bg-zinc-200'}`} onClick={() => setIsFilterFormOpen(true)}>
                                <ArrowDownNarrowWide className='md:w-6 w-5 md:h-6 h-5'/>
                                {!isMobileScreen && (
                                    <>
                                        Filter
                                        <span>{filteredExpenses.length > 0 ? `(${filteredExpenses.length})` : ''}</span>
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                    <div className='flex items-center justify-center md:gap-6 gap-4'>
                        {selectedExpense.length === 1 && (
                            <button className='flex gap-[0.5vw] bg-zinc-200 text-zinc-800 font-semibold py-[0.7vh] md:px-[0.7vw] px-[1.5vw] rounded-lg hover:bg-lime-200 transition-all duration-200 hover:cursor-pointer' onClick={() => setIsEditing(true)}>
                                <SquarePen className='md:w-6 w-5 md:h-6 h-5' />
                                {!isMobileScreen && (
                                    <>
                                        Edit
                                    </>
                                )}
                            </button>
                        )}
                        {selectedExpense.length > 0 && (
                            <button className='flex gap-[0.5vw] bg-rose-400 text-zinc-800 font-semibold py-[0.7vh] md:px-[0.7vw] px-[1.5vw] rounded-lg hover:bg-rose-500 transition-all duration-200 hover:cursor-pointer' onClick={handleDeleteExpenses}>
                                <Trash className='md:w-6 w-5 md:h-6 h-5' />
                                {!isMobileScreen && (
                                    <>
                                        Delete
                                    </>
                                )}
                            </button>
                        )}
                        <button className='flex gap-[0.5vw] bg-lime-200 text-zinc-800 font-semibold py-[0.7vh] md:px-[0.7vw] px-[1.5vw] rounded-lg hover:bg-lime-300 transition-all duration-200 hover:cursor-pointer' onClick={() => setIsAddFormOpen(true)}>
                            <Plus className='md:w-6 w-5 md:h-6 h-5' />
                            {!isMobileScreen && (
                                <>
                                    Add Expense
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Expense List */}
                <div className='w-full flex md:h-[73vh] h-[78vh] flex-col items-start justify-start gap-[1.9vh]'>
                    <div className='w-full h-[clamp(35px,4vw,70px)] bg-black rounded-xl flex items-center justify-start gap-[1.3vw] px-[1.3vw] py-[1.9vh]'>
                        <span className='text-zinc-200 md:w-[3%] w-[5%]'><BadgeInfo className='md:w-6 w-5 md:h-6 h-5' /></span>
                        <span className='text-zinc-200 md:w-[32%] w-[48%] md:pl-0 pl-2 md:text-base text-xs'>Title</span>
                        {!isMobileScreen && (
                            <span className='text-zinc-200 w-[20%] md:text-base text-xs'>Category</span>
                        )}
                        <span className='text-zinc-200 md:w-[30%] w-[32%] md:text-base text-xs'>Date</span>
                        <span className='text-zinc-200 w-[15%] md:text-base text-xs'>Amount</span>
                    </div>
                    <div className='flex w-full md:h-[63vh] h-[68vh] flex-col items-start justify-start overflow-y-auto'>
                        {visibleExpenses.map((expense, index) => 
                            <div key={index} className={`mb-[1.8vh] w-full h-[clamp(35px,4vw,70px)] flex items-center justify-start rounded-lg px-[1.3vw] py-[1.9vh] text-zinc-600 gap-[1.3vw] hover:cursor-pointer transition-all duration-150 ${selectedExpense.some(e => e._id === expense._id) ? 'bg-lime-100' : 'hover:bg-lime-50 bg-white'}`} onClick={() => {setSelectedExpense(prev => {if (prev.some(e => e._id === expense._id)) { return prev.filter(e => e._id !== expense._id); } return [...prev, expense]; })}}>
                                <div className='md:w-[3%] w-[5%]'>
                                    {categoryBadge[expense.category] && 
                                        React.createElement(categoryBadge[expense.category], { className: "w-5 h-5 text-zinc-600" })
                                    }
                                </div>
                                <div className='md:w-[32%] w-[50%]'>
                                    <h1 className='line-clamp-1 md:pl-0 pl-2 md:text-base text-sm'>{expense.title}</h1>
                                </div>
                                {!isMobileScreen && (
                                    <div className='w-[20%]'>
                                        <p>{expense.category}</p>
                                    </div>
                                )}
                                <div className='md:w-[30%] w-[32%]'>
                                    <p className='line-clamp-1 md:text-base text-sm'>{formatReadableDateTime(expense.date)}</p>
                                </div>
                                <div className='w-[15%]'>
                                    <p className='md:text-base text-sm'>${expense.amount}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add new expense form */}
            {isAddFormOpen && (
                <>
                    <div className='absolute top-0 left-0 w-full h-full bg-black opacity-60 flex items-center justify-center' onClick={() => setIsAddFormOpen(false)}></div>
                    <div className='absolute top-1/2 left-1/2 lg:w-[40vw] md:w-[60vw] w-[70vw] h-fit transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center'>
                        <AddExpenseForm setAddFormOpen={setIsAddFormOpen} onAddExpense={(newExpense) => setExpenses([newExpense, ...expenses])} />
                    </div>
                </>
            )}

            {/* Edit expense form */}
            {isEditing && (
                <>
                    <div className='absolute top-0 left-0 w-full h-full bg-black opacity-60 flex items-center justify-center' onClick={() => setIsEditing(false)}></div>
                    <div className='absolute top-1/2 left-1/2 lg:w-[40vw] md:w-[60vw] w-[70vw] h-fit transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center'>
                        <EditExpenseForm expense={selectedExpense[0]} setEditFormOpen={setIsEditing} onEditExpense={(updatedExpense) => {
                            setExpenses(prev => prev.map(exp => exp._id === updatedExpense._id ? updatedExpense : exp));
                        }} />
                    </div>
                </>
            )}

            {/* Filter expense form */}
            {isFilterFormOpen && (
                <>
                    <div className='absolute top-0 left-0 w-full h-full bg-black opacity-60 flex items-center justify-center' onClick={() => setIsFilterFormOpen(false)}></div>
                    <div className='absolute top-1/2 left-1/2 lg:w-[40vw] md:w-[60vw] w-[70vw] h-fit transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center'>
                        <FilterExpenseForm expense={filteredExpenses} onFilterChange={(category) => {setFilteredExpenses((prev) => prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category])}} />
                    </div>
                </>
            )}
        </div>
    )
}

export default Expenses