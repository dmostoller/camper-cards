import React, { useState } from 'react'
import './App.css'
import UploadWidget from "./UploadWidget";




function App() {
    const [error, setError] = useState(null);
    const [imageUrl, setImageUrl] = useState();
  return (
    <>
      <h1>Upload Camper Photo</h1>
      <div className="card">
        {/* <button className='ui circular icon massive button'>
            <i className='camera icon'></i>
        </button> */}
        <UploadWidget onSetImageUrl={setImageUrl}/>
        {imageUrl && 
            <img className="ui centered image large" src={imageUrl} alt=""></img>
        }
        {error && 
        <p>{error}</p>}
        <p>
          Select Template then Upload camper photo with the button above
        </p>
      </div>
    </>
  )
}

export default App
