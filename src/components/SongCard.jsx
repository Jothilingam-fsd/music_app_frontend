import React, { useState } from 'react';
import { Play, Pause, Heart, MessageCircle, Download, Plus } from 'lucide-react';
import { useMusicContext } from '../context/MusicContext';

const SongCard = ({ song, showAddToPlaylist = true, onRemove, onShowComments }) => {
  const {
    currentSong,
    isPlaying,
    likedSongs,
    downloadedSongs,
    playlists,
    handleSongSelect,
    toggleLike,
    downloadSong,
    addToPlaylist,
  } = useMusicContext();

  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    await downloadSong(song);
    setIsDownloading(false);
  };

  const handleAddToPlaylist = (playlistId, playlistName) => {
    addToPlaylist(playlistId, song);
    setShowPlaylistMenu(false);
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
    notification.textContent = `Added "${song.title}" to ${playlistName}`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition">
      <div className="flex items-center gap-4">
        <div className="text-4xl">{song.image}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{song.title}</h3>
          <p className="text-sm text-gray-400 truncate">{song.artist}</p>
          <p className="text-xs text-gray-500">{song.album} • {song.genre}</p>
          {song.movie && <p className="text-xs text-purple-400">🎬 {song.movie}</p>}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSongSelect(song)}
            className="p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition"
            title="Play/Pause"
          >
            {currentSong?.id === song.id && isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button
            onClick={() => toggleLike(song.id)}
            className={`p-2 rounded-full transition ${likedSongs.has(song.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
            title={likedSongs.has(song.id) ? 'Unlike' : 'Like'}
          >
            <Heart size={20} fill={likedSongs.has(song.id) ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={() => onShowComments(song.id)}
            className="p-2 text-gray-400 hover:text-blue-500 rounded-full transition"
            title="Comments"
          >
            <MessageCircle size={20} />
          </button>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`p-2 rounded-full transition ${downloadedSongs.has(song.id) ? 'text-green-500' : 'text-gray-400 hover:text-green-500'} ${isDownloading ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={isDownloading ? 'Downloading...' : downloadedSongs.has(song.id) ? 'Downloaded' : 'Download'}
          >
            <Download size={20} className={isDownloading ? 'animate-bounce' : ''} />
          </button>
          {showAddToPlaylist && (
            <div className="relative">
              <button 
                onClick={() => setShowPlaylistMenu(!showPlaylistMenu)}
                className="p-2 text-gray-400 hover:text-purple-500 rounded-full transition"
                title="Add to Playlist"
              >
                <Plus size={20} />
              </button>
              {showPlaylistMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-10"
                    onClick={() => setShowPlaylistMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl z-20 border border-gray-700">
                    <div className="py-2">
                      {playlists.map(pl => (
                        <button
                          key={pl.id}
                          onClick={() => handleAddToPlaylist(pl.id, pl.name)}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-sm transition"
                        >
                          {pl.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          {onRemove && (
            <button
              onClick={onRemove}
              className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition"
              title="Remove from Playlist"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongCard;