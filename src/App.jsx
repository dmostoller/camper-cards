import React, { useState } from 'react'
import './App.css'
import UploadWidget from "./UploadWidget";
import CamperForm from './CamperForm';
import option1 from './assets/card-test-frame.png'
import option2 from './assets/card-test-frame-b.png'
import option3 from './assets/card-test-frame-g.png'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
    const [error, setError] = useState(null);
    const [imageUrl, setImageUrl] = useState();
    const [optionOne, setOptionOne] = useState(false);
    const [optionTwo, setOptionTwo] = useState(false);
    const [optionThree, setOptionThree] = useState(false);


    function toggleView() {
        setImageUrl(null)
    }

function selectOptionOne() {
    setOptionOne((prevValue) => !prevValue)
    setOptionTwo((prevValue) => false)
    setOptionThree((prevValue) => false)

}
function selectOptionTwo() {
    setOptionTwo((prevValue) => !prevValue)
    setOptionOne((prevValue) => false)
    setOptionThree((prevValue) => false)

}
function selectOptionThree() {
    setOptionThree((prevValue) => !prevValue)
    setOptionOne((prevValue) => false)
    setOptionTwo((prevValue) => false)

}

  return (
    <>
    <ToastContainer/>
    <div className='ui container'>
        Welcome to Camp ....!
        { !imageUrl &&
            <div className="ui middle aligned center aligned grid" style={{minHeight:"100vh"}}>
                <div className="column">
                    <div className="ui three cards">
                    { optionOne ?
                        <a className='ui red card' onClick={selectOptionOne}>
                            <div className='image'>
                                <img src={option1} alt='option 1'></img>
                            </div>
                            <div className='content'>
                                <div className='header'>Option 1</div>
                            </div>
                        </a>
                    :
                        <a className='ui card' onClick={selectOptionOne}>
                            <div className='image'>
                                <img src={option1} alt='option 1'></img>
                            </div>
                            <div className='content'>
                                <div className='header'>Option 1</div>
                            </div>
                        </a>
                    }
                    { optionTwo ?
                        <a className='ui red card' onClick={selectOptionTwo}>
                            <div className='image'>
                                <img src={option2} alt='option 2'></img>
                            </div>
                            <div className='content'>
                                <div className='header'>Option 2</div>
                            </div>
                        </a>
                        :
                        <a className='ui card' onClick={selectOptionTwo}>
                            <div className='image'>
                                <img src={option2} alt='option 2'></img>
                            </div>
                            <div className='content'>
                                <div className='header'>Option 2</div>
                            </div>
                        </a>
                        } 
                        { optionThree ?
                        <a className='ui red card' onClick={selectOptionThree}>
                            <div className='image'>
                                <img src={option3} alt='option 3'></img>
                            </div>
                            <div className='content'>
                                <div className='header'>Option 3</div>
                            </div>
                        </a>
                        :
                        <a className='ui card' onClick={selectOptionThree}>
                            <div className='image'>
                                <img src={option3} alt='option 3'></img>
                            </div>
                            <div className='content'>
                                <div className='header'>Option 3</div>
                            </div>
                        </a>
                        } 

                    </div>
                    <h2>Upload Camper Photo</h2>
                    <UploadWidget onSetImageUrl={setImageUrl}/>
                </div>
            </div>
        } 
        {imageUrl && 
            <div className="ui center aligned grid" style={{minHeight:"100vh", marginTop: "230px"}}>
                <div className='ui segment'>
                <button onClick={toggleView} className='ui huge circular blue button'>
                    Upload Another Photo
                </button>
                <img className="ui centered image large" src={imageUrl} alt=""></img>
                    <CamperForm imageUrl={imageUrl} setImageUrl={setImageUrl}/>
                </div>
            </div>
        }
        {error && 
        <p>{error}</p>}
      </div>

    </>
  )
}

export default App
