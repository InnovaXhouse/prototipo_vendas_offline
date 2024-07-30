import React from 'react';
import Product from '../Products/Products';
import Grid from '@mui/material/Grid';
import './Home.scss';

const Home = () => {
    const products = [
        { id: 1, name: "Colar de Prata", price: 150.00, image: "https://acdn.mitiendanube.com/stores/001/598/781/products/434081-5f942a427bf308744616636941712122-1024-1024.jpg", variations: ["Pequeno", "Médio", "Grande"] },
        { id: 2, name: "Brinco de Ouro", price: 300.00, image: "https://acdn.mitiendanube.com/stores/001/598/781/products/434081-5f942a427bf308744616636941712122-1024-1024.jpg", variations: ["Pequeno", "Médio", "Grande"] },
        // Adicione mais produtos conforme necessário
        { id: 3, name: "Anel de Diamante", price: 400.00, image: "https://acdn.mitiendanube.com/stores/001/598/781/products/434081-5f942a427bf308744616636941712122-1024-1024.jpg", variations: ["Pequeno", "Médio", "Grande"] },
        { id: 4, name: "Pulseira de Rubi", price: 250.00, image: "https://acdn.mitiendanube.com/stores/001/598/781/products/434081-5f942a427bf308744616636941712122-1024-1024.jpg", variations: ["Pequeno", "Médio", "Grande"] }
    ];

    return (
        <div className="view-home">
                <Grid container spacing={2}>
                {products.map(product => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Home;
