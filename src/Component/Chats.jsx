import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = () => {
    const [chats, setChats] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsub();
            };
        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u });
    };

    return (
        <div className=' chat items-center text-white gap-3'>
            {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                <div onClick={() => handleSelect(chat[1].userInfo)}
                    className='hover:bg-neutral-800 flex gap-3 py-2 px-3 border-b border-gray-500'
                    key={chat[0]}
                >
                    <div className='h-12 w-12 rounded-full'>
                        <img
                            className='h-full w-full rounded-full object-cover'
                            src={chat[1].userInfo.photoURL} alt="" />
                    </div>
                    <div className='details'>
                        <div className='name font-semibold'>{chat[1].userInfo.displayName}</div>
                        <div className='messege text-sm'>{chat[1].lastMessage?.text}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Chats
