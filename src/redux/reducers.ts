import { ADD_STORE, REMOVE_STORE, ADD_SKU, REMOVE_SKU, ADD_PLANNING, REMOVE_PLANNING } from './actionTypes';
import { Store } from '../DataViewer/Stores';
import { combineReducers } from 'redux';

const initialStoresState: Store[] = [];
const initialSkusState: { name: string; price: number; cost: number }[] = [];
const initialPlanningState: any[] = [];


export const storesReducer = (state = initialStoresState, action: any) => {
  switch (action.type) {
    case ADD_STORE:
      return [...state, action.payload];
    case REMOVE_STORE:
      return state.filter((store) => store.ID !== action.payload);
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


export const planningReducer = (state = initialPlanningState, action: any) => {
  switch (action.type) {
    case ADD_PLANNING:
      return [...state, action.payload];
    case REMOVE_PLANNING:
      return state.filter((_, index) => index !== action.payload);
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  stores: storesReducer,
  skus: skusReducer,
  planning: planningReducer,
});
