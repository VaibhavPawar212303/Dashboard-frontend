import { useState, useEffect, useRef } from 'react';
import { Globe, CheckCircle2, XCircle, Play, Zap, ChevronDown, AlertTriangle, Loader2, Clock } from 'lucide-react';
import { CommandLog, TestItem } from '@/app/types';
import { cn } from '@/app/lib/utils';


interface CommandPanelProps {
  activeTest: TestItem;
  logs: CommandLog[];
  onRunTask: (task: string, provider: string) => void;
  isProcessing: boolean;
}

export default function CommandPanel({ activeTest, logs, onRunTask, isProcessing }: CommandPanelProps) {
  const [inputTask, setInputTask] = useState('');
  const [model, setModel] = useState('groq');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when new logs arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputTask.trim()) {
      onRunTask(inputTask, model);
    }
  };

  return (
    <main className="flex-1 flex flex-col min-w-0 bg-zinc-950 border-r border-zinc-800">
      
      {/* 1. Header */}
      <header className="h-14 border-b border-zinc-800 flex justify-between items-center px-4 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3 min-w-0">
          <div className={cn(
            "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border shrink-0", 
            activeTest.status === 'passed' ? "bg-green-500/10 text-green-400 border-green-500/20" : 
            activeTest.status === 'running' ? "bg-blue-500/10 text-blue-400 border-blue-500/20 animate-pulse" :
            activeTest.status === 'failed' ? "bg-red-500/10 text-red-400 border-red-500/20" :
            "bg-zinc-800 text-zinc-500 border-zinc-700"
          )}>
            {activeTest.status}
          </div>
          <span className="text-sm font-medium text-zinc-100 truncate">{activeTest.name}</span>
        </div>
        <div className="hidden md:flex items-center gap-2 px-2.5 py-1.5 bg-zinc-900 rounded-md border border-zinc-800 text-xs text-zinc-400">
          <Globe size={12} className="text-purple-400" />
          <span className="font-medium text-zinc-300">Render Cloud</span>
        </div>
      </header>

      {/* 2. Input Area */}
      <div className="p-4 border-b border-zinc-800 bg-zinc-900/30">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
          <div className="relative shrink-0">
            <select 
              value={model} 
              onChange={(e) => setModel(e.target.value)}
              className="h-10 w-full md:w-40 appearance-none bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-medium rounded-lg pl-3 pr-8 outline-none focus:border-zinc-600 transition-all cursor-pointer hover:bg-zinc-900"
              disabled={isProcessing}
            >
              <option value="groq">⚡ Groq</option>
              <option value="grok">🧠 Grok</option>
              <option value="ollama">🦙 Ollama</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-3 text-zinc-500 pointer-events-none" size={14} />
          </div>
          <input 
            type="text" 
            value={inputTask}
            onChange={(e) => setInputTask(e.target.value)}
            placeholder="Describe your automation task..."
            className="flex-1 h-10 bg-zinc-950 border border-zinc-800 rounded-lg px-4 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-sm"
            disabled={isProcessing}
          />
          <button 
            type="submit"
            disabled={isProcessing || !inputTask}
            className={`h-10 px-5 rounded-lg font-medium text-xs flex items-center gap-2 transition-all shadow-lg ${isProcessing ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
          >
            {isProcessing ? <><Loader2 size={14} className="animate-spin" /> Running</> : <><Play size={14} fill="currentColor" /> Run Task</>}
          </button>
        </form>
      </div>

      {/* 3. Meta Data */}
      <div className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-zinc-800 bg-zinc-900/20">
        <div className="flex flex-col gap-1"><p className="text-zinc-500 text-[10px] uppercase font-semibold">Duration</p><p className="text-zinc-200 text-xs font-medium font-mono">{activeTest.duration}</p></div>
        <div className="flex flex-col gap-1"><p className="text-zinc-500 text-[10px] uppercase font-semibold">Session ID</p><p className="text-zinc-200 text-xs font-medium font-mono">{activeTest.id.length > 8 ? activeTest.id.substring(0,8) : activeTest.id}</p></div>
        <div className="flex flex-col gap-1"><p className="text-zinc-500 text-[10px] uppercase font-semibold">Provider</p><div className="flex items-center gap-2"><Zap size={12} className="text-orange-500"/><p className="text-zinc-200 text-xs font-medium">{model.toUpperCase()}</p></div></div>
        <div className="flex flex-col gap-1"><p className="text-zinc-500 text-[10px] uppercase font-semibold">Commands</p><p className="text-zinc-200 text-xs font-medium">{logs.length} Steps</p></div>
      </div>

      {/* 4. Logs List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800">
        {logs.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-zinc-600 gap-2 opacity-50">
            <div className="w-10 h-10 border-2 border-zinc-800 rounded-lg flex items-center justify-center">
              <Play size={16} fill="currentColor" />
            </div>
            <p className="text-xs font-mono">Ready to execute commands...</p>
          </div>
        )}

        {logs.map((cmd) => (
          <div 
            key={cmd.id} 
            className={cn(
              "flex items-start gap-3 px-6 py-2.5 border-b transition-colors text-xs",
              // Highlight Pending Steps with Blue Background
              cmd.status === 'pending' 
                ? "bg-blue-500/10 border-blue-500/20" 
                : cmd.status === 'error'
                ? "bg-red-950/10 border-red-900/20 hover:bg-red-950/20"
                : "border-zinc-800/50 hover:bg-zinc-900/40"
            )}
          >
            {/* Status Icon */}
            <div className="mt-0.5 shrink-0">
              {cmd.status === 'success' ? <CheckCircle2 size={14} className="text-green-500" /> : 
               cmd.status === 'error' ? <AlertTriangle size={14} className="text-red-500" /> :
               // Spinner for Pending
               <div className="w-3.5 h-3.5 rounded-full border-2 border-zinc-500 border-t-blue-400 animate-spin"/>}
            </div>

            {/* Log Content */}
            <div className="flex-1 min-w-0 grid grid-cols-12 gap-4 items-start">
              
              {/* Action Name */}
              <div className="col-span-3">
                <span className={cn(
                  "font-semibold truncate block",
                  cmd.status === 'pending' ? "text-blue-200" :
                  cmd.status === 'error' ? "text-red-400" : 
                  "text-zinc-300"
                )}>
                  {cmd.action}
                </span>
              </div>

              {/* Type Badge & Value */}
              <div className="col-span-7 flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "px-1.5 py-0.5 rounded-[4px] text-[9px] font-mono border uppercase tracking-wider shrink-0 select-none",
                    cmd.status === 'pending' ? "bg-blue-500/20 text-blue-300 border-blue-500/30" :
                    cmd.status === 'error' ? "bg-red-900/30 text-red-300 border-red-800" : 
                    "border-zinc-700 bg-zinc-800 text-zinc-400"
                  )}>
                    {cmd.type}
                  </span>
                </div>
                
                <code className={cn(
                  "block font-mono text-[11px] mt-1",
                  cmd.status === 'error' 
                    ? "text-red-300 whitespace-pre-wrap break-all bg-red-950/30 p-2 rounded border border-red-900/30"
                    : cmd.status === 'pending' 
                    ? "text-blue-100 animate-pulse"
                    : "text-zinc-500 truncate"
                )}>
                  {cmd.value}
                </code>
              </div>

              {/* Duration / Status */}
              <div className="col-span-2 text-right text-zinc-500 font-mono text-[10px] mt-0.5">
                {cmd.status === 'pending' ? (
                  <span className="text-blue-400 flex items-center justify-end gap-1">
                    Running...
                  </span>
                ) : (
                  cmd.duration
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Invisible Scroll Anchor */}
        <div ref={scrollRef} className="h-4" />
      </div>
    </main>
  );
}