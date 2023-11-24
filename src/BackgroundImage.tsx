import React from 'react';
import './BackgroundImage.css'; // Assuming you have a separate CSS file for styles

const BackgroundImage = ({ imageUrl, alt }: {imageUrl: string, alt: string}) => {
  return (
    <div className="background-container">
      <div className="image-wrapper">
        <img src={imageUrl} alt={alt} className="background-image" />
        <div className="image-overlay"></div>
      </div>
    </div>
  );
};


export default BackgroundImage;
