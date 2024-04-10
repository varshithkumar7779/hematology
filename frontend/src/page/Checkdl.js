import React, { useState } from 'react';
import axios from 'axios';

const Checkdl = () => {
    const [image,setImage] = useState();
    const [Dl_res,setDl_res] = useState();
    const [Display_Image, setDisplay_Image] = useState(null);

    const onImageChange=(event)=>{
        if(event.target.files && event.target.files[0]){
          setDisplay_Image(URL.createObjectURL(event.target.files[0]));
        }
       }
      const ondlinputchange=(e)=>{
         console.log(e.target.files[0]);
         setImage(e.target.files[0]);
      }
      const submitImage=async(e)=>{
        e.preventDefault();
  
        const formData=new FormData();
        formData.append("image",image);
  
      try{
          await axios.post("http://localhost:8000/upload-image",
          formData,{
            headers:{"content-Type":"multipart/form-data"},
          }
        )
        .then((res) => {
          alert("data recieved");
          console.log(res.data["output"]["output"]);
          setDl_res(res.data["output"]["output"]);
        })
      .catch((error) => {
        alert("Error printing image", error);
        console.log(error);
      });
      }
      catch(error){
        alert("Error sending image", error);
        console.log(error);
      }
    }
  return (
        <>
        <div>Image prediction with dl</div>
        <div className='dl'>
          <form onSubmit={submitImage} className='dl_1'>
            <input type='file'
            className='file'
            accept='image/*'
            onChange={(event) => {
              ondlinputchange(event);
              onImageChange(event);
            }}
            ></input>
            <button type='submit' className='btn_2'>Submit</button>
          </form>
        </div>
        <div className='img'>
            <p>Result from Python script: {Dl_res}</p>
            <p>Image:</p>
            <img alt="preview" src={Display_Image}/>
        </div>
        </>
  )
}

export default Checkdl
