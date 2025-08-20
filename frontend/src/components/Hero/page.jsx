import React from 'react'
import { ChevronRight } from 'lucide-react'

const Hero = () => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-between gap-6'>
        <div className='w-full flex items-center justify-between'>
            <h1 className='uppercase lg:text-4xl text-2xl font-bold text-zinc-800'>Expenta</h1>
            <button className='bg-zinc-800 text-white hover:text-zinc-800 lg:text-base text-sm lg:px-4 px-3 lg:py-2 py-1 rounded-full flex items-center gap-2 border-2 hover:cursor-pointer border-zinc-800 group hover:bg-transparent transition-colors duration-200'>
                Get Started
                <ChevronRight className='lg:w-5 w-4 lg:h-5 h-4 group-hover:translate-x-2 transition-transform duration-200' />
            </button>
        </div>
        <div className='relative w-full flex flex-1 lg:items-center items-start lg:justify-center justify-start'>
            <div className='w-full h-full flex flex-col items-start lg:justify-center justify-start lg:mt-0 mt-[5vh] gap-[8vh]'>
                <div className='flex flex-col items-start justify-center'>
                    <span className='lg:text-[8vw] text-[12vw] font-bold text-zinc-800 uppercase leading-[6vw]'>Expense<span className='font-light lg:text-[4vw] text-[6vw]'>Money</span></span>
                    <span className='lg:text-[14vw] text-[16vw] text-lime-500 leading-[9vw] heading-font z-50'>Smartly</span>
                </div>
                <p className='text-zinc-800 lg:w-[40%] w-full font-medium lg:text-[18px] text-[14px]'>Track your spending effortlessly, gain financial clarity, and build smarter habits with our expense tracker designed to simplify money management and keep you in control.</p>
            </div>

            <div className='absolute bottom-0 right-0 lg:w-[45vw] w-full lg:h-full h-[45vh] z-0'>
                <img src="/img/hero.png" alt="Mobile Photo" className='object-contain w-full h-full lg:object-bottom-right object-bottom' />
            </div>
        </div>
    </div>
  )
}

export default Hero