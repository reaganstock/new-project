import React from 'react';
import { motion } from 'framer-motion';
import { WorkflowCanvas } from './WorkflowCanvas';
import { NodeEditor } from './NodeEditor';

interface WorkflowEditorProps {
  platform?: string;
}

export function WorkflowEditor({ platform = 'instagram' }: WorkflowEditorProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-full"
    >
      <div className="flex-1 relative">
        <WorkflowCanvas />
      </div>
      <NodeEditor platform={platform} />
    </motion.div>
  );
}