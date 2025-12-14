import { Search, XCircle, CheckCircle2, Cpu, Clock, Filter } from 'lucide-react';
import { TestItem } from '@/types';

interface SidebarProps {
  tests: TestItem[];
  activeTestId: string;
  onSelectTest: (test: TestItem) => void;
}

export default function Sidebar({ tests, activeTestId, onSelectTest }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-area">
          <Cpu size={20} color="#f97316" />
          <span>App Automation</span>
        </div>
        
        <div className="search-box">
          <Search className="search-icon" size={14} />
          <input type="text" placeholder="Search Test..." />
        </div>
        
        <div className="filter-pills">
          <div className="pill red"><XCircle size={12} /> Failed (2)</div>
          <div className="pill green"><CheckCircle2 size={12} /> Passed (3)</div>
          <button className="icon-btn" style={{marginLeft: 'auto'}}><Filter size={14}/></button>
        </div>
      </div>

      <div className="test-list">
        {tests.map((test) => (
          <div 
            key={test.id}
            onClick={() => onSelectTest(test)}
            className={`test-item ${activeTestId === test.id ? 'active' : ''}`}
          >
            <div className="flex-row gap-3" style={{alignItems: 'flex-start'}}>
              {test.status === 'passed' ? (
                <CheckCircle2 size={16} color="var(--accent-green)" style={{marginTop: 2}} />
              ) : (
                <XCircle size={16} color="var(--accent-red)" style={{marginTop: 2}} />
              )}
              <div style={{flex: 1, minWidth: 0}}>
                <h4 className="test-title truncate">{test.name}</h4>
                <div className="test-meta">
                  <span className="flex-row gap-2"><Clock size={10} /> {test.duration}</span>
                  <span>{test.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}