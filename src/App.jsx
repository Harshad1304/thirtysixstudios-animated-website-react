import React, { useEffect, useRef, useState } from 'react'
import Canvas from './components/Canvas'
import data from './data'
import LocomotiveScroll from 'locomotive-scroll';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap/gsap-core';

function App() {
  const [showCanvas,setShowCanvas]= useState(false);

  const headingRef = useRef(null);
  
  const growingSpan = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  
  }, [])
  

  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } else {

          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });
        

          gsap.to(growingSpan.current, {
            scale: 0,
            duration: 2,
            ease: "power2.inOut",
          });
          
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingRef.current;
    headingElement.addEventListener("click", handleClick);

    // Clean up event listener on unmount
    return () => headingElement.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className='w-full min-h-screen selection:bg-slate-600  font-["Helvetica_Now_Display"]'>
      
    <span className='growing block fixed rounded-full -top-[20px] -left-[20px] w-5 h-5' ref={growingSpan}></span>
      <div className='w-full relative min-h-screen'>
      {showCanvas&& data[0]?.map((canvasDetails, index)=>(
            <div key={index}>
              <Canvas details={canvasDetails} />
            </div>
          ))}
          <div className='w-full relative z-[1] h-screen'>
            <nav className='w-full p-8 flex justify-between bg-black/40'>
            <div className='brand  text-2xl '>ThirtysixStudios</div>
            <div className='links flex gap-10'>
              {["Home","About","Projects","Contact"].map((link,index)=>(
                <a key={index} className='text-xl hover:text-gray-300' href={`#${link.toLocaleLowerCase()}`}>{link}</a>
              ))}
            </div>
            </nav>
            <div className='textcontainer w-full px-[20%]'>
            <div className='text w-[45%] '>
              <h3 className='text-4xl leading-[1.5] '>At Thirtysixstudio, we build immersive digital experiences for brands with a purpose.</h3>
              <p className='text-lg font-normal w-[80%] mt-10 '>We’re a boutique production studio focused on design, motion, and creative technology, constantly reimagining what digital craft can do for present-time ads and campaigns.</p>
              <p className='text-2xl mt-10'>scroll</p>
            </div>
            </div>
            <div className='overflow-x-hidden w-full'><div className='w-full absolute bottom-0 left-0'>
                <h1 ref={headingRef} className='text-[17rem] font-normal leading-none tracking-tight pl-5'>Thirtysixstudios</h1>
              </div>
              </div>
          </div>
      </div>
      <div className="w-full relative h-screen  mt-32 px-10">
        { showCanvas &&
          data[1].map((canvasdets, index) => <Canvas details={canvasdets} />)}
        <h1 className="text-8xl tracking-tighter">about the brand</h1>
        <p className="text-4xl leading-[1.8] w-[80%] mt-10 font-light">
          we are a team of designers, developers, and strategists who are
          passionate about creating digital experiences that are both beautiful
          and functional, we are a team of designers, developers, and
          strategists who are passionate about creating digital experiences that
          are both beautiful and functional.
        </p>

        <img
          className="w-[40%] mt-10"
          src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400"
          alt=""
        />
      </div>
      <div className='w-full relative h-screen'>
      { showCanvas &&
          data[2].map((canvasdets, index) => <Canvas details={canvasdets} />)}
      </div>
    </div>
  )
}

export default App