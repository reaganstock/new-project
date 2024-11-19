import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { StepIndicator } from './StepIndicator';
import { NameStep } from './steps/NameStep';
import { LeadsStep } from './steps/LeadsStep';
import { SequenceStep } from './steps/SequenceStep';
import { AccountsStep } from './steps/AccountsStep';
import { ScheduleStep } from './steps/ScheduleStep';

interface CampaignCreatorProps {
  onClose: () => void;
}

export function CampaignCreator({ onClose }: CampaignCreatorProps) {
  const [step, setStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    name: '',
    platform: '',
    leads: [],
    sequence: [{
      id: '1',
      subject: '',
      content: '',
      delay: 0,
      variables: []
    }],
    accounts: [],
    schedule: {
      timezone: '',
      days: [],
      timeRange: { start: '09:00', end: '17:00' }
    }
  });

  const steps = [
    { id: 1, title: 'Name Campaign', component: NameStep },
    { id: 2, title: 'Import Leads', component: LeadsStep },
    { id: 3, title: 'Message Sequence', component: SequenceStep },
    { id: 4, title: 'Select Accounts', component: AccountsStep },
    { id: 5, title: 'Schedule', component: ScheduleStep }
  ];

  const currentStep = steps.find(s => s.id === step);
  const StepComponent = currentStep?.component;

  const handleNext = () => setStep(prev => Math.min(prev + 1, steps.length));
  const handleBack = () => step === 1 ? onClose() : setStep(prev => prev - 1);
  
  const updateCampaignData = (data: Partial<typeof campaignData>) => {
    setCampaignData(prev => ({ ...prev, ...data }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-950 z-50"
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-800/50">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-400" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">Create New Campaign</h1>
                <p className="text-sm text-slate-400">Step {step} of {steps.length}</p>
              </div>
            </div>
            <div className="mt-6">
              <StepIndicator steps={steps} currentStep={step} />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {StepComponent && (
                <StepComponent
                  data={campaignData}
                  updateData={updateCampaignData}
                  onNext={handleNext}
                  onBack={handleBack}
                  isLastStep={step === steps.length}
                />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}