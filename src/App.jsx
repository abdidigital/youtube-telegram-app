
// File: src/App.jsx
// FIX: Mengubah cara penanganan API Key untuk menghindari masalah kompilasi pada lingkungan build tertentu.
// Semua kode sekarang berada dalam satu file yang valid.

import React from 'react';

// Komponen untuk menyuntikkan CSS global ke dalam dokumen
const GlobalStyles = () => {
    const css = `
        :root {
          --bg-dark-primary: #17212b;
          --bg-dark-secondary: #242f3d;
          --text-primary: #ffffff;
          --text-secondary: #a3b3c3;
          --accent-primary: #3390ec;
          --accent-hover: #45a0f5;
          --border-color: #0f1923;
        }

        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background-color: var(--bg-dark-primary);
          color: var(--text-primary);
        }

        .app-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }

        .app-header {
          display: flex;
          align-items: center;
          padding: 10px 20px;
          background-color: var(--bg-dark-secondary);
          border-bottom: 1px solid var(--border-color);
        }

        .logo-icon {
          font-size: 24px;
          color: var(--accent-primary);
          margin-right: 10px;
        }

        .app-header h1 {
          font-size: 20px;
          margin: 0;
          flex-grow: 1;
        }

        .search-bar {
          display: flex;
        }

        .search-bar input {
          width: 300px;
          padding: 8px 12px;
          border-radius: 18px 0 0 18px;
          border: 1px solid var(--border-color);
          background-color: var(--bg-dark-primary);
          color: var(--text-primary);
          outline: none;
        }

        .search-bar button {
          padding: 8px 15px;
          border-radius: 0 18px 18px 0;
          border: none;
          background-color: var(--accent-primary);
          color: var(--text-primary);
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .search-bar button:hover {
          background-color: var(--accent-hover);
        }

        .main-content {
          display: flex;
          flex-grow: 1;
          overflow: hidden;
        }

        .sidebar {
          width: 350px;
          background-color: var(--bg-dark-secondary);
          border-right: 1px solid var(--border-color);
          overflow-y: auto;
        }

        .video-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .video-item {
          display: flex;
          align-items: center;
          padding: 10px;
          cursor: pointer;
          border-bottom: 1px solid var(--border-color);
          transition: background-color 0.2s;
        }

        .video-item:hover {
          background-color: rgba(51, 144, 236, 0.2);
        }

        .video-item.selected {
            background-color: var(--accent-primary);
        }

        .video-item img {
          width: 120px;
          height: 68px;
          object-fit: cover;
          border-radius: 4px;
          margin-right: 10px;
        }

        .video-details {
          display: flex;
          flex-direction: column;
        }

        .video-details p {
          margin: 0;
          font-size: 14px;
          font-weight: 500;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }

        .video-details span {
          font-size: 12px;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .video-list-empty {
          padding: 20px;
          text-align: center;
          color: var(--text-secondary);
        }

        .player-area {
          flex-grow: 1;
          padding: 20px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          overflow-y: auto;
        }

        .player-placeholder, .message {
          color: var(--text-secondary);
          font-size: 18px;
          align-self: center;
        }

        .message.error {
            color: #ff6b6b;
        }

        .video-player {
          width: 100%;
          max-width: 900px;
        }

        .embed-responsive {
          position: relative;
          display: block;
          width: 100%;
          padding: 0;
          overflow: hidden;
        }

        .embed-responsive::before {
          content: "";
          display: block;
          padding-top: 56.25%;
        }

        .embed-responsive-item {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        .video-player-details {
          margin-top: 15px;
          padding: 15px;
          background-color: var(--bg-dark-secondary);
          border-radius: 8px;
        }

        .video-player-details h2 {
          margin: 0 0 10px 0;
          font-size: 20px;
        }

        .video-player-details p {
          margin: 0;
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.5;
        }
    `;
    return <style>{css}</style>;
};


// Komponen-komponen lainnya (SearchBar, VideoList, VideoPlayer)
function SearchBar({ onSearch }) {
    const [term, setTerm] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(term);
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Cari video di YouTube..."
            />
            <button type="submit">Cari</button>
        </form>
    );
}

function VideoList({ videos, onVideoSelect, selectedVideoId }) {
    if (videos.length === 0) {
        return <div className="video-list-empty">Mulai dengan mencari sesuatu.</div>;
    }

    return (
        <ul className="video-list">
            {videos.map((video) => (
                <li 
                  key={video.id.videoId} 
                  onClick={() => onVideoSelect(video)} 
                  className={`video-item ${selectedVideoId === video.id.videoId ? 'selected' : ''}`}
                >
                    <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
                    <div className="video-details">
                        <p>{video.snippet.title}</p>
                        <span>{video.snippet.channelTitle}</span>
                    </div>
                </li>
            ))}
        </ul>
    );
}

function VideoPlayer({ video }) {
    if (!video) {
        return <div className="player-placeholder">Pilih video dari daftar untuk diputar.</div>;
    }

    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

    return (
        <div className="video-player">
            <div className="embed-responsive">
                <iframe
                    className="embed-responsive-item"
                    src={videoSrc}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            <div className="video-player-details">
                <h2>{video.snippet.title}</h2>
                <p>{video.snippet.description}</p>
            </div>
        </div>
    );
}

// Komponen utama aplikasi
function App() {
    const [videos, setVideos] = React.useState([]);
    const [selectedVideo, setSelectedVideo] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const handleSearch = async (term) => {
        if (!term) return;
        setLoading(true);
        setSelectedVideo(null);
        setError(null);

        // !!! PERINGATAN KEAMANAN PENTING !!!
        // Ganti teks placeholder di bawah dengan API Key YouTube Anda yang sebenarnya.
        // Jangan pernah membagikan kode ini ke repositori publik (seperti GitHub) 
        // dengan API Key Anda tertulis langsung di dalamnya.
        // Metode ini digunakan sebagai perbaikan sementara untuk masalah kompilasi.
        const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${term}&key=${API_KEY}`
            );
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error.message || 'Gagal mengambil data video.');
            }
            const data = await response.json();
            const validVideos = data.items.filter(item => item.id && item.id.videoId);
            setVideos(validVideos);
            if (validVideos.length > 0) {
              setSelectedVideo(validVideos[0]);
            } else {
              setVideos([]);
            }
        } catch (err) {
            console.error("Error fetching data: ", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVideoSelect = (video) => {
        setSelectedVideo(video);
    };

    return (
        <React.Fragment>
            <GlobalStyles />
            <div className="app-container">
                <header className="app-header">
                    <i className="logo-icon">▶</i>
                    <h1>TubeGram</h1>
                    <SearchBar onSearch={handleSearch} />
                </header>
                <main className="main-content">
                    <aside className="sidebar">
                        <VideoList videos={videos} onVideoSelect={handleVideoSelect} selectedVideoId={selectedVideo?.id?.videoId} />
                    </aside>
                    <section className="player-area">
                        {loading && <div className="message">Memuat video...</div>}
                        {error && <div className="message error">Error: {error}</div>}
                        {!loading && !error && (
                            <VideoPlayer video={selectedVideo} />
                        )}
                    </section>
                </main>
            </div>
        </React.Fragment>
    );
}

export default App;
                        
