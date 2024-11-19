import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, MessageSquare, Clock, Wand2, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { MessageEditor } from '../sequence/MessageEditor';
import { WorkflowEditor } from '../../workflow/WorkflowEditor';
import type { Message, ActionType, PlatformType } from '../sequence/types';

interface SequenceStepProps {
  data: {
    platforms: PlatformType[];
    sequence: Message[];
  };
  updateData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function SequenceStep({ data, updateData, onNext, onBack }: SequenceStepProps) {
  const [mode, setMode] = useState<'basic' | 'workflow'>('basic');
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null);
  const [showActionMenu, setShowActionMenu] = useState(false);

  const getActionTypes = () => {
    const actions = [{ type: 'wait', label: 'Wait Time', icon: Clock }];
    data.platforms.forEach(platform => {
      actions.push({
        type: 'message',
        label: `${platform} DM`,
        icon: MessageSquare,
        platform
      });
    });
    return actions;
  };

  const addMessage = (type: ActionType, platform?: PlatformType) => {
    const newMessage = {
      id: crypto.randomUUID(),
      type,
      content: '',
      delay: type === 'wait' ? 24 : 0,
      platform,
      variants: type === 'message' ? [
        { id: crypto.randomUUID(), content: '', weight: 100 }
      ] : undefined
    };
    setMessages(prev => [...prev, newMessage]);
    setActiveMessageId(newMessage.id);
    setShowActionMenu(false);
  };

  const updateMessage = (id: string, updates: Partial<Message>) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, ...updates } : msg
    ));
  };

  const addVariant = (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (!message || message.type !== 'message' || !message.variants) return;

    const currentVariants = message.variants;
    const newWeight = Math.floor(100 / (currentVariants.length + 1));
    
    const updatedVariants = [
      ...currentVariants.map(v => ({ ...v, weight: newWeight })),
      { id: crypto.randomUUID(), content: '', weight: newWeight }
    ];

    updateMessage(messageId, { variants: updatedVariants });
  };

  const handleContinue = () => {
    updateData({ sequence: messages });
    onNext();
  };

  const getActiveMessage = () => {
    return messages.find(m => m.id === activeMessageId);
  };

  const getVariantIndex = (message: Message) => {
    const index = messages.findIndex(m => m.id === message.id);
    const platformMessages = messages.filter(
      m => m.type === 'message' && m.platform === message.platform
    );
    return platformMessages.findIndex(m => m.id === message.id) + 1;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Message Sequence</h3>
            <p className="text-sm text-slate-400">Create your outreach sequence</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setMode('basic')}
              className={clsx(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                mode === 'basic'
                  ? 'bg-indigo-500 text-white'
                  : 'text-slate-400 hover:text-white'
              )}
            >
              Basic Editor
            </button>
            <button
              onClick={() => setMode('workflow')}
              className={clsx(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2',
                mode === 'workflow'
                  ? 'bg-indigo-500 text-white'
                  : 'text-slate-400 hover:text-white'
              )}
            >
              <Wand2 className="w-4 h-4" />
              <span>Workflow Builder</span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {mode === 'basic' ? (
          <motion.div
            key="basic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-12 gap-6"
          >
            {/* Left sidebar - Message list */}
            <div className="col-span-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveMessageId(message.id)}
                  className={clsx(
                    'p-4 rounded-lg border cursor-pointer transition-all',
                    message.id === activeMessageId
                      ? 'bg-indigo-500/20 border-indigo-500'
                      : 'border-slate-700/50 hover:border-indigo-500/50'
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {message.type === 'message' ? (
                        <MessageSquare className="w-4 h-4 text-indigo-400" />
                      ) : (
                        <Clock className="w-4 h-4 text-amber-400" />
                      )}
                      <span className="text-white font-medium">
                        {message.type === 'message' 
                          ? `${message.platform} DM v${getVariantIndex(message)}` 
                          : 'Wait'}
                      </span>
                    </div>
                  </div>
                  {message.type === 'wait' && (
                    <div className="flex items-center space-x-2 text-sm text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span>Wait {message.delay}h</span>
                    </div>
                  )}
                  {message.type === 'message' && message.variants && (
                    <div className="text-xs text-slate-400 mt-1">
                      {message.variants.length} variant{message.variants.length !== 1 ? 's' : ''}
                    </div>
                  )}
                </motion.div>
              ))}

              <div className="relative">
                <button
                  onClick={() => setShowActionMenu(!showActionMenu)}
                  className="w-full p-4 border border-dashed border-slate-700/50 rounded-lg text-slate-400 hover:text-white hover:border-indigo-500/50 transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Action</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showActionMenu && (
                  <div className="absolute left-0 right-0 mt-2 bg-slate-800 border border-slate-700/50 rounded-lg shadow-xl overflow-hidden z-10">
                    {getActionTypes().map((action) => (
                      <button
                        key={action.platform || action.type}
                        onClick={() => addMessage(action.type as ActionType, action.platform)}
                        className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-slate-700/50 transition-colors text-left"
                      >
                        <action.icon className="w-4 h-4 text-slate-400" />
                        <span className="text-white">{action.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right side - Message editor */}
            <div className="col-span-8">
              <AnimatePresence mode="wait">
                {messages.map(message => (
                  message.id === activeMessageId && (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      {message.type === 'wait' ? (
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-2">
                            Wait Duration
                          </label>
                          <div className="flex items-center space-x-3">
                            <input
                              type="number"
                              value={message.delay}
                              onChange={(e) => updateMessage(message.id, { delay: parseInt(e.target.value) })}
                              min="1"
                              className="w-24 px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
                            />
                            <span className="text-slate-400">hours</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <MessageEditor
                            content={message.content}
                            platform={message.platform!}
                            onChange={(content) => updateMessage(message.id, { content })}
                            variants={message.variants}
                            onUpdateVariants={(variants) => updateMessage(message.id, { variants })}
                            variantIndex={getVariantIndex(message)}
                            totalVariants={message.variants?.length || 1}
                          />
                          <button
                            onClick={() => addVariant(message.id)}
                            className="px-4 py-2 bg-slate-800/50 text-slate-400 hover:text-white rounded-lg text-sm transition-colors flex items-center space-x-2"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add Variant</span>
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="workflow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-[600px] bg-slate-900 rounded-lg border border-slate-800/50 overflow-hidden"
          >
            <WorkflowEditor platforms={data.platforms} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-4 py-2 text-slate-400 hover:text-white transition-colors flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          onClick={handleContinue}
          disabled={messages.length === 0}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}