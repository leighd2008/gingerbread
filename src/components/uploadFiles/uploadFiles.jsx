import React, { useState } from 'react';
import { storage } from "../../firebase/firebase.utils";
import { firestore } from "../../firebase/firebase.utils";
import FormInput from '../form-input/form-input'
// import { connect } from 'react-redux';
// import { createStructuredSelector } from "reselect";


import "./uploadFiles.scss";

const UploadFiles = (/* { category } */) => {
  let category = 'progressPics'
  
  const [imageAsFile, setImageAsFile] = useState(null);
  const [imageAsUrl, setImageAsUrl] = useState("");
  const [names, setNames] = useState("");

  const handleImageAsFile = (e) => {
    setImageAsFile(e.target.files[0]);
  }

  // const handleChange = event => {
  //   const { value } = event.target;
  //   setNames(value);
  // };

  const handleFireBaseUpload = (e) => {
    e.preventDefault()
    const uploadTask = storage.ref(`/${category}/${imageAsFile.name}`).put(imageAsFile);
    firestore.collection(`${category}`).add({ imageAsUrl: "" })
    firestore.collection(`${category}`).get({
      imageAsUrl
    })
    console.log(imageAsUrl)
    uploadTask.on('state_changed',
      () => {
        storage
          .ref(`${category}`)
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((fireBaseUrl)  => {
            setImageAsFile(null);
            setImageAsUrl(fireBaseUrl)
            console.log(fireBaseUrl)
          })
      })
    console.log('outside', imageAsUrl)
    firestore.collection(`${category}`).add({
      imageAsUrl
    })
    //   .then(() => {
    //   setImageAsUrl('')
    // })
  }


  return (
    <div className="uploadFiles">
      <form className='upload' onSubmit={handleFireBaseUpload}>
        <div className='fileInput'>
          <input
            type="file" 
            onChange={handleImageAsFile}
          />
          <button className='uploadFirebase' disabled={!imageAsFile}>Upload Photo </button>
        </div>
        {/* <FormInput
          type="text"
          name="displayName"
          value={names}
          onChange={handleChange}
          label="Who is in This Picture?"
          required
        /> */}
      </form>
      
    </div>
  );
} 

export default UploadFiles;