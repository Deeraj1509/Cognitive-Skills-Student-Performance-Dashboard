import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';

const RadarChartComponent = ({ data, studentId, title = "Student Profile" }) => {
  // Find specific student or use cluster average
  let studentData;
  
  if (studentId && data?.students) {
    studentData = data.students.find(s => s.student_id === parseInt(studentId));
  }
  
  if (!studentData && data?.cluster_summary) {
    // Use first cluster as default
    const firstCluster = Object.keys(data.cluster_summary)[0];
    studentData = data.cluster_summary[firstCluster];
  }

  if (!studentData) return <div>No data available</div>;

  const radarData = [
    { subject: 'Comprehension', A: studentData.comprehension, fullMark: 10 },
    { subject: 'Attention', A: studentData.attention, fullMark: 10 },
    { subject: 'Focus', A: studentData.focus, fullMark: 10 },
    { subject: 'Retention', A: studentData.retention, fullMark: 10 },
    { subject: 'Engagement', A: studentData.engagement_time || studentData.engagement, fullMark: 10 },
  ];

  return (
    <div className="chart-container">
      <h3 className="text-lg font-semibold mb-4 text-center">
        {studentId ? `${studentData.name || 'Student'} Profile` : title}
      </h3>
      <ResponsiveContainer width="100%" height="90%">
        <RadarChart data={radarData} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
          <PolarGrid />
          <PolarAngleAxis tick={{ fontSize: 12 }} />
          <PolarRadiusAxis 
            angle={0} 
            domain={[0, 10]} 
            tick={{ fontSize: 10 }}
            tickCount={6}
          />
          <Radar
            name="Skills"
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChartComponent;