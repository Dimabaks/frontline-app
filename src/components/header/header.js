import React, { useEffect, useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Header = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.pageYOffset;
    const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 20;

    setVisible(isVisible);
    setPrevScrollPos(currentScrollPos);
  }, [prevScrollPos]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <header className={visible ? 'header-visible' : 'header-hidden'}>
      <div className='header-content'>
        <NavLink to="/" className='logo-link'>
          <img src='/logo.jpg' alt='Logo' className='logoImage' />
          <div className='logoBlock'>
            <h1 className='logoname'> FRONTLINE VR</h1>
          </div>
        </NavLink>
        <div className='infoBlock'>
          <NavLink 
            to="/prices" 
            className={({ isActive }) => isActive ? 'header-link active-link' : 'header-link'}
          >
            <h1 className='price'> Цены </h1>
          </NavLink>
          <NavLink 
            to="/promotions" 
            className={({ isActive }) => isActive ? 'header-link active-link' : 'header-link'}
          >
            <h1 className='actsii'> Акции </h1>
          </NavLink>
          <NavLink 
            to="/games" 
            className={({ isActive }) => isActive ? 'header-link active-link' : 'header-link'}
          >
            <h1 className='game'> Наши игры </h1>
          </NavLink>
        </div>
        <div className='socialNet'>
          <a href='https://www.instagram.com/frontline.vr/' className='social-link'>
            <InstagramIcon className='instagram' style={{ fontSize: '2rem' }}/>
          </a>
          <a href='https://www.facebook.com/FrontlineVR/' className='social-link'>
            <FacebookIcon className='facebook' style={{ fontSize: '2rem' }}/>
          </a>
          <a href='https://www.tiktok.com/@frontline.vr' className='social-link'>
            <YouTubeIcon className='tiktok' style={{ fontSize: '2rem' }}/>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
