// redux/reducers.ts
import { combineReducers } from 'redux';
import { ADD_STORE, REMOVE_STORE, ADD_SKU, REMOVE_SKU } from './actionTypes';

const initialStoresState: string[] = [];
const initialSkusState: { name: string; price: number; cost: number }[] = [];

export const storesReducer = (state = initialStoresState, action: any) => {
  switch (action.type) {
    case ADD_STORE:
      return [...state, action.payload];
    case REMOVE_STORE:
      return state.filter((_, index) => index !== action.payload);
    default:
      return state;
  }
};

export const skusReducer = (state = initialSkusState, action: any) => {
  switch (action.type) {
    case ADD_SKU:
      return [...state, action.payload];
    case REMOVE_SKU:
      return state.filter((_, index) => index !== action.payload);
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  stores: storesReducer,
  skus: skusReducer,
});
