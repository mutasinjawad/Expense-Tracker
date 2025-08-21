'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link';

const SignInUp = () => {
    const containerRef = useRef(null);
    const signInTextRef = useRef(null);

    const [isSignInOpen, setIsSignInOpen] = useState(true);
    const handleClick = () => {
        if (containerRef.current && isSignInOpen) {
            containerRef.current.style.transform = 'translateX(-50vw)';
            signInTextRef.current.style.transform = 'translateY(-5.5vw)';
            setIsSignInOpen(false);
            console.log("Sign Up Page opened");
        } else if (containerRef.current && !isSignInOpen) {
            containerRef.current.style.transform = 'translateX(0)';
            signInTextRef.current.style.transform = 'translateY(0)';
            setIsSignInOpen(true);
            console.log("Sign In Page opened");
        }
    }

    return (
        <div className='relative overflow-hidden'>
            <div ref={containerRef} className='h-screen w-[150vw] flex items-center justify-center translate-x-[0] transition-all duration-500'>
                <div className='h-full w-[50vw] flex items-center justify-center bg-lime-100'>
                    <div className={`px-4 py-3 w-[80%] h-fit flex flex-col items-center justify-center gap-6 transition-all duration-300 ${isSignInOpen ? "opacity-100" : "opacity-0"}`}>
                        <form action="" className='w-full h-fit flex flex-col items-start justify-center gap-4'>
                            <div className='flex flex-col w-full h-fit'>
                                <label htmlFor="email" className='font-medium text-zinc-700 mb-2 select-none'>Email</label>
                                <input type="email" id="email" placeholder='Enter your email' className='bg-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-600' />
                            </div>

                            <div className='flex flex-col w-full h-fit select-none'>
                                <label htmlFor="password" className='font-medium text-zinc-700 mb-2'>Password</label>
                                <input type="password" id="password" placeholder='Enter your password' className='bg-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-600' />
                            </div>

                            <button className='bg-lime-500 text-white py-2 px-4 rounded-lg mt-6 w-full select-none hover:bg-lime-800 transition-all duration-300 hover:cursor-pointer'>Sign In</button>
                        </form>

                        <div className='select-none'>
                            Don't have an account? <span className='text-lime-500 cursor-pointer underline hover:text-lime-800 transition-all duration-300' onClick={handleClick}>Sign Up</span>
                        </div>
                    </div>
                </div>

                <div className='h-full w-[50vw] flex flex-col items-center justify-center gap-6 translate-y-[-10vh]'>
                    <Link href="/" className='w-[30%] h-fit'>
                        <img src="/img/logo2.png" alt="Logo" className='w-full h-full object-contain' />
                    </Link>
                    <div className='w-full h-[4.5vw] flex flex-col items-center justify-start overflow-hidden'>
                        <div ref={signInTextRef} className='w-full h-fit flex flex-col items-center justify-center gap-[1vw] translate-y-0 transition-transform duration-500'>
                            <div className='w-auto h-[4.5vw] text-[3.5vw] font-bold text-zinc-800 leading-[4vw] select-none'>Sign In</div>
                            <div className='w-auto h-[4.5vw] text-[3.5vw] font-bold text-zinc-800 leading-[4vw] select-none'>Sign Up</div>
                        </div>
                    </div>
                </div>

                <div className='h-full w-[50vw] flex items-center justify-center bg-lime-100'>
                    <div className={`px-4 py-3 w-[80%] h-fit flex flex-col items-center justify-center gap-6 transition-all duration-300 ${isSignInOpen ? "opacity-0" : "opacity-100"}`}>
                        <form action="" className='w-full h-fit flex flex-col items-start justify-center gap-4'>
                            <div className='flex w-full h-fit gap-4'>
                                <div className='flex flex-col w-[50%] h-fit'>
                                    <label htmlFor="name" className='font-medium text-zinc-700 mb-2 select-none'>First Name <span className='text-red-500'>*</span></label>
                                    <input type="text" id="name" placeholder='Enter your first name' className='bg-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-600' />
                                </div>
                                <div className='flex flex-col w-[50%] h-fit'>
                                    <label htmlFor="name" className='font-medium text-zinc-700 mb-2 select-none'>Last Name</label>
                                    <input type="text" id="name" placeholder='Enter your last name' className='bg-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-600' />
                                </div>
                            </div>

                            <div className='flex flex-col w-full h-fit'>
                                <label htmlFor="email" className='font-medium text-zinc-700 mb-2 select-none'>Email <span className='text-red-500'>*</span></label>
                                <input type="email" id="email" placeholder='Enter your email' className='bg-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-600' />
                            </div>

                            <div className='flex flex-col w-full h-fit select-none'>
                                <label htmlFor="password" className='font-medium text-zinc-700 mb-2'>Password <span className='text-red-500'>*</span></label>
                                <input type="password" id="password" placeholder='Enter your password' className='bg-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-600' />
                            </div>

                            <button className='bg-lime-500 text-white py-2 px-4 rounded-lg mt-6 w-full select-none hover:bg-lime-800 transition-all duration-300 hover:cursor-pointer'>Sign Up</button>
                        </form>

                        <div className='select-none'>
                            Already have an account? <span className='text-lime-500 cursor-pointer underline hover:text-lime-800 transition-all duration-300' onClick={handleClick}>Sign In</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInUp