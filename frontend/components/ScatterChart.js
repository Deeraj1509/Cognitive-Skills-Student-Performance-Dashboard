import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ScatterChartComponent = ({ data, title = "Attention vs Assessment Score" }) => {
  // Transform student data for scatter plot
  const scatterData = data?.students?.map(student => ({
    attention: student.attention,
    assessment_score: student.assessment_score,
    name: student.name,
    cluster: student.cluster
  })) || [];

  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1'];

  return (
    <div className="chart-container">
      <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
      <ResponsiveContainer width="100%" height="90%">
        <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="attention" 
            name="Attention" 
            type="number"
            domain={['dataMin - 0.5', 'dataMax + 0.5']}
          />
          <YAxis 
            dataKey="assessment_score" 
            name="Assessment Score" 
            type="number"
            domain={['dataMin - 5', 'dataMax + 5']}
          />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }}
            formatter={(value, name) => [
              typeof value === 'number' ? value.toFixed(2) : value, 
              name === 'attention' ? 'Attention' : 'Assessment Score'
            ]}
            labelFormatter={(label, payload) => 
              payload && payload[0] ? `Student: ${payload[0].payload.name}` : ''
            }
          />
          <Scatter 
            data={scatterData} 
            fill="#8884d8"
            fillOpacity={0.7}
            stroke="#8884d8"
            strokeWidth={2}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScatterChartComponent;