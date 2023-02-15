import React from 'react'
import Chats from './Chats'
import Search from './Search'
import Navbar from './Navbar'

const Sidebar = () => {
    return (
        <div className='bg-neutral-700 
        max-sm:w-screen'>
            < Navbar />
            <Search />
            <Chats />
        </div >
    )
}

export default Sidebar
