import React, { useState } from 'react'
import imageIcon from "../utilites/imgIcon.png"
import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                (error) => {
                    setErr(true)
                },
                () => {
                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName: displayName,
                            photoURL: downloadURL
                        });
                        await setDoc(doc(db, "user", res.user.uid), {
                            uid: res.user.uid,
                            displayName: displayName,
                            email,
                            photoURL: downloadURL,
                        });
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");


                    });
                }
            );
        } catch (err) {
            setErr(true)
        }


    }
    return (
        <div className='h-screen bg-indigo-300 flex justify-center items-center'  >
            <div className='form-wrapper bg-white px-16 py-5 rounded-lg w-4/12
            max-sm:h-full max-sm:w-full max-sm:flex max-sm:flex-col max-sm:justify-center'>
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
                    <button className='bg-blue-400 font-semibold py-2 text-white rounded-lg cursor-pointer'>Sign Up</button>
                </form>
                <div className='text-center text-sm'>
                    <span>You do have an account?</span>
                    <Link to={"/login"}>
                        <span className='text-blue-500 cursor-pointer'>Login</span>
                    </Link>
                </div>
                {err && <span>Somthing went Wrong</span>}
            </div>
        </div>
    )
}

export default Register























