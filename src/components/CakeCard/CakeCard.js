import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import logo from '../../boulanger_logo_cropped_removebg.png';
import CakePrice from './CakePrice';
import './CakeCard.css';

function CakeCard(props) {

    const { cake } = props;

    return (
        <Card>
            {cake.photo != null &&
                <CardMedia
                    component="img"
                    height="300"
                    image={`data:image/png;base64,${cake.photo}`}
                    alt="Cannot disply cake photo"
                />}
            <CardContent className="cake-card">
                <Typography variant="h5" component="div" className="cake-card-title">{cake.name}</Typography>
                <Typography variant='body'>{cake.description}</Typography>
                <CakePrice />
            </CardContent>
        </Card>
    );
}

export default CakeCard;
