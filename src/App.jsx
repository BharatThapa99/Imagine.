import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GenerateForm from './components/GenerateForm'
import PreviewImage from './components/PreviewImage'
import OtherTemplates from './components/OtherTemplates'
import TemplateTwo from './components/TemplateTwo'

function App() {

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

      <GenerateForm/>
      {/* <PreviewImage/> */}
      <TemplateTwo/>
      <OtherTemplates/>

      </div>
    </>
  )
}

export default App
