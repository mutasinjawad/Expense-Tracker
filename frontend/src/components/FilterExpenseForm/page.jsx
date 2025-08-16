import React, { useEffect } from 'react'
import { CookingPot, Car, ShoppingBag, Clapperboard, Cross, PlugZap, AlignJustify, Check } from 'lucide-react';

const FilterExpenseForm = ({ expense, onFilterChange }) => {
    const categoryBadge = {Food : CookingPot, Transport : Car, Shopping : ShoppingBag, Entertainment : Clapperboard, Healthcare : Cross, Utilities : PlugZap, Others : AlignJustify}

    const handleFilterChange = (category) => {
        onFilterChange(category);
    }

    const handleClearFilters = () => {
        expense.forEach((element) => {
            onFilterChange(element);
        });
    }
    
    return (
        <div className='w-full h-full bg-white rounded-xl flex flex-col items-start justify-start p-6'>
            <h2 className='text-2xl font-black mb-4 text-zinc-800 uppercase'>Filter By Category</h2>
            <div className='flex flex-col items-start justify-start w-full gap-4'>
                <span className='text-zinc-600 text-lg'>Select the categories you want to see:</span>
                <div className='mb-2 flex flex-col gap-6 w-full'>
                    {Object.entries(categoryBadge).map(([category, Icon]) => {
                        const isSelected = expense.includes(String(category));
                        return (
                            <div key={category} className={`flex items-center justify-between w-full px-3 py-2 rounded-lg select-none transition-all duration-200 ${isSelected ? 'bg-lime-200' : 'bg-zinc-100 hover:bg-lime-50'}`} onClick={() => handleFilterChange(category)}>
                                <div className='flex items-center justify-start gap-6'>
                                    <Icon className='text-zinc-600 w-5 h-5' />
                                    <span className='text-zinc-600'>{category}</span>
                                </div>
                                <div className={`w-5 h-5 rounded-full bg-white border-1 flex items-center justify-center cursor-pointer transition-all duration-200 text-lime-600 ${isSelected ? 'border-lime-400 ' : 'border-zinc-400'}`}>
                                    {isSelected ? <Check className='w-3 h-3' /> : null}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className='w-full h-fit flex items-center justify-end mt-4'>
                <button className={`w-full text-center bg-zinc-700 text-zinc-200 font-semibold py-2 px-4 rounded-lg hover:bg-zinc-900 transition-all duration-200 select-none ${expense.length > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => handleClearFilters()}>
                    Clear Filters
                </button>
            </div>
        </div>
    )
}

export default FilterExpenseForm;