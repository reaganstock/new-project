import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, AlertCircle, Search } from 'lucide-react';
import clsx from 'clsx';

interface Account {
  id: string;
  platform: string;
  name: string;
  avatar: string;
  status: 'active' | 'warning' | 'error';
  limit: number;
  used: number;
}

const mockAccounts: Account[] = [
  {
    id: '1',
    platform: 'linkedin',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces',
    status: 'active',
    limit: 100,
    used: 45,
  },
  {
    id: '2',
    platform: 'twitter',
    name: 'Jane Smith',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
    status: 'warning',
    limit: 50,
    used: 42,
  },
  {
    id: '3',
    platform: 'instagram',
    name: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces',
    status: 'active',
    limit: 75,
    used: 30,
  },
  {
    id: '4',
    platform: 'instagram',
    name: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces',
    status: 'active',
    limit: 75,
    used: 15,
  }
];

interface AccountsStepProps {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function AccountsStep({ data, updateData, onNext, onBack }: AccountsStepProps) {
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>(
    data.accounts || []
  );
  const [searchQuery, setSearchQuery] = useState('');

  const platformAccounts = mockAccounts.filter(
    account => account.platform === data.platform &&
    (searchQuery === '' || account.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleAccount = (id: string) => {
    setSelectedAccounts(prev =>
      prev.includes(id)
        ? prev.filter(accId => accId !== id)
        : [...prev, id]
    );
  };

  const handleContinue = () => {
    updateData({ accounts: selectedAccounts });
    onNext();
  };

  const getTotalDailyLimit = () => {
    return selectedAccounts.reduce((total, accountId) => {
      const account = mockAccounts.find(acc => acc.id === accountId);
      return total + (account?.limit || 0);
    }, 0);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-white mb-2">Select Accounts</h3>
        <p className="text-sm text-slate-400">
          Choose {data.platform} accounts to use for this campaign
        </p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search accounts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
          />
        </div>
      </div>

      {platformAccounts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-400">No {data.platform} accounts found</p>
          <p className="text-sm text-slate-500 mt-2">Try connecting a new account</p>
        </motion.div>
      ) : (
        <div className="space-y-4 mb-8">
          {platformAccounts.map((account) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              onClick={() => toggleAccount(account.id)}
              className={clsx(
                'p-4 rounded-lg border transition-all cursor-pointer',
                selectedAccounts.includes(account.id)
                  ? 'bg-indigo-500/20 border-indigo-500'
                  : 'border-slate-700/50 hover:border-indigo-500/50'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={account.avatar}
                      alt={account.name}
                      className="w-10 h-10 rounded-full"
                    />
                    {account.status === 'active' && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    {account.status === 'warning' && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                        <AlertCircle className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{account.name}</h4>
                    <p className="text-sm text-slate-400 capitalize">{account.platform}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-slate-400">Daily Limit</p>
                  <p className="text-white font-medium">
                    {account.used}/{account.limit} messages
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {selectedAccounts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-400">Total Daily Capacity</p>
              <p className="text-lg font-medium text-white">{getTotalDailyLimit()} messages</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Selected Accounts</p>
              <p className="text-lg font-medium text-white">{selectedAccounts.length}</p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 text-slate-400 hover:text-white transition-colors flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          onClick={handleContinue}
          disabled={selectedAccounts.length === 0}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}