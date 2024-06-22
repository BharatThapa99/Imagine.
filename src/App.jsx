import { useState,useRef } from 'react'
import './App.css'
import GenerateForm from './components/GenerateForm'
import PreviewImage from './components/PreviewImage'
import OtherTemplates from './components/OtherTemplates'
import TemplateTwo from './components/TemplateTwo'
import TemplateOne from './components/TemplateOne'
import Preview from './components/Preview'
import temp1 from './assets/output_image.jpg'
import axios from 'axios'


function App() {

  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [url, setUrl] = useState('');
  const [metaData, setMetaData] = useState({ title: '', image: '' });


  const thumbnailHeight = 150;
  const thumbnailWidth = 150;
  const previewWidth = 400;
  const previewHeight = 500;

  const thumbnailMultiplier = thumbnailWidth / previewWidth;
  const [thumbnailImg, setThumbnailImg] = useState([])
  const inputRef = useRef(null);

  const handleFetchMeta = async () => {
  const url = inputRef.current.value;
    try {
      const response = await axios.get('http://localhost:5000/fetch-meta', {
        params: { url } });
        setMetaData(response.data);
        console.log(metaData)
    } catch (error) {
        console.error('Error fetching meta data', error);
    }
};
 

  return (
    <><div className="content">
      <div className="heading">
        <h1 className="title-text">
          Imagine.
        </h1>
        {/* <span className="info-text">
          You imagine, we create.
        </span> */}

      </div>

      <div className='url-input-form'>
        <input className='url-input' type="text" placeholder='Enter URL' required
                 ref={inputRef}/>
        <button className='url-sub-btn' onClick={handleFetchMeta}> Generate</button>
    </div>


      {/* <GenerateForm/> */}
      {/* <PreviewImage/> */}
      {/* <Preview/> */}
      <TemplateOne setThumbnailImg= {setThumbnailImg} articleImg={metaData.image_url} articleTitle={metaData.title}/>
      <TemplateTwo width={previewWidth} height={previewHeight} articleImg={metaData.image_url} articleTitle={metaData.title} setThumbnailImg= {setThumbnailImg}/>
      {console.log(thumbnailImg)}
  
  
      {/* <OtherTemplates/> */}


      <div className='other-templates-container'>
        <h2>Choose other templates</h2>
        <div className="img-container">

        

        <div className="img-div">
            <img className='temp-img' src={thumbnailImg[0]} alt="" />
        </div>
        <div className="img-div">
            <img className='temp-img' src={thumbnailImg[1]} alt="" />
        </div>
        {/* <div className="img-div">
            <img className='temp-img' src={temp1} alt="" />
        </div>
        <div className="img-div">
            <img className='temp-img' src={temp1} alt="" />
        </div>
        <div className="img-div">
            <img className='temp-img' src={temp1} alt="" />
        </div>
        <div className="img-div">
            <img className='temp-img' src={temp1} alt="" />
        </div>
        <div className="img-div">
            <img className='temp-img' src={temp1} alt="" />
        </div>
        <div className="img-div">
            <img className='temp-img' src={temp1} alt="" />
        </div>
        <div className="img-div">
            <img className='temp-img' src={temp1} alt="" />
        </div> */}

        </div>
        
    </div>

      </div>
    </>
  )
}

export default App
