import React from 'react';
import SongCard from '../components/SongCard';
import { useMusicContext } from '../context/MusicContext';

const DownloadsPage = ({ onShowComments }) => {
  const { musicLibrary, downloadedSongs } = useMusicContext();

  const downloadedSongsList = musicLibrary.filter(s => downloadedSongs.has(s.id));

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Downloaded Songs</h2>
      <div className="space-y-4">
        {downloadedSongsList.map(song => (
          <SongCard key={song.id} song={song} onShowComments={onShowComments} />
        ))}
        {downloadedSongsList.length === 0 && (
          <p className="text-gray-400 text-center py-12">No downloaded songs yet</p>
        )}
      </div>
    </div>
  );
};

export default DownloadsPage;