import React, { createContext, useContext, useReducer } from 'react';

// Criar o contexto da cesta
const CartContext = createContext();

// Ações para o reducer
const actionTypes = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM'
};

// Reducer para manipular ações na cesta de compras
function cartReducer(state, action) {
  switch (action.type) {
    case actionTypes.ADD_ITEM:
      return [...state, action.payload];
    case actionTypes.REMOVE_ITEM:
      return state.filter(item => item.id !== action.payload.id);
    default:
      return state;
  }
}

// Provedor de contexto
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addItem = item => {
    dispatch({ type: actionTypes.ADD_ITEM, payload: item });
  };

  const removeItem = itemId => {
    dispatch({ type: actionTypes.REMOVE_ITEM, payload: { id: itemId } });
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar o contexto da cesta
export const useCart = () => useContext(CartContext);
