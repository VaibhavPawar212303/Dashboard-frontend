import { useState } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, 
  Maximize2, Radio, Download, Film
} from 'lucide-react';
import { cn } from '@/app/lib/utils';

interface SessionViewerProps {
  liveImage: string | null;
  status?: string;
}

export default function SessionViewer({ liveImage, status = 'idle' }: SessionViewerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <aside className="w-[480px] bg-zinc-950 border-l border-zinc-800 flex flex-col shadow-2xl relative z-10">
      {/* Header */}
      <div className="h-14 border-b border-zinc-800 flex justify-between items-center px-6 bg-zinc-950/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Film size={14} className="text-zinc-400" />
          <span className="text-xs font-semibold text-zinc-300 tracking-wide">SESSION PREVIEW</span>
          {status === 'running' && (
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[10px] font-bold text-red-400 tracking-wider">LIVE</span>
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-zinc-800 rounded-md text-zinc-500 hover:text-zinc-200 transition-colors"><Maximize2 size={14}/></button>
        </div>
      </div>

      {/* Video Canvas */}
      <div className="flex-1 bg-zinc-900/30 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
             style={{backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '24px 24px'}}>
        </div>

        <div className="relative w-full aspect-video bg-black rounded-lg border border-zinc-800 shadow-2xl overflow-hidden group z-10">
          {liveImage ? (
            <img src={`data:image/jpeg;base64,${liveImage}`} alt="Live Session" className="w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-zinc-600">
              <div className="p-4 rounded-full bg-zinc-900 border border-zinc-800">
                <Radio size={32} className="opacity-50" />
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-zinc-500">WAITING FOR SIGNAL</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="h-44 border-t border-zinc-800 bg-zinc-950 p-6 flex flex-col justify-between">
        <div className="group relative w-full h-6 flex items-center cursor-pointer">
          <div className="absolute w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div className="w-[35%] h-full bg-gradient-to-r from-blue-600 to-blue-400"></div>
          </div>
          <div className="absolute left-[35%] w-3 h-3 bg-white rounded-full shadow-lg"></div>
        </div>
        
        <div className="flex justify-between items-center px-1">
          <span className="text-[10px] font-mono text-zinc-500">00:00</span>
          <div className="flex items-center gap-6">
            <button className="text-zinc-500 hover:text-zinc-300 transition-colors"><SkipBack size={20} fill="currentColor" /></button>
            <button 
              className={cn("w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg", isPlaying ? "bg-zinc-800 text-white border border-zinc-700" : "bg-white text-black")}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
            </button>
            <button className="text-zinc-500 hover:text-zinc-300 transition-colors"><SkipForward size={20} fill="currentColor" /></button>
          </div>
          <span className="text-[10px] font-mono text-zinc-500">--:--</span>
        </div>
      </div>
    </aside>
  );
}