export interface TestItem {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'running' | 'idle';
  duration: string;
  time: string;
}

export interface CommandLog {
  id: number;
  action: string;
  type: string;
  value: string;
  duration: string;
  time: string;
  status: 'success' | 'error' | 'pending';
}