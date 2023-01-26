import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';
import Messege from './Messege'
const Messeges = () => {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unSub();
        };
    }, [data.chatId]);
    return (
        <div className='h-[calc(100%-128px)] bg-[#ddddf7] overflow-y-scroll'>
            {
                messages?.map((m) => (
                    m.text !== "" &&
                    <Messege message={m} key={m.id} />
                ))
            }
        </div>
    )
}

export default Messeges
