import React, { useEffect, useState, useRef } from 'react'
import { fabric } from 'fabric';
import fadeImage from '../assets/darkfade.png';


export default function TemplateTwo() {
   
  const canvasRef = useRef(null);
  const previewWidth = 400;
  const previewHeight = 500;
  const finalWidth = 1080;
  const finalHeight = 1360;
  const multiplier = finalWidth / previewWidth;
  

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
      fabric.Image.fromURL('https://statico.sportskeeda.com/editor/2024/06/5f2e4-17186252493345-1920.jpg', function (img) {
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
        canvas.add(img).setActiveObject(img);

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
            canvas.add(fadeImg).setActiveObject(fadeImg);
            // canvas.renderAll();

             // Add text over the fade image
        const text = new fabric.Textbox('Damian Priest to grant a title shot to WWE legend at Money in the Bank 2024? Exploring the possibility', {
          left: 10,
          top: previewHeight * 0.75,
          fill: 'white',
          fontSize: 28,
          selectable: true,
          width: previewWidth - 20,
          fontFamily: 'Staatliches', // Ensure this font is properly loaded
        });


        canvas.add(text).setActiveObject(text);
        canvas.renderAll();
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
  })
  }, []);

  return (
    <div className='img-preview-container'>
        <h2>Preview 2</h2>
        {/* <img className='preview-img' src={PreviewImg} alt="" /> */}
        <canvas ref={canvasRef}></canvas>

        {/* <button onClick={exportHighResImage}>Download High-Res Image</button> */}

    </div>
  )
}
