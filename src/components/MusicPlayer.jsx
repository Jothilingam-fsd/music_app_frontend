import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle, Share2 } from 'lucide-react';
import { useMusicContext } from '../context/MusicContext';

const MusicPlayer = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isRepeat,
    isShuffle,
    setVolume,
    setIsMuted,
    setIsRepeat,
    setIsShuffle,
    handlePlayPause,
    handleNext,
    handlePrevious,
    handleSeek,
  } = useMusicContext();

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="text-3xl">{currentSong.image}</div>
            <div className="min-w-0">
              <h4 className="font-semibold truncate">{currentSong.title}</h4>
              <p className="text-sm text-gray-400 truncate">{currentSong.artist}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsShuffle(!isShuffle)}
              className={`p-2 rounded-full transition ${isShuffle ? 'text-purple-500' : 'text-gray-400 hover:text-white'}`}
            >
              <Shuffle size={20} />
            </button>
            <button onClick={handlePrevious} className="p-2 hover:text-purple-500 transition">
              <SkipBack size={24} />
            </button>
            <button
              onClick={handlePlayPause}
              className="p-3 bg-purple-600 rounded-full hover:bg-purple-700 transition"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button onClick={handleNext} className="p-2 hover:text-purple-500 transition">
              <SkipForward size={24} />
            </button>
            <button
              onClick={() => setIsRepeat(!isRepeat)}
              className={`p-2 rounded-full transition ${isRepeat ? 'text-purple-500' : 'text-gray-400 hover:text-white'}`}
            >
              <Repeat size={20} />
            </button>
          </div>

          <div className="flex items-center gap-3 flex-1 justify-end">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 hover:text-purple-500 transition"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-24"
            />
            <button className="p-2 hover:text-purple-500 transition">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400 w-12 text-right">{formatTime(currentTime)}</span>
          <div
            onClick={handleSeek}
            className="flex-1 h-2 bg-gray-700 rounded-full cursor-pointer"
          >
            <div
              className="h-full bg-purple-600 rounded-full transition-all"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <span className="text-sm text-gray-400 w-12">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;