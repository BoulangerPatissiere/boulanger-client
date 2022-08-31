import * as React from 'react';
import Typography from '@mui/material/Typography';
import './CakeCard.css';

function CakePrice() {
    return (
        <div>
            <ul>
                <li key="price20"><Typography variant="body">20 cm - 45 EUR (2 kg+)</Typography> </li>
                <li key="price22"><Typography variant="body">22 cm - 45 EUR (2,5 kg+)</Typography> </li>
                <li key="price24"><Typography variant="body">24 cm - 45 EUR (3 kg+)</Typography> </li>
            </ul>
        </div>
    );
}

export default CakePrice;
