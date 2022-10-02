import * as React from 'react';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import { useDeviceDetect } from '../../global/hooks';
import CakePrice from './CakePrice';
import './CakeCard.css';

function CakeCard(props) {

    const { cake, onOrderNowClicked } = props;
    const theme = useTheme();
    const isMobile = useDeviceDetect();

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
                <Typography variant="h5" component="div" className="cake-card-title" style={{ color: theme.palette.primary.dark, textAlign: "center" }}>{cake.name}</Typography>
                <Typography variant='body'>{cake.description}</Typography>
                {isMobile ?
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <CakePrice />
                        <Fab color="primary" className="cake-card-fab" sx={{ marginRight: "20px" }} onClick={() => onOrderNowClicked(cake)}>
                            <ShoppingCartIcon />
                        </Fab>
                    </Stack>
                    :
                    <React.Fragment>
                        <CakePrice />
                        <Fab color="primary" className="cake-card-fab" sx={{ position: "absolute", bottom: "70px", right: "30px" }} onClick={() => onOrderNowClicked(cake)}>
                            <ShoppingCartIcon />
                        </Fab>
                    </React.Fragment>
                }

            </CardContent>
        </Card>
    );
}

export default CakeCard;
