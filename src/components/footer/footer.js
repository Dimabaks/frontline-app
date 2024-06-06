import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <div className='footer-content'>
      <div className='footer-main'>
        <h1 className='footer-text'>Frontline VR</h1>
      </div>
      <iframe
        className='footer-map'
        src="https://www.google.com/maps/embed/v1/place?q=47.01466127123995, 28.855829557671285&key=AIzaSyC37Gs-P7QZlJfHzs8OZn-Unx7LhP2ZPRk"
        allowFullScreen=""
        loading="lazy"
      ></iframe>
      <div className='rights'>2024@ Все права защищены.</div>
    </div>
  );
};

export default Footer;
