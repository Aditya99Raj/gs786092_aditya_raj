import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux';
import { addSku, removeSku } from '../redux/actions';

interface Sku {
  name: string;
  price: number;
  cost: number;
}

const SkusPage: React.FC = () => {
  const skus = useSelector((state: RootState) => state.skus);
  const dispatch = useDispatch();
  const [newSku, setNewSku] = useState<Sku>({ name: '', price: 0, cost: 0 });

  const handleAddSku = () => {
    if (newSku.name.trim()) {
      dispatch(addSku(newSku));
      setNewSku({ name: '', price: 0, cost: 0 });
    }
  };

  const handleRemoveSku = (index: number) => {
    dispatch(removeSku(index));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Manage SKUs</h1>
      <div className="mb-4 space-y-2">
        <input
          type="text"
          value={newSku.name}
          onChange={(e) => setNewSku({ ...newSku, name: e.target.value })}
          placeholder="Enter SKU name"
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          value={newSku.price}
          onChange={(e) => setNewSku({ ...newSku, price: parseFloat(e.target.value) })}
          placeholder="Enter Price"
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          value={newSku.cost}
          onChange={(e) => setNewSku({ ...newSku, cost: parseFloat(e.target.value) })}
          placeholder="Enter Cost"
          className="p-2 border rounded w-full"
        />
        <button onClick={handleAddSku} className="bg-blue-600 text-white p-2 rounded w-full">Add SKU</button>
      </div>
      <ul className="space-y-2">
        {skus.map((sku: Sku, index: number) => (
          <li key={index} className="flex justify-between items-center p-2 border rounded">
            <span>{sku.name} - Price: ${sku.price} - Cost: ${sku.cost}</span>
            <button onClick={() => handleRemoveSku(index)} className="text-red-600">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkusPage;
