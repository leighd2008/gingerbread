import React from 'react';

import './imageSlide.scss';

const ImageSlide = ({ url, names }) => {
  const styles = {
    backgroundImage: `url(${url})`,
    
  };

  return (
    <div className='slide'>
      <div className="image-slide" style={styles}></div>
      <h2 className='image-names'>{`${names}`}</h2>
    </div>
  );
}

export default ImageSlide;