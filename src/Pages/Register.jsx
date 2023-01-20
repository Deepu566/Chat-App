import React, { useState } from 'react'
import imageIcon from "../utilites/imgIcon.png"
import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../firebase";

import {
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";


const Register = () => {
    const [err, setErr] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        try {
            //Create user
            const res = await createUserWithEmailAndPassword(auth, email, password)
            //Create a unique image name
            const storageRef = ref(storage, displayName);
            // console.log(storageRef)

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                (error) => {
                    setErr(true)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then(async (downloadURL) => {
                            //Update profile
                            await updateProfile(res.user, {
                                displayName,
                                photoURL: downloadURL,
                            });
                            await setDoc(doc(db, "users", res.user.uid), {
                                uid: res.user.uid,
                                displayName,
                                email,
                                photoURL: downloadURL
                            })
                        })
                })

        } catch (err) {
            setErr(true)
            // console.log(err)
        }

    }
    return (
        <div className='h-screen bg-indigo-300 flex justify-center items-center'  >
            <div className='form-wrapper bg-white px-16 py-5 rounded-lg'>
                <div className='text-center mb-2'>
                    <h1 className='mb-2 font-bold text-2xl text-sky-900'>Chat App</h1>
                    <h2 className='font-semibold text-gray-400'>Register</h2>
                </div>
                <form action="" className='flex gap-5 flex-col justify-center mb-3' onSubmit={handleSubmit}>
                    <input type="text" placeholder='display name' className='focus:outline-0 border-b py-3 px-3' />
                    <input type="text" placeholder='email' className='focus:outline-0 border-b py-3 px-3' />
                    <input type="password" placeholder='password' className='focus:outline-0 border-b py-3 px-3 mb' />
                    <input type="file" id='file' className='hidden' />
                    <label htmlFor="file">
                        <img className='w-8 h-8 inline mr-3 object-contain cursor-pointer' src={imageIcon} alt="" />
                        <span className='text-blue-400 text-sm cursor-pointer'>Add an image</span>
                    </label>
                    <button className='bg-blue-400 font-semibold py-2 text-white rounded-lg cursor-pointer'>Sign In</button>
                </form>
                <div className='text-center text-sm'>
                    <span>You do have an account?</span>
                    <span className='text-blue-500 cursor-pointer'>Login</span>
                </div>
                {err && <span>Somthing went Wrong</span>}
            </div>
        </div>
    )
}

export default Register























