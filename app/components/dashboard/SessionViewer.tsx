import { useState } from 'react';
import { 
  MoreHorizontal, Play, Pause, SkipBack, SkipForward, Eye, Maximize2, Lock 
} from 'lucide-react';

interface SessionViewerProps {
  liveImage: string | null;
}

export default function SessionViewer({ liveImage }: SessionViewerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <aside className="session-viewer">
      
      {/* Header */}
      <div className="viewer-header">
        <span className="flex-row gap-2" style={{fontSize: 12, fontWeight: 700, color: 'var(--text-muted)'}}>
          {liveImage && <span style={{width: 8, height: 8, background: 'var(--accent-red)', borderRadius: '50%'}}/>}
          SESSION RECORDING
        </span>
        <button className="icon-btn"><Maximize2 size={16}/></button>
      </div>

      {/* Video Area */}
      <div className="video-container">
        
        {/* Browser Window Frame */}
        <div className="browser-frame">
          
          {/* Fake Browser Toolbar */}
          <div className="browser-header">
            <div className="traffic-lights">
              <div className="traffic-dot dot-red" />
              <div className="traffic-dot dot-yellow" />
              <div className="traffic-dot dot-green" />
            </div>
            
            {/* Fake Address Bar */}
            <div className="address-bar">
              <Lock size={8} style={{marginRight: 6}} />
              <span>{liveImage ? 'https://agent-session.secure' : 'about:blank'}</span>
            </div>
          </div>

          <div className="video-content">
            {liveImage ? (
              <img 
                src={`data:image/jpeg;base64,${liveImage}`} 
                alt="Screen" 
                style={{width: '100%', height: '100%', objectFit: 'contain'}}
              />
            ) : (
              <div className="flex-col center gap-3">
                <Eye size={32} color="#52525b" />
                <p style={{fontSize: 10, fontFamily: 'monospace', letterSpacing: 1, color: '#52525b'}}>WAITING FOR VIDEO</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Controls */}
      <div className="controls-area">
        <div className="timeline">
          <div className="progress"></div>
        </div>
        
        <div className="playback-btns">
          <span className="mono" style={{fontSize: 10}}>00:23</span>
          
          <div className="flex-row gap-4">
            <button className="icon-btn"><SkipBack size={20}/></button>
            <button className="play-btn" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause size={16} fill="black" /> : <Play size={16} fill="black" style={{marginLeft: 2}} />}
            </button>
            <button className="icon-btn"><SkipForward size={20}/></button>
          </div>
          
          <span className="mono" style={{fontSize: 10}}>02:01</span>
        </div>
      </div>
    </aside>
  );
}