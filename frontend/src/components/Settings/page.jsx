'use client'

import React, { useState, useEffect } from 'react'
import { SquarePen, LogOut } from 'lucide-react';

import EditProfileForm from '../Forms/EditProfileForm/page.jsx';

const Settings = () => {
    const [user, setUser] = useState(null);
    
    const [isEditing, setIsEditing] = useState(false);
    
    const getUser = async () => {
        const res =  await fetch('/api/user', {
            method: 'GET',
            credentials: 'include',
        });
        const data = await res.json();
        if (data.success) {
            setUser(data.data.user);
        } else {
            alert('Failed to fetch user');
        }
        return data;
    };

    const handleLogout = async () => {
        const res = await fetch('/api/logout', {
            method: 'POST',
            credentials: 'include',
        });
        const data = await res.json();
        if (data.success) {
            alert(data.message);
            window.location.href = "/sign-in-up"; 
        } else {
            alert('Failed to log out');
        }
    }

    useEffect(() => {
        getUser()
    }, [isEditing]);

    if (!user) {
        return <div>Loading user...</div>;
    }

    return (
        <div className='relative w-full h-full'>
            <div className='w-full h-full p-[1.9vh] flex flex-col justify-between'>
                <h1 className='md:text-[3vh] text-[2.5vh] font-black md:mb-[1.7vh] mb-[2vh] uppercase leading-none'>Settings</h1>
                
                <div className='w-full flex flex-col h-[80vh]'>
                    <div className='w-full h-[3.5vh] flex items-center justify-between md:mb-[1.9vh] mb-[2vh] gap-[1.3vw]'>
                        <div className='flex items-center justify-center'>
                            <button className='flex lg:gap-[0.5vw] gap-[2vw] bg-lime-200 text-zinc-800 font-semibold py-[0.7vh] md:px-[0.7vw] px-[1.5vw] rounded-lg hover:bg-lime-300 transition-all duration-200 hover:cursor-pointer' onClick={() => setIsEditing(true)}>
                                <SquarePen className='md:w-6 w-5 md:h-6 h-5' />
                                Edit
                            </button>
                        </div>

                        <div className='flex items-center justify-center'>
                            <button className='flex lg:gap-[0.5vw] gap-[2vw] bg-black text-zinc-200 font-semibold py-[0.7vh] md:px-[0.7vw] px-[1.5vw] rounded-lg hover:bg-red-500 transition-all duration-200 hover:cursor-pointer' onClick={handleLogout}>
                                <LogOut />
                                Logout
                            </button>
                        </div>
                    </div>

                    <div className='flex flex-col w-full flex-1 bg-white rounded-xl border-[1px] border-zinc-300 px-[1.9vh] py-[1.9vh]'>
                        <div className='flex w-full h-[10vh] items-start justify-between gap-[1.9vw]'>
                            <span className='text-zinc-700 text-lg font-semibold w-[30%]'>Name</span>
                            <h1 className='w-[70%] text-zinc-500'>{user.firstName} {user.lastName}</h1>
                        </div>
                        <hr className="mb-[1.9vh] bg-zinc-500 border-zinc-300" />
                        <div className='flex w-full h-[10vh] items-start justify-between gap-[1.9vw]'>
                            <span className='text-zinc-700 text-lg font-semibold w-[30%]'>Email</span>
                            <h1 className='w-[70%] text-zinc-500'>{user.email}</h1>
                        </div>
                        <hr className="mb-[1.9vh] bg-zinc-500 border-zinc-300" />
                        <div className='flex w-full h-[10vh] items-start justify-between gap-[1.9vw]'>
                            <span className='text-zinc-700 text-lg font-semibold w-[30%]'>Gender</span>
                            <h1 className='w-[70%] text-zinc-500'>{user.gender}</h1>
                        </div>
                        <hr className="mb-[1.9vh] bg-zinc-500 border-zinc-300" />
                        <div className='flex w-full h-[10vh] items-start justify-between gap-[1.9vw]'>
                            <span className='text-zinc-700 text-lg font-semibold w-[30%]'>City</span>
                            <h1 className='w-[70%] text-zinc-500'>{user.city}</h1>
                        </div>
                    </div>
                </div>
            </div>
            {isEditing && (
                <>
                    <div className='absolute top-0 left-0 w-full h-full bg-black opacity-60 flex items-center justify-center' onClick={() => setIsEditing(false)}></div>
                    <div className='absolute top-1/2 left-1/2 lg:w-[40vw] md:w-[60vw] w-[70vw] h-fit transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center'>
                        <EditProfileForm user={user} setEditFormOpen={setIsEditing} />
                    </div>
                </>
            )}
        </div>
    )
}

export default Settings