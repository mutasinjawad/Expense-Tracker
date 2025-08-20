import React, { useState, useEffect } from 'react'

const EditExpenseForm = ({ expense, setEditFormOpen, onEditExpense }) => {
    const [formData, setFormData] = useState(expense);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const categories = ["Food", "Transport", "Shopping", "Entertainment", "Healthcare", "Utilities", "Others"];

    const handleSelect = (option) => {
        setFormData({ ...formData, category: option });
        setIsDropDownOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.amount || !formData.category || !formData.date) {
            alert('All fields are required');
            return;
        }
        if(formData.title.length < 3) {
            alert('Title must be at least 3 characters long');
            return;
        }
        if(Number(formData.amount) <= 0) {
            alert('Amount must be a positive number');
            return;
        }
        const response = await fetch('/api/expenses', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.success) {
            alert('Expense edited successfully');
            onEditExpense(data.data || formData);
            setFormData({
                title: '',
                amount: '',
                category: '',
                date: new Date().toISOString().split('T')[0],
            });
            setEditFormOpen(false);
        } else {
            alert(`Failed to edit expense, Reason: ${data.message}`);
        }
        onEditExpense(formData);
        setEditFormOpen(false);
    }

    return (
        <div className='w-full h-full bg-white rounded-xl flex flex-col items-start justify-start p-[1.9vh]'>
            <h2 className='md:text-[3vh] text-[2.5vh] font-black mb-4 text-zinc-800 uppercase'>Edit Expense</h2>
            <form className='w-full flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <label htmlFor='title' className='text-sm font-medium text-zinc-700'>Title</label>
                    <input type='text' id='title' className='border border-zinc-300 rounded-md p-2 text-sm font-medium text-gray-700 focus:outline-none' placeholder='Enter title' value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                </div>

                <div className='flex flex-col'>
                    <label htmlFor='title' className='text-sm font-medium text-zinc-700'>Category</label>
                    <div className="relative">
                        <button type="button" onClick={() => setIsDropDownOpen(!isDropDownOpen)} className="inline-flex w-full justify-between items-center rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            {formData.category || 'Select Category'}
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd"/>
                            </svg>
                        </button>

                        {isDropDownOpen && (
                            <div className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                <ul className="py-1">
                                    {categories.map((category) => (
                                        <li key={category} onClick={() => handleSelect(category)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                            {category}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className='flex md:flex-row flex-col w-full gap-6'>
                    <div className='flex flex-col md:w-[50%] w-full'>
                        <label htmlFor='date' className='text-sm font-medium text-zinc-700'>Date</label>
                        <input type='date' id='date' className='border border-zinc-300 rounded-md p-2 text-sm font-medium text-gray-700 focus:outline-none' value={formData.date ? formData.date.split('T')[0] : ''} onChange={(e) => setFormData({ ...formData, date: e.target.value })} max={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div className='flex flex-col md:w-[50%] w-full'>
                        <label htmlFor='amount' className='text-sm font-medium text-zinc-700'>Amount</label>
                        <input type='number' id='amount' className='border border-zinc-300 rounded-md p-2 text-sm font-medium text-gray-700 focus:outline-none' placeholder='Enter amount' value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
                    </div>
                </div>

                <div className='flex gap-6'>
                    <div className='w-full text-center bg-zinc-700 text-zinc-200 font-semibold py-2 px-4 rounded-lg hover:bg-zinc-900 transition-all duration-200 select-none' onClick={() => setEditFormOpen(false)}>Cancel</div>
                    <button type='submit' className='w-full bg-lime-200 text-zinc-800 font-semibold py-2 px-4 rounded-lg hover:bg-lime-300 transition-all duration-200 disabled:bg-lime-100 disabled:text-gray-500 disabled:cursor-not-allowed' disabled={!formData.title || !formData.category || !formData.date || !formData.amount || Number(formData.amount) <= 0}>Save</button>
                </div>
            </form>
        </div>
    )
}

export default EditExpenseForm