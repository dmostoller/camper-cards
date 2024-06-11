import React, {useState} from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function CamperForm ({imageUrl, setImageUrl}) {
    const [error, setError] = useState(null);
    // console.log(imageUrl)
    const formSchema = yup.object().shape({
        first_name: yup.string()
            .required("First name is required")
            .min(2, 'First name must be more than two characters'),
        last_name: yup.string()
            .required("Last name is required")
            .min(2, 'Last name must be more than two characters'),
        nickname: yup.string()
            .required("Desired name is required"),
        age: yup.string()
            .required("Age is required"),
        image_url: yup.string().required("Must add an image link"),
      })

    const formik = useFormik({
      enableReinitialize: true, 
        initialValues: {
          first_name:'',
          last_name:'',
          nickname:'',
          age: '',
          image_url:`${imageUrl}`,
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
          fetch("http://127.0.0.1:5555/campers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }).then((res) => {
            if(res.ok) {
              res.json().then(camper => {
                setImageUrl(null);
                toast("Your Camper Card Has Been Submitted!");
            })
            } else {
                res.json().then(error => setError(error.message))
            }
          })
        },
      })


    return (
        <>
         {error && <h2 style={{color:'red', textAlign:'center'}}> {error} </h2>}
        <div className="ui text container">
            <form className="ui form initial" onSubmit={formik.handleSubmit}>
            <h4 style={{marginTop: "20px"}} className="ui horizontal divider">Camper Details</h4>
                <div className="equal width fields">
                    <div className="field">
                        <label>First Name</label>
                        <input type="text" name="first_name" value={formik.values.first_name} placeholder="First name..." onChange={formik.handleChange}></input>
                        {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.first_name}</p>}
                    </div>
                    <div className="field">
                        <label>Last Name</label>
                        <input type="text" name="last_name" value={formik.values.last_name} placeholder="Last name..." onChange={formik.handleChange}></input>
                        {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.last_name}</p>}
                    </div>
                </div>
                <div className="equal width fields">
                    <div className="field">
                        <label>Desired Name / Nickname</label>
                        <input type="text" name="nickname" value={formik.values.nickname} placeholder="Desired Name..." onChange={formik.handleChange}></input>
                        {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.nickname}</p>}
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

export default CamperForm