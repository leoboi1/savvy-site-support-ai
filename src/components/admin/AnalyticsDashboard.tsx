
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatAnalytics } from "@/types/chatbot-types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface AnalyticsDashboardProps {
  analytics: ChatAnalytics;
}

export function AnalyticsDashboard({ analytics }: AnalyticsDashboardProps) {
  const { totalSessions, averageSessionDuration, queryResolutionRate, commonQueries, userSatisfactionScore, peakUsageTimes } = analytics;
  
  // Format data for charts
  const pieData = [
    { name: "Resolved", value: queryResolutionRate },
    { name: "Unresolved", value: 100 - queryResolutionRate },
  ];
  
  const COLORS = ["#10B981", "#F59E0B"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Total Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Total Sessions</CardTitle>
          <CardDescription>Number of chat sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{totalSessions.toLocaleString()}</div>
        </CardContent>
      </Card>

      {/* Average Duration */}
      <Card>
        <CardHeader>
          <CardTitle>Average Duration</CardTitle>
          <CardDescription>Time spent in chat</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{averageSessionDuration.toFixed(2)} mins</div>
        </CardContent>
      </Card>

      {/* Resolution Rate */}
      <Card>
        <CardHeader>
          <CardTitle>Query Resolution</CardTitle>
          <CardDescription>Successfully resolved queries</CardDescription>
        </CardHeader>
        <CardContent className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* User Satisfaction */}
      <Card>
        <CardHeader>
          <CardTitle>User Satisfaction</CardTitle>
          <CardDescription>Average rating out of 5</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{userSatisfactionScore.toFixed(1)}/5</div>
          <div className="flex mt-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-2xl ${i < Math.round(userSatisfactionScore) ? "text-yellow-500" : "text-gray-300"}`}>
                ★
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Common Queries */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Common Queries</CardTitle>
          <CardDescription>Most frequent user questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {commonQueries.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="truncate max-w-[70%]">{item.query}</span>
                <span className="bg-savvy-bubble-user rounded-full px-2 py-1 text-xs font-medium">
                  {item.count} times
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage By Hour */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Usage by Hour</CardTitle>
          <CardDescription>When your customers are most active</CardDescription>
        </CardHeader>
        <CardContent className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={peakUsageTimes}>
              <XAxis dataKey="hour" tickFormatter={(hour) => `${hour}:00`} />
              <YAxis />
              <Tooltip 
                labelFormatter={(hour) => `${hour}:00 - ${hour+1}:00`}
                formatter={(value) => [`${value} sessions`, "Count"]}
              />
              <Bar dataKey="count" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
