import React from 'react'

export default function GenerateForm() {
  return (
    <div className='url-input-form'>
        <input className='url-input' type="text" placeholder='Enter URL' required />
        <button className='url-sub-btn'>Generate</button>
    </div>
  )
}
