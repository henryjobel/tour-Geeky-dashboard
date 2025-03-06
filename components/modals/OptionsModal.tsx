"use client";
import { useOptionStore } from "@/app/store/useOptionStore";
import { useState } from "react";
import { Icon } from "@iconify/react";

export default function OptionsModal({ onNext }: { onNext: () => void }) {
  const [step, setStep] = useState(1);
  const { optionData, setOptionData, submitOption } = useOptionStore();
  const [newLanguage, setNewLanguage] = useState("");

  const handleAddLanguage = () => {
    if (
      newLanguage &&
      !optionData.host_languages?.some((lang) => lang.keyword === newLanguage)
    ) {
      const updatedLanguages = [
        ...(optionData.host_languages || []),
        { keyword: newLanguage },
      ];
      setOptionData({ host_languages: updatedLanguages });
      setNewLanguage("");
    }
  };

  // Remove a language
  const handleRemoveLanguage = (keyword: string) => {
    const updatedLanguages = optionData.host_languages?.filter(
      (lang) => lang.keyword !== keyword
    );
    setOptionData({ host_languages: updatedLanguages });
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddLanguage();
    }
  };

  const handleNextStep = async () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      onNext();
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="w-full h-full p-6">
      <h2 className="text-xl font-semibold mb-6">Options Setup</h2>

      {/* Step 1 */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              placeholder="Default"
              className="w-full border rounded-lg p-2 mb-4"
              value={optionData.name || ""}
              onChange={(e) => setOptionData({ name: e.target.value })}
            />
          </div>
          <div>
            <label
              htmlFor="referenceCode"
              className="block mb-2 text-sm font-medium"
            >
              Option reference code (optional)
            </label>
            <input
              id="referenceCode"
              type="text"
              placeholder="Default"
              className="w-full border rounded-lg p-2 mb-4"
              value={optionData.reference_code || ""}
              onChange={(e) =>
                setOptionData({ reference_code: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="groupSize"
              className="block mb-2 text-sm font-medium"
            >
              Maximum group size
            </label>
            <select
              id="groupSize"
              className="w-full border rounded-lg p-2 mb-4"
              value={optionData.maximum_group_size || 2}
              onChange={(e) =>
                setOptionData({ maximum_group_size: Number(e.target.value) })
              }
            >
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="6">6</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="languageInput"
              className="block mb-2 text-sm font-medium"
            >
              What languages does the guide or host speak during the activity?
            </label>
            <input
              id="languageInput"
              type="text"
              placeholder="Add a language"
              className="w-full border rounded-lg p-2 mb-2"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            {/* Selected Languages */}
            <div className="flex flex-wrap gap-2 mb-4">
              {optionData.host_languages?.map((lang) => (
                <div
                  key={lang.keyword}
                  className="px-3 py-2 cursor-pointer flex items-center gap-2 bg-gray-200 hover:bg-[#29662626] font-medium hover:text-[#010A15B2] text-gray-700 rounded-[16px] text-sm"
                >
                  <span>{lang.keyword}</span>
                  <button
                    onClick={() => handleRemoveLanguage(lang.keyword)}
                    className="focus:outline-none"
                  >
                    <Icon icon="mdi:close" className="hover:text-green-700" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="mb-4">
            <p className="mb-2 text-sm font-medium">
              Is this a private activity?
            </p>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                checked={!optionData.is_private}
                onChange={() => setOptionData({ is_private: false })}
                className="mr-2"
              />
              No
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={optionData.is_private || false}
                onChange={() => setOptionData({ is_private: true })}
                className="mr-2"
              />
              Yes
            </label>
            {optionData.is_private && (
              <p className="text-sm text-gray-500 mt-2">
                This means that only one group or person can participate. There
                won’t be other customers in the same activity.
              </p>
            )}
          </div>

          <div className="mb-4">
            <p className="mb-2 text-sm font-medium">
              Is the activity wheelchair accessible?
            </p>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                checked={!optionData.is_wheelchair_accessible}
                onChange={() =>
                  setOptionData({ is_wheelchair_accessible: false })
                }
                className="mr-2"
              />
              No
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={optionData.is_wheelchair_accessible || false}
                onChange={() =>
                  setOptionData({ is_wheelchair_accessible: true })
                }
                className="mr-2"
              />
              Yes
            </label>
            {optionData.is_wheelchair_accessible && (
              <p className="text-sm text-gray-500 mt-2">
                This means that only one group or person can participate. There
                won’t be other customers in the same activity.
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium"
              htmlFor="ticket-options"
            >
              Select Ticket Option
            </label>
            <select
              id="ticket-options"
              value={optionData.skip_the_line ? "skip-line" : ""}
              onChange={(e) =>
                setOptionData({ skip_the_line: e.target.value === "skip-line" })
              }
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="skip-line">Skip The Line to get tickets</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            onClick={handlePreviousStep}
            className="px-6 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Previous
          </button>
        )}
        <button
          onClick={handleNextStep}
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          {step === 2 ? "Done" : "Next"}
        </button>
      </div>
    </div>
  );
}
