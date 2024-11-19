import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Table, ArrowLeft } from 'lucide-react';
import clsx from 'clsx';

interface LeadsStepProps {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function LeadsStep({ data, updateData, onNext, onBack }: LeadsStepProps) {
  const [uploadMethod, setUploadMethod] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-white mb-2">Import Leads</h3>
        <p className="text-sm text-slate-400">Choose how you want to import your leads</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setUploadMethod('csv')}
          className="p-6 rounded-lg border border-slate-700/50 hover:border-indigo-500/50 transition-all text-left"
        >
          <Upload className="w-6 h-6 text-indigo-400 mb-3" />
          <h4 className="text-white font-medium mb-1">Upload CSV</h4>
          <p className="text-sm text-slate-400">Import leads from a CSV file</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setUploadMethod('sheets')}
          className="p-6 rounded-lg border border-slate-700/50 hover:border-indigo-500/50 transition-all text-left"
        >
          <Table className="w-6 h-6 text-indigo-400 mb-3" />
          <h4 className="text-white font-medium mb-1">Google Sheets</h4>
          <p className="text-sm text-slate-400">Import directly from Google Sheets</p>
        </motion.button>
      </div>

      {uploadMethod === 'csv' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={clsx(
              'border-2 border-dashed rounded-lg p-8 text-center transition-colors',
              isDragging
                ? 'border-indigo-500 bg-indigo-500/10'
                : 'border-slate-700/50 hover:border-indigo-500/50'
            )}
          >
            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <p className="text-sm text-slate-400 mb-2">
              Drag and drop your CSV file here, or{' '}
              <span className="text-indigo-400 hover:text-indigo-300 cursor-pointer">
                browse
              </span>
            </p>
            <p className="text-xs text-slate-500">Supported formats: .csv</p>
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
          onClick={onNext}
          disabled={!uploadMethod}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}