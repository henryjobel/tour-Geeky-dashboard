"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { submitOption } from "@/services/productService";

interface OptionData {
  name: string;
  reference_code?: string;
  maximum_group_size?: number;
  is_wheelchair_accessible?: boolean;
  skip_the_line?: boolean;
  audio_guide?: boolean;
  has_fixed_time?: boolean;
  valid_for?: number;
  booklet?: boolean;
  is_private?: boolean;
  drop_off_type?: "different_place" | "same_place" | "no_service";
  meeting_point_type?: string;

  host_languages?: { keyword: string }[];
  audio_guides_languages?: { keyword: string }[];
  booklet_languages?: { keyword: string }[];

  meet?: {
    address: string;
    landmark: string;
    description: string;
    latitude: number;
    longitude: number;
  };
  drop?: {
    address: string;
    landmark: string;
    description: string;
    latitude: number;
    longitude: number;
  };
}

interface OptionStore {
  optionData: OptionData;
  setOptionData: (data: Partial<OptionData>) => void;
  resetOptionData: () => void;
  submitOption: () => Promise<void>;
}

const initialOptionData: OptionData = {
  name: "",
  valid_for: 1,

};

export const useOptionStore = create<OptionStore>()(
  persist(
    (set, get) => ({
      optionData: initialOptionData,
      setOptionData: (data) =>
        set((state) => ({ optionData: { ...state.optionData, ...data } })),
      resetOptionData: () => set({ optionData: initialOptionData }),
      submitOption: async () => {
        const { optionData } = get();
        const result = await submitOption(optionData);

        if (result.success) {
          alert("Success");
          get().resetOptionData();
        } else {
          alert(result.message);
        }
      },
    }),
    {
      name: "option-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
