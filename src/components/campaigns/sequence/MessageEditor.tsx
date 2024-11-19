import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextareaAutosize from 'react-textarea-autosize';
import { MessageToolbar } from './MessageToolbar';
import { MessageVariants } from './MessageVariants';
import { AiSuggestions } from './AiSuggestions';
import type { PlatformType } from './types';

interface MessageEditorProps {
  content: string;
  platform: PlatformType;
  onChange: (content: string) => void;
  variants?: Array<{ id: string; content: string; weight: number; }>;
  onUpdateVariants?: (variants: Array<{ id: string; content: string; weight: number; }>) => void;
  variantIndex: number;
  totalVariants: number;
}

export function MessageEditor({
  content,
  platform,
  onChange,
  variants = [],
  onUpdateVariants,
  variantIndex,
  totalVariants
}: MessageEditorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const [showVariants, setShowVariants] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInsertVariable = (variable: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newContent = content.substring(0, start) + 
                      `{${variable}}` + 
                      content.substring(end);
    onChange(newContent);
    
    // Restore cursor position after variable insertion
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + variable.length + 2; // +2 for the curly braces
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const handleAiSuggestion = (suggestion: string) => {
    onChange(suggestion);
    setShowAiSuggestions(false);
  };

  const handlePreview = () => {
    setShowPreview(!showPreview);
  };

  const renderPreview = (text: string) => {
    const previewData = {
      firstName: 'John',
      lastName: 'Doe',
      company: 'Acme Inc',
      position: 'CEO',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
      city: 'New York',
      country: 'USA'
    };

    return text.replace(/\{(\w+)\}/g, (match, variable) => {
      return previewData[variable as keyof typeof previewData] || match;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white">
          {platform} Message {totalVariants > 1 && `(v${variantIndex}/${totalVariants})`}
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowVariants(!showVariants)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              showVariants
                ? 'bg-indigo-500 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {showVariants ? 'Hide Variants' : 'Show Variants'}
          </button>
          <button
            onClick={() => setShowAiSuggestions(!showAiSuggestions)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              showAiSuggestions
                ? 'bg-indigo-500 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {showAiSuggestions ? 'Hide AI' : 'AI Suggestions'}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showVariants ? (
          <motion.div
            key="variants"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <MessageVariants
              variants={variants}
              platform={platform}
              onUpdate={onUpdateVariants || (() => {})}
            />
          </motion.div>
        ) : showAiSuggestions ? (
          <motion.div
            key="ai"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <AiSuggestions
              onSelect={handleAiSuggestion}
              platform={platform}
            />
          </motion.div>
        ) : (
          <motion.div
            key="editor"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="relative">
              <TextareaAutosize
                ref={textareaRef}
                value={content}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 resize-none min-h-[200px]"
                placeholder={`Enter your ${platform} message...`}
                minRows={8}
                maxRows={12}
              />

              <MessageToolbar
                platform={platform}
                characterCount={content.length}
                onInsertVariable={handleInsertVariable}
                onAiSuggestion={() => setShowAiSuggestions(true)}
                onPreview={handlePreview}
                onSaveTemplate={() => {}}
                leadColumns={['firstName', 'lastName', 'email', 'company', 'position']} // This would come from your lead list
              />
            </div>

            {showPreview && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
              >
                <h4 className="text-sm font-medium text-slate-400 mb-2">Message Preview</h4>
                <div className="whitespace-pre-wrap text-white">
                  {renderPreview(content)}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}