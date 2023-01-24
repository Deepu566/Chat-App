import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"


const Messege = ({ message }) => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    return (
        <div className='flex px-2 mb-3 gap-4  flex-row-reverse'>
            <div>
                <div className='w-6 h-6'>
                    <img
                        className='w-full h-full rounded-full'
                        src={
                            message.senderId === currentUser.uid
                                ? currentUser.photoURL
                                : data.user.photoURL
                        }
                        alt="" />
                </div>
                <span className='text-sm text-gray-800'>just now</span>
            </div>
            <div>
                <p
                    className='bg-white py-1 rounded-lg rounded-tl-none max-w-[80%]
                  bg-blue-500 text-white px-3 rounded-lg
                    rounded-tr-none'>
                    {message.text}</p>
                <div className='w-48 h-4/5 my-3'>
                    <img className='rounded-lg' src={message.img} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Messege
