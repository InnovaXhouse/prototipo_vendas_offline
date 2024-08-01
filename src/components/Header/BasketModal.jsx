import React, { useState } from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemText, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckoutModal from './CheckoutModal';

const BasketModal = ({ open, onClose, items }) => {
    const [products] = useState([
        { id: 1, name: 'Anel de Ouro', price: 200 },
        { id: 2, name: 'Colar de Prata', price: 150 }
    ]);

    const [checkoutOpen, setCheckoutOpen] = useState(false);

    const getTotalPrice = () => {
        return Object.entries(items).reduce((total, [key, quantity]) => {
            const id = parseInt(key.split('_')[0], 10);
            const product = products.find(p => p.id === id);
            return total + (product ? product.price * quantity : 0);
        }, 0);
    };

    const handleCheckoutOpen = () => {
        setCheckoutOpen(true);
    };

    const handleCheckoutClose = () => {
        setCheckoutOpen(false);
    };

    return (
        <>
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
                        Cesta de Compras
                    </Typography>
                    <List sx={{ width: '100%' }}>
                        {Object.entries(items).map(([key, quantity]) => {
                            const id = parseInt(key.split('_')[0], 10);
                            const product = products.find(p => p.id === id);
                            return product ? (
                                <ListItem key={key} sx={{ borderRadius: 2, mb: 1, bgcolor: 'background.default' }}>
                                    <ListItemText primary={product.name} secondary={`Quantidade: ${quantity} - Subtotal: R$ ${product.price * quantity}`} />
                                </ListItem>
                            ) : null;
                        })}
                    </List>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Total: R$ {getTotalPrice()}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleCheckoutOpen} sx={{ mt: 2 }}>
                        Finalizar
                    </Button>
                </Box>
            </Modal>
            <CheckoutModal open={checkoutOpen} onClose={handleCheckoutClose} closeBasketModal={onClose} />
        </>
    );
}

export default BasketModal;
