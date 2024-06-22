import React, { useEffect, useRef, useContext } from 'react'
import { fabric } from 'fabric';
import fadeImage from '../assets/darkfade.png';
import testImage from '../assets/testimage.webp';
import Preview from './Preview';



export default function TemplateTwo({width, height, articleImg, articleTitle, setThumbnailImg, display}) {

   
  const canvasRef = useRef(null);
  const previewWidth = 400;
  const previewHeight = 500;
 

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current,{
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

    // if (imageUrl) {
      fabric.Image.fromURL(articleImg, function (img) {
        const scaleFactor = Math.max(
          previewWidth / img.width,
          previewHeight / img.height
        );
        // Center the image
        const scaledWidth = img.width * scaleFactor;
        const scaledHeight = img.height * scaleFactor;
        const left = (previewWidth - scaledWidth) / 2;
        const top = (previewHeight - scaledHeight) / 2;

        img.set({
          left: left,
          top: top,
          selectable: true,
          scaleX: scaleFactor,
          scaleY: scaleFactor,
        });
        canvas.add(img);

        // Add fade overlay
        fabric.Image.fromURL(fadeImage, function (fadeImg) {
            // Scale the fade image to match the canvas width
            const fadeScaleFactor = previewWidth / fadeImg.width;
            fadeImg.set({
              left: 0,
              top: previewHeight * 0.59,
              selectable: true,
              scaleX: fadeScaleFactor,
              scaleY: fadeScaleFactor,
            });
            canvas.add(fadeImg);
            canvas.renderAll();

             // Add text over the fade image
        const text = new fabric.Textbox(articleTitle, {
          left: 10,
          top: previewHeight * 0.75,
          fill: 'white',
          fontSize: 28,
          selectable: true,
          width: previewWidth - 20,
          fontFamily: 'Staatliches', // Ensure this font is properly loaded
        });


        canvas.add(text);
        canvas.renderAll();

        //generateThumbnail
        const img = canvas.toDataURL({ format: 'jpeg', quality: 0.7, multiplier:150/previewWidth})

       setThumbnailImg(prevImg => [...prevImg, img]);
       
        
       
}, { crossOrigin: 'anonymous' });
        

      //   // Add text over gradient
      //   const text = new fabric.Textbox('Damian Priest to grant a title shot to WWE legend at Money in the Bank 2024? Exploring the possibility', {
      //     left: 10,
      //     top: previewHeight * 0.75,
      //     fill: 'white',
      //     fontSize: 28,
      //     selectable: true,
      //     width: previewWidth - 20,
      //     fontFamily: 'Staatliches', // Ensure this font is properly loaded
      //   });

      //   canvas.add(text).setActiveObject(text);
      //   canvas.renderAll();
      // }, { crossOrigin: 'anonymous' });
    //  }

    canvas.on('object:moving', function (e) {
      e.target.opacity = 0.5;
    });

    canvas.on('object:modified', function (e) {
      e.target.opacity = 1;
    });
    
    
  },{crossOrigin:"anonymous"});
 
  }, []);

  

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
