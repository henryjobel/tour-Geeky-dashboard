"use client";
import { ApiBaseMysql } from "@/Helper/ApiBase";
import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";
import { submitProduct } from "@/services/productService";

interface ProductData {
  // language and category
  languageType: string;
  category: string;
  // main info
  title: string;
  metaTitle: string;
  departure_from: string;
  metaDescription: string;
  images?: any[];
  description: string;
  summarize: { summaryText: string }[];
  basePrice: string;
  basePriceFor: string;
  duration: string;
  location: { address: string }[];
  // keywords
  productKeywords: { keyword: string }[];
  overviewcards: {
    title: string;
    subtitle: string;
    backgroundColor: string;
    icon: string;
  }[];
  // options
  notSuitable: { condition: string }[];
  notAllowed: { restriction: string }[];
  mustCarryItems: { item: string }[];
  emergencyContacts: { name: string; phone: string }[];
  bookingInformation: string;
  options: { name: string }[];
  // inclusion
  inclusions: { name: string }[];
  exclusions: { name: string }[];
  isFoodIncluded: boolean;
  isTransportIncluded: boolean;
  // other
  attractionTicket?: {
    ticketType: string;
    ageRestrictions: string;
    accessibility: string;
  };
  pickupDropoffs: { pickup: string; dropoff: string }[];
  otherCategory?: {
    categoryType: string;
    activityName: string;
    specialRequirements: string;
  };
  tour?: {
    tourType: string;
    locationsCovered: string;
    guideInformation: string;
  };
  cityCard?: {
    cardName: string;
    validFor: string;
    activationMethod: string;
  };
  hopOnHopOffTicket?: {
    routeInformation: string;
    ticketType: string;
    operatingHours: string;
    frequency: string;
  };
  isBlocked: boolean;
  // pricing
  schedules: {
    name: string;
    start_time: string;
    end_time: string;
    interval_mins: number;
    available_days: number[];
    prices: { name: string; option: string; capacity: number; price: string }[];
  }[];
  // liability
  transfer?: {
    transferType: string;
    pickupLocation: string;
    dropoffLocation: string;
    vehicleType: string;
    luggageAllowance: string;
  };
  rental?: {
    rentalItemName: string;
    rentalType: string;
    rentalPeriod: string;
    ageRequirement: string;
    damagePolicy: string;
  };
  cancellationPolicy: string;
  contactInformation: string;
  termsAndConditions: string;
  option?: number;
}

interface ProductStore {
  productData: ProductData;
  setProductData: (data: Partial<ProductData>) => void;
  resetProductData: () => void;
  submitProduct: () => Promise<void>;
}

const initialProductData: ProductData = {
  languageType: "English",
  category: "",
  title: "",
  metaTitle: "",
  departure_from: "",
  metaDescription: "",
  description: "",
  basePrice: "",
  basePriceFor: "",
  cancellationPolicy: "",
  duration: "",
  contactInformation: "",
  termsAndConditions: "",
  bookingInformation: "",
  isBlocked: false,
  isFoodIncluded: false,
  isTransportIncluded: false,
  summarize: [],
  location: [],
  productKeywords: [],
  overviewcards: [],
  images: [],
  inclusions: [],
  exclusions: [],
  emergencyContacts: [],
  pickupDropoffs: [],
  options: [],
  notSuitable: [],
  notAllowed: [],
  mustCarryItems: [],
  schedules: [],
};


export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      productData: initialProductData,
      setProductData: (data) =>
        set((state) => ({ productData: { ...state.productData, ...data } })),
      resetProductData: () => set({ productData: initialProductData }),
      submitProduct: async () => {
        const { productData } = get();
        const result = await submitProduct(productData);

        if (result.success) {
          alert("Success");
          get().resetProductData();
        } else {
          alert(result.message);
        }
      },
    }),
    {
      name: "product-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
