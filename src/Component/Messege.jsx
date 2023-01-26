import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"


const Messege = ({ message }) => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    return (
        <>
            {
                message.senderId === currentUser.uid &&
                (
                    <div className='flex flex-row-reverse gap-5 px-2 mb-6'>
                        <div>
                            <div className='w-6 h-6'>
                                <img
                                    className='w-full h-full rounded-full'
                                    src={currentUser.photoURL}
                                    alt="" />
                            </div>
                            <span className='text-sm text-gray-800'>just now</span>
                        </div>
                        <div>
                            <p
                                className='max-w-[80%] w-fit  py-1 
                            bg-blue-500 text-white pl-5 pr-3 rounded-lg
                            rounded-tr-none flex justify-end '>
                                {
                                    message.senderId === currentUser.uid &&
                                    message.text}
                            </p>
                            <div className='w-48 h-4/5 my-3'>
                                <img className='rounded-lg' src={message.img} alt="" />
                            </div>
                        </div>
                    </div>
                )
            }
            {
                data.user.uid === message.senderId &&
                (
                    <div className='flex px-2 mb-3'>
                        <div>
                            <div className='w-6 h-6'>
                                <img
                                    className='w-full h-full rounded-full'
                                    src={data.user.photoURL}
                                    alt="" />
                            </div>
                            <span className='text-sm text-gray-800'>just now</span>
                        </div>
                        <div>
                            <p
                                className='bg-white py-1 px-2 w-fit rounded-lg rounded-tl-none max-w-[80%]'>
                                {
                                    data.user.uid === message.senderId &&
                                    message.text
                                }
                            </p>
                            <div className='w-48 h-4/5 my-3'>
                                <img className='rounded-lg' src={message.img} alt="" />
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Messege
