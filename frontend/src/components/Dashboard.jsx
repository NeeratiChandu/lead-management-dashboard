import { useState } from 'react';
import Analytics from './Analytics';
import LeadsTable from './LeadsTable';
import LeadDetails from './LeadDetails';

const Dashboard = ({ onLogout }) => {
  const [selectedLead, setSelectedLead] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Lead Management Dashboard</h1>
        <button onClick={() => { localStorage.removeItem('token'); onLogout(); }} className="bg-red-500 text-white px-4 py-2">Logout</button>
      </header>
      <Analytics />
      {selectedLead ? (
        <LeadDetails lead={selectedLead} onBack={() => setSelectedLead(null)} />
      ) : (
        <LeadsTable onSelectLead={setSelectedLead} />
      )}
    </div>
  );
};

export default Dashboard;