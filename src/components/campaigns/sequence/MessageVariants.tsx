import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Copy, Wand2 } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import type { PlatformType } from './types';

interface Variant {
  id: string;
  content: string;
  weight: number;
}

interface MessageVariantsProps {
  variants: Variant[];
  platform: PlatformType;
  onUpdate: (variants: Variant[]) => void;
}

export function MessageVariants({ variants, platform, onUpdate }: MessageVariantsProps) {
  const addVariant = () => {
    const newVariant = {
      id: crypto.randomUUID(),
      content: '',
      weight: 50
    };
    onUpdate([...variants, newVariant]);
  };

  const updateVariant = (id: string, updates: Partial<Variant>) => {
    onUpdate(variants.map(v => v.id === id ? { ...v, ...updates } : v));
  };

  const removeVariant = (id: string) => {
    if (variants.length > 1) {
      onUpdate(variants.filter(v => v.id !== id));
    }
  };

  const duplicateVariant = (variant: Variant) => {
    const newVariant = {
      ...variant,
      id: crypto.randomUUID(),
      weight: Math.max(0, 100 - variants.reduce((sum, v) => sum + v.weight, 0))
    };
    onUpdate([...variants, newVariant]);
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="popLayout">
        {variants.map((variant, index) => (
          <motion.div
            key={variant.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-white">
                Variant {index + 1}
              </h4>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => duplicateVariant(variant)}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
                {variants.length > 1 && (
                  <button
                    onClick={() => removeVariant(variant.id)}
                    className="p-1.5 text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <TextareaAutosize
              value={variant.content}
              onChange={(e) => updateVariant(variant.id, { content: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 resize-none"
              placeholder={`Write variant ${index + 1}...`}
              minRows={3}
            />

            <div className="flex items-center space-x-4">
              <label className="flex-1">
                <span className="text-sm text-slate-400">Weight (%)</span>
                <input
                  type="number"
                  value={variant.weight}
                  onChange={(e) => updateVariant(variant.id, { weight: Math.min(100, Math.max(0, parseInt(e.target.value))) })}
                  className="mt-1 w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
                />
              </label>
              <button
                onClick={() => {
                  // TODO: Implement AI suggestions
                }}
                className="mt-6 p-2 text-slate-400 hover:text-indigo-400 transition-colors"
              >
                <Wand2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={addVariant}
        className="w-full p-3 border border-dashed border-slate-700/50 rounded-lg text-slate-400 hover:text-white hover:border-indigo-500/50 transition-colors flex items-center justify-center space-x-2"
      >
        <Plus className="w-4 h-4" />
        <span>Add Variant</span>
      </motion.button>

      <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
        <h4 className="text-sm font-medium text-white mb-2">Weight Distribution</h4>
        <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden flex">
          {variants.map((variant) => (
            <div
              key={variant.id}
              className="h-full bg-indigo-500"
              style={{ width: `${variant.weight}%` }}
            />
          ))}
        </div>
        <div className="mt-2 text-xs text-slate-400">
          Total: {variants.reduce((sum, v) => sum + v.weight, 0)}%
        </div>
      </div>
    </div>
  );
}