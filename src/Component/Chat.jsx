import React from 'react'
import Video from "../utilites/videoIcon.png"
import Add from "../utilites/addFreindIcon.png"
import More from "../utilites/moreIcon.png"
import Messeges from './Messeges'
import Input from './Input'
const Chat = () => {
    return (
        <div className=' flex-1 w-48'>
            <div className='h-16 bg-[#5d5b8d] flex items-center justify-between px-5 py-3'>
                <div className='text-white font-semibold'>Tylor</div>
                <div className='flex items-center gap-3 '>
                    <div className='h-7 w-7 bg-' >
                        <img className='h-full w-full object-cover' src={Video} alt="" />
                    </div>
                    <div className='h-8 w-7 bg-' >
                        <img className='h-full w-full object-cover' src={Add} alt="" />
                    </div>
                    <div className='h-7 w-7 bg-' >
                        <img className='h-full w-full object-cover' src={More} alt="" />
                    </div>
                </div>
            </div>
            <Messeges />
            <Input />
        </div>
    )
}
export default Chat
