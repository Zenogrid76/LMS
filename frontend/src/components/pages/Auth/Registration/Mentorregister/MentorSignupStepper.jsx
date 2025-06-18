import React, { useState } from 'react';
import Step1 from './Mtstep1';
import Step2 from './Mtstep2';
import Step3 from './Mtstep3';
import Step4 from './Mtstep4';

const steps = [Step1, Step2, Step3, Step4];

const MentorSignupStepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const nextStep = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => setCurrentStep(prev => prev - 1);

  const handleFinalSubmit = (data) => {
    const allData = { ...formData, ...data };
    // send allData to backend here
    console.log('Submitting:', allData);
  };

  const StepComponent = steps[currentStep];

  return (
    <div>
<div className="flex flex-col items-center gap-2 px-4 mt-4">
  <div className="flex flex-row items-center justify-center w-full">
    <span className="text-base font-medium text-[#0D1C17]">
      Step {currentStep + 1} of {steps.length}
    </span>
  </div>
  <div className="w-full max-w-md h-2 bg-[#F7FAFA] rounded mx-auto">
    <div
      className="h-2 rounded bg-[#1FE0AB] transition-all duration-300"
      style={{
        width: `${((currentStep + 1) / steps.length) * 100}%`
      }}
    />
  </div>
</div>


  <StepComponent
    onNext={currentStep === steps.length - 1 ? handleFinalSubmit : nextStep}
    onBack={prevStep}
    defaultValues={formData}
  />
  <div className="text-center mt-2">
    Step {currentStep + 1} of {steps.length}
  </div>
</div>

  );
};

export default MentorSignupStepper;
