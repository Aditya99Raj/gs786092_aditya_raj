import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';

const Planning: React.FC = () => {
  const stores = useSelector((state: RootState) => state.stores);
  const skus = useSelector((state: RootState) => state.skus);

  const [salesUnits, setSalesUnits] = useState<Record<string, number>>({});

  const handleSalesChange = (key: string, value: number) => {
    setSalesUnits({ ...salesUnits, [key]: value });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Planning</h1>
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border p-2">Store</th>
            <th className="border p-2">SKU</th>
            <th className="border p-2">Sales Units</th>
            <th className="border p-2">Sales Dollars</th>
            <th className="border p-2">GM Dollars</th>
            <th className="border p-2">GM %</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store: string) =>
            skus.map((sku: any) => {
              const key = `${store}-${sku.name}`;
              const units = salesUnits[key] || 0;
              const salesDollars = units * sku.price;
              const gmDollars = salesDollars - units * sku.cost;
              const gmPercent = salesDollars ? (gmDollars / salesDollars) * 100 : 0;

              return (
                <tr key={key}>
                  <td className="border p-2">{store}</td>
                  <td className="border p-2">{sku.name}</td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={units}
                      onChange={(e) => handleSalesChange(key, Number(e.target.value))}
                      className="p-1 border rounded w-full"
                    />
                  </td>
                  <td className="border p-2">${salesDollars.toFixed(2)}</td>
                  <td className="border p-2">${gmDollars.toFixed(2)}</td>
                  <td className="border p-2">{gmPercent.toFixed(2)}%</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Planning;
