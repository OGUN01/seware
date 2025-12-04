import { useState } from 'react';
import { Plus, X, Trash2 } from 'lucide-react';
import { MasterData } from '../types';

interface AdminPanelProps {
  masterData: MasterData;
  onUpdate: (data: MasterData) => void;
}

export default function AdminPanel({ masterData, onUpdate }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'cities' | 'zones' | 'wards' | 'locations' | 'engineers' | 'executives'>('cities');
  const [newCity, setNewCity] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newEngineer, setNewEngineer] = useState('');
  const [newExecutive, setNewExecutive] = useState('');
  const [newZone, setNewZone] = useState({ city: '', zone: '' });
  const [newWard, setNewWard] = useState({ city: '', zone: '', ward: '' });

  const handleAddCity = () => {
    if (newCity.trim() && !masterData.cities.includes(newCity.trim())) {
      onUpdate({
        ...masterData,
        cities: [...masterData.cities, newCity.trim()]
      });
      setNewCity('');
    }
  };

  const handleRemoveCity = (city: string) => {
    onUpdate({
      ...masterData,
      cities: masterData.cities.filter(c => c !== city),
      zones: masterData.zones.filter(z => z.city !== city),
      wards: masterData.wards.filter(w => w.city !== city)
    });
  };

  const handleAddLocation = () => {
    if (newLocation.trim() && !masterData.locations.includes(newLocation.trim())) {
      onUpdate({
        ...masterData,
        locations: [...masterData.locations, newLocation.trim()]
      });
      setNewLocation('');
    }
  };

  const handleRemoveLocation = (location: string) => {
    onUpdate({
      ...masterData,
      locations: masterData.locations.filter(l => l !== location)
    });
  };

  const handleAddEngineer = () => {
    if (newEngineer.trim() && !masterData.engineers.includes(newEngineer.trim())) {
      onUpdate({
        ...masterData,
        engineers: [...masterData.engineers, newEngineer.trim()]
      });
      setNewEngineer('');
    }
  };

  const handleRemoveEngineer = (engineer: string) => {
    onUpdate({
      ...masterData,
      engineers: masterData.engineers.filter(e => e !== engineer)
    });
  };

  const handleAddExecutive = () => {
    if (newExecutive.trim() && !masterData.executiveEngineers.includes(newExecutive.trim())) {
      onUpdate({
        ...masterData,
        executiveEngineers: [...masterData.executiveEngineers, newExecutive.trim()]
      });
      setNewExecutive('');
    }
  };

  const handleRemoveExecutive = (executive: string) => {
    onUpdate({
      ...masterData,
      executiveEngineers: masterData.executiveEngineers.filter(e => e !== executive)
    });
  };

  const handleAddZone = () => {
    if (newZone.city && newZone.zone.trim()) {
      const existing = masterData.zones.find(z => z.city === newZone.city);
      if (existing) {
        if (!existing.zones.includes(newZone.zone.trim())) {
          onUpdate({
            ...masterData,
            zones: masterData.zones.map(z =>
              z.city === newZone.city
                ? { ...z, zones: [...z.zones, newZone.zone.trim()] }
                : z
            )
          });
        }
      } else {
        onUpdate({
          ...masterData,
          zones: [...masterData.zones, { city: newZone.city, zones: [newZone.zone.trim()] }]
        });
      }
      setNewZone({ city: '', zone: '' });
    }
  };

  const handleRemoveZone = (city: string, zone: string) => {
    onUpdate({
      ...masterData,
      zones: masterData.zones.map(z =>
        z.city === city
          ? { ...z, zones: z.zones.filter(zn => zn !== zone) }
          : z
      ).filter(z => z.zones.length > 0),
      wards: masterData.wards.filter(w => !(w.city === city && w.zone === zone))
    });
  };

  const handleAddWard = () => {
    if (newWard.city && newWard.zone && newWard.ward.trim()) {
      const existing = masterData.wards.find(w => w.city === newWard.city && w.zone === newWard.zone);
      if (existing) {
        if (!existing.wards.includes(newWard.ward.trim())) {
          onUpdate({
            ...masterData,
            wards: masterData.wards.map(w =>
              w.city === newWard.city && w.zone === newWard.zone
                ? { ...w, wards: [...w.wards, newWard.ward.trim()] }
                : w
            )
          });
        }
      } else {
        onUpdate({
          ...masterData,
          wards: [...masterData.wards, { city: newWard.city, zone: newWard.zone, wards: [newWard.ward.trim()] }]
        });
      }
      setNewWard({ city: '', zone: '', ward: '' });
    }
  };

  const handleRemoveWard = (city: string, zone: string, ward: string) => {
    onUpdate({
      ...masterData,
      wards: masterData.wards.map(w =>
        w.city === city && w.zone === zone
          ? { ...w, wards: w.wards.filter(wd => wd !== ward) }
          : w
      ).filter(w => w.wards.length > 0)
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Admin Panel - Master Data</h2>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('cities')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'cities' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Cities
          </button>
          <button
            onClick={() => setActiveTab('zones')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'zones' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Zones
          </button>
          <button
            onClick={() => setActiveTab('wards')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'wards' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Wards
          </button>
          <button
            onClick={() => setActiveTab('locations')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'locations' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Locations
          </button>
          <button
            onClick={() => setActiveTab('engineers')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'engineers' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Engineers
          </button>
          <button
            onClick={() => setActiveTab('executives')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'executives' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Executive Engineers
          </button>
        </div>

        {activeTab === 'cities' && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddCity()}
                placeholder="Enter city name..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                onClick={handleAddCity}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add City
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {masterData.cities.map(city => (
                <div key={city} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-900">{city}</span>
                  <button
                    onClick={() => handleRemoveCity(city)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'zones' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <select
                value={newZone.city}
                onChange={(e) => setNewZone({ ...newZone, city: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select City</option>
                {masterData.cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newZone.zone}
                  onChange={(e) => setNewZone({ ...newZone, zone: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddZone()}
                  placeholder="Zone number..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button
                  onClick={handleAddZone}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {masterData.zones.map(({ city, zones }) => (
                <div key={city} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">{city}</h3>
                  <div className="flex flex-wrap gap-2">
                    {zones.map(zone => (
                      <div key={zone} className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg">
                        <span className="text-sm text-gray-700">Zone {zone}</span>
                        <button
                          onClick={() => handleRemoveZone(city, zone)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'wards' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <select
                value={newWard.city}
                onChange={(e) => setNewWard({ ...newWard, city: e.target.value, zone: '' })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select City</option>
                {masterData.cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <select
                value={newWard.zone}
                onChange={(e) => setNewWard({ ...newWard, zone: e.target.value })}
                disabled={!newWard.city}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100"
              >
                <option value="">Select Zone</option>
                {masterData.zones.find(z => z.city === newWard.city)?.zones.map(zone => (
                  <option key={zone} value={zone}>Zone {zone}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newWard.ward}
                  onChange={(e) => setNewWard({ ...newWard, ward: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddWard()}
                  placeholder="Ward number..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button
                  onClick={handleAddWard}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {masterData.wards.map(({ city, zone, wards }) => (
                <div key={`${city}-${zone}`} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{city}</h3>
                  <p className="text-sm text-gray-600 mb-3">Zone {zone}</p>
                  <div className="flex flex-wrap gap-2">
                    {wards.map(ward => (
                      <div key={ward} className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg">
                        <span className="text-sm text-gray-700">Ward {ward}</span>
                        <button
                          onClick={() => handleRemoveWard(city, zone, ward)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'locations' && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddLocation()}
                placeholder="Enter location name..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                onClick={handleAddLocation}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Location
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {masterData.locations.map(location => (
                <div key={location} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-900">{location}</span>
                  <button
                    onClick={() => handleRemoveLocation(location)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'engineers' && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newEngineer}
                onChange={(e) => setNewEngineer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddEngineer()}
                placeholder="Enter engineer name..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                onClick={handleAddEngineer}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Engineer
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {masterData.engineers.map(engineer => (
                <div key={engineer} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-900">{engineer}</span>
                  <button
                    onClick={() => handleRemoveEngineer(engineer)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'executives' && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newExecutive}
                onChange={(e) => setNewExecutive(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddExecutive()}
                placeholder="Enter executive engineer name..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                onClick={handleAddExecutive}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Executive
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {masterData.executiveEngineers.map(executive => (
                <div key={executive} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-900">{executive}</span>
                  <button
                    onClick={() => handleRemoveExecutive(executive)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
