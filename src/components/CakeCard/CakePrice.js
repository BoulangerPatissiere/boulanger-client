import * as React from 'react';
import Typography from '@mui/material/Typography';
import './CakeCard.css';
import { CakeVariants } from '../../global/constants';

function
    CakePrice() {
    return (
        <div>
            <ul>
                <li key="price20"><Typography variant="body">{`${CakeVariants[0].size} - ${CakeVariants[0].price} EUR`}</Typography> </li>
                <li key="price22"><Typography variant="body">{`${CakeVariants[1].size} - ${CakeVariants[1].price} EUR`}</Typography> </li>
                <li key="price24"><Typography variant="body">{`${CakeVariants[2].size} - ${CakeVariants[2].price} EUR`}</Typography> </li>
                <li key="price26"><Typography variant="body">{`${CakeVariants[3].size} - ${CakeVariants[3].price} EUR`}</Typography> </li>
            </ul>
        </div>
    );
}

export default CakePrice;
