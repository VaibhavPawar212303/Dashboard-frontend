export interface TestItem {
  id: string; // Changed to string for Session IDs
  name: string;
  status: 'passed' | 'failed' | 'running' | 'idle';
  duration: string;
  time: string;
}

export interface CommandLog {
  id: number;
  action: string; // e.g., "Click Element"
  type: string;   // e.g., "selector"
  value: string;  // e.g., "#submit-btn"
  duration: string;
  time: string;
  status: 'success' | 'error' | 'pending';
  rawMessage?: string; // To store the original message if needed
}