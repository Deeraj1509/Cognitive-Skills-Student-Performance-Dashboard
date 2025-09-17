import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import RadarChart from "../../components/RadarChart";
import { ArrowLeft, User, Award, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function StudentProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;

      try {
        const response = await fetch("/data/student_processed.json");
        const jsonData = await response.json();
        setData(jsonData);

        const foundStudent = jsonData.students.find(
          (s) => s.student_id === parseInt(id)
        );
        setStudent(foundStudent);
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Student Not Found
          </h2>
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const persona = data?.personas?.[`cluster_${student.cluster}`];
  const averageScore = data?.summary_stats?.average_score || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Link
              href="/"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Student Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 rounded-full p-3 mr-4">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {student.name}
              </h1>
              <p className="text-gray-600">
                Student ID: {student.student_id} • Class: {student.class}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="stat-card">
              <div className="flex items-center">
                <Award className="h-6 w-6 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">
                    Assessment Score
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    {student.assessment_score.toFixed(1)}
                  </p>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="flex items-center">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">
                    vs Average
                  </p>
                  <p
                    className={`text-xl font-bold ${
                      student.assessment_score > averageScore
                        ? "text-green-600"
                        : "text-orange-600"
                    }`}
                  >
                    {student.assessment_score > averageScore ? "+" : ""}
                    {(student.assessment_score - averageScore).toFixed(1)}
                  </p>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="flex items-center">
                <User className="h-6 w-6 text-purple-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">
                    Learning Group
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    {persona?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Radar Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <RadarChart
              data={data}
              studentId={id}
              title={`${student.name}'s Cognitive Profile`}
            />
          </div>

          {/* Student Details */}
          <div className="space-y-6">
            {/* Cognitive Skills Breakdown */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">
                Cognitive Skills Breakdown
              </h3>
              <div className="space-y-4">
                {[
                  { skill: "Comprehension", value: student.comprehension },
                  { skill: "Attention", value: student.attention },
                  { skill: "Focus", value: student.focus },
                  { skill: "Retention", value: student.retention },
                  { skill: "Engagement", value: student.engagement_time },
                ].map(({ skill, value }) => (
                  <div key={skill}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{skill}</span>
                      <span className="text-gray-600">
                        {value.toFixed(2)}/10
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min((value / 10) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Persona */}
            {persona && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Learning Persona: {persona.name}
                </h3>
                <p className="text-gray-600 mb-4">{persona.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      Characteristics
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {persona.characteristics.map((char, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {char}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      Recommendations
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {persona.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
