import React, { useState } from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemText, IconButton, Button, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ConfirmationModal from './ConfirmationModal';
import CheckoutModal from './CheckoutModal';
import { useBasket } from '../BasketContext';

const BasketModal = ({ open, onClose }) => {
    const { state, dispatch } = useBasket();
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    const [products] = useState([
        { id: 1, name: 'Anel de Ouro', price: 200 },
        { id: 2, name: 'Colar de Prata', price: 150 },
        { id: 3, name: 'Brinco de Diamante', price: 300 },
        { id: 4, name: 'Pulseira de Ouro', price: 250 },
        { id: 5, name: 'Corrente de Prata', price: 180 },
        { id: 6, name: 'Anel de Prata', price: 100 },
        { id: 7, name: 'Brinco de Prata', price: 120 },
    ]);


    const getTotalPrice = () => {
        return Object.entries(state.items).reduce((total, [key, quantity]) => {
            const id = parseInt(key.split('_')[0], 10);
            const product = products.find(p => p.id === id);
            return total + (product ? product.price * quantity : 0);
        }, 0);
    };

    const handleRemoveAllItems = () => {
        dispatch({ type: 'CLEAR_BASKET' });
        setConfirmationOpen(false);
    };

    const handleCheckoutOpen = () => {
        setCheckoutOpen(true);
    };

    const handleCheckoutClose = () => {
        setCheckoutOpen(false);
    };

    const handleRemoveItem = (id) => {
        dispatch({ type: 'UPDATE_ITEM_QUANTITY', id, quantity: 0 });
    };

    const isBasketEmpty = Object.keys(state.items).length === 0;

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
                    width: 600,
                    borderRadius: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflow: 'hidden',
                    maxHeight: '90vh',
                }}>
                    <Box sx={{ width: '100%', mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                                <ShoppingBagIcon sx={{ mr: 1 }} /> Cesta de Compras
                            </Typography>
                            <IconButton onClick={onClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <Divider sx={{ width: '100%', mb: 2 }} />
                    {isBasketEmpty ? (
                        <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
                            Você ainda não possui itens adicionados ao carrinho.
                        </Typography>
                    ) : (
                        <>
                            <List sx={{ width: '100%', overflowY: 'auto', maxHeight: '300px' }}>
                                {Object.entries(state.items).map(([key, quantity]) => {
                                    const id = parseInt(key.split('_')[0], 10);
                                    const product = products.find(p => p.id === id);
                                    return product ? (
                                        <ListItem
                                            key={key}
                                            sx={{
                                                borderRadius: 2,
                                                mb: 1,
                                                bgcolor: 'background.default',
                                                boxShadow: 1,
                                                transition: 'transform 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)',
                                                },
                                            }}
                                        >
                                            <ListItemText
                                                primary={`${product.name} ${product.discount ? `- ${product.discount}% OFF` : ''}`}
                                                secondary={`Quantidade: ${quantity} - Subtotal: R$ ${(product.price * quantity).toFixed(2)}`}
                                                primaryTypographyProps={{ fontWeight: 'bold', color: 'text.primary' }}
                                                secondaryTypographyProps={{ color: 'text.secondary' }}
                                            />
                                            <IconButton onClick={() => handleRemoveItem(key)} sx={{ ml: 2 }}>
                                                <CloseIcon />
                                            </IconButton>
                                        </ListItem>
                                    ) : null;
                                })}
                            </List>
                            <Divider sx={{ width: '100%', mt: 2 }} />
                            <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                                Total: R$ {getTotalPrice().toFixed(2)}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCheckoutOpen}
                                sx={{
                                    mt: 2,
                                    width: '100%',
                                    padding: '10px 0',
                                    borderRadius: 3,
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    backgroundColor: 'primary.main',
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                    },
                                }}
                            >
                                Finalizar
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => setConfirmationOpen(true)}
                                sx={{
                                    mt: 3,
                                    width: '100%',
                                    padding: '10px 0',
                                    borderRadius: 3,
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    backgroundColor: 'error.main',
                                    '&:hover': {
                                        backgroundColor: 'error.dark',
                                    },
                                }}
                            >
                                Remover Todos os Itens
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={onClose}
                                sx={{
                                    mt: 2,
                                    width: '100%',
                                    padding: '10px 0',
                                    borderRadius: 3,
                                    fontSize: '16px',
                                }}
                            >
                                Continuar Comprando
                            </Button>
                        </>
                    )}
                </Box>
            </Modal>
            <ConfirmationModal open={confirmationOpen} onClose={() => setConfirmationOpen(false)} onConfirm={handleRemoveAllItems} />
            <CheckoutModal open={checkoutOpen} onClose={handleCheckoutClose} closeBasketModal={onClose} />
        </>
    );
};

export default BasketModal;
