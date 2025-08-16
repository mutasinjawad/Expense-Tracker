import React, { useState, useEffect, use } from 'react'
import { Plus, Trash, SquarePen, CookingPot, Car, ShoppingBag, Clapperboard, Cross, PlugZap, AlignJustify, BadgeInfo, ArrowDownNarrowWide } from 'lucide-react';

import FilterExpenseForm from '../FilterExpenseForm/page';
import AddExpenseForm from '../AddExpenseForm/page';
import EditExpenseForm from '../EditExpenseForm/page';

const Expenses = () => {
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

    return (
        <div className='relative w-full h-full'>
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

                {/* Functional Buttons */}
                <div className='w-full h-fit flex items-center justify-between mb-6 gap-6'>
                    <div className='flex items-center justify-start'>
                        {expenses.length > 0 && (
                            <button className={`flex gap-2 text-zinc-800 font-semibold py-2 px-3 rounded-lg transition-all duration-200 hover:cursor-pointer ${filteredExpenses.length > 0 ? 'bg-lime-200' : 'hover:bg-lime-300  bg-zinc-200'}`} onClick={() => setIsFilterFormOpen(true)}>
                                <ArrowDownNarrowWide />
                                Filter
                                <span>{filteredExpenses.length > 0 ? `(${filteredExpenses.length})` : ''}</span>
                            </button>
                        )}
                    </div>
                    <div className='flex items-center justify-center gap-6'>
                        {selectedExpense.length === 1 && (
                            <button className='flex gap-2 bg-zinc-200 text-zinc-800 font-semibold py-2 px-3 rounded-lg hover:bg-lime-200 transition-all duration-200 hover:cursor-pointer' onClick={() => setIsEditing(true)}>
                                <SquarePen />
                                Edit
                            </button>
                        )}
                        {selectedExpense.length > 0 && (
                            <button className='flex gap-2 bg-rose-400 text-zinc-800 font-semibold py-2 px-3 rounded-lg hover:bg-rose-500 transition-all duration-200 hover:cursor-pointer' onClick={handleDeleteExpenses}>
                                <Trash />
                                Delete
                            </button>
                        )}
                        <button className='flex gap-2 bg-lime-200 text-zinc-800 font-semibold py-2 px-3 rounded-lg hover:bg-lime-300 transition-all duration-200 hover:cursor-pointer' onClick={() => setIsAddFormOpen(true)}>
                            <Plus />
                            Add Expense
                        </button>
                    </div>
                </div>

                {/* Expense List */}
                <div className='w-full flex flex-1 flex-col items-start justify-start gap-6'>
                    <div className='w-full h-[clamp(35px,4vw,70px)] bg-black rounded-xl flex items-center justify-start gap-6 px-6'>
                        <span className='text-zinc-200 w-[3%]'><BadgeInfo /></span>
                        <span className='text-zinc-200 w-[32%]'>Title</span>
                        <span className='text-zinc-200 w-[20%]'>Category</span>
                        <span className='text-zinc-200 w-[30%]'>Date</span>
                        <span className='text-zinc-200 w-[15%]'>Amount</span>
                    </div>
                    <div className='flex w-full flex-1 flex-col items-start justify-start overflow-y-auto'>
                        {visibleExpenses.map((expense, index) => 
                            <div key={index} className={`mb-6 w-full h-[clamp(35px,4vw,70px)] flex items-center justify-start rounded-lg px-6 text-zinc-600 gap-6 hover:cursor-pointer transition-all duration-150 ${selectedExpense.some(e => e._id === expense._id) ? 'bg-lime-100' : 'hover:bg-lime-50 bg-white'}`} onClick={() => {setSelectedExpense(prev => {if (prev.some(e => e._id === expense._id)) { return prev.filter(e => e._id !== expense._id); } return [...prev, expense]; })}}>
                                <div className='w-[3%]'>
                                    {categoryBadge[expense.category] && 
                                        React.createElement(categoryBadge[expense.category], { className: "w-5 h-5 text-zinc-600" })
                                    }
                                </div>
                                <div className='w-[32%]'>
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

            {/* Add new expense form */}
            {isAddFormOpen && (
                <>
                    <div className='absolute top-0 left-0 w-full h-full bg-black opacity-60 flex items-center justify-center' onClick={() => setIsAddFormOpen(false)}></div>
                    <div className='absolute top-1/2 left-1/2 w-[30vw] h-fit transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center'>
                        <AddExpenseForm setAddFormOpen={setIsAddFormOpen} onAddExpense={(newExpense) => setExpenses([newExpense, ...expenses])} />
                    </div>
                </>
            )}

            {/* Edit expense form */}
            {isEditing && (
                <>
                    <div className='absolute top-0 left-0 w-full h-full bg-black opacity-60 flex items-center justify-center' onClick={() => setIsEditing(false)}></div>
                    <div className='absolute top-1/2 left-1/2 w-[30vw] h-fit transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center'>
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
                    <div className='absolute top-1/2 left-1/2 w-[30vw] h-fit transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center'>
                        <FilterExpenseForm expense={filteredExpenses} onFilterChange={(category) => {setFilteredExpenses((prev) => prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category])}} />
                    </div>
                </>
            )}
        </div>
    )
}

export default Expenses