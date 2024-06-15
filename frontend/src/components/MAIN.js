import React from 'react'
// import QuoraHeader from './QuoraHeader'
import Sidebar from './sidebar'
import Feed from './Feed'
import Widgets from'./Widgets'
import './MAIN.css'
import { useEffect } from 'react'

function MAIN() {

    useEffect(() => {
        const handleScroll = () => {
          const scrollTop = window.scrollY;
          const maxScroll = document.body.clientHeight - window.innerHeight;
          const scrollFraction = scrollTop / maxScroll;
          const hue = (scrollFraction * 360) % 360;
          const backgroundColor = `hsl(${hue}, 100%, 98%)`; 
              document.documentElement.style.setProperty("--scroll-view-background", backgroundColor);
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);


    return (
        <div className='quora'>
            
            <div className='quora__contents' style={{ background: "var(--scroll-view-background)" }}>
                <div className='quora__content'>
                    <Sidebar />
                    <Feed/>
                    <Widgets/>
                </div>
            </div>
        </div>
    )

};

export default MAIN
