'use client';

import { useState, useRef } from 'react';
import { CommandLog, TestItem } from './types';
import Sidebar from './_components/dashboard/Sidebar';
import CommandPanel from './_components/dashboard/CommandPanel';
import SessionViewer from './_components/dashboard/SessionViewer';


export default function DashboardPage() {
  const [sessions, setSessions] = useState<TestItem[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>("");
  const [logs, setLogs] = useState<CommandLog[]>([]);
  const [liveImage, setLiveImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const eventSourceRef = useRef<EventSource | null>(null);
  const stepStartTimeRef = useRef<number>(0);

  const handleStartTask = (task: string, provider: string) => {
    if (!task) return;

    const newSessionId = Date.now().toString();
    const newSession: TestItem = { id: newSessionId, name: task, status: 'running', duration: '0s', time: 'Just now' };

    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSessionId);
    setLogs([]);
    setLiveImage(null);
    setIsProcessing(true);

    if (eventSourceRef.current) eventSourceRef.current.close();
    
    // REPLACE WITH YOUR RENDER URL
    const BACKEND_URL = "https://automation-backend-9jov.onrender.com"; 
    const url = `${BACKEND_URL}/stream-task?task=${encodeURIComponent(task)}&model=${provider}`;

    const es = new EventSource(url);
    eventSourceRef.current = es;

    es.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'video_frame') {
        setLiveImage(data.content);
        return;
      }

      if (data.type === 'action') {
        stepStartTimeRef.current = Date.now();
        setLogs(prev => [...prev, {
          id: Date.now(),
          action: data.content.replace('🛠️', '').split(' ')[1] || 'Action',
          type: 'exec',
          value: data.content,
          duration: '...',
          time: new Date().toLocaleTimeString(),
          status: 'pending'
        }]);
      }

      if (data.type === 'result') {
        const duration = Date.now() - stepStartTimeRef.current;
        setLogs(prev => {
          const last = prev[prev.length - 1];
          if(last && last.status === 'pending') {
             return prev.map((l, i) => i === prev.length -1 ? {...l, status: 'success', duration: `${duration}ms`} : l);
          }
          return prev;
        });
      }

      if (data.type === 'done') {
        setSessions(prev => prev.map(s => s.id === newSessionId ? { ...s, status: 'passed' } : s));
        setIsProcessing(false);
        es.close();
      }
    };

    es.onerror = () => {
      setSessions(prev => prev.map(s => s.id === newSessionId ? { ...s, status: 'failed' } : s));
      setIsProcessing(false);
      es.close();
    };
  };

  const activeSession = sessions.find(s => s.id === activeSessionId) || { id: 'new', name: 'New Session', status: 'idle', duration: '-', time: '-' } as TestItem;

  return (
    <div className="flex h-screen bg-[#050505] text-gray-300 font-sans overflow-hidden">
      <Sidebar tests={sessions} activeTestId={activeSessionId} onSelectTest={(t) => setActiveSessionId(t.id)} />
      <CommandPanel activeTest={activeSession} logs={logs} onRunTask={handleStartTask} isProcessing={isProcessing} />
      <SessionViewer liveImage={liveImage} status={activeSession.status} />
    </div>
  );
}