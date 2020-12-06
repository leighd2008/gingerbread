import React from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import Background from '../../assets/gareth-harper-dABKxsPTAEk-unsplash.jpg';
import Wallpaper from '../../assets/4605135.jpg';
import UploadFiles from '../../components/uploadFiles/uploadFiles';
import { selectCategoryData } from "../../redux/pictures/pictures.selectors";
import Carousel from '../../components/carousel/carousel'


import "./homePage.scss";

const HomePage = (categoryData/* , progressPics */) => {
  const progressPics = [];
  const finalPics = [];
  const categoryDataArray = Object.entries(categoryData);
  if (categoryDataArray[0][1].progressPics.images) {
    categoryDataArray[0][1].progressPics.images.map((pic, i) => {
      progressPics.push({ 'imgUrl': pic })
      return (progressPics)
    });
  }else {
      return progressPics
    }
  
  if (categoryDataArray[0][1].finalPics.images) {
    categoryDataArray[0][1].finalPics.images.map((pic, i) => {
      finalPics.push({ 'imgUrl': pic })
      return (finalPics)
    });
  } else {
      return finalPics
    }
  return (
    <div className="homepage" style={{ backgroundImage: `url(${Wallpaper})` }}>
      <h1>1st Annual DiBattiste Family Gingerbread House Event</h1>
      <div className='nativity' style={{ backgroundImage: `url(${Background})` }}>
      </div>
      <div className='inprogress'>
        <h1>Show us how much fun you are having!</h1>
        <UploadFiles category='progressPics' pictureIndex={progressPics.length}/>
        <Carousel imgUrls={progressPics}/>
      </div>
      <div className='final'>
        <h1>Finished Product</h1>
        <UploadFiles category='finalPics' pictureIndex={finalPics.length}/>
        <Carousel imgUrls={finalPics} />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  categoryData: selectCategoryData
})

export default connect(mapStateToProps)(HomePage);
