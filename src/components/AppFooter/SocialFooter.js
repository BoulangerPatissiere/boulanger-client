import * as React from 'react';
import Grid from '@mui/material/Grid';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import PlaceIcon from '@mui/icons-material/Place';
import './SocialFooter.css';

function SocialFooter() {
  return (
    <footer className='social-footer'>
      <Grid container rowSpacing={{ xs: 1, md: 0 }} columnSpacing={1}>
        <Grid item xs={12} md={3}>
          <div className='center-col address-block'>
            <PlaceIcon className='social-footer-link-icon' />
            Ľ. Fullu 5245/62, Bratislava
          </div>
        </Grid>
        <Grid item xs={6} md={2}>
          <a href='tel:+421-940-050-801' className='social-footer-link left-col'>
            <PhoneIcon className='social-footer-link-icon' /> +421 940 050 801
          </a>
        </Grid>
        <Grid item xs={6} md={2}>
          <a className='social-footer-link right-col' href='https://m.facebook.com/boulanger.patissiere/' target='_blank'>
            <FacebookIcon className='social-footer-link-icon' /> Facebook
          </a>
        </Grid>
        <Grid item xs={6} md={2}>
          <a className='social-footer-link left-col' href='https://instagram.com/boulanger_patissiere' target='_blank'>
            <InstagramIcon className='social-footer-link-icon' /> Instagram
          </a>
        </Grid>
        <Grid item xs={6} md={3}>
          <a className='social-footer-link right-col' href='mailto:boulangerpatissiere@gmail.com?subject=Boulanger%20Order' target='_blank'>
            <EmailIcon className='social-footer-link-icon' /> boulangerpatissiere@gmail.com
          </a>
        </Grid>
      </Grid>
    </footer>
  );
}

export default SocialFooter;
