import React from 'react';
//import './App.css';
import {useCallback, useState, useEffect} from "react";
import {useDropzone} from "react-dropzone";
import axios from "axios";
import '../UploadCss.css';





function UploadScreen() {

    const [images, setImages] =useState([])

    function handleUpload () {
        console.log("Uploading files...")
        axios.post(`${process.env.REACT_APP_BACKEND}/product/addProduct`, {images}) // Our backend is on port 3003 
        .then
        (response =>{ console.log(response.data)
            
        })
        .catch(error =>(error.message))
    } 
         

    const  onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach(file => {
        const reader = new FileReader()
        reader.onload = () => {

        setImages(prevState => [...prevState, reader.result])
        }
        reader.readAsDataURL(file)
        

    })
    
    console.log("acceptedFiles", acceptedFiles)
    console.log("rejectedFiles", rejectedFiles)
    
    }, []) 

    useEffect(() =>{
        console.log(images)
        


    },[images])


    const{getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: "image/png", }) // Return 3 properties all functions, isDragActive if else 

    console.log(getInputProps(), getRootProps())

  return ( // Defined div with className "dropzone" for later styling
    
    <div className="Uploadwrapper">
       
        <img className='Polaroid' src='../Polaroid.png'></img>
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()}/>
            {isDragActive ? "Drag Active":"Drag and drop your files here"} 
        
        </div>

        <div className='upload-btn-wrapper'>
            {images.length > 0 && <button className='UploadButton' onClick={handleUpload}>Upload image</button> }
        </div>
        
    <div className='UserUploadPhotosFrame'>    
        {images.length > 0 && <div>
            {images.map((image, index) => (
            <div class="polaroidUpload">
                
            <img className='selected-images' src={image} key={index}/>
            <div class="containerUpload">
            <p>Upload to Capture Beauty</p>
            </div>

            
                </div> ))}
            </div>
            }
    </div>        
        
    
    
    </div>
  );
}

export default UploadScreen;
