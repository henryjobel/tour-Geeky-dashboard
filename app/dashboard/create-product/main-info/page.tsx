"use client";
import { useStepStore } from "@/app/store/useStepStore";
import { useProductStore } from "@/app/store/useProductStore";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const MainInfo: React.FC = () => {
  const { nextStep, prevStep } = useStepStore();
  const { productData, setProductData } = useProductStore();

  const [metaTitle, setMetaTitle] = useState<string>(
    productData.metaTitle || ""
  );
  const [departureFrom, setDepartureFrom] = useState<string>(
    productData.departure_from || ""
  );
  const [title, setTitle] = useState<string>(productData.title || "");
  const [metaDescription, setMetaDescription] = useState<string>(
    productData.metaDescription || ""
  );
  const [description, setDescription] = useState<string>(
    productData.description || ""
  );
  const [highlights, setHighlights] = useState<string[]>(
    productData.summarize.map((s) => s.summaryText) || [""]
  );
  const [locations, setLocations] = useState<{ address: string }[]>(
    productData.location || [{ address: "" }]
  );
  const [basePrice, setBasePrice] = useState<string>(
    productData.basePrice || ""
  );
  const [basePriceFor, setBasePriceFor] = useState<string>(
    productData.basePriceFor || ""
  );
  const [duration, setDuration] = useState<string>(productData.duration || "");
  const [images, setImages] = useState<{ url: string; file?: File }[]>(
    productData.images || []
  );

  useEffect(() => {
    setProductData({
      ...productData,
      metaTitle,
      title,
      departure_from: departureFrom,
      metaDescription,
      description,
      summarize: highlights.map((text) => ({ summaryText: text })),
      location: locations,
      basePrice,
      basePriceFor,
      duration,
      images,
    });
  }, [
    metaTitle,
    title,
    departureFrom,
    metaDescription,
    description,
    highlights,
    locations,
    basePrice,
    basePriceFor,
    duration,
    images,
  ]);

  const addHighlight = () => {
    setHighlights([...highlights, ""]);
  };

  const handleHighlightChange = (index: number, value: string) => {
    const newHighlights = [...highlights];
    newHighlights[index] = value;
    setHighlights(newHighlights);
  };

  const addLocation = () => {
    setLocations([...locations, { address: "" }]);
  };

  const handleLocationChange = (index: number, value: string) => {
    const newLocations = [...locations];
    newLocations[index].address = value;
    setLocations(newLocations);
  };

  const removeLocation = (index: number) => {
    const newLocations = locations.filter((_, i) => i !== index);
    setLocations(newLocations);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleContinue = () => {
    setProductData({
      title,
      metaTitle,
      departure_from: departureFrom,
      metaDescription,
      description,
      summarize: highlights.map((text) => ({ summaryText: text })),
      location: locations,
      basePrice,
      basePriceFor,
      duration,
      images,
    });
    nextStep();
  };

  return (
    <div className="">
      <div className="w-full mx-auto">
        {/* Product Title */}
        <div className="border rounded-[20px] bg-white mt-6">
          <div className="flex items-center justify-between p-6 border-b w-full py-4">
            <h2 className="text-xl font-semibold">Product Title</h2>
            <Icon icon="iconamoon:arrow-up-2-thin" className="text-2xl" />
          </div>
          <div className="p-4 sm:p-6">
            <label className="block text-lg font-semibold mb-[10px]">
              What is the customer-facing title of your product?
              <span className="block text-sm text-[#010A15B2] font-[400] mt-[10px]">
                We recommend using simple language, keep it less than 60
                characters
              </span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Sunset Sailing Tour in Santorini"
              className="w-full p-4 mt-4 border rounded-[12px] focus:outline-none focus:border focus:border-green-500 focus:border-opacity-30"
            />
          </div>
        </div>

        {/* Product Meta Title */}
        <div className="border rounded-[20px] bg-white mt-6">
          <div className="flex items-center justify-between p-6 border-b w-full py-4">
            <h2 className="text-xl font-semibold">Product Meta Title</h2>
            <Icon icon="iconamoon:arrow-up-2-thin" className="text-2xl" />
          </div>
          <div className="p-4 sm:p-6">
            <label className="block text-lg font-semibold mb-[10px]">
              What is the Meta title of your product?
            </label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="Sunset Sailing Tour in Santorini"
              className="w-full p-4 mt-4 border rounded-[12px] focus:outline-none focus:border focus:border-green-500 focus:border-opacity-30"
            />
          </div>

          <div className="flex items-center justify-between p-6 border-b w-full py-4">
            <h2 className="text-xl font-semibold">Depurture From</h2>
            <Icon icon="iconamoon:arrow-up-2-thin" className="text-2xl" />
          </div>
          <div className="p-4 sm:p-6">
            <input
              type="text"
              value={departureFrom}
              onChange={(e) => setDepartureFrom(e.target.value)}
              placeholder="Rome"
              className="w-full p-4 mt-4 border rounded-[12px] focus:outline-none focus:border focus:border-green-500 focus:border-opacity-30"
            />
          </div>

          {/* Product Meta Description */}
          <div className="mt-4 p-2 sm:p-6">
            <label className="block text-lg font-semibold mb-[10px]">
              Meta Description{" "}
              <span className="text-gray-500 font-normal">(optional)</span>
            </label>
            <p className="text-sm text-[#010A15B2] mb-[10px]">
              A short description of your product for SEO purposes.
            </p>
            <input
              type="text"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Explore the world with us"
              className="w-full p-4 mt-4 border rounded-[12px] focus:outline-none focus:border focus:border-green-500 focus:border-opacity-30"
            />
          </div>
        </div>

        {/* Upload Product Photo */}
        <div className="mt-6 bg-white border rounded-[20px]">
          <div className="flex items-center justify-between p-6 border-b w-full py-4">
            <h2 className="text-xl font-semibold">Uploaded Product Photo</h2>
            <Icon icon="iconamoon:arrow-up-2-thin" className="text-2xl" />
          </div>
          <div className="flex gap-4 flex-wrap p-2 sm:p-8">
            {/* Display uploaded images */}
            {images.map((image, index) => (
              <div
                key={index}
                className="relative w-32 h-24 border rounded-[20px] flex items-center justify-center bg-gray-100"
              >
                <img
                  src={image.url}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-[20px]"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 p-1 bg-red-500 rounded-full hover:bg-red-700"
                >
                  <Icon
                    icon="bitcoin-icons:cross-filled"
                    className="text-white text-sm"
                  />
                </button>
              </div>
            ))}
            {/* Upload button */}
            <label className="w-52 h-24 border rounded-[20px] flex items-center flex-col justify-center gap-2 bg-gray-200 hover:bg-gray-100 cursor-pointer">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Icon icon="tdesign:image-1" className="text-2xl text-gray-500" />
              <span className="text-[#010A15B2] text-sm">
                Upload another image
              </span>
            </label>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-6 bg-white border rounded-[20px]">
          <div className="flex items-center justify-between p-6 border-b w-full py-4">
            <h2 className="text-xl font-semibold">Product Description</h2>
            <Icon icon="iconamoon:arrow-up-2-thin" className="text-2xl" />
          </div>
          <div className="p-2 sm:p-6">
            <label className="block text-lg font-semibold text-gray-600 mb-1">
              Introduce your product
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please insert your text in English"
              className="w-full text-sm p-3 mt-3 border rounded-[12px] focus:outline-none focus:border focus:border-green-500 focus:border-opacity-30 mb-4"
              rows={3}
            />
          </div>
        </div>

        {/* Highlights */}
        <div className="mt-6 bg-white border rounded-[20px]">
          <div className="flex items-center justify-between p-6 border-b w-full py-4">
            <h2 className="text-xl font-semibold">Summarize the highlights</h2>
            <Icon icon="iconamoon:arrow-up-2-thin" className="text-2xl" />
          </div>
          <div className="p-2 sm:p-6">
            {highlights.map((highlight, index) => (
              <input
                key={index}
                type="text"
                value={highlight}
                onChange={(e) => handleHighlightChange(index, e.target.value)}
                placeholder="Please insert your text in English"
                className="w-full mb-2 p-4 border rounded-[12px] focus:outline-none focus:border focus:border-green-500 focus:border-opacity-30"
              />
            ))}
            <button
              onClick={addHighlight}
              className="text-black font-medium mt-4 text-[15px] hover:underline"
            >
              + Add Another Highlight
            </button>
          </div>
        </div>

        {/* Base Price */}
        <div className="mt-6 bg-white border rounded-[20px]">
          <div className="flex items-center justify-between p-6 border-b w-full py-4">
            <h2 className="text-xl font-semibold">Base Price</h2>
            <Icon icon="iconamoon:arrow-up-2-thin" className="text-2xl" />
          </div>
          <div className="p-2 sm:p-6">
            <label className="block text-lg font-semibold mb-[10px]">
              Set the base price for your product
            </label>
            <input
              type="text"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              placeholder="Enter base price"
              className="w-full p-4 mt-4 border rounded-[12px] focus:outline-none focus:border focus:border-green-500 focus:border-opacity-30"
            />
          </div>
        </div>
        {/* Base basePriceFor */}
        <div className="mt-6 bg-white border rounded-[20px]">
          <div className="flex items-center justify-between p-6 border-b w-full py-4">
            <h2 className="text-xl font-semibold">Base Price for</h2>
            <Icon icon="iconamoon:arrow-up-2-thin" className="text-2xl" />
          </div>
          <div className="p-2 sm:p-6">
            <input
              type="text"
              value={basePriceFor}
              onChange={(e) => setBasePriceFor(e.target.value)}
              placeholder="Per Person"
              className="w-full p-4 mt-4 border rounded-[12px] focus:outline-none focus:border focus:border-green-500 focus:border-opacity-30"
            />
          </div>
        </div>

        {/* Duration */}
        <div className="mt-6 bg-white border rounded-[20px]">
          <div className="flex items-center justify-between p-6 border-b w-full py-4">
            <h2 className="text-xl font-semibold">Duration</h2>
            <Icon icon="iconamoon:arrow-up-2-thin" className="text-2xl" />
          </div>
          <div className="p-2 sm:p-6">
            <label className="block text-lg font-semibold mb-[10px]">
              Set the duration of your product
            </label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Enter duration (e.g., 2 hours)"
              className="w-full p-4 mt-4 border rounded-[12px] focus:outline-none focus:border focus:border-green-500 focus:border-opacity-30"
            />
          </div>
        </div>

        {/* Select Location */}
        <div className="mt-6 bg-white border rounded-[20px]">
          <div className="flex items-center justify-between p-6 border-b w-full py-4">
            <h2 className="text-xl font-semibold">Select Location</h2>
            <Icon icon="iconamoon:arrow-up-2-thin" className="text-2xl" />
          </div>
          <div className="p-2 sm:p-6">
            <label className="block font-medium text-black mb-[10px]">
              Location of your experience
            </label>
            <p className="text-sm text-[#010A15B2] mb-[10px]">
              Inform travelers about the city or town where your experience
              takes place
            </p>
            {locations.map((loc, index) => (
              <div key={index} className="flex items-center gap-2 mb-4">
                <input
                  type="text"
                  value={loc.address}
                  onChange={(e) => handleLocationChange(index, e.target.value)}
                  placeholder="Search for locations"
                  className="w-full p-4 mt-3 border rounded-lg focus:outline-none focus:border focus:border-green-500 focus:border-opacity-30"
                />
                <button
                  onClick={() => removeLocation(index)}
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
              onClick={addLocation}
              className="text-black font-medium mt-4 text-[15px] hover:underline"
            >
              + Add Another Location
            </button>
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
            onClick={handleContinue}
            className="px-[25px] py-[10px] w-[120px] h-[38px] justify-center bg-black text-white rounded-lg font-medium hover:bg-gray-700 transition flex items-center"
          >
            Continue
            <span className="ml-2">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainInfo;
