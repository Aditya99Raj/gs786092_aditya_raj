import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Chart: React.FC = () => {
  const planningData = useSelector((state: RootState) => state.planning);

  const data = planningData.map((item:any) => ({
    store: item.store,
    gmDollars: item.salesUnits * (item.price - item.cost),
    salesDollars: item.salesUnits * item.price,
    gmPercentage: (item.salesUnits * (item.price - item.cost)) / (item.salesUnits * item.price) * 100,
  }));

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Analysis</h1>
      <BarChart width={800} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="store" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="gmDollars" fill="#82ca9d" name="GM Dollars" />
        <Bar dataKey="salesDollars" fill="#8884d8" name="Sales Dollars" />
      </BarChart>
    </div>
  );
};

export default Chart;
