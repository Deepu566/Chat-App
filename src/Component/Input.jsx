import Attach from "../utilites/attachIcon.png"
import Img from "../utilites/attachImg.jpg"
import React, { useContext, useState } from "react";
// import Img from "../img/img.png";
// import Attach from "../img/attach.png";
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


const Input = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleSend = async () => {
        console.log(img)
        if (img) {
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);
            // console.log(uploadTask)
            uploadTask.on(
                (error) => {
                    // console.log(error)
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
        console.log(img, "img")

        setText("");
        setImg(null);
    }

    return (
        <div className='bg-white h-16 px-5 py-3 flex justify-between items-center'>
            <div className='w-3/4'>
                <input
                    value={text}
                    onChange={e => setText(e.target.value)}
                    type="text"
                    placeholder='Enter your messege...'
                    className='py-3 px-3fyarn start rounded-full focus:outline-none w-full focus:bg-gray-200'
                    required
                />
            </div>
            <div className='flex '>
                <input
                    onChange={(e) => setImg(
                        "image"
                    )}
                    className='hidden'
                    type="file"
                    id="attach"

                />
                <label
                    className='flex items-center'
                    htmlFor="attach">
                    <div className='w-6 h-6 flex'>
                        <img className='h-full w-full' src={Attach} alt="" />
                    </div>
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