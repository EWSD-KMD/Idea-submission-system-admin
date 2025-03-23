export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Top Header Section */}
      <div className="mb-6 rounded-xl bg-white p-6 shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to Admin Portal</h1>
        <p className="mt-1 text-gray-600">Manage your data efficiently and securely.</p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow-md">📊 Dashboard Overview</div>
        <div className="rounded-lg bg-white p-6 shadow-md">👤 User Management</div>
        <div className="rounded-lg bg-white p-6 shadow-md">📂 Reports & Analytics</div>
        <div className="rounded-lg bg-white p-6 shadow-md">⚙️ System Settings</div>
      </div>
    </div>
  );
}