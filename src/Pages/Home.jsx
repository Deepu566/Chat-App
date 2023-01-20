import React from 'react'
import Sidebar from '../Component/Sidebar'
import Chat from '../Component/Chat'
const Home = () => {
    return (
        <div className='h-screen bg-teal-500 flex items-center justify-center'>
            <div className='w-8/12 flex h-5/6  rounded-md overflow-hidden'>
                <Sidebar />
                <Chat />
            </div>
        </div>
    )
}

export default Home
