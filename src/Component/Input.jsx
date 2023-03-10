import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
    arrayUnion,
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';

const Input = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleSend = async () => {
        if (img) {
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            }),
                        });
                    });
                }
            );
        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        setText("");
        setImg(null);
    }


    return (
        <div className='bg-white h-16 px-5 py-3 flex justify-between items-center'>
            <div className='w-3/4'>
                <input
                    value={text}
                    onKeyDown={e => e.code === "Enter" && handleSend()}
                    onChange={e => setText(e.target.value)}
                    type="text"
                    placeholder='Enter your messege...'
                    className='py-3 px-3 rounded-full focus:outline-none w-full focus:bg-gray-200'
                    required
                />
            </div>
            <div className='flex gap-2 '>
                <input
                    onChange={(e) => setImg(
                        "image"
                    )}
                    className='hidden'
                    type="file"
                    id="attach"
                />
                <label
                    className='flex gap-1 items-center'
                    htmlFor="attach">
                    <ImageIcon />
                    <AttachFileIcon className="rotate-45" />
                </label>
                <button
                    onClick={handleSend}
                    className='hover:bg-blue-500 bg-blue-400 px-4 text-white font-semibold rounded-md'>
                    Send
                </button>

            </div>
        </div>
    )
}

export default Input