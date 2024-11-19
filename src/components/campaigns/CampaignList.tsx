import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, CheckCircle, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  platform: string;
  sent: number;
  responses: number;
  replyRate: number;
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Q1 Lead Generation',
    status: 'active',
    platform: 'LinkedIn',
    sent: 1250,
    responses: 180,
    replyRate: 14.4,
  },
  {
    id: '2',
    name: 'Product Launch Outreach',
    status: 'paused',
    platform: 'Twitter',
    sent: 850,
    responses: 95,
    replyRate: 11.2,
  },
  {
    id: '3',
    name: 'Customer Feedback',
    status: 'completed',
    platform: 'Instagram',
    sent: 2000,
    responses: 320,
    replyRate: 16,
  },
];

const statusIcons = {
  active: Play,
  paused: Pause,
  completed: CheckCircle,
  draft: AlertCircle,
};

const statusColors = {
  active: 'text-green-500',
  paused: 'text-amber-500',
  completed: 'text-blue-500',
  draft: 'text-slate-500',
};

interface CampaignListProps {
  filter: string;
}

export function CampaignList({ filter }: CampaignListProps) {
  const filteredCampaigns = filter === 'all'
    ? mockCampaigns
    : mockCampaigns.filter(campaign => campaign.status === filter);

  return (
    <div className="space-y-4">
      {filteredCampaigns.map((campaign, index) => {
        const StatusIcon = statusIcons[campaign.status];
        
        return (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 hover:bg-slate-800/70 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <StatusIcon className={clsx('w-5 h-5', statusColors[campaign.status])} />
                <div>
                  <h3 className="text-lg font-medium text-white">{campaign.name}</h3>
                  <p className="text-sm text-slate-400">{campaign.platform}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <p className="text-sm text-slate-400">Sent</p>
                  <p className="text-lg font-medium text-white">{campaign.sent}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-400">Responses</p>
                  <p className="text-lg font-medium text-white">{campaign.responses}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-400">Reply Rate</p>
                  <p className="text-lg font-medium text-white">{campaign.replyRate}%</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}