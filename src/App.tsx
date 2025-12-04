import { useState } from 'react';
import { Hammer, Menu, X, FileText, History, Settings } from 'lucide-react';
import NewEntryForm from './components/NewEntryForm';
import WorkHistory from './components/WorkHistory';
import AdminPanel from './components/AdminPanel';
import Toast from './components/Toast';
import { WorkEntry, MasterData } from './types';
import { dummyEntries, masterData as initialMasterData } from './data';

type Tab = 'new-entry' | 'history' | 'admin';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('new-entry');
  const [menuOpen, setMenuOpen] = useState(false);
  const [entries, setEntries] = useState<WorkEntry[]>(dummyEntries);
  const [masterData, setMasterData] = useState<MasterData>(initialMasterData);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSaveEntry = (newEntry: Omit<WorkEntry, 'id'>) => {
    const entry: WorkEntry = {
      ...newEntry,
      id: Date.now().toString()
    };

    setEntries(prev => [entry, ...prev]);

    const formattedDate = new Date(entry.date).toLocaleDateString('en-GB');
    setToastMessage(
      `Entry saved for ${formattedDate} – Zone ${entry.zone}, Ward ${entry.ward}, ${entry.location}.`
    );

    setActiveTab('history');
  };

  const handleUpdateMasterData = (data: MasterData) => {
    setMasterData(data);
    setToastMessage('Master data updated successfully.');
  };

  const handleNavigate = (tab: Tab) => {
    setActiveTab(tab);
    setMenuOpen(false);
  };

  const menuItems = [
    { id: 'new-entry' as Tab, label: 'New Entry', icon: FileText },
    { id: 'history' as Tab, label: 'Work History', icon: History },
    { id: 'admin' as Tab, label: 'Admin Panel', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
              <Hammer className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">VARMAN Equipment Services</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Work Management System</p>
            </div>
          </div>

          <div className="w-10"></div>
        </div>
      </header>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMenuOpen(false)}
          />
          <nav className="fixed top-16 left-0 w-72 bg-white shadow-xl z-50 border-r border-gray-200 h-[calc(100vh-4rem)]">
            <div className="p-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-orange-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'new-entry' && (
          <NewEntryForm onSave={handleSaveEntry} />
        )}
        {activeTab === 'history' && <WorkHistory entries={entries} />}
        {activeTab === 'admin' && (
          <AdminPanel
            masterData={masterData}
            onUpdate={handleUpdateMasterData}
          />
        )}
      </main>

      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}

export default App;
