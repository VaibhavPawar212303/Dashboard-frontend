'use client';

import { useState, useRef, useEffect } from 'react';
import { TestItem, CommandLog } from '@/types';
import Sidebar from './components/dashboard/Sidebar';
import CommandPanel from './components/dashboard/CommandPanel';
import SessionViewer from './components/dashboard/SessionViewer';

export default function DashboardPage() {
  // --- STATE ---
  const [sessions, setSessions] = useState<TestItem[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>("");
  const [logs, setLogs] = useState<CommandLog[]>([]);
  const [liveImage, setLiveImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Refs for socket and timing
  const eventSourceRef = useRef<EventSource | null>(null);
  const startTimeRef = useRef<number>(0);
  const stepStartTimeRef = useRef<number>(0);

  // --- ACTIONS ---

  const handleStartTask = (task: string, provider: string) => {
    if (!task) return;

    // 1. Create a new Session in Sidebar
    const newSessionId = Date.now().toString();
    const newSession: TestItem = {
      id: newSessionId,
      name: task,
      status: 'running',
      duration: '0s',
      time: 'Just now'
    };

    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSessionId);
    setLogs([]); // Clear logs for new run
    setLiveImage(null);
    setIsProcessing(true);
    startTimeRef.current = Date.now();

    // 2. Connect to Backend
    if (eventSourceRef.current) eventSourceRef.current.close();
    
    // USE YOUR RENDER URL
    const BACKEND_URL = "https://automation-backend-9jov.onrender.com"; 
    const url = `${BACKEND_URL}/stream-task?task=${encodeURIComponent(task)}&model=${provider}`;

    const es = new EventSource(url);
    eventSourceRef.current = es;

    es.onmessage = (event) => {
      const data = JSON.parse(event.data);
      handleIncomingEvent(data, newSessionId);
    };

    es.onerror = () => {
      updateSessionStatus(newSessionId, 'failed');
      setIsProcessing(false);
      es.close();
    };
  };

  const handleIncomingEvent = (data: any, sessionId: string) => {
    // 1. Video Frame
    if (data.type === 'video_frame') {
      setLiveImage(data.content);
      return;
    }

    // 2. Action Started (e.g., "🛠️ click ...")
    if (data.type === 'action') {
      stepStartTimeRef.current = Date.now();
      const parsed = parseActionString(data.content);
      
      const newLog: CommandLog = {
        id: Date.now(),
        action: parsed.action,
        type: parsed.type,
        value: parsed.value,
        duration: '...',
        time: new Date().toLocaleTimeString([], { hour12: false, formatMatcher: 'basic' }).split(' ')[0],
        status: 'pending'
      };
      setLogs(prev => [...prev, newLog]);
    }

    // 3. Action Result (Success/Fail)
    if (data.type === 'result' || data.type === 'screenshot') {
      const duration = Date.now() - stepStartTimeRef.current;
      
      setLogs(prev => {
        const lastLog = prev[prev.length - 1];
        if (!lastLog || lastLog.status !== 'pending') return prev;

        return prev.map((log, idx) => 
          idx === prev.length - 1 
            ? { ...log, status: 'success', duration: `${duration}ms` } 
            : log
        );
      });
    }

    // 4. Session Completed
    if (data.type === 'done') {
      updateSessionStatus(sessionId, 'passed');
      setIsProcessing(false);
      if (eventSourceRef.current) eventSourceRef.current.close();
    }

    // 5. Error
    if (data.type === 'error') {
      const errorLog: CommandLog = {
        id: Date.now(),
        action: 'Error',
        type: 'system',
        value: data.content,
        duration: '0ms',
        time: new Date().toLocaleTimeString(),
        status: 'error'
      };
      setLogs(prev => [...prev, errorLog]);
      // Don't kill session immediately, allow retries or more logs
    }
  };

  // --- HELPERS ---

  const updateSessionStatus = (id: string, status: 'passed' | 'failed') => {
    const totalTime = ((Date.now() - startTimeRef.current) / 1000).toFixed(1) + 's';
    setSessions(prev => prev.map(s => s.id === id ? { ...s, status, duration: totalTime } : s));
  };

  // Helper to turn "🛠️ click {'selector': '#btn'}" -> { action: 'Click', type: 'selector', value: '#btn' }
  const parseActionString = (raw: string) => {
    // Remove emoji and trim
    const clean = raw.replace('🛠️', '').trim();
    const firstSpace = clean.indexOf(' ');
    
    if (firstSpace === -1) return { action: clean, type: 'system', value: '' };

    const action = clean.substring(0, firstSpace); // e.g. "click"
    const argsStr = clean.substring(firstSpace + 1); // e.g. "{'selector': ...}"

    // Make UI pretty
    const uiAction = action.charAt(0).toUpperCase() + action.slice(1); 
    
    let type = 'args';
    let value = argsStr;

    try {
      // Try to parse simplified JSON args
      // Python dict string usually uses single quotes, JSON uses double. 
      // This is a naive cleanup for display purposes
      const validJson = argsStr.replace(/'/g, '"'); 
      const args = JSON.parse(validJson);
      
      if (args.selector) { type = 'selector'; value = args.selector; }
      else if (args.url) { type = 'url'; value = args.url; }
      else if (args.script) { type = 'script'; value = 'Execute JS'; }
    } catch (e) {
      // If parsing fails, just show raw args truncated
      value = argsStr.length > 50 ? argsStr.substring(0, 50) + '...' : argsStr;
    }

    return { action: uiAction, type, value };
  };

  const activeSession = sessions.find(s => s.id === activeSessionId) || {
    id: 'new', name: 'New Session', status: 'idle', duration: '-', time: '-'
  } as TestItem;

  return (
    <div className="app-container">
      <Sidebar 
        tests={sessions} 
        activeTestId={activeSessionId} 
        onSelectTest={(t) => setActiveSessionId(t.id)} 
      />
      <CommandPanel 
        activeTest={activeSession} 
        logs={logs}
        onRunTask={handleStartTask} // Connecting the input
        isProcessing={isProcessing}
      />
      <SessionViewer 
        liveImage={liveImage} 
      />
    </div>
  );
}