import React, { Component } from 'react';
import ImageSlide from '../imageSlide/imageSlide';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCategoryData } from "../../redux/pictures/pictures.selectors";

import './carousel.scss'

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImageIndex: 0,
      intervalId: ''
    };
    this.setNextImage = this.setNextImage.bind(this);
  }

  componentDidMount() {
    var intervalId = setInterval(this.setNextImage, 3000);
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  setNextImage() {
    const lastIndex = this.props.imgUrls.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentImageIndex + 1;

    this.setState({
      currentImageIndex: index
    });
  }

  render() {
    const { imgUrls } = this.props;

    return (
      <div className="carousel">
        <ImageSlide url={imgUrls[this.state.currentImageIndex].imgUrl.imgUrl} names={imgUrls[this.state.currentImageIndex].imgUrl.names} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  categoryData: selectCategoryData
})

export default connect(mapStateToProps)(Carousel);
