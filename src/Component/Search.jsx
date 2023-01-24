import React, { useState, useContext } from 'react'
import {
    collection,
    query,
    where,
    getDocs,
    getDoc,
    setDoc,
    doc,
    updateDoc,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase"
import Person from "../utilites/person.avif"
import { AuthContext } from "../context/AuthContext";

const Search = () => {
    const [username, setUsername] = useState("")
    const [user, setUser] = useState(null)
    const [err, setErr] = useState(false)
    const { currentUser } = useContext(AuthContext);

    const handleSearch = async () => {
        const q = query(
            collection(db, "user"),
            where("displayName", "==", username)
        );
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc)
                setUser(doc.data())
                console.log(user)
            })
        } catch (err) {
            setErr(true)
        }
    }

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }

    const handleSelect = async () => {
        //check whether the group(chats in firestore) exists, if not create
        const combinedId =
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combinedId));

            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, "chats", combinedId), { messages: [] });

                //create user chats
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
            }
        } catch (err) { }

        setUser(null)
        setUsername("")
    }


    return (
        <div className=' text-white border-b border-gray-500 '>
            <input
                value={username}
                onKeyDown={handleKey}
                onChange={e => setUsername(e.target.value)}
                type="text" placeholder='find user'
                className='placeholder:text-sm w-full px-2 py-1 bg-transparent outline-none  text-white'
            />
            {err && <span>User not found</span>}
            {user && (
                <div onClick={handleSelect} className='flex gap-3 py-2 px-3'>
                    <div className='h-12 w-12 rounded-full'>
                        <img className='h-full w-full rounded-full object-cover' src={user.photoURL} alt="" />
                    </div>
                    <div className='details'>
                        <div className='name font-semibold'>{user.displayName}</div>
                    </div>
                </div>
            )
            }
        </div>
    );
};

export default Search
