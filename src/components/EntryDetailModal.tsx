import { X, Download, Video } from 'lucide-react';
import { WorkEntry } from '../types';
import { useState } from 'react';

interface EntryDetailModalProps {
  entry: WorkEntry;
  onClose: () => void;
}

export default function EntryDetailModal({ entry, onClose }: EntryDetailModalProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB');
  };

  const handleDownloadVideo = (videoName: string) => {
    alert(`Downloading ${videoName}...`);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Work Entry Details</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-500 mb-1">City / Corporation</label>
                  <p className="text-gray-900">{entry.city}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Date</label>
                  <p className="text-gray-900">{formatDate(entry.date)}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Zone</label>
                  <p className="text-gray-900">{entry.zone}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Ward</label>
                  <p className="text-gray-900">{entry.ward}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">No. of Hours</label>
                  <p className="text-gray-900 font-semibold">{entry.noOfHrs}</p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Location</label>
                  <p className="text-gray-900">{entry.location}</p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Land Mark</label>
                  <p className="text-gray-900">{entry.landMark}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">SHMR</label>
                  <p className="text-gray-900">{entry.shmr}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">CHMR</label>
                  <p className="text-gray-900">{entry.chmr}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Assistant Engineer</label>
                  <p className="text-gray-900">{entry.assistantEngineer}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Assistant Executive Engineer</label>
                  <p className="text-gray-900">{entry.assistantExecutiveEngineer}</p>
                </div>

                {entry.remarks && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-500 mb-1">Remarks</label>
                    <p className="text-gray-900">{entry.remarks}</p>
                  </div>
                )}
              </div>

              {entry.photos.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Photos</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {entry.photos.map(photo => (
                      <div key={photo.id} className="space-y-2">
                        <img
                          src={photo.url}
                          alt={photo.caption || photo.name}
                          onClick={() => setSelectedPhoto(photo.url)}
                          className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                        />
                        {photo.caption && (
                          <p className="text-sm text-gray-600">{photo.caption}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {entry.videos.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Videos</h3>
                  <div className="space-y-3">
                    {entry.videos.map(video => (
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
                          onClick={() => handleDownloadVideo(video.name)}
                          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedPhoto && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-90 z-[60]" onClick={() => setSelectedPhoto(null)} />
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedPhoto}
              alt="Enlarged view"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </>
      )}
    </>
  );
}
