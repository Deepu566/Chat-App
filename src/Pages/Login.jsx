import React from 'react'

const Login = () => {
    return (
        <div className='h-screen bg-indigo-300 flex justify-center items-center'  >
            <div className='form-wrapper bg-white px-16 py-5 rounded-lg'>
                <div className='text-center mb-2'>
                    <h1 className='mb-2 font-bold text-2xl text-sky-900'>Chat App</h1>
                    <h2 className='font-semibold text-gray-400'>Login</h2>
                </div>
                <form action="" className='flex gap-5 flex-col justify-center mb-3'>
                    <input type="email" placeholder='email' className='placeholder:text-sm focus:outline-0 border-b py-3 px-3' />
                    <input type="password" placeholder='password' className='placeholder:text-sm focus:outline-0 border-b py-3 px-3 mb' />
                    <button className='bg-blue-400 font-semibold py-2 text-white rounded-lg cursor-pointer'>Login</button>
                </form>
                <div className='text-center text-sm'>
                    <span>You don't have an account?</span>
                    <span className='text-blue-500 cursor-pointer'>Register</span>
                </div>
            </div>
        </div>
    )
}

export default Login
