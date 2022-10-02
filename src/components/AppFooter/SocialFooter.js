import * as React from 'react';
import Grid from '@mui/material/Grid';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import './SocialFooter.css';

function SocialFooter() {
    return (
        <footer className="social-footer">
            <Grid container rowSpacing={{ xs: 1, md: 0 }} columnSpacing={1}>
                <Grid item xs={6} md={3}>
                    <a className="social-footer-link left-col" href="https://instagram.com/boulanger_patissiere" target="_blank">
                        <InstagramIcon className="social-footer-link-icon" /> Instagram
                    </a>
                </Grid>
                <Grid item xs={6} md={3}>
                    <a className="social-footer-link right-col" href="https://m.facebook.com/boulanger.patissiere/" target="_blank">
                        <FacebookIcon className="social-footer-link-icon" /> Facebook
                    </a>
                </Grid>
                <Grid item xs={6} md={3}>
                    <a href="tel:+421-944-829-701" className="social-footer-link left-col">
                        <PhoneIcon className="social-footer-link-icon" /> +421-944-829-701
                    </a>
                </Grid>
                <Grid item xs={6} md={3}>
                    <a className="social-footer-link right-col" href="mailto:veneradocs@gmail.com?subject=Boulanger%20Order" target="_blank">
                        <EmailIcon className="social-footer-link-icon" /> veneradocs@gmail.com
                    </a>
                </Grid>
            </Grid>
        </footer>
    );
}

export default SocialFooter;