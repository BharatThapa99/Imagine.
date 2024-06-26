import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import Preview from './Preview';


export default function TemplateOne({setThumbnailImg, articleImg, articleTitle, display}) {


const canvasRef = useRef(null);
  const previewWidth = 400;
  const previewHeight = 500;
  

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
        preserveObjectStacking: true,
    });
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
    canvas.clear();
    canvas.setHeight(previewHeight);
    canvas.setWidth(previewWidth);
    canvas.setBackgroundColor('black');
    canvas.selection = true;
    // let imageURL = 'https://statico.sportskeeda.com/editor/2024/06/5f2e4-17186252493345-1920.jpg'
    
    // if (imageUrl) {
    console.log(articleImg);
      fabric.Image.fromURL(articleImg, function(img) {
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
        canvas.add(img);

        const text = new fabric.Textbox(articleTitle, {
          left: 15,
          top: img.getScaledHeight()+10,
          fill: 'white',
          fontSize: 28,
          selectable: true,
          width: canvas.width - 15,
          fontFamily: 'Staatliches',
        });
        console.log(img.getScaledHeight())

        canvas.add(text);
      canvas.renderAll();

      const thumbnailimg = canvas.toDataURL({ format: 'jpeg', quality: 0.7, multiplier:150/previewWidth})
      setThumbnailImg(prevImg => [...prevImg, thumbnailimg]);
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

      },[articleImg,articleTitle]);

    

      return (
        <>
        
        {display ? <div className='img-preview-container'>
          <h2>Preview</h2>
          
          <canvas ref={canvasRef}></canvas>
          <Preview canvasRef={canvasRef}/>
  
  
      </div>: <div className='img-preview-container' style={{display:"none"}}>
          <h2>Preview</h2>
          
          <canvas ref={canvasRef}></canvas>
          <Preview canvasRef={canvasRef}/>
  
  
      </div>}
        
        </>
        
      )



}