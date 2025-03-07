import { ADD_STORE, REMOVE_STORE, ADD_SKU, REMOVE_SKU, ADD_PLANNING } from './actionTypes';

export const addStore = (storeName: string) => ({
  type: ADD_STORE,
  payload: storeName,
});

export const removeStore = (index: number) => ({
  type: REMOVE_STORE,
  payload: index,
});

export const addSku = (sku: {}) => ({
  type: ADD_SKU,
  payload: sku,
});

export const removeSku = (index: number) => ({
  type: REMOVE_SKU,
  payload: index,
});

export const addPlanning = (planning:{}) => ({
  type: ADD_PLANNING,
  payload:planning
})