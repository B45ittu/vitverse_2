import React from 'react'
import { Avatar } from '@mui/material'
import './question.css'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
function Question() {

    const user=useSelector(selectUser);
    return (
        <div className='question_box'>
            <div className='question_info'>
                <Avatar src={user?.photo}/>
            </div>
            <div className='description'>
                <h5>What is your question or link?</h5>
            </div>
        </div>
    )
}

export default Question;
