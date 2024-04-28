import React from 'react'
import QuoraHeader from './QuoraHeader'
import Sidebar from './sidebar'
import Feed from './Feed'
import Widgets from'./widgets'
import './Quora.css'

function Quora() {
    return (
        <div className='quora'>
            {/* <QuoraHeader/> */}
            <div className='quora__contents'>
                <div className='quora__content'>
                    <Sidebar />
                    <Feed/>
                    <Widgets/>
                </div>
           
            </div>
        </div>
    )

};

export default Quora
