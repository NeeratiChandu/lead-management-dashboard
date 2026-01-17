const LeadDetails = ({ lead, onBack }) => {
  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
      <button onClick={onBack} className="mb-4 bg-gray-500 text-white px-4 py-2">Back</button>
      <h2 className="text-2xl mb-4">{lead.name}</h2>
      <p><strong>Email:</strong> {lead.email}</p>
      <p><strong>Phone:</strong> {lead.phone}</p>
      <p><strong>Company:</strong> {lead.company}</p>
      <p><strong>Stage:</strong> {lead.stage}</p>
      <p><strong>Source:</strong> {lead.source}</p>
      <p><strong>Created:</strong> {new Date(lead.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default LeadDetails;