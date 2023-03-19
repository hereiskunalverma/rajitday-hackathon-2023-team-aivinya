import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import ChartCard from './ChartCard';
import ChartTitle from './ChartTitle';
import { CircularProgress } from '@mui/material';

const data = [{ name: 'Credits', value: 10000 }];

const COLORS = ['#0088FE', '#DC143C	'];

const PieChartCredits = () => {
  const [credits, setCredits] = useState();
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    setisLoading(true);
    const planRestrictions = JSON.parse(localStorage.getItem('org'));
    setCredits(planRestrictions.credits);
    setisLoading(false);
  }, []);
  return (
    <ChartCard>
      <ChartTitle>
        Remaining Credits:
        {isLoading ? (
          <CircularProgress color="inherit" />
        ) : (
          <span className="text-ot-blue text-2xl"> {credits}</span>
        )}
      </ChartTitle>
      {/* <ResponsiveContainer width="100%" height="380px" aspect="2">
        <PieChart width={800} height={800}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            outerRadius={100}
            fill="#8884d8"
            label={true}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer> */}
    </ChartCard>
  );
};

export default PieChartCredits;
