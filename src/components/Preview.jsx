import React, { useRef } from 'react';
import { fabric } from 'fabric';

function Preview({ canvasRef }) {
  const finalWidth = 1080;
  const finalHeight = 1360;
  const multiplier = finalWidth / 400; // Assuming previewWidth is 400

  const exportHighResImage = () => {
    const canvas = canvasRef.current.fabric; // Correctly reference the fabric canvas instance

    // Ensure the canvas is rendered with the latest changes
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
    <div>
      <button onClick={exportHighResImage}>Download High-Res Image</button>
    </div>
  );
}

export default Preview;
