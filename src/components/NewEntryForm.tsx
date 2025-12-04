import { useState } from 'react';
import { Camera, Video, X, Download, MapPin } from 'lucide-react';
import { WorkEntry, MediaFile } from '../types';
import { masterData } from '../data';
import NumericInput from './NumericInput';

interface NewEntryFormProps {
  onSave: (entry: Omit<WorkEntry, 'id'>) => void;
}

export default function NewEntryForm({ onSave }: NewEntryFormProps) {
  const [formData, setFormData] = useState({
    city: '',
    date: new Date().toISOString().split('T')[0],
    zone: '',
    ward: '',
    location: '',
    landMark: '',
    shmr: 0,
    chmr: 0,
    noOfHrs: 0,
    assistantEngineer: '',
    assistantExecutiveEngineer: '',
    remarks: ''
  });

  const [photos, setPhotos] = useState<MediaFile[]>([]);
  const [videos, setVideos] = useState<MediaFile[]>([]);
  const [showMapPreview, setShowMapPreview] = useState(false);

  const availableZones = masterData.zones.find(z => z.city === formData.city)?.zones || [];
  const availableWards = masterData.wards.find(
    w => w.city === formData.city && w.zone === formData.zone
  )?.wards || [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'city') {
        updated.zone = '';
        updated.ward = '';
      }
      if (name === 'zone') {
        updated.ward = '';
      }
      return updated;
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).map((file, index) => ({
        id: `photo-${Date.now()}-${index}`,
        name: file.name,
        url: 'https://images.pexels.com/photos/1128408/pexels-photo-1128408.jpeg?auto=compress&cs=tinysrgb&w=400',
        caption: ''
      }));
      setPhotos(prev => [...prev, ...newPhotos]);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newVideos = Array.from(files).map((file, index) => ({
        id: `video-${Date.now()}-${index}`,
        name: file.name,
        url: '#',
        size: `${(Math.random() * 30 + 10).toFixed(1)} MB`,
        duration: `${Math.floor(Math.random() * 3 + 1)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`
      }));
      setVideos(prev => [...prev, ...newVideos]);
    }
  };

  const handlePhotoCaption = (id: string, caption: string) => {
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, caption } : p));
  };

  const removePhoto = (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  const removeVideo = (id: string) => {
    setVideos(prev => prev.filter(v => v.id !== id));
  };

  const handleDownloadVideo = (video: MediaFile) => {
    alert(`Downloading ${video.name}...`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.city || !formData.date || !formData.zone || !formData.ward ||
        !formData.location || !formData.shmr || !formData.chmr || !formData.noOfHrs) {
      alert('Please fill in all required fields.');
      return;
    }

    onSave({
      city: formData.city,
      date: formData.date,
      zone: formData.zone,
      ward: formData.ward,
      location: formData.location,
      landMark: formData.landMark,
      landMarkLat: 9.9252 + Math.random() * 0.1,
      landMarkLng: 78.1198 + Math.random() * 0.1,
      shmr: formData.shmr,
      chmr: formData.chmr,
      noOfHrs: formData.noOfHrs,
      assistantEngineer: formData.assistantEngineer,
      assistantExecutiveEngineer: formData.assistantExecutiveEngineer,
      remarks: formData.remarks,
      photos,
      videos
    });
  };

  const handleClear = () => {
    setFormData({
      city: '',
      date: new Date().toISOString().split('T')[0],
      zone: '',
      ward: '',
      location: '',
      landMark: '',
      shmr: 0,
      chmr: 0,
      noOfHrs: 0,
      assistantEngineer: '',
      assistantExecutiveEngineer: '',
      remarks: ''
    });
    setPhotos([]);
    setVideos([]);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">New Work Entry</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City / Corporation <span className="text-red-500">*</span>
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            >
              <option value="">Select City</option>
              {masterData.cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Zone <span className="text-red-500">*</span>
            </label>
            <select
              name="zone"
              value={formData.zone}
              onChange={handleChange}
              disabled={!formData.city}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
              required
            >
              <option value="">Select Zone</option>
              {availableZones.map(zone => (
                <option key={zone} value={zone}>Zone {zone}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ward <span className="text-red-500">*</span>
            </label>
            <select
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              disabled={!formData.zone}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
              required
            >
              <option value="">Select Ward</option>
              {availableWards.map(ward => (
                <option key={ward} value={ward}>Ward {ward}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            >
              <option value="">Select Location</option>
              {masterData.locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Land Mark</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="landMark"
                value={formData.landMark}
                onChange={handleChange}
                placeholder="e.g., SOLAIALAGUPURAM"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowMapPreview(!showMapPreview)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"
              >
                <MapPin className="w-5 h-5 text-gray-600" />
                Map
              </button>
            </div>
            {showMapPreview && formData.landMark && (
              <div className="mt-3 border border-gray-300 rounded-lg overflow-hidden">
                <div className="bg-gray-100 p-3 border-b border-gray-300 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-gray-700">{formData.landMark}</span>
                </div>
                <div className="relative h-64 bg-gray-200">
                  <img
                    src="https://images.pexels.com/photos/2682683/pexels-photo-2682683.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Map Preview"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-2">
                      <MapPin className="w-6 h-6 text-orange-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Location Marker</p>
                        <p className="text-xs text-gray-500">Google Maps Integration</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <NumericInput
              value={formData.shmr}
              onChange={(value) => setFormData(prev => ({ ...prev, shmr: value }))}
              label="SHMR (Start Hour Meter)"
              min={0}
              max={10000}
              step={0.1}
              required
            />
          </div>

          <div className="md:col-span-2">
            <NumericInput
              value={formData.chmr}
              onChange={(value) => setFormData(prev => ({ ...prev, chmr: value }))}
              label="CHMR (Closing Hour Meter)"
              min={0}
              max={10000}
              step={0.1}
              required
            />
          </div>

          <div className="md:col-span-2">
            <NumericInput
              value={formData.noOfHrs}
              onChange={(value) => setFormData(prev => ({ ...prev, noOfHrs: value }))}
              label="No. of Hours"
              min={0}
              max={24}
              step={0.1}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assistant Engineer</label>
            <select
              name="assistantEngineer"
              value={formData.assistantEngineer}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select Engineer</option>
              {masterData.engineers.map(engineer => (
                <option key={engineer} value={engineer}>{engineer}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assistant Executive Engineer</label>
            <select
              name="assistantExecutiveEngineer"
              value={formData.assistantExecutiveEngineer}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select Executive Engineer</option>
              {masterData.executiveEngineers.map(engineer => (
                <option key={engineer} value={engineer}>{engineer}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Jetting done, no blockage observed."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Photos & Videos</h3>

        <div className="space-y-6">
          <div>
            <label className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 cursor-pointer transition-colors">
              <Camera className="w-5 h-5 mr-2" />
              Add Photos
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>

            {photos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {photos.map(photo => (
                  <div key={photo.id} className="relative group">
                    <img
                      src={photo.url}
                      alt={photo.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(photo.id)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <input
                      type="text"
                      placeholder="Add caption..."
                      value={photo.caption || ''}
                      onChange={(e) => handlePhotoCaption(photo.id, e.target.value)}
                      className="w-full mt-2 px-2 py-1 text-sm border border-gray-300 rounded"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 cursor-pointer transition-colors">
              <Video className="w-5 h-5 mr-2" />
              Add Videos
              <input
                type="file"
                accept="video/*"
                multiple
                onChange={handleVideoUpload}
                className="hidden"
              />
            </label>

            {videos.length > 0 && (
              <div className="mt-4 space-y-3">
                {videos.map(video => (
                  <div key={video.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                    <div className="relative flex-shrink-0">
                      <div className="w-20 h-20 bg-gray-900 rounded-lg flex items-center justify-center">
                        <Video className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{video.name}</p>
                      <p className="text-sm text-gray-500">{video.size} • {video.duration}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDownloadVideo(video)}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button
                      type="button"
                      onClick={() => removeVideo(video.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p className="mt-3 text-sm text-gray-500">
              Videos are available for download only. Click Download to save the original file.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
        >
          Save Entry
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
        >
          Clear Form
        </button>
      </div>
    </form>
  );
}
