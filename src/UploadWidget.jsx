import React, { useEffect, useRef } from "react";

function UploadWidget({onSetImageUrl}) {

    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'ddp2xfpyb',
            uploadPreset: 'campercard-demo',
            multiple: false,  //restrict upload to a single file
            // sources: [ "local", "url"], // restrict the upload sources to URL and local files
        }, function(error, result) { 
            if (error) {
                // console.log(error)
            }
            if (!error && result && result.event === "success") {
                // console.log(result.info);
                onSetImageUrl(result.info.secure_url);
    }});
    }, [onSetImageUrl])

return (
    <>
    <button type="button" className="ui circular icon blue massive button " onClick={() => widgetRef.current.open()}>
        <i className='camera icon'></i>
    </button>
    </>
)

}
export default UploadWidget;