import React from 'react'
import Person from "../utilites/person.avif"
const Chats = () => {
    return (
        <div className=' chat items-center text-white gap-3'>
            <div className='hover:bg-neutral-800 flex gap-3 py-2 px-3 border-b border-gray-500'>
                <div className='h-12 w-12 rounded-full'>
                    <img className='h-full w-full rounded-full object-cover' src={Person} alt="" />
                </div>
                <div className='details'>
                    <div className='name font-semibold'>James</div>
                    <div className='messege text-sm'>Okay fine</div>
                </div>
            </div>
            <div className='hover:bg-neutral-800 flex gap-3 py-2 px-3 border-b border-gray-500'>
                <div className='h-12 w-12 rounded-full'>
                    <img className='h-full w-full rounded-full object-cover' src={Person} alt="" />
                </div>
                <div className='details'>
                    <div className='name font-semibold'>James</div>
                    <div className='messege text-sm'>Okay fine</div>
                </div>
            </div>
            <div className='hover:bg-neutral-800 flex gap-3 py-2 px-3 border-b border-gray-500'>
                <div className='h-12 w-12 rounded-full'>
                    <img className='h-full w-full rounded-full object-cover' src={Person} alt="" />
                </div>
                <div className='details'>
                    <div className='name font-semibold'>James</div>
                    <div className='messege text-sm'>Okay fine</div>
                </div>
            </div>
            <div className='hover:bg-neutral-800 flex gap-3 py-3 px-2 border-b border-gray-500'>
                <div className='h-12 w-12 rounded-full'>
                    <img className='h-full w-full rounded-full object-cover' src={Person} alt="" />
                </div>
                <div className='details'>
                    <div className='name font-semibold'>James</div>
                    <div className='messege text-sm'>Okay fine</div>
                </div>
            </div>

        </div>
    )
}

export default Chats
