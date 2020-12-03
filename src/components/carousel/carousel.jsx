import React, { Component } from 'react';
import ImageSlide from '../imageSlide/imageSlide';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCategoryData } from "../../redux/pictures/pictures.selectors";

import './carousel.scss'

// const images = require.context("../../assets/Homeruns", true);


const imgUrls = []




class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImageIndex: 0,
      intervalId: ''
    };
    this.setNextImage = this.setNextImage.bind(this);
  }

  // componentDidUpdate() {
  //   setInterval(() => { this.setNextImage(); }, 3000);
  // }

  componentDidMount() {
    var intervalId = setInterval(this.setNextImage, 3000);
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  setNextImage() {
    const lastIndex = imgUrls.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentImageIndex + 1;

    this.setState({
      currentImageIndex: index
    });
  }

  render() {
    const { categoryData } = this.props;
    
    const categoryDataArray = Object.entries(categoryData);
    categoryDataArray[0][1].images.map((pic, i) => {
      return (imgUrls.push(pic.imgUrl))
    })
    
    return (
      <div className="carousel">
        <ImageSlide url={imgUrls[this.state.currentImageIndex]} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  categoryData: selectCategoryData
})

export default connect(mapStateToProps)(Carousel);
