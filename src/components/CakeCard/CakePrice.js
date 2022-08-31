import * as React from 'react';
import Typography from '@mui/material/Typography';
import './CakeCard.css';

function CakePrice() {
    return (
        <div>
            <ul>
                <li key="price18"><Typography variant="body">18 cm - 45 EUR</Typography> </li>
                <li key="price20"><Typography variant="body">20 cm - 65 EUR</Typography> </li>
                <li key="price22"><Typography variant="body">22 cm - 75 EUR</Typography> </li>
                <li key="price24"><Typography variant="body">24 cm - 85 EUR</Typography> </li>
                <li key="price26"><Typography variant="body">26 cm - 105 EUR</Typography> </li>
            </ul>
        </div>
    );
}

export default CakePrice;
