import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"
import AccountBoxIcon from '@mui/icons-material/AccountBox';


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
                message.senderId === currentUser.uid
                    ?
                    (
                        <div className='flex flex-row-reverse gap-3 px-2 mb-5'>
                            <div className='flex flex-col items-center'>
                                <div className='w-6 h-6'>
                                    <img
                                        className='w-full h-full rounded-full'
                                        src={currentUser.photoURL}
                                        alt="" />
                                </div>
                                <span
                                    className='text-sm text-gray-800'>
                                    just now
                                </span>
                            </div>
                            <div className='max-w-[300px]' >
                                <p
                                    className='w-fit py-1 px-2
                                bg-blue-500 text-white rounded-lg
                                rounded-tr-none '>
                                    {
                                        message.senderId === currentUser.uid &&
                                        message.text}
                                </p>
                            </div>
                        </div >
                    )
                    :
                    (
                        <div className='flex gap-3 px-2 mb-3'>
                            <div>
                                <div className='w-6 h-6'>
                                    <img
                                        className='w-full h-full rounded-full'
                                        src={data.user.photoURL}
                                        alt="" />
                                </div>
                                <span className='text-sm text-gray-800'>just now</span>
                            </div>
                            <div className='max-w-[300px]'>
                                <p
                                    className='bg-white py-1 px-4 w-fit
                                     rounded-lg rounded-tl-none'>
                                    {
                                        data.user.uid === message.senderId &&
                                        message.text
                                    }
                                </p>
                            </div>
                        </div>
                    )
            }
        </>
    )
}

export default Messege
