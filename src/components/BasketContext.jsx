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
      const currentQuantity = state.items[action.id];
      if (currentQuantity > 1) {
        return {
          ...state,
          items: {
            ...state.items,
            [action.id]: currentQuantity - 1,
          },
        };
      } else {
        const newItems = { ...state.items };
        delete newItems[action.id];
        return {
          ...state,
          items: newItems,
        };
      }
    case 'UPDATE_ITEM_QUANTITY':
      if (action.quantity <= 0) {
        const newItems = { ...state.items };
        delete newItems[action.id];
        return {
          ...state,
          items: newItems,
        };
      }
      return {
        ...state,
        items: {
          ...state.items,
          [action.id]: action.quantity,
        },
      };
    case 'LOAD_SAVED_STATE':
      return { ...state, items: action.state.items };
    case 'CLEAR_BASKET':
      return { ...state, items: {} };
    default:
      return state;
  }
}

export const BasketProvider = ({ children, products }) => {
  const [state, dispatch] = useReducer(basketReducer, initialState);

  useEffect(() => {
    localForage.getItem('basket').then(savedState => {
      if (savedState) {
        dispatch({ type: 'LOAD_SAVED_STATE', state: savedState });
      }
    });
  }, []);

  useEffect(() => {
    localForage.setItem('basket', state);
  }, [state]);

  return (
    <BasketContext.Provider value={{ state, dispatch, products }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => useContext(BasketContext);
