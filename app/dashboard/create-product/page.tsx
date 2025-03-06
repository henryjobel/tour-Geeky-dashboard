"use client";
import React from "react";
import { Icon } from "@iconify/react";
import { useStepStore } from "@/app/store/useStepStore";
import LanguageCategory from "./language-category/page";
import MainInfo from "./main-info/page";
import Keyword from "./keyword/page";
import Inclusions from "./inclusions/page";
import ExtraInfo from "./extra-info/page";
import Options from "./options/page";
import lan from '/public/icons/lan.png'
import main from '/public/icons/main.png'
import keyword from '/public/icons/keyword.png'
import inclusion from '/public/icons/inclusion.png'
import extra from '/public/icons/extra.png'
import option from '/public/icons/option.png'
import price from '/public/icons/price.png'
import crown from '/public/icons/crown.png'
import Image from "next/image";
import Pricing from "./pricing/page";
import Liability from "./liability/page";

export default function CreateProduct() {
  const { step, setStep, nextStep } = useStepStore();

  const stepsInfo = [
    { title: "Language & Category", icon: lan },
    { title: "Main Info", icon: main },
    { title: "Keywords", icon: keyword },
    { title: "Inclusions", icon: inclusion },
    { title: "Extra Info", icon: extra },
    { title: "Options", icon: option },
    { title: "Pricing & Availability", icon: price },
    { title: "Liability", icon: crown },
  ];

  const steps: JSX.Element[] = [
    <LanguageCategory key="language-category" />,
    <MainInfo key="main-info" />,
    <Keyword key="keyword" />,
    <Inclusions key="inclusions" />,
    <ExtraInfo key="extra-info" />,
    <Options key="options" />,
    <Pricing key="pricing" />,
    <Liability key="liability" />,
  ];

  return (
    <div className="px-2 sm:px-2 lg:px-2 pt-6  bg-white">
      <div className="flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl lg:text-2xl font-bold mb-6">
          Create Product
        </h1>
        {/* <button className="flex items-center text-sm gap-1 bg-gray-100 px-3 py-2 rounded-lg"><Icon icon="basil:check-outline" className="text-2xl" /> Save & Exit</button> */}
      </div>

      <div className="flex overflow-x-auto border-b shadow-sm border-gray-200 mb-4 py-2 space-x-[10px]">
        {stepsInfo.map((stepInfo, index) => (
          <button
            key={index}
            className={`flex items-center space-x-2 flex-shrink-0 whitespace-nowrap px-2 sm:px-4 py-2 font-[400] text-sm transition-colors duration-200 ${
              index === step
                ? "bg-[#010A151A] rounded-lg text-black"
                : "text-[#010A15B2] rounded-lg hover:bg-[#010A151A] "
            }`}
            onClick={() => setStep(index)}
          >
            <Image src={stepInfo.icon} alt="icon" width={18} height={18} />
            <span className="text-[15px]">{stepInfo.title}</span>
          </button>
        ))}
      </div>

      {/* Step Content */}
      <div className="mt-4">{steps[step]}</div>
    </div>
  );
}
