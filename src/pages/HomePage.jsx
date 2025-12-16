import React from 'react';
import SongCard from '../components/SongCard';

const HomePage = ({ songs, onShowComments }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Discover Music</h2>
      <div className="space-y-4">
        {songs.map(song => (
          <SongCard key={song.id} song={song} onShowComments={onShowComments} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;