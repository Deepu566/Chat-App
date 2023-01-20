import React from 'react'
import Attach from "../utilites/attachIcon.png"
import Img from "../utilites/attachImg.jpg"
const Input = () => {
    return (
        <div className='bg-white h-16 px-5 py-3 flex justify-between items-center'>
            <div className='w-3/4'>
                <input type="text" placeholder='Enter your messege...' className='py-3 px-3fyarn start rounded-full focus:outline-none w-full focus:bg-gray-200' />
            </div>
            <div className='flex '>
                <input className='hidden' type="file" id="attach" />
                <label className='flex items-center' htmlFor="attach">
                    <div className='w-6 h-6 flex'>
                        <img className='h-full w-full' src={Attach} alt="" />
                    </div>
                    <div className='w-10 h-10'>
                        <img className='w-full h-full' src={Img} alt="" />
                    </div>
                </label>
                <button className='hover:bg-blue-500 bg-blue-400 px-4 text-white font-semibold rounded-md'>Send</button>
            </div>
        </div>
    )
}

export default Input