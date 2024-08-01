import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useBasket } from '../BasketContext';
import Swal from 'sweetalert2';

const CheckoutModal = ({ open, onClose, closeBasketModal }) => {
    const [customerData, setCustomerData] = useState({
        name: '',
        email: '',
        address: '',
        phone: ''
    });

    const { dispatch } = useBasket();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = () => {
        dispatch({ type: 'CLEAR_BASKET' });
        onClose();
        closeBasketModal();

        Swal.fire({
            title: 'Compra finalizada!',
            text: 'Obrigado por comprar conosco.',
            icon: 'success',
            confirmButtonText: 'Ok'
        }).then(() => {
            onClose();
            closeBasketModal();
        });
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                width: 400,
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Box sx={{ alignSelf: 'flex-end' }}>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Typography variant="h6" component="h2" gutterBottom>
                    Finalizar Compra
                </Typography>
                <TextField
                    label="Nome"
                    name="name"
                    value={customerData.name}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Email"
                    name="email"
                    value={customerData.email}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Endereço"
                    name="address"
                    value={customerData.address}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Telefone"
                    name="phone"
                    value={customerData.phone}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Enviar
                </Button>
            </Box>
        </Modal>
    );
}

export default CheckoutModal;
