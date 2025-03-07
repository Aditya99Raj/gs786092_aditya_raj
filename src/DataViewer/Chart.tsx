import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartData {
  Week: string;
  "GM Dollars": string;
  "Sales Dollars": string;
  "GM %": string;
}

const Chart: React.FC = () => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/db.json');
        const data: ChartData[] = response.data.charts || [];

        const labels = data.map((item) => item.Week);
        const gmDollars = data.map((item) => parseFloat(item["GM Dollars"].replace(/[^0-9.-]+/g, "")));
        const salesDollars = data.map((item) => parseFloat(item["Sales Dollars"].replace(/[^0-9.-]+/g, "")));
        const gmPercentage = data.map((item) => parseFloat(item["GM %"].replace('%', '')));

        setChartData({
          labels,
          datasets: [
            {
              label: 'GM Dollars',
              data: gmDollars,
              borderColor: '#FF6384',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
              label: 'Sales Dollars',
              data: salesDollars,
              borderColor: '#36A2EB',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
            },
            {
              label: 'GM %',
              data: gmPercentage,
              borderColor: '#FFCE56',
              backgroundColor: 'rgba(255, 206, 86, 0.2)',
            }
          ],
        });
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 w-full flex flex-col  items-center">
      {/* <h1 className="flex items-center text-3xl font-bold mb-4">Charts</h1> */}
      <div className="w-3/4">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default Chart;
