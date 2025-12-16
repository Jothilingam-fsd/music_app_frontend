import React from 'react';
import SongCard from '../components/SongCard';
import { useMusicContext } from '../context/MusicContext';

const PlaylistPage = ({ playlist, onShowComments }) => {
  const { removeFromPlaylist } = useMusicContext();

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">{playlist.name}</h2>
      <div className="space-y-4">
        {playlist.songs.map(song => (
          <SongCard
            key={song.id}
            song={song}
            showAddToPlaylist={false}
            onRemove={() => removeFromPlaylist(playlist.id, song.id)}
            onShowComments={onShowComments}
          />
        ))}
        {playlist.songs.length === 0 && (
          <p className="text-gray-400 text-center py-12">This playlist is empty</p>
        )}
      </div>
    </div>
  );
};

export default PlaylistPage;
