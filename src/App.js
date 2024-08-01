import React, { useState } from 'react';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';
import ProductItem from './components/ProductItem/ProductItem';
import { BasketProvider } from './components/BasketContext';
import BasketModal from './components/Header/BasketModal';
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
    },
    {
      id: 3,
      name: 'Brinco de Diamante',
      reference: 'BD-003',
      image: 'https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/deluxo/media/uploads/produtos/foto/ba403dd814889colar-elos-coracao-zirconias-2.jpg',
      variations: ['material v', 'material g', 'material t']
    },
    {
      id: 4,
      name: 'Pulseira de Ouro',
      reference: 'PO-004',
      image: 'https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/deluxo/media/uploads/produtos/foto/ba403dd814889colar-elos-coracao-zirconias-2.jpg',
      variations: ['Tamanho P', 'Tamanho M', 'Tamanho G']
    },
    {
      id: 5,
      name: 'Corrente de Prata',
      reference: 'CP-005',
      image: 'https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/deluxo/media/uploads/produtos/foto/ba403dd814889colar-elos-coracao-zirconias-2.jpg',
      variations: ['45 cm', '50 cm', '55 cm']
    },
    {
      id: 6,
      name: 'Anel de Prata',
      reference: 'AP-006',
      image: 'https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/deluxo/media/uploads/produtos/foto/ba403dd814889colar-elos-coracao-zirconias-2.jpg',
      variations: ['Tamanho P', 'Tamanho M', 'Tamanho G']
    },
    {
      id: 7,
      name: 'Brinco de Prata',
      reference: 'BP-007',
      image: 'https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/deluxo/media/uploads/produtos/foto/ba403dd814889colar-elos-coracao-zirconias-2.jpg',
      variations: ['material v', 'material g', 'material t']
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
          <BasketModal />
        </Container>
      </BasketProvider>
    </>
  );
};

export default App;
