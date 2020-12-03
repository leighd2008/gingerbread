import React from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import Background from '../../assets/gareth-harper-dABKxsPTAEk-unsplash.jpg';
import Wallpaper from '../../assets/4605135.jpg';
import UploadFiles from '../../components/uploadFiles/uploadFiles';
import { selectCategoryData } from "../../redux/pictures/pictures.selectors";
import Carousel from '../../components/carousel/carousel'


import "./homePage.scss";

const HomePage = (categoryData, progressPics) => {
  console.log(categoryData)
  const imgUrls = []
  const categoryDataArray = Object.entries(categoryData);
  console.log(categoryDataArray)
  console.log(categoryDataArray[0][1].progressPics.images);
  categoryDataArray[0][1].progressPics.images.map((pic, i) => {
    return (imgUrls.push(pic.imgUrl))
  })
  console.log(imgUrls);
  // // const categoryDataArray = Object.entries(categoryData);
  // console.log(categoryData)
  
  
  return (
    <div className="homepage" style={{ backgroundImage: `url(${Wallpaper})` }}>
      <h1>1st Annual DiBattiste Family Gingerbread House Event</h1>
      <div className='nativity' style={{ backgroundImage: `url(${Background})` }}>
      </div>
      <div className='inprogress'>
        <h1>Show us how much fun you are having!</h1>
        <UploadFiles progressPics={progressPics} />
        <Carousel imgUrls={imgUrls}/>
      </div>
      <div className='final'>
        <h1>Finished Product</h1>
        {/* <UploadFiles /> */}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  categoryData: selectCategoryData
})

export default connect(mapStateToProps)(HomePage);
// export default HomePage;
