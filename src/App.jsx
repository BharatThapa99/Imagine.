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

  const [title, setTitle] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [url, setUrl] = useState('');
  const [metaData, setMetaData] = useState({ title: '', image: '' });


  const thumbnailHeight = 150;
  const thumbnailWidth = 150;
  const previewWidth = 400;
  const previewHeight = 500;

  const thumbnailMultiplier = thumbnailWidth / previewWidth;
  const [thumbnailImg, setThumbnailImg] = useState([])
  const [previewImgNum, setPreviewImgNum] = useState(1)
  const inputRef = useRef(null);

  function handleThumbnailClick(imgNum) {
    setPreviewImgNum(imgNum);
  }
  const handleFetchMeta = async () => {
  let url = inputRef.current.value;
  url = url.split('?')[0];
  console.log(url)
    try {
      const response = await axios.get('https://sports619.com/flask_app/fetch-meta', {
        params: { url } });
        setMetaData(response.data);
        setTitle(true);
        console.log(metaData)
    } catch (error) {
        console.error('Error fetching meta data', error);
    }
};
 console.log(thumbnailImg);

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
      
      {metaData.image_url &&  <>
      {console.log(previewImgNum)}
      {console.log("inside metadata.image_url")}
      {previewImgNum-1==0 ? <TemplateOne setThumbnailImg= {setThumbnailImg} articleImg={metaData.image_url} articleTitle={metaData.title} display={true}/>
       :
       <TemplateOne setThumbnailImg= {setThumbnailImg} articleImg={metaData.image_url} articleTitle={metaData.title} display={false}/>
      }
      {previewImgNum-2==0 ? 
      <TemplateTwo articleImg={metaData.image_url} articleTitle={metaData.title} setThumbnailImg= {setThumbnailImg} display={true}/>
      :
      <TemplateTwo articleImg={metaData.image_url} articleTitle={metaData.title} setThumbnailImg= {setThumbnailImg} display={false}/>

    }
      </>}
      {/* {metaData.image_url &&  <>
      <TemplateOne setThumbnailImg= {setThumbnailImg} articleImg={metaData.image_url} articleTitle={metaData.title} display={true}/>
      
      <TemplateTwo width={previewWidth} height={previewHeight} articleImg={metaData.image_url} articleTitle={metaData.title} setThumbnailImg= {setThumbnailImg} display={true}/>
      </>} */}
     
  
  
      {/* <OtherTemplates/> */}
      

      {thumbnailImg[0] && <>
      <div className='other-templates-container'>
      <h2>Choose other templates</h2>
        
        <div className="img-container">
        

        
        
        <div className="img-div">
            <img className='temp-img' src={thumbnailImg[0]} alt="" onClick={() => handleThumbnailClick(1)} />
            <span className='sub-title'>Default</span>
        </div>
        <div className="img-div">
            <img className='temp-img' src={thumbnailImg[1]} alt="" onClick={() => handleThumbnailClick(2)}/>
            <span className="sub-title">Unilad</span>
        </div>
      
        

        </div>
        
    </div></>
    }

      </div>

      {/* properties panel */}
    </>
  )
}

export default App
