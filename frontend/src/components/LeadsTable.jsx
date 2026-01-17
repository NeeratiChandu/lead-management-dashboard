import { useEffect, useState } from 'react';
import api from '../api';

const LeadsTable = ({ onSelectLead }) => {
  const [leads, setLeads] = useState([]);
  const [filters, setFilters] = useState({ search: '', stage: '', source: '', sort: 'createdAt:desc', page: 1 });
  const [totalPages, setTotalPages] = useState(1);

  const fetchLeads = async () => {
    const params = new URLSearchParams(filters);
    const res = await api.get(`/leads?${params}`);
    setLeads(res.data.leads);
    setTotalPages(res.data.pages);
  };

  useEffect(() => { fetchLeads(); }, [filters]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
          className="p-2 border"
        />
        <select value={filters.stage} onChange={(e) => setFilters({ ...filters, stage: e.target.value, page: 1 })} className="p-2 border">
          <option value="">All Stages</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="converted">Converted</option>
        </select>
        <select value={filters.source} onChange={(e) => setFilters({ ...filters, source: e.target.value, page: 1 })} className="p-2 border">
          <option value="">All Sources</option>
          <option value="website">Website</option>
          <option value="referral">Referral</option>
          <option value="social">Social</option>
          <option value="cold-call">Cold Call</option>
        </select>
        <select value={filters.sort} onChange={(e) => setFilters({ ...filters, sort: e.target.value, page: 1 })} className="p-2 border">
          <option value="createdAt:desc">Newest</option>
          <option value="name:asc">Name A-Z</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Stage</th>
              <th className="p-2">Source</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <tr key={lead._id} className="border-t">
                <td className="p-2">{lead.name}</td>
                <td className="p-2">{lead.email}</td>
                <td className="p-2">{lead.stage}</td>
                <td className="p-2">{lead.source}</td>
                <td className="p-2">
                  <button onClick={() => onSelectLead(lead)} className="bg-blue-500 text-white px-2 py-1">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button
          disabled={filters.page <= 1}
          onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
          className="bg-gray-500 text-white px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {filters.page} of {totalPages}</span>
        <button
          disabled={filters.page >= totalPages}
          onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
          className="bg-gray-500 text-white px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LeadsTable;