import React from 'react';
import SongCard from '../components/SongCard';
import { useMusicContext } from '../context/MusicContext';

const LikedSongsPage = ({ onShowComments }) => {
  const { musicLibrary, likedSongs } = useMusicContext();

  const likedSongsList = musicLibrary.filter(s => likedSongs.has(s.id));

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Liked Songs</h2>
      <div className="space-y-4">
        {likedSongsList.map(song => (
          <SongCard key={song.id} song={song} onShowComments={onShowComments} />
        ))}
        {likedSongsList.length === 0 && (
          <p className="text-gray-400 text-center py-12">No liked songs yet</p>
        )}
      </div>
    </div>
  );
};

export default LikedSongsPage;
