import React, { useEffect, useRef, useState } from 'react'
import animatingImage from '../animatingImages'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
function Canvas({details}) {
    const {startIndex,duration, size, top, left, zIndex} = details;
    const [index , setIndex] = useState({value:startIndex});
    const canvasRef = useRef(null);
    
    useGSAP(()=>{
        gsap.to(index,{
            value:startIndex + 149,
            duration:duration,
            ease:"linear",
            repeat:-1,
            onUpdate:()=>{
                setIndex({value:Math.round(index.value)})
            }
        })

        gsap.from(canvasRef.current,{
            opacity: 0,
            scale:0.8,
            duration:1,
            ease:"power2.inOut"
        })
    })
    
    useEffect(()=>{ 
        const scale = window.devicePixelRatio;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = animatingImage[index.value];
        img.onload = ()=>{
            canvas.width = canvas.offsetWidth * scale
            canvas.height = canvas.offsetHeight * scale;
            canvas.style.width = canvas.offsetWidth + "px";
            canvas.style.height = canvas.offsetHeight + "px";
            ctx.scale(scale,scale);
            ctx.drawImage(img,0,0, canvas.offsetWidth, canvas.offsetHeight)
        }
        
    },[index])
  return (
    <canvas data-scroll
        data-scroll-speed={Math.random().toFixed(1)}
    className='absolute' id='canvas' style={{
        top:`${top}%`,
        left:`${left}%`,
        width:size*1.8,height:size*1.8}} ref={canvasRef}>Canvas</canvas>
  )
}

export default Canvas