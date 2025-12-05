import React, { useState, useEffect, useRef } from 'react';
import { Search, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart, MessageCircle, Share2, Plus, Download, Repeat, Shuffle, List, Music, User, Home, Library, X } from 'lucide-react';

const MusicStreamingApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [playlists, setPlaylists] = useState([
    { id: 1, name: 'My Favorites', songs: [] },
    { id: 2, name: 'Workout Mix', songs: [] }
  ]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [likedSongs, setLikedSongs] = useState(new Set());
  const [comments, setComments] = useState({});
  const [showComments, setShowComments] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [downloadedSongs, setDownloadedSongs] = useState(new Set());
  
  const audioRef = useRef(null);

  // Sample music data
  const [musicLibrary] = useState([
    { id: 1, title: 'Midnight Dreams', artist: 'Luna Echo', album: 'Starlight', genre: 'Electronic', duration: 245, image: '🎵', movie: null },
    { id: 2, title: 'Summer Vibes', artist: 'The Waves', album: 'Beach Life', genre: 'Pop', duration: 198, image: '🌊', movie: null },
    { id: 3, title: 'Lost in Tokyo', artist: 'Neon Pulse', album: 'City Lights', genre: 'Synthwave', duration: 267, image: '🗼', movie: null },
    { id: 4, title: 'Rise Up', artist: 'Echo Warriors', album: 'Motivation', genre: 'Rock', duration: 223, image: '⚡', movie: null },
    { id: 5, title: 'Calm Waters', artist: 'Peaceful Mind', album: 'Meditation', genre: 'Ambient', duration: 312, image: '🌅', movie: null },
    { id: 6, title: 'Dance Floor', artist: 'DJ Vibe', album: 'Party Night', genre: 'EDM', duration: 189, image: '💃', movie: null },
    { id: 7, title: 'Ae Dil Hai Mushkil', artist: 'Arijit Singh', album: 'ADHM', genre: 'Bollywood', duration: 256, image: '🎬', movie: 'Ae Dil Hai Mushkil' },
    { id: 8, title: 'Kesariya', artist: 'Arijit Singh', album: 'Brahmastra', genre: 'Bollywood', duration: 267, image: '🔥', movie: 'Brahmastra' },
  ]);

  const [filteredMusic, setFilteredMusic] = useState(musicLibrary);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredMusic(musicLibrary);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = musicLibrary.filter(song =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        song.album.toLowerCase().includes(query) ||
        song.genre.toLowerCase().includes(query) ||
        (song.movie && song.movie.toLowerCase().includes(query))
      );
      setFilteredMusic(filtered);
    }
  }, [searchQuery, musicLibrary]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNext();
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isRepeat, currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (!currentSong) {
      setCurrentSong(filteredMusic[0]);
      return;
    }
    
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSongSelect = (song) => {
    if (currentSong?.id === song.id) {
      handlePlayPause();
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      setTimeout(() => audioRef.current?.play(), 100);
    }
  };

  const handleNext = () => {
    const currentIndex = filteredMusic.findIndex(s => s.id === currentSong?.id);
    let nextIndex;
    
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * filteredMusic.length);
    } else {
      nextIndex = (currentIndex + 1) % filteredMusic.length;
    }
    
    setCurrentSong(filteredMusic[nextIndex]);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 100);
  };

  const handlePrevious = () => {
    if (currentTime > 3) {
      audioRef.current.currentTime = 0;
    } else {
      const currentIndex = filteredMusic.findIndex(s => s.id === currentSong?.id);
      const prevIndex = currentIndex === 0 ? filteredMusic.length - 1 : currentIndex - 1;
      setCurrentSong(filteredMusic[prevIndex]);
      setIsPlaying(true);
      setTimeout(() => audioRef.current?.play(), 100);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    audio.currentTime = percentage * duration;
  };

  const toggleLike = (songId) => {
    setLikedSongs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(songId)) {
        newSet.delete(songId);
      } else {
        newSet.add(songId);
      }
      return newSet;
    });
  };

  const addComment = (songId) => {
    if (!newComment.trim()) return;
    
    setComments(prev => ({
      ...prev,
      [songId]: [...(prev[songId] || []), {
        id: Date.now(),
        text: newComment,
        user: 'Current User',
        timestamp: new Date().toLocaleString()
      }]
    }));
    setNewComment('');
  };

  const downloadSong = (songId) => {
    setDownloadedSongs(prev => new Set([...prev, songId]));
    // Simulate download
    alert('Song downloaded for offline listening!');
  };

  const createPlaylist = () => {
    if (!newPlaylistName.trim()) return;
    
    const newPlaylist = {
      id: Date.now(),
      name: newPlaylistName,
      songs: []
    };
    setPlaylists([...playlists, newPlaylist]);
    setNewPlaylistName('');
    setShowCreatePlaylist(false);
  };

  const addToPlaylist = (playlistId, song) => {
    setPlaylists(prev => prev.map(pl => {
      if (pl.id === playlistId) {
        if (!pl.songs.find(s => s.id === song.id)) {
          return { ...pl, songs: [...pl.songs, song] };
        }
      }
      return pl;
    }));
    alert(`Added "${song.title}" to playlist!`);
  };

  const removeFromPlaylist = (playlistId, songId) => {
    setPlaylists(prev => prev.map(pl => {
      if (pl.id === playlistId) {
        return { ...pl, songs: pl.songs.filter(s => s.id !== songId) };
      }
      return pl;
    }));
  };

  const SongCard = ({ song, showAddToPlaylist = true }) => (
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
          >
            {currentSong?.id === song.id && isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button
            onClick={() => toggleLike(song.id)}
            className={`p-2 rounded-full transition ${likedSongs.has(song.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
          >
            <Heart size={20} fill={likedSongs.has(song.id) ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={() => setShowComments(song.id)}
            className="p-2 text-gray-400 hover:text-blue-500 rounded-full transition"
          >
            <MessageCircle size={20} />
          </button>
          <button
            onClick={() => downloadSong(song.id)}
            className={`p-2 rounded-full transition ${downloadedSongs.has(song.id) ? 'text-green-500' : 'text-gray-400 hover:text-green-500'}`}
          >
            <Download size={20} />
          </button>
          {showAddToPlaylist && (
            <div className="relative group">
              <button className="p-2 text-gray-400 hover:text-purple-500 rounded-full transition">
                <Plus size={20} />
              </button>
              <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-10">
                {playlists.map(pl => (
                  <button
                    key={pl.id}
                    onClick={() => addToPlaylist(pl.id, song)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-sm"
                  >
                    {pl.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="text-purple-500" size={32} />
            <h1 className="text-2xl font-bold">MusicStream</h1>
          </div>
          
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search songs, artists, albums, movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <User className="text-gray-400 cursor-pointer hover:text-white" size={24} />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
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
                onClick={() => setShowCreatePlaylist(true)}
                className="text-purple-500 hover:text-purple-400"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="space-y-2">
              {playlists.map(playlist => (
                <button
                  key={playlist.id}
                  onClick={() => {
                    setSelectedPlaylist(playlist);
                    setCurrentView('playlist');
                  }}
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

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 pb-32">
          {currentView === 'home' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Discover Music</h2>
              <div className="space-y-4">
                {filteredMusic.map(song => (
                  <SongCard key={song.id} song={song} />
                ))}
              </div>
            </div>
          )}

          {currentView === 'library' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Your Library</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {playlists.map(playlist => (
                  <div
                    key={playlist.id}
                    onClick={() => {
                      setSelectedPlaylist(playlist);
                      setCurrentView('playlist');
                    }}
                    className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 cursor-pointer transition"
                  >
                    <div className="text-4xl mb-4">📚</div>
                    <h3 className="font-semibold text-lg mb-2">{playlist.name}</h3>
                    <p className="text-gray-400 text-sm">{playlist.songs.length} songs</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === 'liked' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Liked Songs</h2>
              <div className="space-y-4">
                {musicLibrary.filter(s => likedSongs.has(s.id)).map(song => (
                  <SongCard key={song.id} song={song} />
                ))}
                {likedSongs.size === 0 && (
                  <p className="text-gray-400 text-center py-12">No liked songs yet</p>
                )}
              </div>
            </div>
          )}

          {currentView === 'downloads' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Downloaded Songs</h2>
              <div className="space-y-4">
                {musicLibrary.filter(s => downloadedSongs.has(s.id)).map(song => (
                  <SongCard key={song.id} song={song} />
                ))}
                {downloadedSongs.size === 0 && (
                  <p className="text-gray-400 text-center py-12">No downloaded songs yet</p>
                )}
              </div>
            </div>
          )}

          {currentView === 'playlist' && selectedPlaylist && (
            <div>
              <h2 className="text-3xl font-bold mb-6">{selectedPlaylist.name}</h2>
              <div className="space-y-4">
                {selectedPlaylist.songs.map(song => (
                  <div key={song.id} className="relative">
                    <SongCard song={song} showAddToPlaylist={false} />
                    <button
                      onClick={() => removeFromPlaylist(selectedPlaylist.id, song.id)}
                      className="absolute top-4 right-4 p-2 bg-red-600 rounded-full hover:bg-red-700 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                {selectedPlaylist.songs.length === 0 && (
                  <p className="text-gray-400 text-center py-12">This playlist is empty</p>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Music Player */}
      {currentSong && (
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
      )}

      {/* Create Playlist Modal */}
      {showCreatePlaylist && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4">Create New Playlist</h3>
            <input
              type="text"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              placeholder="Playlist name"
              className="w-full px-4 py-2 bg-gray-700 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex gap-3">
              <button
                onClick={createPlaylist}
                className="flex-1 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
              >
                Create
              </button>
              <button
                onClick={() => setShowCreatePlaylist(false)}
                className="flex-1 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comments Modal */}
      {showComments && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Comments</h3>
              <button onClick={() => setShowComments(null)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-3 mb-4">
              {(comments[showComments] || []).map(comment => (
                <div key={comment.id} className="bg-gray-700 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-1">
                    <span className="font-semibold text-sm">{comment.user}</span>
                    <span className="text-xs text-gray-400">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm">{comment.text}</p>
                </div>
              ))}
              {(!comments[showComments] || comments[showComments].length === 0) && (
                <p className="text-gray-400 text-center py-4">No comments yet</p>
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                onKeyPress={(e) => e.key === 'Enter' && addComment(showComments)}
              />
              <button
                onClick={() => addComment(showComments)}
                className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden audio element */}
      <audio ref={audioRef} />
    </div>
  );
};

export default MusicStreamingApp;