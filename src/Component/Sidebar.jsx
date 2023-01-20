import React from 'react'
import Chats from './Chats'
import Search from './Search'
import Navbar from './Navbar'

const Sidebar = () => {
    return (
        <div className='bg-neutral-700 w-80'>
            < Navbar />
            <Search />
            <Chats />
        </div >
    )
}

export default Sidebar
