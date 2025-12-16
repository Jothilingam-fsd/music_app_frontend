
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const MusicContext = createContext();

export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusicContext must be used within MusicProvider');
  }
  return context;
};

export const MusicProvider = ({ children }) => {
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
  const [likedSongs, setLikedSongs] = useState(new Set());
  const [comments, setComments] = useState({});
  const [downloadedSongs, setDownloadedSongs] = useState(new Set());

  /* 🔥 FETCH SONGS FROM BACKEND */
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch("http://localhost:7000/api/v1songs");
        const data = await res.json();
        setMusicLibrary(data.data);
      } catch (err) {
        console.error("Failed to fetch songs", err);
      }
    };

    fetchSongs();
  }, []);

  
  // Sample audio URLs (using public domain music samples)
  const [musicLibrary] = useState([
    {
      id: 1,
      title: 'Unnai Kaanadhu Naan Illai',
      artist: 'Kamal Haasan, Shankar Mahadevan',
      album: 'Vishwaroopam',
      genre: 'Tamil / Melody',
      duration: 330, // approx 5:30
      image: '🎬',
      movie: 'Vishwaroopam',
      audioUrl: 'https://res.cloudinary.com/dl4jpveou/video/upload/v1765863851/Unnai_Kaanadhu_Naan-320kbps_chkh11.mp3'
    },
    { 
      id: 2, 
      title: 'Thalapathy Kacheri', 
      artist: 'Vijay, Anirudh Ravichander', 
      album: 'Jana Nayagan', 
      genre: 'Tamil / Dance', 
      duration: 215, 
      image: '🎬', 
      movie: 'Jana Nayagan',
      audioUrl: 'https://res.cloudinary.com/dl4jpveou/video/upload/v1765865975/Thalapathy_Kacheri_From_Jana_Nayagan-320kbps_cy5plf.mp3'
    },
    { 
      id: 3, 
      title: 'Gehra Hua', 
      artist: 'RanveerSingh,Arijit Singh', 
      album: 'Dhuranthar', 
      genre: 'Bollywood', 
      duration: 298, 
      image: '🎬', 
      movie: 'Dhuranthar',
      audioUrl: 'https://res.cloudinary.com/dl4jpveou/video/upload/v1765866817/Gehra_Hua-320kbps_drauov.mp3'
    },
    { 
      id: 4, 
      title: 'Mukunda Mukunda Krishna', 
      artist: 'Sadhana Sargam, Kamal Haasan', 
      album: 'Mukunda Mukunda Krishna', 
      genre: 'Devotional', 
      duration: 240, 
      image: '🎬', 
      movie: 'Mukunda Mukunda Krishna',
      audioUrl: 'https://res.cloudinary.com/dl4jpveou/video/upload/v1765867220/Mukunda_Mukunda_Krishna_-_Sadhana_Sargam_Kamal_Haasan_thqgib.mp3'
    },
    { 
      id: 5, 
      title: 'Saiyaara', 
      artist: 'Tanishk Bagchi, Faheem Abdullah, Arslan Nizami', 
      album: 'Saiyaara', 
      genre: 'Bollywood', 
      duration: 276, 
      image: '🎬', 
      movie: 'Saiyaara',
      audioUrl: 'https://res.cloudinary.com/dl4jpveou/video/upload/v1765868175/Saiyaara_-_Tanishk_Bagchi_Faheem_Abdullah_Arslan_Nizami_bx6ihz.mp3'
    },
    { 
      id: 6, 
      title: 'Oorum Blood From Dude', 
      artist: 'Anirudh Ravichander', 
      album: 'Oorum Blood From Dude', 
      genre: 'Tamil / Dance', 
      duration: 215, 
      image: '🎬', 
      movie: 'Dude',
      audioUrl: 'https://res.cloudinary.com/dl4jpveou/video/upload/v1765868385/Oorum_Blood_From_Dude-320kbps_u7m1b0.mp3'
    },
    { 
      id: 7, 
      title: 'Muththa Mazhai', 
      artist: 'Thee', 
      album: 'Muththa Mazhai', 
      genre: 'Tamil / Melody', 
      duration: 256, 
      image: '🎬', 
      movie: 'Thug Life',
      audioUrl: 'https://res.cloudinary.com/dl4jpveou/video/upload/v1765868593/Muththa_Mazhai-320kbps_q7ypkx.mp3'
    },
    { 
      id: 8, 
      title: 'Kanimaa', 
      artist: 'Surya, Sid Sriram', 
      album: 'Retro', 
      genre: 'Tamil / Kuthu', 
      duration: 316, 
      image: '🎬', 
      movie: 'Retro',
      audioUrl: 'https://res.cloudinary.com/dl4jpveou/video/upload/v1765869052/Kanimaa_From_Retro-320kbps_xidu9g.mp3'
    },
  ]);

  const audioRef = useRef(null);

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

  // Update audio source when song changes
  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.audioUrl;
      if (isPlaying) {
        audioRef.current.play().catch(err => console.log('Playback error:', err));
      }
    }
  }, [currentSong]);

  const handlePlayPause = () => {
    if (!currentSong) {
      setCurrentSong(musicLibrary[0]);
      setIsPlaying(true);
      return;
    }
    
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play().catch(err => console.log('Playback error:', err));
      setIsPlaying(true);
    }
  };

  const handleSongSelect = (song) => {
    if (currentSong?.id === song.id) {
      handlePlayPause();
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    const currentIndex = musicLibrary.findIndex(s => s.id === currentSong?.id);
    let nextIndex;
    
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * musicLibrary.length);
    } else {
      nextIndex = (currentIndex + 1) % musicLibrary.length;
    }
    
    setCurrentSong(musicLibrary[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (currentTime > 3) {
      audioRef.current.currentTime = 0;
    } else {
      const currentIndex = musicLibrary.findIndex(s => s.id === currentSong?.id);
      const prevIndex = currentIndex === 0 ? musicLibrary.length - 1 : currentIndex - 1;
      setCurrentSong(musicLibrary[prevIndex]);
      setIsPlaying(true);
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

  const addComment = (songId, text) => {
    if (!text.trim()) return;
    
    setComments(prev => ({
      ...prev,
      [songId]: [...(prev[songId] || []), {
        id: Date.now(),
        text,
        user: 'Current User',
        timestamp: new Date().toLocaleString()
      }]
    }));
  };

  const downloadSong = async (song) => {
    try {
      // Create a temporary anchor element to trigger download
      const response = await fetch(song.audioUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `${song.artist} - ${song.title}.mp3`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      // Mark as downloaded
      setDownloadedSongs(prev => new Set([...prev, song.id]));
      return true;
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
      return false;
    }
  };

  const createPlaylist = (name) => {
    if (!name.trim()) return;
    
    const newPlaylist = {
      id: Date.now(),
      name,
      songs: []
    };
    setPlaylists([...playlists, newPlaylist]);
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
  };

  const removeFromPlaylist = (playlistId, songId) => {
    setPlaylists(prev => prev.map(pl => {
      if (pl.id === playlistId) {
        return { ...pl, songs: pl.songs.filter(s => s.id !== songId) };
      }
      return pl;
    }));
  };

  const value = {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isRepeat,
    isShuffle,
    playlists,
    likedSongs,
    comments,
    downloadedSongs,
    musicLibrary,
    audioRef,
    setVolume,
    setIsMuted,
    setIsRepeat,
    setIsShuffle,
    handlePlayPause,
    handleSongSelect,
    handleNext,
    handlePrevious,
    handleSeek,
    toggleLike,
    addComment,
    downloadSong,
    createPlaylist,
    addToPlaylist,
    removeFromPlaylist,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
      <audio ref={audioRef} preload="metadata" />
    </MusicContext.Provider>
  );
};
