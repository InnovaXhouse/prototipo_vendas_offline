import React, { createContext, useReducer, useContext, useEffect } from 'react';
import localForage from 'localforage';

const BasketContext = createContext();

const initialState = {
  items: {},
};

function basketReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: {
          ...state.items,
          [action.id]: (state.items[action.id] || 0) + 1,
        },
      };
    case 'REMOVE_ITEM':
      if (!state.items[action.id]) return state;
      return {
        ...state,
        items: {
          ...state.items,
          [action.id]: state.items[action.id] > 0 ? state.items[action.id] - 1 : 0,
        },
      };
    case 'LOAD_SAVED_STATE':
      // Assumindo que o estado salvo é apenas o objeto `items`
      return { ...state, items: action.state.items };
    default:
      return state;
  }
}

export const BasketProvider = ({ children }) => {
  const [state, dispatch] = useReducer(basketReducer, initialState);

  // Carregar o estado inicial do IndexedDB
  useEffect(() => {
    localForage.getItem('basket').then(savedState => {
      if (savedState) {
        dispatch({ type: 'LOAD_SAVED_STATE', state: savedState });
      }
    });
  }, []);

  // Salvar o estado no IndexedDB sempre que houver mudanças
  useEffect(() => {
    localForage.setItem('basket', state);
  }, [state]);

  return (
    <BasketContext.Provider value={{ state, dispatch }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => useContext(BasketContext);
