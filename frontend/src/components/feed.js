import React, { useEffect, useState } from "react";
import Question from './question'
import Post from './Post'
import './feed.css'
import axios from 'axios'


function Feed() {

    useEffect(()=>{
        axios.get('/api/questions').then((res)=>{
            console.log(res.data);
        }).catch(()=>{
            console.log("unexcepted error");
        })
    },[]);

    return (
        <div className='feed'>
            
                <Question/>
                <br/>
                <Post/>
                <br/>
                <Post/>
  
            

        </div>
    )
}

export default Feed
