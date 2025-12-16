// ============================================
// README.md
// ============================================

# 🎵 MusicStream - Full Stack Music Streaming Application

A comprehensive music streaming application built with the MERN stack that allows users to discover, stream, and manage their music collection with features like playlists, likes, comments, and offline downloads.

![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?style=flat-square&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-blue?style=flat-square&logo=tailwindcss)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Functionalities

- **🎧 Music Streaming**: High-quality audio streaming with playback controls
- **🔍 Advanced Search**: Search by song name, artist, album, genre, or movie
- **📝 Playlist Management**: Create, edit, and manage personalized playlists
- **💖 User Interactions**: Like songs, add comments, and share tracks
- **⬇️ Offline Downloads**: Download songs for offline listening
- **🎵 Playback Controls**: Play, pause, skip, shuffle, repeat, and volume control
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### Additional Features

- **🎨 Modern UI**: Clean, intuitive interface with dark mode
- **⚡ Real-time Updates**: Instant feedback on user actions
- **🔊 Audio Quality**: Support for high-quality audio streaming
- **💬 Social Features**: Comment on tracks and share with friends
- **📊 User Library**: Organize music into custom playlists

## 🛠 Tech Stack

### Frontend
- **React 18.2.0** - UI library
- **TailwindCSS 3.3** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Context API** - State management
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
-**Cloudinary** - Songs Upload

## 🚀 Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6.0 or higher)
- npm package manager
- Git

### Clone the Repository

\`\`\`bash
git clone https://github.com/yourusername/music-streaming-app.git
cd music-streaming-app
\`\`\`

### Frontend Setup

\`\`\`bash
cd frontend
npm install
\`\`\`

### Backend Setup

\`\`\`bash
cd backend
npm install
\`\`\`

## ⚙️ Configuration

### Frontend Environment Variables

Create a \`.env\` file in the \`frontend\` directory:

\`\`\`env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_APP_NAME=MusicStream
\`\`\`

### Backend Environment Variables

Create a \`.env\` file in the \`backend\` directory:

\`\`\`env
PORT=7000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/musicstreaming?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
NODE_ENV=development
\`\`\`

### MongoDB Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (0.0.0.0/0 for development)
5. Get your connection string and update \`MONGODB_URI\` in \`.env\`

## 🏃 Running the Application

### Development Mode

**Start Backend Server:**
\`\`\`bash
cd backend
npm run dev
# Server runs on http://localhost:7000
\`\`\`

**Start Frontend Development Server:**
\`\`\`bash
cd frontend
npm start
# App runs on http://localhost:5173
\`\`\`

### Production Mode

**Build Frontend:**
\`\`\`bash
cd frontend
npm run build
\`\`\`

**Start Backend:**
\`\`\`bash
cd backend
npm start
\`\`\`

## 🌐 Deployment

### Frontend Deployment (Netlify)

1. **Build the application:**
   \`\`\`bash
   cd frontend
   npm run build
   \`\`\`

2. **Deploy to Netlify:**
   - Go to [Netlify](https://www.netlify.com)
   - Drag and drop the \`build\` folder, OR
   - Connect your GitHub repository
   - Build command: \`npm run build\`
   - Publish directory: \`build\`

3. **Configure environment variables:**
   - Add \`REACT_APP_API_URL\` with your backend URL

### Backend Deployment (Render)

1. **Create \`render.yaml\` in backend directory:**
   \`\`\`yaml
   services:
     - type: web
       name: musicstream-api
       env: node
       buildCommand: npm install
       startCommand: npm start
       envVars:
         - key: MONGODB_URI
           sync: false
         - key: JWT_SECRET
           generateValue: true
         - key: NODE_ENV
           value: production
   \`\`\`

2. **Deploy to Render:**
   - Go to [Render](https://render.com)
   - Create a new Web Service
   - Connect your GitHub repository
   - Add environment variables
   - Deploy!

### Alternative Deployment Options

- **Vercel** (Frontend)
- **Heroku** (Backend)
- **AWS** (Full Stack)
- **DigitalOcean** (Full Stack)

## 📚 API Documentation

### Base URL
\`\`\`
http://localhost:7000/api
\`\`\`

### Endpoints

#### Songs

- **GET** \`/songs\` - Get all songs
- **GET** \`/songs/search?q=query\` - Search songs
- **POST** \`/songs\` - Add a new song
- **POST** \`/songs/:id/like\` - Like/Unlike a song
- **POST** \`/songs/:id/comment\` - Add a comment
- **POST** \`/songs/:id/download\` - Track download

#### Playlists

- **GET** \`/playlists?userId=:userId\` - Get user playlists
- **POST** \`/playlists\` - Create a playlist
- **POST** \`/playlists/:id/songs\` - Add song to playlist
- **DELETE** \`/playlists/:id/songs/:songId\` - Remove song from playlist

#### Users

- **POST** \`/users/register\` - Register a new user
- **POST** \`/users/login\` - Login user
- **GET** \`/users/profile\` - Get user profile

## 🎯 Usage Examples

### Playing Music

1. Browse the home page for available tracks
2. Click the play button on any song card
3. Use the bottom player controls to manage playback

### Creating Playlists

1. Click the \`+\` button in the sidebar under "Playlists"
2. Enter a playlist name
3. Add songs by clicking the \`+\` button on song cards

### Downloading Songs

1. Click the download icon on any song card
2. The song will be saved to your device
3. Access downloaded songs from the "Downloads" page

### Searching Music

1. Use the search bar in the header
2. Enter song name, artist, album, genre, or movie name
3. Results filter in real-time

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

### Coding Standards

- Use ESLint for code linting
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed

## 🐛 Known Issues

- Audio playback may not work on some mobile browsers due to autoplay restrictions
- Large file downloads might be slow on slower connections
- Some features require modern browser support

## 🔮 Future Enhancements

- [ ] User authentication and profiles
- [ ] Social sharing integration
- [ ] Queue management
- [ ] Lyrics display
- [ ] Music recommendations
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Equalizer controls
- [ ] Collaborative playlists
- [ ] Artist pages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Audio samples from [SoundHelix](https://www.soundhelix.com/)
- Icons from [Lucide](https://lucide.dev/)
- UI inspiration from Spotify and Apple Music
- Community contributors

## 📞 Support

For support, email support@musicstream.com or join our Slack channel.

## 🔗 Links

- [Live Demo](https://your-app.netlify.app)
- [API Documentation](https://your-api.render.com/docs)
- [Project Board](https://github.com/yourusername/music-streaming-app/projects)
- [Issue Tracker](https://github.com/yourusername/music-streaming-app/issues)

---

Made with ❤️ by [Your Name](https://github.com/yourusername)

**Note:** This is a demonstration project. For production use, ensure proper licensing for music content and implement robust security measures.
