import React, { useState } from 'react'
import './App.css'
import UploadWidget from "./UploadWidget";
// import CamperTransForm from './CamperTransForm';
import option1 from './assets/card-test-frame.png'
import option2 from './assets/card-test-frame-b.png'
import option3 from './assets/card-test-frame-g.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, placeholder } from '@cloudinary/react';
import { source } from "@cloudinary/url-gen/actions/overlay";
import { set } from "@cloudinary/url-gen/actions/variable";
import { image, text } from "@cloudinary/url-gen/qualifiers/source";
import { Position } from "@cloudinary/url-gen/qualifiers/position";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
import { useFormik } from "formik";
import * as yup from "yup";


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

const formSchema = yup.object().shape({
    name: yup.string()
        .required("Camper's name is required"),
        age: yup.string()
        .required("Age is required"),
        hometown: yup.string()
        .required("Hometown is required"),
  })
  const formik = useFormik({
    enableReinitialize: true, 
      initialValues: {
        name:'',
        age:'',
        hometown: '',
      },
      validationSchema: formSchema,
    })

    const cld = new Cloudinary({
        cloud: {
        cloudName: 'ddp2xfpyb',
        },
    });

    const myImage = cld.image(imageUrl);
    myImage.addVariable(set("name", formik.values.name))
        .addVariable(set("color", "rgb:FFFFFF"))
        .addVariable(set("style", "Arial_120"))
        .overlay(
          source(text("  $(name)", "$style").textColor("$color")).position(
            new Position()
              .gravity(compass("south_west"))
              .offsetX(120)
              .offsetY(130)
          )
        );
    // console.log(formik.values.name)
    const url = 'https://api.cloudinary.com/v1_1/ddp2xfpyb/image/upload'
    const handleSubmitPhoto = () => {
        const formData = new FormData();
        formData.append('file', myImage.toURL());
        formData.append('upload_preset', 'camp-cards');
        fetch(url, {
          method: "POST",
          body: formData,
        }).then((response) => {
              setImageUrl(null);
              formik.resetForm();
              toast("Your Camper Card Has Been Submitted!");
            })
        }
      

  return (
    <>
    <ToastContainer/>
    <div className='ui container'>
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
                    <div className="ui text container">
                    <form className="ui form initial" onSubmit={formik.handleSubmit}>
                        <h4 style={{marginTop: "20px"}} className="ui horizontal divider">Camper Details</h4>
                        <div className="equal width fields">
                            <div className="field">
                                <label>Name</label>
                                <input type="text" name="name" value={formik.values.name} placeholder="Name..." onChange={formik.handleChange}></input>
                                {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.name}</p>}
                            </div>
                            <div className="field">
                                <label>Age</label>
                                <select className="ui selection dropdown"
                                    name="age"
                                    style={{padding: "5px"}}
                                    onChange={formik.handleChange}
                                    value={formik.values.age}>
                                    <option value="">--</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                </select>              
                                {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.age}</p>}
                            </div>
                        </div>
                        <div className='field'>
                            <label>Hometown</label>
                            <input type="text" name="hometown" value={formik.values.hometown} placeholder="Hometown..." onChange={formik.handleChange}></input>
                            {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.hometown}</p>}
                        </div>
                    </form> 
        </div>
                </div>
            </div>
        } 
        {imageUrl && 
            <div className="ui center aligned container" style={{minHeight:"100vh", marginTop: "50px"}}>
                <div className='ui centered padded segment'>
                    {/* <img className="ui centered image large" src={imageUrl} alt=""></img> */}
                    <AdvancedImage
                        cldImg={myImage}
                        style={{ maxWidth: '500px' }}
                        plugins={[placeholder()]}
                        className="rounded-lg shadow-lg"
                    />
                    <div className='ui center aligned grid'>
                        <button onClick={handleSubmitPhoto} className='ui huge circular green button'>
                            Submit Photo
                        </button>
                        <button onClick={toggleView} className='ui huge circular blue button'>
                            Upload Another Photo
                        </button>
                    </div>
                    {/* <CamperTransForm imageUrl={imageUrl} setImageUrl={setImageUrl}/> */}
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
