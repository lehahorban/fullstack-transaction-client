import { FC } from 'react';
import { Cell, Pie, PieChart, Legend, Tooltip } from 'recharts';

interface IChart {
  totalIncome: number;
  totalExpense: number;
}

interface IChartData {
  value: number;
  name: string;
}

const COLORS = ['#00C49F', '#FF8042'];

const Chart: FC<IChart> = ({ totalIncome, totalExpense }) => {
  const data = new Array<IChartData>(
    { value: totalIncome, name: 'Income' },
    { value: totalExpense, name: 'Expense' }
  );
  return (
    <>
      <PieChart width={240} height={240}>
        <Pie
          data={data}
          cx={'50%'}
          cy={'50%'}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </>
  );
};

export default Chart;
