import React, { useEffect, useState } from 'react'

const EditProfileForm = ({ user, setEditFormOpen }) => {
    const [formData, setFormData] = useState(user);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const genders = ['Male', 'Female', 'Other'];

    const handleSelect = (option) => {
        setFormData({ ...formData, gender: option });
        setIsDropDownOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.firstName || !formData.email ) {
            alert('First name is required');
            return;
        }
        const response = await fetch('/api/user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.success) {
            alert('Expense edited successfully');
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
        setEditFormOpen(false);
    };

    return (
        <div className='w-full h-full bg-white rounded-xl flex flex-col items-start justify-start p-[1.9vh]'>
            <h2 className='md:text-[3vh] text-[2.5vh] font-black mb-4 text-zinc-800 uppercase'>Edit Profile</h2>
            <form className='w-full flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex md:flex-row flex-col gap-6 w-full'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor='firstName' className='text-sm font-medium text-zinc-700'>First Name</label>
                        <input type='text' id='firstName' className='border border-zinc-300 rounded-md p-2 text-sm font-medium text-gray-700 focus:outline-none' placeholder='Enter first name' value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor='lastName' className='text-sm font-medium text-zinc-700'>Last Name</label>
                        <input type='text' id='lastName' className='border border-zinc-300 rounded-md p-2 text-sm font-medium text-gray-700 focus:outline-none' placeholder='Enter last name' value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                    </div>
                </div>

                <div className='flex flex-col'>
                    <label htmlFor='gender' className='text-sm font-medium text-zinc-700'>Gender</label>
                    <div className="relative">
                        <button type="button" onClick={() => setIsDropDownOpen(!isDropDownOpen)} className="inline-flex w-full justify-between items-center rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            {formData.gender || 'Select Gender'}
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd"/>
                            </svg>
                        </button>

                        {isDropDownOpen && (
                            <div className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                <ul className="py-1">
                                    {genders.map((gender) => (
                                        <li key={gender} onClick={() => handleSelect(gender)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                            {gender}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className='flex flex-col w-full'>
                    <label htmlFor='city' className='text-sm font-medium text-zinc-700'>City</label>
                    <input type='text' id='city' className='border border-zinc-300 rounded-md p-2 text-sm font-medium text-gray-700 focus:outline-none' placeholder='Enter city' value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                </div>

                <div className='flex gap-6'>
                    <div className='w-full text-center bg-zinc-700 text-zinc-200 font-semibold py-2 px-4 rounded-lg hover:bg-zinc-900 transition-all duration-200 select-none' onClick={() => setEditFormOpen(false)}>Cancel</div>
                    <button type='submit' className='w-full bg-lime-200 text-zinc-800 font-semibold py-2 px-4 rounded-lg hover:bg-lime-300 transition-all duration-200 disabled:bg-lime-100 disabled:text-gray-500 disabled:cursor-not-allowed' disabled={!formData.firstName}>Save</button>
                </div>
            </form>
        </div>
    )
}

export default EditProfileForm