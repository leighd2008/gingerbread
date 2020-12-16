// built using tutorial https://dev.to/willamesoares/how-to-build-an-image-carousel-with-react--24na

import React, { Component } from 'react';
import ImageSlide from '../imageSlide/imageSlide';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCategoryData } from "../../redux/pictures/pictures.selectors";
import Arrow from '../arrow/arrow';

import './carousel.scss'

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImageIndex: 0,
      // intervalId: ''
    };
    // this.setNextImage = this.setNextImage.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.previousSlilde = this.previousSlilde.bind(this);
  }

  previousSlilde() {
    const lastIndex = this.props.imgUrls.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === 0;
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;

    this.setState({
      currentImageIndex: index
    });
  }

  nextSlide() {
    const lastIndex = this.props.imgUrls.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentImageIndex + 1;

    this.setState({
      currentImageIndex: index
    });
  }
// for Autoplay
  // componentDidMount() {
  //   var intervalId = setInterval(this.setNextImage, 5000);
  //   this.setState({ intervalId: intervalId });
  // }

  // componentWillUnmount() {
  //   clearInterval(this.state.intervalId);
  // }

  // setNextImage() {
  //   const lastIndex = this.props.imgUrls.length - 1;
  //   const { currentImageIndex } = this.state;
  //   const shouldResetIndex = currentImageIndex === lastIndex;
  //   const index = shouldResetIndex ? 0 : currentImageIndex + 1;

  //   this.setState({
  //     currentImageIndex: index
  //   });
  // }

  render() {
    const { imgUrls } = this.props;

    return (
      <div className="carousel">
        <Arrow
          direction="left"
          clickFunction={this.previousSlilde}
          glyph="&#9664;" />
        
        {
          imgUrls.length ? 
            <ImageSlide url={imgUrls[this.state.currentImageIndex].imgUrl.imgUrl} names={imgUrls[this.state.currentImageIndex].imgUrl.names} /> :
            null
        }

        <Arrow
          direction="right"
          clickFunction={this.nextSlide}
          glyph="&#9654;" />
        
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  categoryData: selectCategoryData
})

export default connect(mapStateToProps)(Carousel);
