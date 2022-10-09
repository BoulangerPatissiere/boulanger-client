import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import { ProductType, CakeVariants } from '../../global/constants';
import { useDeviceDetect } from '../../global/hooks';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import './OrderNowDialog.css';

const calcPrice = (variant, quantity) => {
    return variant.price * quantity;
}

const defaultProduct = {
    name: "",
    photo: null,
    type: ProductType.cake
};

const defaultMessageModel = {
    name: "",
    email: "",
    dueDate: null,
    message: "",
    product: defaultProduct,
    quantity: 1,
    price: calcPrice(CakeVariants[0], 1),
    isDelivery: false,
    deliveryAddress: "",
    variant: CakeVariants[0]
};

const defaultValidation = {
    isValid: true,
    isEmailValid: true,
    isNameValid: true,
    isDeliveryAddressValid: true,
    isDueDateValid: true
};

export default function OrderNowDialog({ isOpen, model, onConfirmed, onCanceled, isLoading }) {
    const theme = useTheme();
    const isMobile = useDeviceDetect();
    const [messageModel, setMessageModel] = React.useState(defaultMessageModel);

    const [validation, setValidation] = React.useState(defaultValidation);

    React.useEffect(() => {
        if (messageModel.product != model) {
            setMessageModel({ ...messageModel, product: model });
        }
    }, [model]);

    const handleVariantChange = (e) => {
        setMessageModel({ ...messageModel, variant: e.target.value, price: calcPrice(e.target.value, messageModel.quantity) });
    };

    const calcMinDate = () => {
        return moment().startOf('day').add(3, 'days');
    }

    const calcMinTime = () => {
        if (messageModel.isDelivery) {
            return moment(new Date(0, 0, 0, 15));
        }
        else {
            return moment(new Date(0, 0, 0, 10));
        }
    }

    const calcMaxTime = () => {
        if (messageModel.isDelivery) {
            return moment(new Date(0, 0, 0, 20));
        }
        else {
            return moment(new Date(0, 0, 0, 18));
        }
    }

    const shouldDisableDate = (date) => {
        if (messageModel.isDelivery) {
            return moment(date).isoWeekday() !== 5;
        }
        else {
            return moment(date).isoWeekday() === 6 || moment(date).isoWeekday() === 7;
        }
    }

    const validateModel = (model) => {
        const newValidation = {
            isEmailValid: model.email != null && model.email != undefined && model.email !== "",
            isNameValid: model.name != null && model.name != undefined && model.name !== "",
            isDeliveryAddressValid: !model.isDelivery || (model.deliveryAddress != null && model.deliveryAddress != undefined && model.deliveryAddress !== ""),
            isDueDateValid: model.dueDate != null && model.dueDate != undefined && model.dueDate._isValid && model.dueDate.isSameOrAfter(calcMinDate()),
            isValid: true
        };
        newValidation.isValid = newValidation.isEmailValid && newValidation.isNameValid && newValidation.isDeliveryAddressValid && newValidation.isDueDateValid;
        setValidation(newValidation);
        return newValidation.isValid;
    }



    const dateTimePickerParams = {
        label: `${messageModel.isDelivery ? "Delivery" : "Pick up"} date *`,
        disableMaskedInput: true,
        shouldDisableDate: shouldDisableDate,
        minDate: calcMinDate(),
        minTime: calcMinTime(),
        maxTime: calcMaxTime(),
        value: messageModel.dueDate,
        inputFormat: "ddd, MMM D YYYY HH:mm",
        minutesStep: 15,
        onChange: (newValue) => {
            setMessageModel({ ...messageModel, dueDate: newValue })
        },
        renderInput: (params) =>
            <TextField {...params} helperText={validation.isDueDateValid ? "" : "Date is empty or invalid."} error={!validation.isDueDateValid} />
    };

    return (
        <Dialog
            open={isOpen}
            aria-labelledby="order-now-dialog"
        >
            <DialogTitle id="order-now-dialog-title" style={{ color: theme.palette.primary.dark, textAlign: "center" }}>{`Order ${messageModel.product.name} ${messageModel.product.type.toLowerCase()}`}</DialogTitle>
            {messageModel && messageModel.product && <DialogContent className="order-now-dialog-content">
                <TextField
                    sx={{ marginBottom: '12px', marginTop: '12px' }}
                    required
                    id="user-email"
                    label="Email"
                    value={messageModel.email}
                    onChange={e => { setMessageModel({ ...messageModel, email: e.target.value }) }}
                    error={!validation.isEmailValid}
                    helperText={validation.isEmailValid ? "Your email is needed only for communication and will not be stored." : "Email is empty or in incorrect format."}
                />
                <TextField sx={{ marginBottom: '12px', marginTop: '12px' }}
                    required
                    id="user-name"
                    label="Name"
                    value={messageModel.name}
                    onChange={e => { setMessageModel({ ...messageModel, name: e.target.value }) }}
                    error={!validation.isNameValid}
                    helperText={validation.isEmailValid ? "" : "Name is empty."}
                />

                <InputLabel id="product-size-select-label">Size</InputLabel>
                <Select
                    labelId="product-size-select-label"
                    id="product-size-select"
                    value={messageModel.variant}
                    label="Size"
                    onChange={handleVariantChange}
                >
                    {CakeVariants.map(variant => (<MenuItem key={variant.size} value={variant}>{variant.size}</MenuItem>))}
                </Select>

                <TextField sx={{ marginBottom: '12px', marginTop: '12px' }}
                    type="number"
                    value={messageModel.quantity}
                    InputProps={{
                        inputProps: {
                            max: 10, min: 1
                        }
                    }}
                    label="Quantity"
                    onChange={e => { setMessageModel({ ...messageModel, quantity: e.target.value, price: calcPrice(messageModel.variant, e.target.value) }) }}
                />

                <Stack direction="row" spacing={1} alignItems="center" sx={{ marginBottom: '12px', marginTop: '12px' }}>
                    <Typography variant="body">Pick up</Typography>
                    <Switch checked={messageModel.isDelivery}
                        onChange={e => { setMessageModel({ ...messageModel, isDelivery: e.target.checked }) }}
                    />
                    <Typography variant="body">Delivery</Typography>
                </Stack>

                {messageModel.isDelivery ? (
                    <TextField sx={{ marginBottom: '12px', marginTop: '12px' }}
                        required
                        id="delivery-address"
                        label="Delivery address"
                        value={messageModel.deliveryAddress}
                        onChange={e => { setMessageModel({ ...messageModel, deliveryAddress: e.target.value }) }}
                        error={!validation.isDeliveryAddressValid}
                        helperText={validation.isDeliveryAddressValid ? "" : "Delivery address is empty."}
                    />
                ) : (
                        <TextField sx={{ marginBottom: '12px', marginTop: '12px' }}
                            id="pick-up-address"
                            label="Pick up address"
                            value="Ľ. Fullu 5245/62, 841 05 Karlova Ves"
                            InputProps={{ readOnly: true }}
                        />
                    )}

                {isMobile ? (
                    <MobileDateTimePicker sx={{ marginBottom: '12px', marginTop: '12px' }}
                        {...dateTimePickerParams}
                    />
                ) : (
                        <DesktopDateTimePicker sx={{ marginBottom: '12px', marginTop: '12px' }}
                            {...dateTimePickerParams}
                        />
                    )}

                <TextField sx={{ marginBottom: '12px', marginTop: '12px' }}
                    id="message"
                    multiline
                    maxRows={6}
                    label="Additional message"
                    value={messageModel.message}
                    onChange={e => { setMessageModel({ ...messageModel, message: e.target.value }) }}
                    helperText="If you would like a custom decoration, a gluten free option or a different pick up or delivery time, please, write you wishes and we will get back to you."
                />
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{ marginBottom: '12px', marginTop: '12px' }}>
                    <Typography variant="h5">Total price: </Typography>
                    <Typography variant="h5">{messageModel.price} EUR</Typography>
                </Stack>

            </DialogContent>}

            <DialogActions>
                <Button onClick={onCanceled}>Cancel</Button>
                <LoadingButton loading={isLoading} variant="contained" color="primary" onClick={() => {
                    if (validateModel(messageModel))
                        onConfirmed(messageModel)
                }} autoFocus>Send the order</LoadingButton>
            </DialogActions>
        </Dialog >
    );
}

OrderNowDialog.propTypes = {
    onConfirmed: PropTypes.func.isRequired,
    onCanceled: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    model: PropTypes.object,
    isLoading: PropTypes.bool
};