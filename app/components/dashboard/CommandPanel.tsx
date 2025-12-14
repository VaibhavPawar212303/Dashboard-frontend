import { useState } from 'react';
import { 
  Smartphone, Download, Share2, Globe, Search, 
  CheckCircle2, XCircle, Clock, Play, Zap
} from 'lucide-react';
import { TestItem, CommandLog } from '@/types';

interface CommandPanelProps {
  activeTest: TestItem;
  logs: CommandLog[];
  onRunTask: (task: string, provider: string) => void;
  isProcessing: boolean;
}

export default function CommandPanel({ activeTest, logs, onRunTask, isProcessing }: CommandPanelProps) {
  const [activeTab, setActiveTab] = useState('commands');
  const [inputTask, setInputTask] = useState('');
  const [model, setModel] = useState('groq');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputTask.trim()) {
      onRunTask(inputTask, model);
    }
  };

  return (
    <main className="command-panel">
      
      {/* 1. Header with Status */}
      <header className="panel-header">
        <div className="flex-row gap-3" style={{minWidth: 0}}>
          <div className={`status-badge ${activeTest.status}`}>
            {activeTest.status}
          </div>
          <span className="truncate" style={{fontWeight: 600, fontSize: '14px', maxWidth: '300px'}}>
            {activeTest.name}
          </span>
        </div>

        <div className="flex-row gap-3">
          <div className="device-info">
            <Globe size={14} color="#a855f7" />
            <span style={{color: '#fff'}}>Render Cloud</span>
          </div>
        </div>
      </header>

      {/* 2. NEW: Task Input Area */}
      <div style={{padding: '16px 24px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-panel)'}}>
        <form onSubmit={handleSubmit} className="flex-row gap-2">
          {/* Model Select */}
          <select 
            value={model} 
            onChange={(e) => setModel(e.target.value)}
            className="h-10 bg-[#111] border border-zinc-700 text-zinc-300 text-xs rounded px-2 outline-none"
            disabled={isProcessing}
          >
            <option value="groq">⚡ Groq</option>
            <option value="grok">🧠 Grok</option>
            <option value="ollama">🦙 Ollama</option>
          </select>

          {/* Input */}
          <input 
            type="text" 
            value={inputTask}
            onChange={(e) => setInputTask(e.target.value)}
            placeholder="E.g. Go to google.com and search for AI..."
            className="flex-1 h-10 bg-[#111] border border-zinc-700 rounded px-4 text-sm text-white outline-none focus:border-blue-500"
            disabled={isProcessing}
          />

          {/* Run Button */}
          <button 
            type="submit"
            disabled={isProcessing || !inputTask}
            className={`h-10 px-6 rounded font-medium text-xs flex items-center gap-2 transition-all ${
              isProcessing ? 'bg-zinc-800 text-zinc-500' : 'bg-blue-600 text-white hover:bg-blue-500'
            }`}
          >
            {isProcessing ? 'Running...' : <><Play size={14} fill="currentColor"/> Run</>}
          </button>
        </form>
      </div>

      {/* 3. Meta Data */}
      <div className="meta-grid">
        <div>
          <p className="meta-label">Time Taken</p>
          <p className="meta-value mono">{activeTest.duration}</p>
        </div>
        <div>
          <p className="meta-label">Session ID</p>
          <p className="meta-value mono">{activeTest.id.substring(0,8)}</p>
        </div>
        <div>
          <p className="meta-label">Provider</p>
          <p className="meta-value"><Zap size={12} color="#f97316"/> {model.toUpperCase()}</p>
        </div>
        <div>
          <p className="meta-label">Commands</p>
          <p className="meta-value">{logs.length} Steps</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {['Commands', 'Raw Logs'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`tab-btn ${activeTab === tab.toLowerCase() ? 'active' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Log List */}
      <div className="log-list">
        {logs.length === 0 && (
          <div className="flex-col center" style={{height: '100%', opacity: 0.3}}>
            <p>Ready to start automation...</p>
          </div>
        )}
        
        {logs.map((cmd) => (
          <div key={cmd.id} className="log-row">
            <div style={{marginTop: 2, opacity: 0.8}}>
              {cmd.status === 'success' ? <CheckCircle2 size={14} color="var(--accent-green)" /> : 
               cmd.status === 'error' ? <XCircle size={14} color="var(--accent-red)" /> :
               <div style={{width: 14, height: 14, borderRadius: '50%', border: '2px solid var(--text-faint)', borderTopColor: 'var(--accent-blue)', animation: 'spin 1s linear infinite'}}/>}
            </div>

            <div className="log-content">
              <span className="log-action">{cmd.action}</span>
              <div className="flex-row gap-2" style={{minWidth: 0}}>
                <span className="log-type">{cmd.type}</span>
                <code className="log-locator truncate">{cmd.value}</code>
              </div>
            </div>

            <div className="log-time flex-col gap-2">
              <span className="flex-row gap-1" style={{justifyContent: 'flex-end', background: '#18181b', padding: '2px 6px', borderRadius: 4}}>
                <Clock size={10} /> {cmd.duration}
              </span>
              <span>{cmd.time}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}