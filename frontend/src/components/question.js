import React from 'react'
import { Avatar } from '@mui/material'
import './question.css'
function question() {
    return (
        <div className='question_box'>
            <div className='question_info'>
                <Avatar/>
            </div>
            <div className='description'>
                <h5>What is your question or link?</h5>
            </div>
        </div>
    )
}

export default question
