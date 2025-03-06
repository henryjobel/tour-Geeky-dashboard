"use client";
import { useProductStore } from "@/app/store/useProductStore";
import { useStepStore } from "@/app/store/useStepStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";

const Inclusions: React.FC = () => {
  const { nextStep, prevStep } = useStepStore();
  const { productData, setProductData } = useProductStore();
  const [inclusions, setInclusions] = useState<{ name: string }[]>(
    productData.inclusions || [{ name: "" }]
  );
  const [exclusions, setExclusions] = useState<{ name: string }[]>(
    productData.exclusions || [{ name: "" }]
  );

  const [isFoodIncluded, setIsFoodIncluded] = useState<boolean>(
    productData.isFoodIncluded || false
  );
  const [isTransportationIncluded, setIsTransportationIncluded] =
    useState<boolean>(productData.isTransportIncluded || false);

  useEffect(() => {
    setIsFoodIncluded(productData.isFoodIncluded || false);
    setIsTransportationIncluded(productData.isTransportIncluded || false);
  }, [productData]);

  const handleFoodSelect = (food: boolean) => {
    setIsFoodIncluded(food);
    setProductData({ ...productData, isFoodIncluded: food });
  };

  const handleTransportationSelect = (trans: boolean) => {
    setIsTransportationIncluded(trans);
    setProductData({ ...productData, isTransportIncluded: trans });
  };

  const addInclusions = () => {
    setInclusions([...inclusions, { name: "" }]);
  };
  const addExclusions = () => {
    setExclusions([...exclusions, { name: "" }]);
  };

  const handleInclusionsChange = (index: number, value: string) => {
    const newInclusionss = [...inclusions];
    newInclusionss[index].name = value;
    setInclusions(newInclusionss);
  };
  const handleExclusionsChange = (index: number, value: string) => {
    const newExclusionss = [...exclusions];
    newExclusionss[index].name = value;
    setExclusions(newExclusionss);
  };

  const removeInclusions = (index: number) => {
    const newInclusionss = inclusions.filter((_, i) => i !== index);
    setInclusions(newInclusionss);
  };
  const removeExclusions = (index: number) => {
    const newExclusionss = exclusions.filter((_, i) => i !== index);
    setExclusions(newExclusionss);
  };

  const handleContinue = () => {
    setProductData({
      ...productData,
      inclusions,
      exclusions,
      isFoodIncluded,
      isTransportIncluded: isTransportationIncluded,
    });
    nextStep();
  };

  return (
    <div className="pt-2">
      <div className=" w-full mx-auto bg-white border rounded-[20px] ">
        <div className="flex items-center justify-between  p-6 border-b w-full py-4">
          <h2 className="text-xl font-semibold ">Inclusions</h2>
          <Icon icon="iconamoon:arrow-up-2-thin" className="text-2xl" />
        </div>

        {/* Included Features */}
        <div className="mt-6 bg-white border rounded-[20px]">
          <div className="flex items-center justify-between p-6 border-b w-full py-4">
            <h2 className="text-xl font-semibold">Select Inclusions</h2>
            <Icon icon="iconamoon:arrow-up-2-thin" className="text-2xl" />
          </div>
          <div className="p-2 sm:p-6">
            <label className="block font-medium text-black mb-[10px]">
              Who is included? (optional)
            </label>
            <p className="text-sm text-[#010A15B2] mb-[10px]">
              List all the features that are included in the price so customers
              understand the value for money of your activity. Start a new line
              for each one.
            </p>
            {inclusions.map((loc, index) => (
              <div key={index} className="flex items-center gap-2 mb-4">
                <input
                  type="text"
                  value={loc.name}
                  onChange={(e) =>
                    handleInclusionsChange(index, e.target.value)
                  }
                  placeholder="Search for inclutions"
                  className="w-full p-4 mt-3 border rounded-lg focus:outline-none focus:border focus:border-green-500 focus:border-opacity-30"
                />
                <button
                  onClick={() => removeInclusions(index)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <Icon
                    icon="bitcoin-icons:cross-filled"
                    className="text-2xl"
                  />
                </button>
              </div>
            ))}
            <button
              onClick={addInclusions}
              className="text-black font-medium mt-4 text-[15px] hover:underline"
            >
              + Add Another Inclusions
            </button>
          </div>
        </div>

        {/* not Included Features */}
        <div className="mt-6 bg-white border rounded-[20px]">
          <div className="flex items-center justify-between p-6 border-b w-full py-4">
            <h2 className="text-xl font-semibold">Select Exclusions</h2>
            <Icon icon="iconamoon:arrow-up-2-thin" className="text-2xl" />
          </div>
          <div className="p-2 sm:p-6">
            <label className="block font-medium text-black mb-[10px]">
              What is not included? (optional)
            </label>
            <p className="text-sm text-[#010A15B2] mb-[10px]">
              Name what customers need to pay extra for or what they may expect
              to see that isn’t included in the price. This allows customers to
              appropriately set their expectations.
            </p>
            {exclusions.map((loc, index) => (
              <div key={index} className="flex items-center gap-2 mb-4">
                <input
                  type="text"
                  value={loc.name}
                  onChange={(e) =>
                    handleExclusionsChange(index, e.target.value)
                  }
                  placeholder="Search for inclutions"
                  className="w-full p-4 mt-3 border rounded-lg focus:outline-none focus:border focus:border-green-500 focus:border-opacity-30"
                />
                <button
                  onClick={() => removeExclusions(index)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <Icon
                    icon="bitcoin-icons:cross-filled"
                    className="text-2xl"
                  />
                </button>
              </div>
            ))}
            <button
              onClick={addExclusions}
              className="text-black font-medium mt-4 text-[15px] hover:underline"
            >
              + Add Another Exclusions
            </button>
          </div>
        </div>

        {/* Is food included */}
        <div className="mb-6 p-2 sm:p-6">
          <label className="block text-lg font-semibold mb-[10px]">
            Is food included in your activity?
          </label>
          <div className="space-y-2">
            <label
              className={`flex items-center space-x-3 cursor-pointer ${
                !isFoodIncluded ? "text-[#296626]" : "text-gray-700"
              }`}
            >
              <input
                type="radio"
                checked={!isFoodIncluded}
                onChange={() => handleFoodSelect(false)}
                className="w-4 h-4"
              />
              <span>No</span>
            </label>
            <label
              className={`flex items-center space-x-2 cursor-pointer ${
                isFoodIncluded ? "text-[#296626]" : "text-gray-700"
              }`}
            >
              <input
                type="radio"
                checked={isFoodIncluded}
                onChange={() => handleFoodSelect(true)}
                className="w-4 h-4"
              />
              <span>Yes</span>
            </label>
          </div>
        </div>

        {/* Is transportation used */}
        <div className="mb-6 p-2 sm:p-6">
          <label className="block text-lg font-semibold mb-[10px]">
            Is transportation used during this activity?
          </label>
          <p className="text-[#010A15B2] text-sm mb-[10px]">
            Provide the main transportation type(s) that customers use during
            the experience, like a Segway or bike. Transportation used for
            pickup and drop-off will be added later.
          </p>
          <div className="space-y-2">
            <label
              className={`flex items-center space-x-3 cursor-pointer ${
                !isTransportationIncluded ? "text-[#296626]" : "text-gray-700"
              }`}
            >
              <input
                type="radio"
                checked={!isTransportationIncluded}
                onChange={() => handleTransportationSelect(false)}
                className="w-4 h-4"
              />
              <span>No</span>
            </label>
            <label
              className={`flex items-center space-x-2 cursor-pointer ${
                isTransportationIncluded ? "text-[#296626]" : "text-gray-700"
              }`}
            >
              <input
                type="radio"
                checked={isTransportationIncluded}
                onChange={() => handleTransportationSelect(true)}
                className="w-4 h-4"
              />
              <span>Yes</span>
            </label>
          </div>
          {/* Additional Note */}
          <div className="mt-10 bg-gray-100  p-5 rounded-lg text-[#010A15B2] text-sm">
            Make it clear if something is optional or must be paid by the
            customer on the spot. If it must be paid, provide the expected cost.
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-[22px] mt-6">
        <button
          onClick={prevStep}
          className="px-[25px] py-[10px] w-[120px] h-[38px] flex items-center justify-center text-gray-500 bg-gray-200 rounded-lg   hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleContinue}
          className="px-[25px] py-[10px] w-[120px] h-[38px]   justify-center bg-black text-white rounded-lg font-medium hover:bg-gray-700 transition flex items-center"
        >
          Continue
          <span className="ml-2">&rarr;</span>
        </button>
      </div>
    </div>
  );
};

export default Inclusions;
