import { create } from "zustand";

interface StepStore {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
}

export const useStepStore = create<StepStore>((set) => ({
  step: 0,
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),
  setStep: (step) => set({ step }),
}));
