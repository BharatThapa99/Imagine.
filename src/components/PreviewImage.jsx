import React, { useState, useEffect, useRef } from 'react'
import { fabric } from 'fabric';
import PreviewImg from '../assets/output_image.jpg'

export default function PreviewImage() {

  const canvasRef = useRef(null);
  const previewWidth = 400;
  const previewHeight = 500;
  const finalWidth = 1080;
  const finalHeight = 1360;
  const multiplier = finalWidth / previewWidth;
  

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);
    canvas.setHeight(previewHeight);
    canvas.setWidth(previewWidth);
    canvas.selection = true;

    // Attach the fabric canvas instance to the ref
    canvasRef.current.fabric = canvas;

    return () => {
      canvas.dispose();
    };
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current.fabric;
    canvas.setHeight(previewHeight);
    canvas.setWidth(previewWidth);
    canvas.setBackgroundColor('black');
    canvas.selection = true;
    // let imageURL = 'https://statico.sportskeeda.com/editor/2024/06/5f2e4-17186252493345-1920.jpg'
    
    // if (imageUrl) {
      fabric.Image.fromURL('https://statico.sportskeeda.com/editor/2024/06/5f2e4-17186252493345-1920.jpg', function(img) {
        const scaleFactor = Math.min(
          canvas.width / img.width,
          canvas.height / img.height
        );
        img.set({
           left: 0, 
           top: 0, 
           selectable: true,
           scaleX: scaleFactor*1.4,
           scaleY: scaleFactor*1.4,

          });
        canvas.add(img).setActiveObject(img);

        const text = new fabric.Textbox('Damian Priest to grant a title shot to WWE legend at Money in the Bank 2024? Exploring the possibility', {
          left: 15,
          top: img.getScaledHeight()+10,
          fill: 'white',
          fontSize: 28,
          selectable: true,
          width: canvas.width - 15,
          fontFamily: 'Staatliches',
        });
        console.log(img.getScaledHeight())

        canvas.add(text).setActiveObject(text);
      canvas.renderAll();
      }, { crossOrigin: 'anonymous' });

      canvas.on('object:moving', function(e) {
        e.target.opacity = 0.5;
      });
  
      canvas.on('object:modified', function(e) {
        e.target.opacity = 1;
      });

      canvasRef.current.fabric = canvas;

      // return () => {
      //   canvas.dispose();
      // };

      },[]);

    

     

      
    
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
