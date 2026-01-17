import { useEffect, useState } from 'react';
import api from '../api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Analytics = () => {
  const [metrics, setMetrics] = useState({ total: 0, converted: 0, stages: [] });

  useEffect(() => {
    const fetchMetrics = async () => {
      const res = await api.get('/leads?limit=1000');
      const leads = res.data.leads;
      const total = leads.length;
      const converted = leads.filter(l => l.stage === 'converted').length;
      const stages = ['new', 'contacted', 'qualified', 'converted'].map(stage => ({
        stage,
        count: leads.filter(l => l.stage === stage).length,
      }));
      setMetrics({ total, converted, stages });
    };
    fetchMetrics();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded shadow">Total Leads: {metrics.total}</div>
      <div className="bg-white p-4 rounded shadow">Converted Leads: {metrics.converted}</div>
      <div className="bg-white p-4 rounded shadow">
        <h3>Leads by Stage</h3>
        <BarChart width={300} height={200} data={metrics.stages}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="stage" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default Analytics;