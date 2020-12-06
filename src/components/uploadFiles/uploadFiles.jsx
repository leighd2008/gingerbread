import React, { useState, useRef } from 'react';
import { storage } from "../../firebase/firebase.utils";
import { firestore } from "../../firebase/firebase.utils";
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { selectCategoryData } from "../../redux/pictures/pictures.selectors";
import FormInput from '../form-input/form-input'

import "./uploadFiles.scss";

const UploadFiles = ({categoryData, pictureIndex, category}) => {
  const [imageAsFile, setImageAsFile] = useState(null);
  const [imageAsUrl, setImageAsUrl] = useState("");
  const [names, setNames] = useState("");
  const imageInputRef = useRef();

  const handleImageAsFile = (e) => {
    setImageAsFile(e.target.files[0]);
  }

  const handleChange = event => {
    let { value } = event.target;
    setNames(value);
  };

  const updateCategoryData = (imageAsUrl) => {
    const images = categoryData[category].images;
    console.log(images)
    console.log(pictureIndex)
    const categoryId = categoryData[category].id;
    images[pictureIndex] = ({'imgUrl':imageAsUrl, "names":names});
    firestore.collection('pictures').doc(categoryId).update({
      images: images,
    })
    setNames("");
    imageInputRef.current.value = "";
  }

  const handleFireBaseUpload = (e) => {
    e.preventDefault()
    const uploadTask = storage.ref(`/${category}/${imageAsFile.name}`).put(imageAsFile);
   
    uploadTask.on('state_changed',
      () => {
        storage
          .ref(`${category}`)
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((imageAsUrl) => {
            setImageAsFile(null);
            setImageAsUrl(imageAsUrl)
            updateCategoryData(imageAsUrl)
          })
      });
    
  }


  return (
    <div className="uploadFiles">
      <form className='upload' onSubmit={handleFireBaseUpload}>
        <div className='fileInput'>
          <input
            type="file" 
            onChange={handleImageAsFile}
            ref={imageInputRef}
          />
          <button className='uploadFirebase' disabled={!imageAsFile}>Upload Photo </button>
        </div>
        <FormInput
          type="text"
          name="displayName"
          value={names}
          onChange={handleChange}
          label="Who is in This Picture?"
          required
        />
      </form>
      
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  categoryData: selectCategoryData
})

export default connect(mapStateToProps)(UploadFiles);
