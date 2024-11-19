import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, MessageSquare, Send, Hash, 
  Home, GraduationCap, Slack, Video, Share2 } from 'lucide-react';
import clsx from 'clsx';
import type { PlatformType } from '../sequence/types';

const platforms = [
  { id: 'Instagram' as PlatformType, name: 'Instagram', icon: MessageCircle },
  { id: 'Facebook' as PlatformType, name: 'Facebook', icon: MessageSquare },
  { id: 'TikTok' as PlatformType, name: 'TikTok', icon: Video },
  { id: 'Twitter' as PlatformType, name: 'X', icon: MessageCircle },
  { id: 'LinkedIn' as PlatformType, name: 'LinkedIn', icon: Share2 },
  { id: 'Reddit' as PlatformType, name: 'Reddit', icon: Hash },
  { id: 'Discord' as PlatformType, name: 'Discord', icon: MessageSquare },
  { id: 'WhatsApp' as PlatformType, name: 'WhatsApp', icon: MessageCircle },
  { id: 'Telegram' as PlatformType, name: 'Telegram', icon: Send },
  { id: 'Slack' as PlatformType, name: 'Slack', icon: Slack },
  { id: 'Pinterest' as PlatformType, name: 'Pinterest', icon: Share2 },
  { id: 'Nextdoor' as PlatformType, name: 'Nextdoor', icon: Home },
  { id: 'Skool' as PlatformType, name: 'Skool', icon: GraduationCap },
];

interface NameStepProps {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
}

export function NameStep({ data, updateData, onNext }: NameStepProps) {
  const [name, setName] = useState(data.name || '');
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformType[]>(data.platforms || []);
  const [error, setError] = useState('');

  const handlePlatformToggle = (platformId: PlatformType) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
    setError('');
  };

  const handleContinue = () => {
    if (!name.trim()) {
      setError('Please enter a campaign name');
      return;
    }
    if (selectedPlatforms.length === 0) {
      setError('Please select at least one platform');
      return;
    }
    updateData({ name, platforms: selectedPlatforms });
    onNext();
  };

  return (
    <div className="space-y-8">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">
          Campaign Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
          className={clsx(
            'w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-white placeholder-slate-400',
            'focus:outline-none focus:ring-2 transition-all',
            error ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-700/50 focus:ring-indigo-500/20 focus:border-indigo-500'
          )}
          placeholder="Enter campaign name..."
          autoFocus
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-4">
          Select Platforms
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {platforms.map(({ id, name: platformName, icon: Icon }) => (
            <motion.button
              key={id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handlePlatformToggle(id)}
              className={clsx(
                'p-4 rounded-lg border transition-all',
                selectedPlatforms.includes(id)
                  ? 'bg-indigo-500/20 border-indigo-500'
                  : 'border-slate-700/50 hover:border-indigo-500/50'
              )}
            >
              <Icon className={clsx(
                'w-6 h-6 mx-auto mb-2',
                selectedPlatforms.includes(id) ? 'text-indigo-400' : 'text-slate-400'
              )} />
              <p className={clsx(
                'text-sm font-medium',
                selectedPlatforms.includes(id) ? 'text-white' : 'text-slate-400'
              )}>
                {platformName}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400"
        >
          {error}
        </motion.p>
      )}

      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors"
        >
          Continue
        </motion.button>
      </div>
    </div>
  );
}