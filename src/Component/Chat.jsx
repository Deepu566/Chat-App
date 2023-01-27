import React, { useContext } from 'react'
import VideocamIcon from '@mui/icons-material/Videocam';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Messeges from './Messeges'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'
const Chat = () => {
    const { data } = useContext(ChatContext);
    return (
        <div className=' flex-1 w-48'>
            <div className='h-16 bg-[#5d5b8d] flex items-center justify-between px-5 py-3'>
                <div className='text-white font-semibold'>{data.user?.displayName}</div>
                <div className='flex items-center gap-3 '>
                    <VideocamIcon />
                    <PersonAddIcon />
                    <MoreVertIcon />
                </div>
            </div>
            <Messeges />
            <Input />
        </div>
    )
}
export default Chat
