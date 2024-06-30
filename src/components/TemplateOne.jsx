import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import Preview from './Preview';
import 'fabric-history';
import fontUrl from '../assets/Staatliches-Regular.ttf'


export default function TemplateOne({setThumbnailImg, articleImg, articleTitle, display}) {

  console.log(display);


const canvasRef = useRef(null);
  const previewWidth = 400;
  const previewHeight = 500;

  const [selectedTextColor, setSelectedTextColor] = useState('#000000');
  const [selectedTextBGColor, setSelectedTextBGColor] = useState('#000000');
  const [isFontLoaded, setIsFontLoaded] = useState(false)
  
  useEffect(() => {
    // Preload the custom font
    const font = new FontFace('Staatliches', `url(${fontUrl})`);
    font.load().then(() => {
        document.fonts.add(font);
        console.log('Font loaded');
        setIsFontLoaded(true); // Update the loading state
    }).catch(err => {
        console.error('Failed to load font', err);
    });
}, []);
  

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
  }, [isFontLoaded]);

  
  useEffect(() => {
    if (isFontLoaded) {
    const canvas = canvasRef.current.fabric;
    
    canvas.clear();
    canvas.setBackgroundColor('black');
    // let imageURL = 'https://statico.sportskeeda.com/editor/2024/06/5f2e4-17186252493345-1920.jpg'
    
    // if (imageUrl) {
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
  
    };
  
    document.addEventListener('keydown', handleKeyDown);

  } //if isfontlaoded bracket
    

      // return () => {
      //   canvas.dispose();
      // };

      },[isFontLoaded, articleImg,articleTitle]);

     

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
                });
            };
            reader.readAsDataURL(files[0]);
        }
    };
    
    const handleDragOver = (e) => {
        e.preventDefault();
    };


    const handleColorChange = (e) => {
      setSelectedTextColor(e.target.value);
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
    setSelectedTextBGColor(e.target.value);
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
        
        {display ? 
        
        
        <div  onDrop={handleDrop}
            onDragOver={handleDragOver} className='img-preview-container'>
        <div className="layers-panel">
          <span>Layers</span>
        </div>
              <div className="preview">
              
          
                <canvas ref={canvasRef}></canvas>
                <Preview canvasRef={canvasRef}/>
              </div>

              <div className="properties-panel">
                <div className="prop-nav">
                  <span className="prop-text">Text</span>
                  <span className="prop-image">Coming soon</span>
                </div>
                <div className="prop-value">
                  <div>
                <span>Color: </span>
      <input 
                type="color" 
                value={selectedTextColor} 
                onChange={handleColorChange} 
            />
            <span>Background: </span>
            <input 
                type="color" 
                value={selectedTextBGColor} 
                onChange={handleTextBackgroundChange} 
                
            />
            </div>
            <br/>
            <div>
            <span>Font: </span>
            <span>Font Size: </span>
            </div>
                </div>

                
              
              </div>
          
          

  
  
      </div>: <div  className='img-preview-container' style={{display:"none"}}>
        {/* the html structure must be same as above therefore empty div */}
        <div > 

        </div>
        <div className="preview">

          
          <canvas ref={canvasRef}></canvas>

        </div>
  
  
      </div>}
        
        </>
        
      )



}