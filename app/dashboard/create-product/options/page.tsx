"use client";
import React, { useState, useEffect } from "react";
import { useStepStore } from "@/app/store/useStepStore";
import { useProductStore } from "@/app/store/useProductStore";
import { Icon } from "@iconify/react";
import OptionsModal from "@/components/modals/OptionsModal";
import MeetingPoint from "@/components/modals/MeetingPointModal";
import DurationValidity from "@/components/modals/DurationValidityModal";
import { fetchOptions } from "@/services/productService";

interface IOption {
  id: number;
  name: string;
  description: string;
}

const Option: React.FC = () => {
  const { nextStep, prevStep } = useStepStore();
  const { productData, setProductData } = useProductStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<
    "OptionsSetup" | "Duration" | "MeetingPoint"
  >("OptionsSetup");
  const [options, setOptions] = useState<IOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<IOption | null>(null);
  const [showPreviousOptions, setShowPreviousOptions] = useState(false);

  useEffect(() => {
    const loadOptions = async () => {
      const fetchedOptions = await fetchOptions();
      setOptions(fetchedOptions);
    };
    loadOptions();
  }, [isModalOpen]);

  useEffect(() => {
    if (productData.option) {
      const selected = options.find(
        (option) => option.id === productData.option
      );
      setSelectedOption(selected || null);
    }
  }, [productData.option, options]);

  const handleCreateNewOptions = () => {
    setIsModalOpen(true);
    setActiveModal("OptionsSetup");
    setShowPreviousOptions(false);
  };

  const handleUsePreviousOptions = () => {
    setShowPreviousOptions(true);
    setIsModalOpen(false);
  };

  const handleNextModal = () => {
    if (activeModal === "OptionsSetup") {
      setActiveModal("Duration");
    } else if (activeModal === "Duration") {
      setActiveModal("MeetingPoint");
    } else if (activeModal === "MeetingPoint") {
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectOption = (option: IOption) => {
    setSelectedOption(option);
    setProductData({ option: option.id });
    console.log("Selected Option:", option);
  };

  return (
    <div className="pt-2 h-screen">
      <div className="w-full mx-auto bg-white border rounded-[20px]">
        <div className="flex items-center justify-between p-6 border-b w-full py-4">
          <h2 className="text-xl font-semibold">Activity Options</h2>
          <Icon icon="iconamoon:arrow-up-2-thin" className="text-2xl" />
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Select Options:</h3>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="options"
                onChange={handleCreateNewOptions}
                className="mr-2"
              />
              Create New Options
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="options"
                onChange={handleUsePreviousOptions}
                className="mr-2"
              />
              Use Previous Options
            </label>
          </div>

          {/* Display Selected Option */}
          {selectedOption && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-4">Selected Option:</h4>
              <div className="p-4 border rounded-lg bg-blue-100 border-blue-500">
                <h5 className="font-medium">{selectedOption.name}</h5>
                <p className="text-sm text-gray-600">
                  {selectedOption.description}
                </p>
              </div>
            </div>
          )}

          {/* Display Previous Options */}
          {showPreviousOptions && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-4">Previous Options:</h4>
              <div className="space-y-2">
                {options.map((option) => (
                  <div
                    key={option.id}
                    className={`p-4 border rounded-lg cursor-pointer ${
                      selectedOption?.id === option.id
                        ? "bg-blue-100 border-blue-500"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleSelectOption(option)}
                  >
                    <h5 className="font-medium">{option.name}</h5>
                    <p className="text-sm text-gray-600">
                      {option.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal with Sidebar */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-3xl">
          <div className="bg-white rounded-3xl shadow-lg flex w-[900px] h-[600px]">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-100 p-6 border-r rounded-3xl">
              <h3 className="text-lg font-semibold mb-4">Modal Navigation</h3>
              <ul className="space-y-2">
                <li
                  className={`p-2 rounded cursor-pointer ${
                    activeModal === "OptionsSetup"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveModal("OptionsSetup")}
                >
                  Options Setup
                </li>
                <li
                  className={`p-2 rounded cursor-pointer ${
                    activeModal === "Duration"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveModal("Duration")}
                >
                  Duration & Validity
                </li>
                <li
                  className={`p-2 rounded cursor-pointer ${
                    activeModal === "MeetingPoint"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveModal("MeetingPoint")}
                >
                  Meeting Point or Pickup
                </li>
              </ul>
            </div>

            {/* Main Content */}
            <div className="w-3/4 p-6 relative overflow-scroll">
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700"
              >
                <Icon icon="material-symbols:close" className="text-2xl" />
              </button>

              {activeModal === "OptionsSetup" && (
                <OptionsModal onNext={handleNextModal} />
              )}
              {activeModal === "Duration" && (
                <DurationValidity onNext={handleNextModal} />
              )}
              {activeModal === "MeetingPoint" && (
                <MeetingPoint onNext={handleCloseModal} />
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-end gap-[22px] mt-6">
        <button
          onClick={prevStep}
          className="px-[25px] py-[10px] w-[120px] h-[38px] flex items-center justify-center text-gray-500 bg-gray-200 rounded-lg   hover:bg-gray-100 transition"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="px-[25px] py-[10px] w-[120px] h-[38px]   justify-center bg-black text-white rounded-lg font-medium hover:bg-gray-700 transition flex items-center"
        >
          Continue
          <span className="ml-2">&rarr;</span>
        </button>
      </div>
    </div>
  );
};

export default Option;
