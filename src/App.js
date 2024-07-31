import React, { useState } from 'react';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';
import ProductItem from './components/ProductItem/ProductItem';
import { BasketProvider } from './components/BasketContext';
import { CssBaseline, Container } from '@mui/material';

const App = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Anel de Ouro',
      reference: 'AO-001',
      image: 'https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/deluxo/media/uploads/produtos/foto/ba403dd814889colar-elos-coracao-zirconias-2.jpg',
      variations: ['Tamanho P', 'Tamanho M', 'Tamanho G']
    },
    {
      id: 2,
      name: 'Colar de Prata',
      reference: 'CP-002',
      image: 'https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/deluxo/media/uploads/produtos/foto/ba403dd814889colar-elos-coracao-zirconias-2.jpg',
      variations: ['45 cm', '50 cm', '55 cm']
    }
    // Adicione mais produtos conforme necessário
  ]);

  return (
    <>
      <BasketProvider>
        <CssBaseline />
        <Header />
        <Container maxWidth="lg">
          <ProductList products={products} />
        </Container>
      </BasketProvider>
    </>
  );
}

export default App;
