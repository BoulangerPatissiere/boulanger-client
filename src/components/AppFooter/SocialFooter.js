import * as React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import PlaceIcon from '@mui/icons-material/Place';
import './SocialFooter.css';

function SocialFooter() {
  return (
    <footer className='social-footer'>
      <div className='address-block'>
        <PlaceIcon className='social-footer-link-icon' />
        Ľ. Fullu 5245/62, Bratislava
      </div>

      <a
        className='social-footer-link'
        href='https://instagram.com/boulanger_patissiere'
        target='_blank'
        rel='noreferrer'
      >
        <InstagramIcon className='social-footer-link-icon' /> Instagram
      </a>

      <a
        className='social-footer-link'
        href='https://m.facebook.com/boulanger.patissiere/'
        target='_blank'
        rel='noreferrer'
      >
        <FacebookIcon className='social-footer-link-icon' /> Facebook
      </a>
      <a
        href='tel:+421-940-050-801'
        style={{ whiteSpace: 'nowrap' }}
        className='social-footer-link'
      >
        <PhoneIcon className='social-footer-link-icon' /> +421 940 050 801
      </a>
      <a
        className='social-footer-link'
        href='mailto:boulangerpatissiere@gmail.com?subject=Boulanger%20Order'
        target='_blank'
        rel='noreferrer'
      >
        <EmailIcon className='social-footer-link-icon' />{' '}
        boulangerpatissiere@gmail.com
      </a>
    </footer>
  );
}

export default SocialFooter;
