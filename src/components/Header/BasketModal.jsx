import React, { useState } from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const BasketModal = ({ open, onClose, items }) => {
    const [products] = useState([
        { id: 1, name: 'Anel de Ouro', price: 200 },
        { id: 2, name: 'Colar de Prata', price: 150 }
        // Adicione mais produtos conforme necessário com preços
    ]);

    const getTotalPrice = () => {
        return Object.entries(items).reduce((total, [key, quantity]) => {
            const id = parseInt(key.split('_')[0], 10);
            const product = products.find(p => p.id === id);
            return total + (product ? product.price * quantity : 0);
        }, 0);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400 }}>
                <Typography variant="h6" component="h2">
                    Cesta de Compras
                </Typography>
                <List>
                    {Object.entries(items).map(([key, quantity]) => {
                        const id = parseInt(key.split('_')[0], 10);
                        const product = products.find(p => p.id === id);
                        return product ? (
                            <ListItem key={key}>
                                <ListItemText primary={product.name} secondary={`Quantidade: ${quantity} - Subtotal: R$ ${product.price * quantity}`} />
                            </ListItem>
                        ) : null;
                    })}
                </List>
                <Typography variant="h6">
                    Total: R$ {getTotalPrice()}
                </Typography>
            </Box>
        </Modal>
    );
}

export default BasketModal;