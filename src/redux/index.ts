import { createStore } from 'redux';
import { storesReducer } from "./reducer";

export const store = createStore(storesReducer);

export type RootState = ReturnType<typeof store.getState>;
