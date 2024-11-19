import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, Search } from 'lucide-react';
import { CampaignList } from './CampaignList';
import { CampaignCreator } from './CampaignCreator';
import { StatusFilter } from './StatusFilter';

export function CampaignsTab() {
  const [isCreating, setIsCreating] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  if (isCreating) {
    return <CampaignCreator onClose={() => setIsCreating(false)} />;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500"
        >
          Campaigns
        </motion.h1>
        
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Campaign</span>
        </motion.button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search campaigns..."
            className="w-full h-10 pl-10 pr-4 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all"
          />
        </div>
        <StatusFilter value={statusFilter} onChange={setStatusFilter} />
      </div>

      <CampaignList filter={statusFilter} />
    </div>
  );
}