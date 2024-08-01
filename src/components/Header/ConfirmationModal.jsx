import React from 'react';
import { Modal, Box, Typography, Button, Divider } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

const ConfirmationModal = ({ open, onClose, onConfirm }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    width: 400,
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    maxHeight: '90vh',
                }}
            >
                <WarningIcon sx={{ fontSize: 40, color: 'warning.main', mb: 2 }} />
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Confirmar Remoção
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    Tem certeza que deseja remover todos os itens da cesta? Esta ação não pode ser desfeita.
                </Typography>
                <Divider sx={{ width: '100%', mb: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={onConfirm}
                        sx={{
                            flex: 1,
                            mr: 1,
                            borderRadius: 4,
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: 'error.light',
                            },
                        }}
                    >
                        Sim, remover
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={onClose}
                        sx={{
                            flex: 1,
                            ml: 1,
                            borderRadius: 4,
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: 'primary.light',
                            },
                        }}
                    >
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ConfirmationModal;
