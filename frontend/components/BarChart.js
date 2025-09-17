import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartComponent = ({ data, title = "Skills Analysis" }) => {
  
  const chartData = [
    { skill: 'Comprehension', value: data?.comprehension || 0 },
    { skill: 'Attention', value: data?.attention || 0 },
    { skill: 'Focus', value: data?.focus || 0 },
    { skill: 'Retention', value: data?.retention || 0 },
    { skill: 'Engagement', value: data?.engagement_time || 0 }
  ];

  return (
    <div className="chart-container">
      <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="skill" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis />
          <Tooltip 
            formatter={(value) => [value.toFixed(2), 'Score']}
            labelStyle={{ color: '#374151' }}
          />
          <Bar 
            dataKey="value" 
            fill="#3B82F6" 
            radius={[4, 4, 0, 0]}
            fillOpacity={0.8}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;