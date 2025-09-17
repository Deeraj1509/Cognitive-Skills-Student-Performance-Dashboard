import { useState, useEffect } from 'react';
import BarChart from '../components/BarChart';
import ScatterChart from '../components/ScatterChart';
import RadarChart from '../components/RadarChart';
import DataTable from '../components/DataTable';
import { TrendingUp, Users, Target, Brain } from 'lucide-react';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/student_processed.json');
        if (!response.ok) {
          throw new Error('Failed to load data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
          <p className="mt-4 text-gray-600">
            Make sure you have copied the student_processed.json file to public/data/
          </p>
        </div>
      </div>
    );
  }

  const stats = data?.summary_stats;
  const clusterCounts = data?.cluster_counts;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Student Performance Dashboard
                </h1>
                <p className="text-sm text-gray-500">
                  AI-powered learning analytics and insights
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="stat-card">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.total_students}</p>
              </div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.average_score?.toFixed(1)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Score Range</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.min_score?.toFixed(1)} - {stats?.max_score?.toFixed(1)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Learning Groups</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Object.keys(clusterCounts || {}).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">🔍 Key Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <h3 className="font-semibold text-gray-800 mb-2">Best Predictor</h3>
              <p className="text-sm text-gray-600">
                {data?.feature_importance?.[0]?.feature?.charAt(0).toUpperCase() + 
                 data?.feature_importance?.[0]?.feature?.slice(1)} shows the strongest 
                correlation with performance
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <h3 className="font-semibold text-gray-800 mb-2">Model Accuracy</h3>
              <p className="text-sm text-gray-600">
                R² Score: {data?.model_metrics?.r2_score?.toFixed(3)} - 
                {data?.model_metrics?.r2_score > 0.7 ? ' Excellent' : 
                 data?.model_metrics?.r2_score > 0.5 ? ' Good' : ' Moderate'} predictive power
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <h3 className="font-semibold text-gray-800 mb-2">Learning Groups</h3>
              <p className="text-sm text-gray-600">
                Students categorized into {Object.keys(clusterCounts || {}).length} distinct 
                learning personas for targeted support
              </p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <BarChart 
            data={data?.cluster_summary?.[0]} 
            title="Average Cognitive Skills (Cluster 0)" 
          />
          <ScatterChart 
            data={data} 
            title="Attention vs Assessment Score"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <RadarChart 
            data={data} 
            title="Learning Profile (Sample Cluster)"
          />
          
          {/* Learning Personas */}
          <div className="card">
            <h3 className="text-xl font-bold mb-6">👥 Learning Personas</h3>
            <div className="space-y-4">
              {Object.entries(data?.personas || {}).map(([key, persona]) => (
                <div key={key} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">{persona.name}</h4>
                    <span className="text-sm text-gray-500">
                      {clusterCounts?.[parseInt(key.split('_')[1])] || 0} students
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{persona.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="font-medium text-gray-700 mb-1">Characteristics:</p>
                      <ul className="text-gray-600 space-y-1">
                        {persona.characteristics.slice(0, 2).map((char, idx) => (
                          <li key={idx}>• {char}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700 mb-1">Recommendations:</p>
                      <ul className="text-gray-600 space-y-1">
                        {persona.recommendations.slice(0, 2).map((rec, idx) => (
                          <li key={idx}>• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Table */}
        <DataTable data={data} />
      </main>
    </div>
  );
}