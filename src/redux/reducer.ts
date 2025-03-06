const initialState: string[] = [];

export const storesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_STORE':
      return [...state, action.payload];
    case 'REMOVE_STORE':
      return state.filter((_, index) => index !== action.payload);
    default:
      return state;
  }
};
