import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"

const Login = () => {

    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        } catch (err) {
            setErr(true)
        }


    }

    return (
        <div className='h-screen bg-indigo-300 flex justify-center items-center
        max-sm:bg-black ' >
            <div className='form-wrapper bg-white px-16 py-5 w-4/12 rounded-lg
            max-sm:w-full max-sm:h-full max-sm:flex max-sm:flex-col max-sm:justify-center '>
                <div className='text-center mb-2'>
                    <h1 className='mb-2 font-bold text-2xl text-sky-900'>Chat App</h1>
                    <h2 className='font-semibold text-gray-400'>Login</h2>
                    {
                        err &&
                        <h3 className='font-semibold text-red-500'>Invalid Credentials! Please Try again with your correct email and password</h3>
                    }
                </div>
                <form onSubmit={handleSubmit} action="" className='flex gap-5 flex-col justify-center mb-3'>
                    <input type="email" placeholder='email' className='placeholder:text-sm focus:outline-0 border-b py-3 px-3' />
                    <input type="password" placeholder='password' className='placeholder:text-sm focus:outline-0 border-b py-3 px-3 mb' />
                    <button className='bg-blue-400 font-semibold py-2 text-white rounded-lg cursor-pointer'>Login</button>
                </form>
                <div className='text-center text-sm'>
                    <span>You don't have an account?</span>
                    <Link to={'/register'} >
                        <span className='text-blue-500 cursor-pointer'>Register</span>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Login
