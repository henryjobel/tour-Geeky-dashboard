"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useStepStore } from "@/app/store/useStepStore";
import { useProductStore } from "@/app/store/useProductStore";

const Keyword: React.FC = () => {
  const { nextStep, prevStep } = useStepStore();
  const { productData, setProductData } = useProductStore();
  const [inputValue, setInputValue] = useState<string>("");
  const [newCard, setNewCard] = useState({
    title: "",
    subtitle: "",
    backgroundColor: "",
    icon: "",
  });

  // Keyword Functions
  const addKeyword = (keyword: string) => {
    if (
      keyword &&
      !productData.productKeywords.some((k) => k.keyword === keyword)
    ) {
      setProductData({
        productKeywords: [...productData.productKeywords, { keyword }],
      });
      setInputValue("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setProductData({
      productKeywords: productData.productKeywords.filter(
        (k) => k.keyword !== keyword
      ),
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyword(inputValue.trim());
    }
  };

  // Overview Card Functions
  const addOverviewCard = () => {
    if (newCard.title && newCard.subtitle && newCard.backgroundColor && newCard.icon) {
      setProductData({
        overviewcards: [...productData.overviewcards, newCard],
      });
      setNewCard({
        title: "",
        subtitle: "",
        backgroundColor: "",
        icon: "",
      });
    }
  };

  const removeOverviewCard = (index: number) => {
    const updatedCards = productData.overviewcards.filter((_, i) => i !== index);
    setProductData({
      overviewcards: updatedCards,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof newCard) => {
    setNewCard({
      ...newCard,
      [field]: e.target.value,
    });
  };

  return (
    <div className="pt-2 h-screen">
      <div className="w-full mx-auto bg-white border rounded-[20px]">
        <div className="flex items-center justify-between p-6 border-b w-full py-4">
          <h2 className="text-xl font-semibold">Select Keyword</h2>
          <Icon icon="iconamoon:arrow-up-2-thin" className="text-2xl" />
        </div>
        <div className="p-2 sm:p-6">
          {/* Keywords Section */}
          <p className="text-black font-semibold text-lg mb-[10px]">
            Add keywords to your product
          </p>
          <p className="text-[#010A15B2] text-sm mb-[20px]">
            Keywords work as tags for your product and help customers find it
            when they search by a theme or their interests. Try to use all 15
            for maximum reach.
          </p>

          {/* Search input for Keywords */}
          <div className="relative mb-4">
            <Icon
              icon="mdi:magnify"
              className="absolute text-2xl left-3 top-[18px] text-gray-400"
            />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for Keywords"
              className="w-full p-4 pl-10 border rounded-[12px] focus:outline-none focus:border focus:border-green-500 focus:border-opacity-30"
            />
            <a
              href="#"
              className="absolute right-3 top-[18px] text-blue-600 hover:underline text-sm"
            >
              Advance Selection
            </a>
          </div>

          {/* Selected Keywords */}
          <div className="flex flex-wrap gap-2 mb-6">
            {productData.productKeywords.map(({ keyword }) => (
              <div
                key={keyword}
                className="px-3 py-2 cursor-pointer flex items-center gap-2 bg-gray-200 hover:bg-[#29662626] font-medium hover:text-[#010A15B2] text-gray-700 rounded-[16px] text-sm"
              >
                <span>{keyword}</span>
                <button
                  onClick={() => removeKeyword(keyword)}
                  className="focus:outline-none"
                >
                  <Icon icon="mdi:close" className="hover:text-green-700" />
                </button>
              </div>
            ))}
          </div>

          {/* Overview Cards Section */}
          <p className="text-black font-semibold text-lg mb-[10px]">
            Add Overview Cards
          </p>
          <p className="text-[#010A15B2] text-sm mb-[20px]">
            Overview cards provide additional information about your product in a
            visually appealing way.
          </p>

          {/* Input fields for new Overview Card */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              value={newCard.title}
              onChange={(e) => handleInputChange(e, "title")}
              placeholder="Title"
              className="p-2 border rounded"
            />
            <input
              type="text"
              value={newCard.subtitle}
              onChange={(e) => handleInputChange(e, "subtitle")}
              placeholder="Subtitle"
              className="p-2 border rounded"
            />
            <input
              type="text"
              value={newCard.backgroundColor}
              onChange={(e) => handleInputChange(e, "backgroundColor")}
              placeholder="Background Color"
              className="p-2 border rounded"
            />
            <input
              type="text"
              value={newCard.icon}
              onChange={(e) => handleInputChange(e, "icon")}
              placeholder="Icon"
              className="p-2 border rounded"
            />
          </div>

          {/* Add Overview Card Button */}
          <button
            onClick={addOverviewCard}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-600 mb-6"
          >
            Add Overview Card
          </button>

          {/* Display Existing Overview Cards */}
          <div className="mt-6">
            {productData.overviewcards.map((card, index) => (
              <div key={index} className="flex items-center justify-between p-4 mb-2 bg-gray-100 rounded">
                <div>
                  <p className="font-semibold">{card.title}</p>
                  <p className="text-sm">{card.subtitle}</p>
                </div>
                <button
                  onClick={() => removeOverviewCard(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Icon icon="mdi:close" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-[22px] mt-6">
        <button
          onClick={prevStep}
          className="px-[25px] py-[10px] w-[120px] h-[38px] flex items-center justify-center text-gray-500 bg-gray-200 rounded-lg hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          onClick={nextStep}
          className="px-[25px] py-[10px] w-[120px] h-[38px] justify-center bg-black text-white rounded-lg font-medium hover:bg-gray-700 transition flex items-center"
        >
          Continue
          <span className="ml-2">&rarr;</span>
        </button>
      </div>
    </div>
  );
};

export default Keyword;