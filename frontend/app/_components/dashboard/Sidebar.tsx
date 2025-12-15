import { Search, XCircle, CheckCircle2, Cpu, Clock, Filter } from 'lucide-react';
import { TestItem } from '@/app/types';
import { cn } from '@/app/lib/utils';

interface SidebarProps {
  tests: TestItem[];
  activeTestId: string;
  onSelectTest: (test: TestItem) => void;
}

export default function Sidebar({ tests, activeTestId, onSelectTest }: SidebarProps) {
  return (
    <aside className="w-80 border-r border-zinc-800 flex flex-col bg-zinc-950">
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-orange-600/10 p-2 rounded-lg">
            <Cpu className="text-orange-500" size={20} />
          </div>
          <span className="font-semibold text-zinc-100 tracking-tight">App Automation</span>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-3 top-2.5 text-zinc-500" size={14} />
          <input 
            type="text" 
            placeholder="Search Session..." 
            className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-2 pl-9 pr-4 text-xs text-zinc-300 focus:border-zinc-600 focus:outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="px-2 py-2 space-y-0.5">
          {tests.map((test) => (
            <div 
              key={test.id}
              onClick={() => onSelectTest(test)}
              className={cn(
                "p-3 rounded-lg cursor-pointer transition-all border border-transparent",
                activeTestId === test.id 
                  ? "bg-zinc-900 border-zinc-800 shadow-sm" 
                  : "hover:bg-zinc-900/50 text-zinc-500"
              )}
            >
              <div className="flex items-start gap-3">
                {test.status === 'passed' ? <CheckCircle2 size={16} className="text-green-500 mt-0.5" /> : 
                 test.status === 'running' ? <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mt-0.5" /> :
                 <XCircle size={16} className="text-red-500 mt-0.5" />}
                <div className="flex-1 min-w-0">
                  <h4 className={cn("text-xs font-medium truncate mb-1.5", activeTestId === test.id ? "text-zinc-200" : "text-zinc-400")}>
                    {test.name}
                  </h4>
                  <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono">
                    <span className="flex items-center gap-1"><Clock size={10} /> {test.duration}</span>
                    <span>{test.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}