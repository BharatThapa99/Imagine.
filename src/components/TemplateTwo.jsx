import React, { useEffect, useRef, useState } from 'react'
import { fabric } from 'fabric';
import fadeImage from '../assets/darkfade.png';
import Preview from './Preview';



export default function TemplateTwo({ articleImg, articleTitle, setThumbnailImg, display}) {

   
  const canvasRef = useRef(null);
  const previewWidth = 400;
  const previewHeight = 500;
  const [selectedColor, setSelectedColor] = useState('#000000');
  // const [canvas, setCanvas] = useState()

 

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
              top: previewHeight * 0.5,
              selectable: true,
              scaleX: fadeScaleFactor,
              scaleY: fadeScaleFactor*1.3,
            });
            canvas.add(fadeImg);
            canvas.renderAll();

             // Add text over the fade image
        const text = new fabric.Textbox(articleTitle, {
          left: 10,
          top: previewHeight * 0.68,
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

       const handleKeyDown = (e) => {
        if (e.key === 'Delete') {
            const activeObject = canvasRef.current.fabric.getActiveObject();
            if (activeObject) {
              canvasRef.current.fabric.remove(activeObject);
            }
          
        }
  
        //Undo
        if (e.ctrlKey && e.key === 'z') {
         canvasRef.current.fabric.undo();
      }
      else if (e.ctrlKey && e.key ==='y'){
        canvasRef.current.fabric.redo();
      }
    }
      
      
    document.addEventListener('keydown', handleKeyDown);
       
        
       
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


  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files[0]) {
        const reader = new FileReader();
        console.log(reader)
        reader.onload = (event) => {
            const data = event.target.result;
            fabric.Image.fromURL(data, (img) => {
                img.set({
                    left: 100,
                    top: 100,
                    scaleX: 0.5,
                    scaleY: 0.5,
                });
                canvasRef.current.fabric.add(img);
                canvasRef.current.fabric.sendToBack(img);
            });
        };
        reader.readAsDataURL(files[0]);
    }
};

const handleDragOver = (e) => {
    e.preventDefault();
};


  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
        const activeObject = canvasRef.current.fabric.getActiveObject();
        let styles = { fill: e.target.value };
        if (activeObject && activeObject.type === 'textbox') {
            const selectionStart = activeObject.selectionStart;
            const selectionEnd = activeObject.selectionEnd;

            activeObject.setSelectionStyles(styles, selectionStart, selectionEnd);
            canvasRef.current.fabric.renderAll();



        }
};
const handleTextBackgroundChange = (e) => {
  setSelectedColor(e.target.value);
        const activeObject = canvasRef.current.fabric.getActiveObject();
        let styles = { textBackgroundColor: e.target.value };
        if (activeObject && activeObject.type === 'textbox') {
            const selectionStart = activeObject.selectionStart;
            const selectionEnd = activeObject.selectionEnd;

            activeObject.setSelectionStyles(styles, selectionStart, selectionEnd);
            canvasRef.current.fabric.renderAll();



        }
}
 
  return (
    <>
        
    {display ? <div onDrop={handleDrop}
            onDragOver={handleDragOver} className='img-preview-container'>
      
      <canvas ref={canvasRef}></canvas>
      <Preview canvasRef={canvasRef}/>
      <strong>Text Color</strong>
      <input 
                type="color" 
                value={selectedColor} 
                onChange={handleColorChange} 
            />
            <strong>Text Background</strong>
            <input 
                type="color" 
                value={selectedColor} 
                onChange={handleTextBackgroundChange} 
            />


  </div>: <div className='img-preview-container' style={{display:"none"}}>
     
      <canvas ref={canvasRef}></canvas>
      <Preview canvasRef={canvasRef}/>


  </div>}
    
    </>
  )
}
