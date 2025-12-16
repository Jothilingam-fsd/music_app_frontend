import React from 'react';
import { useMusicContext } from '../context/MusicContext';

const LibraryPage = ({ onSelectPlaylist }) => {
  const { playlists } = useMusicContext();

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Your Library</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {playlists.map(playlist => (
          <div
            key={playlist.id}
            onClick={() => onSelectPlaylist(playlist)}
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 cursor-pointer transition"
          >
            <div className="text-4xl mb-4">📚</div>
            <h3 className="font-semibold text-lg mb-2">{playlist.name}</h3>
            <p className="text-gray-400 text-sm">{playlist.songs.length} songs</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryPage;