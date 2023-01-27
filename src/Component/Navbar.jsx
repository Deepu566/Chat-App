import React, { useContext } from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
const Navbar = () => {

    const { currentUser } = useContext(AuthContext)
    return (
        <div className='bg-slate-900 flex justify-between h-16 px-2 py-4 text-white font-semibold'>
            <div className='flex items-center'>Chat App</div>
            <div className='flex gap-3 text-sm items-center'>
                <div className='h-6 w-6 rounded-full'>
                    <img className='h-full w-full object-cover rounded-full' src={currentUser.photoURL} alt="" />
                </div>
                <div className=''>{currentUser.displayName.toUpperCase()}</div>
                <button onClick={() => signOut(auth)} className='bg-teal-600 text-sm px-1 py-[2px] rounded-md'>Logout</button>
            </div>
        </div>
    )
}

export default Navbar
