import React from 'react'
import Dp from "../utilites/person.avif"
const Navbar = () => {
    return (
        <div className='bg-slate-900 flex justify-between h-16 px-2 py-4 text-white font-semibold'>
            <div className='flex items-center'>Chat App</div>
            <div className='flex gap-1 text-sm items-center'>
                <div className='h-6 w-6 rounded-full'>
                    <img className='h-full w-full object-cover rounded-full' src={Dp} alt="" />
                </div>
                <div className=''>Deepak Kumar</div>
                <button className='bg-teal-600 text-sm px-2 py-1 rounded-md'>Logout</button>
            </div>
        </div>
    )
}

export default Navbar
