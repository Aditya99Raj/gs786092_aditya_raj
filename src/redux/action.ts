export const addStore = (storeName: string) => ({
    type: 'ADD_STORE',
    payload: storeName,
  });
  
  export const removeStore = (index: number) => ({
    type: 'REMOVE_STORE',
    payload: index,
  });
  