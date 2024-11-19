import React from 'react';
import { Panel } from 'reactflow';
import { motion } from 'framer-motion';
import { MessageSquare, Clock, GitFork, Ban, Plus } from 'lucide-react';
import clsx from 'clsx';
import type { NodeType } from './nodes/types';

const nodeTypes: Array<{
  type: NodeType;
  label: string;
  icon: typeof MessageSquare;
  color: string;
}> = [
  { type: 'send-dm', label: 'Send DM', icon: MessageSquare, color: 'indigo' },
  { type: 'wait-time', label: 'Wait Time', icon: Clock, color: 'amber' },
  { type: 'if-then', label: 'If/Then', icon: GitFork, color: 'emerald' },
  { type: 'end-campaign', label: 'End Campaign', icon: Ban, color: 'red' },
];

export function WorkflowControls() {
  const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Panel position="top-center" className="flex justify-center">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-lg p-2 flex space-x-2"
      >
        {nodeTypes.map(({ type, label, icon: Icon, color }) => (
          <motion.div
            key={type}
            draggable
            onDragStart={(e) => onDragStart(e, type)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={clsx(
              'px-3 py-2 rounded-lg cursor-move flex items-center space-x-2',
              'hover:bg-slate-700/50 transition-colors group'
            )}
          >
            <div className={clsx(
              'p-1.5 rounded-md transition-colors',
              `bg-${color}-500/20 group-hover:bg-${color}-500/30`
            )}>
              <Icon className={clsx('w-4 h-4', `text-${color}-400`)} />
            </div>
            <span className="text-sm text-slate-300 group-hover:text-white">
              {label}
            </span>
            <Plus className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </motion.div>
    </Panel>
  );
}