import * as React from 'react';
import { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import CakeCard from '../../components/CakeCard/CakeCard';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import OrderNowDialog from '../../components/OrderNowDialog/OrderNowDialog';
import { api, ProductType } from '../../global/constants';
import './CakesContainer.css';

function CakesContainer() {
    const theme = useTheme();
    const [cakes, setCakes] = useState([]);
    const [isSuccess, setIsSuccess] = useState(0);
    const [product, setProduct] = useState(null);
    const [isOrderNowDialogOpen, setIsOrderNowDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch(`${api}/cakes`)
            .then(response => response.json())
            .then(data => setCakes(data.filter(cake => cake.isAvailable)));
    }, []);

    const onOrderNowClicked = (cake) => {
        setProduct({
            name: cake.name,
            photo: cake.photo,
            type: ProductType.cake,
        });
        setIsOrderNowDialogOpen(true);
    }

    const onOrderNowCanceled = () => {
        setIsOrderNowDialogOpen(false);
        setProduct(null);
    }

    const onOrderNowConfirmed = async (message) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${api}/sendemail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: message.email,
                    name: message.name,
                    filename: "cake_image.jpg",
                    photo: message.product.photo,
                    subject: `Order ${message.product.name} ${message.product.type.toLowerCase()} from ${message.name}`,
                    html: generateHtml(message)
                })
            });

            if (!response.ok) {
                setIsSuccess(-1);
                throw new Error(`Error: ${response.status}`);
            }
            else {
                setIsSuccess(1);
            }

            await response.json();
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setIsLoading(false);
            setIsOrderNowDialogOpen(false);
            setProduct(null);
        }
    }

    const generateHtml = (message) => {
        const html =
            `
                <p><span style="font-weight: bold">Client Name: </span><span>${message.name}</span></p> 
                <p><span style="font-weight: bold">Client Email: </span><span>${message.email}</span></p>
                <p><span style="font-weight: bold">Product: </span><span style="text-transform: uppercase">${message.product.name}</span></p>
                <p><span style="font-weight: bold">Quantity: </span><span>${message.quantity}</span></p>
                <p><span style="font-weight: bold">Size: </span><span>${message.variant.size}</span></p>
                <p><span style="font-weight: bold">Price: </span><span>${message.price} EUR</span></p>
                <p><span style="font-weight: bold">Delivery or Pickup: </span><span>${message.isDelivery ? "Delivery" : "Pick up"}</span></p>
                <p><span style="font-weight: bold">Delivery/Pickup date & time </span><span>${message.dueDate.format("dddd, MMMM d YYYY HH:mm")}</span></p>
                ${message.isDelivery ? `<p><span style="font-weight: bold">Delivery address: </span><span>${message.deliveryAddress}</span></p>` : ""}
                ${message.message ? `<p><span style="font-weight: bold">Additional message: </span><span>${message.message}</span></p>` : ""}
            <img src="cid:cake-image" style="object-fit:cover"/>`;
        return html;
    }

    const getAlertStatus = () => {
        if (isSuccess < 0) return { severity: "error" };
        if (isSuccess > 0) return { severity: "success" };
    }

    return (
        <React.Fragment>
            <Collapse in={isSuccess !== 0}>
                <Alert
                    {...getAlertStatus()}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setIsSuccess(0);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {isSuccess < 0 ? "Sorry, somethin went wrong. Your order was not sent." : "Success! Your order has been sent."}
                </Alert>
            </Collapse>
            <Typography sx={{ mb: 2 }} variant="h6" style={{ color: theme.palette.primary.dark, textAlign: "center", fontStyle: "italic" }}>
                YOU CAN CHOOSE THE “GLUTEN-FREE” OPTION FOR ANY CAKE BELOW, A DECORATION ALSO CAN BE CHOSEN DIFFERENTLY. THE PRICE WILL REMAIN THE SAME.
            </Typography>
            {isOrderNowDialogOpen && (
                <OrderNowDialog isLoading={isLoading} isOpen={isOrderNowDialogOpen} model={product} onCanceled={onOrderNowCanceled} onConfirmed={onOrderNowConfirmed} />
            )}
            {(cakes && cakes.length > 0)
                ? <div className="cakes-container">{cakes.map(cake => <CakeCard key={cake.id} cake={cake} onOrderNowClicked={onOrderNowClicked} />)}</div>
                : <CircularProgress className="cakes-container-spinner" />
            }
        </React.Fragment>
    );
}

export default CakesContainer;
