import React, { useState } from 'react'
import './App.css'
import UploadWidget from "./UploadWidget";




function App() {
    const [error, setError] = useState(null);
    const [imageUrl, setImageUrl] = useState();

    function toggleView() {
        setImageUrl(null)
    }
  return (
    <>
      <div className="card">
        {/* <button className='ui circular icon massive button'>
            <i className='camera icon'></i>
        </button> */}
        { !imageUrl &&
        <>
            <h2>Upload Camper Photo</h2>
            <UploadWidget onSetImageUrl={setImageUrl}/>
        </>
        } 
        {imageUrl && 
            <>
            <img className="ui centered image large" src={imageUrl} alt=""></img>
            <button onClick={toggleView} className='ui huge circular red button'>
                Upload Another Photo
            </button>
            </>
        }
        {error && 
        <p>{error}</p>}
        <p>
        </p>
      </div>
    </>
  )
}

export default App
