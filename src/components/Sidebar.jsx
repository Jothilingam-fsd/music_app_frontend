import React from 'react';
import { Home, Library, Heart, Download, List, Plus } from 'lucide-react';

const Sidebar = ({ currentView, setCurrentView, playlists, onSelectPlaylist, onCreatePlaylist }) => {
  return (
    <aside className="w-64 bg-gray-800 border-r border-gray-700 p-4 overflow-y-auto">
      <nav className="space-y-2">
        <button
          onClick={() => setCurrentView('home')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${currentView === 'home' ? 'bg-purple-600' : 'hover:bg-gray-700'}`}
        >
          <Home size={20} />
          <span>Home</span>
        </button>
        <button
          onClick={() => setCurrentView('library')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${currentView === 'library' ? 'bg-purple-600' : 'hover:bg-gray-700'}`}
        >
          <Library size={20} />
          <span>Your Library</span>
        </button>
        <button
          onClick={() => setCurrentView('liked')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${currentView === 'liked' ? 'bg-purple-600' : 'hover:bg-gray-700'}`}
        >
          <Heart size={20} />
          <span>Liked Songs</span>
        </button>
        <button
          onClick={() => setCurrentView('downloads')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${currentView === 'downloads' ? 'bg-purple-600' : 'hover:bg-gray-700'}`}
        >
          <Download size={20} />
          <span>Downloads</span>
        </button>
      </nav>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-400 uppercase text-sm">Playlists</h3>
          <button
            onClick={onCreatePlaylist}
            className="text-purple-500 hover:text-purple-400"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="space-y-2">
          {playlists.map(playlist => (
            <button
              key={playlist.id}
              onClick={() => onSelectPlaylist(playlist)}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              <div className="flex items-center gap-2">
                <List size={16} />
                <span className="truncate">{playlist.name}</span>
                <span className="text-xs text-gray-500 ml-auto">{playlist.songs.length}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;