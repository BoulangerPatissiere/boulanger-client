import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Link } from "react-router-dom";
import { CAKES_ROUTE, ABOUT_ROUTE } from '../../constants';
import logo from '../../boulanger_logo_cropped_removebg.png';
import './ElevatingAppBar.css';
import '../../global/GlobalStyles.css';


function ElevationScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
};

export default function ElevatingAppBar(props) {
    return (
        <React.Fragment>
            <ElevationScroll {...props}>
                <AppBar position="sticky" className="app-bar">
                    <Toolbar className="app-bar-toolbar">
                        <div className="app-bar-logo">
                            <img src={logo} className="app-bar-logo-img" alt="logo" />
                        </div>
                        <div className="app-bar-links-div">
                            {/* <Button color="inherit" sx={{ 'margin-right': '12px' }}><Link to={CAKES_ROUTE} className="no-link"><Typography variant="h3">Home</Typography></Link></Button> */}
                            {/* <Button color="inherit" sx={{ 'margin-left': '12px' }}><Link to={ABOUT_ROUTE} className="no-link"><Typography variant="h3">About</Typography></Link></Button> */}
                        </div>

                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
        </React.Fragment>
    );
}
