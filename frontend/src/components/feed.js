import React from 'react'
import Question from './question'
import Post from './post'
import './feed.css'

function feed() {
    return (
        <div className='feed'>
            <div className='feed_compo'>
                <Question/>
            </div>
            
            <div className='feed_compo'>
                <Post/>
            </div>

        </div>
    )
}

export default feed
