import React, { useState, useEffect, useRef } from 'react'
import { fabric } from 'fabric';
import PreviewImg from '../assets/output_image.jpg'

export default function PreviewImage() {

  
     

      
    
    // }
  
  

  const exportHighResImage = () => {
    const canvas = canvasRef.current.fabric;
    // console.log(canvas)
    canvas.renderAll();

    // Convert canvas to data URL with multiplier
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: multiplier,
    });

    // Create a temporary anchor element to download the image
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'highres-image.png';
    document.body.appendChild(link); // Append anchor to body
    link.click(); // Click the anchor to trigger download
    document.body.removeChild(link); // Clean up anchor element
  };

    
  
  return (
    <div className='img-preview-container'>
        <h2>Preview</h2>
        {/* <img className='preview-img' src={PreviewImg} alt="" /> */}
        <canvas ref={canvasRef}></canvas>

        <button onClick={exportHighResImage}>Download High-Res Image</button>

    </div>
  )
}
