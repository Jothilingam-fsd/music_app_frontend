import React, { useState, useEffect } from 'react';
import { MusicProvider, useMusicContext } from './context/MusicContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MusicPlayer from './components/MusicPlayer';
import Modal from './components/Modal';

import HomePage from './pages/HomePage';
import LibraryPage from './pages/LibraryPage';
import LikedSongsPage from './pages/LikedSongsPage';
import DownloadsPage from './pages/DownloadsPage';
import PlaylistPage from './pages/PlaylistPage';

const AppContent = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const [showComments, setShowComments] = useState(null);
  const [newComment, setNewComment] = useState('');

  const [filteredMusic, setFilteredMusic] = useState([]);

  const {
    musicLibrary,
    playlists,
    comments,
    createPlaylist,
    addComment,
  } = useMusicContext();

  // 🔄 Sync library
  useEffect(() => {
    setFilteredMusic(musicLibrary);
  }, [musicLibrary]);

  // 🔍 Search
  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredMusic(musicLibrary);
      return;
    }

    const q = query.toLowerCase();
    const filtered = musicLibrary.filter(song =>
      song.title.toLowerCase().includes(q) ||
      song.artist.toLowerCase().includes(q) ||
      song.album.toLowerCase().includes(q) ||
      song.genre.toLowerCase().includes(q) ||
      (song.movie && song.movie.toLowerCase().includes(q))
    );

    setFilteredMusic(filtered);
  };

  // ➕ Create playlist
  const handleCreatePlaylist = () => {
    if (!newPlaylistName.trim()) return;

    createPlaylist(newPlaylistName);
    setNewPlaylistName('');
    setShowCreatePlaylist(false);
  };

  // 💬 Add comment
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    addComment(showComments, newComment);
    setNewComment('');
  };

  // 🧭 Page renderer
  const renderPage = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomePage
            songs={filteredMusic}
            onShowComments={setShowComments}
          />
        );

      case 'library':
        return (
          <LibraryPage
            onSelectPlaylist={(pl) => {
              setSelectedPlaylist(pl);
              setCurrentView('playlist');
            }}
          />
        );

      case 'liked':
        return <LikedSongsPage onShowComments={setShowComments} />;

      case 'downloads':
        return <DownloadsPage onShowComments={setShowComments} />;

      case 'playlist':
        return (
          <PlaylistPage
            playlist={selectedPlaylist}
            onShowComments={setShowComments}
          />
        );

      default:
        return <HomePage songs={filteredMusic} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">

      {/* Sidebar */}
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        playlists={playlists}
        onSelectPlaylist={(pl) => {
          setSelectedPlaylist(pl);
          setCurrentView('playlist');
        }}
        onCreatePlaylist={() => setShowCreatePlaylist(true)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Header onSearch={handleSearch} />
        <main className="flex-1 overflow-y-auto p-6 pb-28">
          {renderPage()}
        </main>
      </div>

      {/* Music player */}
      <MusicPlayer />

      {/* Create Playlist Modal */}
      <Modal
        isOpen={showCreatePlaylist}
        onClose={() => setShowCreatePlaylist(false)}
        title="Create Playlist"
      >
        <input
          className="w-full p-2 mb-4 bg-gray-700 rounded"
          placeholder="Playlist name"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
        />
        <button
          onClick={handleCreatePlaylist}
          className="bg-purple-600 px-4 py-2 rounded w-full"
        >
          Create
        </button>
      </Modal>

      {/* Comments Modal */}
      <Modal
        isOpen={!!showComments}
        onClose={() => setShowComments(null)}
        title="Comments"
      >
        <div className="space-y-2 mb-4">
          {(comments[showComments] || []).map(c => (
            <div key={c.id} className="bg-gray-700 p-2 rounded text-sm">
              <p>{c.text}</p>
              <p className="text-xs text-gray-400">{c.timestamp}</p>
            </div>
          ))}
        </div>

        <input
          className="w-full p-2 bg-gray-700 rounded mb-2"
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-600 px-4 py-2 rounded w-full"
        >
          Add Comment
        </button>
      </Modal>
    </div>
  );
};

// 🔥 Wrap Provider
const App = () => (
  <MusicProvider>
    <AppContent />
  </MusicProvider>
);

export default App;
