import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton, Grid, CircularProgress } from '@mui/material';
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

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); // Para mostrar um indicador de carregamento
    const { dispatch } = useBasket();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerData(prevState => ({ ...prevState, [name]: value }));
        if (errors[name]) {
            setErrors(prevState => ({ ...prevState, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!customerData.name) newErrors.name = 'Nome é obrigatório';
        if (!customerData.email) newErrors.email = 'Email é obrigatório';
        if (!customerData.address) newErrors.address = 'Endereço é obrigatório';
        if (!customerData.phone) newErrors.phone = 'Telefone é obrigatório';
        return newErrors;
    };

    const handleSubmit = () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        // Simula uma chamada de API ou processo de finalização
        setTimeout(() => {
            dispatch({ type: 'CLEAR_BASKET' });
            onClose();
            closeBasketModal();

            Swal.fire({
                title: 'Compra finalizada!',
                text: 'Obrigado por comprar conosco.',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(() => {
                setLoading(false);
                onClose();
                closeBasketModal();
            });
        }, 1500);
    };

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="checkout-modal-title" aria-describedby="checkout-modal-description">
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                width: { xs: '90%', sm: 400 },
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxHeight: '90vh',
                overflowY: 'auto',
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.default'
            }}>
                <Box sx={{ alignSelf: 'flex-end', mb: 2 }}>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Typography variant="h6" component="h2" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
                    Finalizar Compra
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Nome"
                            name="name"
                            value={customerData.name}
                            onChange={handleChange}
                            fullWidth
                            error={!!errors.name}
                            helperText={errors.name}
                            sx={{ mb: 2 }}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            name="email"
                            value={customerData.email}
                            onChange={handleChange}
                            fullWidth
                            error={!!errors.email}
                            helperText={errors.email}
                            sx={{ mb: 2 }}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Endereço"
                            name="address"
                            value={customerData.address}
                            onChange={handleChange}
                            fullWidth
                            error={!!errors.address}
                            helperText={errors.address}
                            sx={{ mb: 2 }}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Telefone"
                            name="phone"
                            value={customerData.phone}
                            onChange={handleChange}
                            fullWidth
                            error={!!errors.phone}
                            helperText={errors.phone}
                            sx={{ mb: 2 }}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={loading}
                    sx={{
                        mt: 2,
                        width: '100%',
                        padding: '10px 0',
                        borderRadius: 3,
                        fontSize: '16px',
                        fontWeight: 'bold',
                        position: 'relative',
                        '&:disabled': {
                            opacity: 0.7,
                        },
                    }}
                >
                    {loading && <CircularProgress size={24} sx={{ position: 'absolute', left: '50%', top: '50%', marginLeft: '-12px', marginTop: '-12px' }} />}
                    {loading ? 'Processando...' : 'Enviar'}
                </Button>
            </Box>
        </Modal>
    );
};

export default CheckoutModal;
