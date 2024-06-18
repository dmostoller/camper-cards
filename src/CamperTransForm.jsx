import React, {useState} from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cloudinary } from '@cloudinary/url-gen';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { AdvancedImage, placeholder } from '@cloudinary/react';
import { scale } from "@cloudinary/url-gen/actions/resize";
import { source } from "@cloudinary/url-gen/actions/overlay";
import { set } from "@cloudinary/url-gen/actions/variable";
import { image, text } from "@cloudinary/url-gen/qualifiers/source";
import { Position } from "@cloudinary/url-gen/qualifiers/position";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";

function CamperTransForm ({imageUrl, setImageUrl}) {
    const [error, setError] = useState(null);
    // console.log(imageUrl)


    const cld = new Cloudinary({
        cloud: {
          cloudName: 'ddp2xfpyb',
        },
      });

    const myImage = cld.image(imageUrl);

    const formSchema = yup.object().shape({
        name: yup.string()
            .required("Camper's name is required"),
        age: yup.string()
            .required("Age is required"),
      })

    const formik = useFormik({
      enableReinitialize: true, 
        initialValues: {
          name:'',
          age: '',
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
        myImage.addVariable(set("name", values.name))
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
        // setImageUrl("")
        },
      })


    return (
        <>
         {error && <h2 style={{color:'red', textAlign:'center'}}> {error} </h2>}
         <div className="ui container">
         <AdvancedImage
            cldImg={myImage}
            style={{ maxWidth: '500px' }}
            plugins={[placeholder()]}
            className="rounded-lg shadow-lg"
         />
         </div>
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
                <div className="field">
                    <button className="ui circular fluid button large green" type="submit">Submit</button>
                    <input type="text" style={{visibility: "hidden"}} name="image_url" value={formik.values.image_url} placeholder="Image link..." onChange={formik.handleChange}></input>               
                </div>
            </form> 
        </div>
        </>
    )
}

export default CamperTransForm