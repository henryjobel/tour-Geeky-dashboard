"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useStepStore } from "@/app/store/useStepStore";
import { useProductStore } from "@/app/store/useProductStore";

const Liability: React.FC = () => {
  const { nextStep, prevStep } = useStepStore();
  const { productData, setProductData, submitProduct } = useProductStore();

  // State for transfer details
  const [transfer, setTransfer] = useState(productData.transfer || {
    transferType: "",
    pickupLocation: "",
    dropoffLocation: "",
    vehicleType: "",
    luggageAllowance: "",
  });

  // State for rental details
  const [rental, setRental] = useState(productData.rental || {
    rentalItemName: "",
    rentalType: "",
    rentalPeriod: "",
    ageRequirement: "",
    damagePolicy: "",
  });

  // State for cancellation policy, contact information, and terms
  const [cancellationPolicy, setCancellationPolicy] = useState(productData.cancellationPolicy || "");
  const [contactInformation, setContactInformation] = useState(productData.contactInformation || "");
  const [termsAndConditions, setTermsAndConditions] = useState(productData.termsAndConditions || "");

  const handleContinue = () => {
    setProductData({
      ...productData,
      transfer,
      rental,
      cancellationPolicy,
      contactInformation,
      termsAndConditions,
    });
    submitProduct()
  };

  return (
    <div className="pt-2 h-screen">
      <div className="w-full mx-auto bg-white border rounded-[20px]">
        <div className="flex items-center justify-between p-6 border-b w-full py-4">
          <h2 className="text-xl font-semibold">Liability Information</h2>
          <Icon icon="iconamoon:arrow-up-2-thin" className="text-2xl" />
        </div>

        {/* Transfer Section */}
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold mb-4">Transfer Details</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Transfer Type"
              value={transfer.transferType}
              onChange={(e) => setTransfer({ ...transfer, transferType: e.target.value })}
              className="w-full p-4 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Pickup Location"
              value={transfer.pickupLocation}
              onChange={(e) => setTransfer({ ...transfer, pickupLocation: e.target.value })}
              className="w-full p-4 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Dropoff Location"
              value={transfer.dropoffLocation}
              onChange={(e) => setTransfer({ ...transfer, dropoffLocation: e.target.value })}
              className="w-full p-4 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Vehicle Type"
              value={transfer.vehicleType}
              onChange={(e) => setTransfer({ ...transfer, vehicleType: e.target.value })}
              className="w-full p-4 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Luggage Allowance"
              value={transfer.luggageAllowance}
              onChange={(e) => setTransfer({ ...transfer, luggageAllowance: e.target.value })}
              className="w-full p-4 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Rental Section */}
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold mb-4">Rental Details</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Rental Item Name"
              value={rental.rentalItemName}
              onChange={(e) => setRental({ ...rental, rentalItemName: e.target.value })}
              className="w-full p-4 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Rental Type"
              value={rental.rentalType}
              onChange={(e) => setRental({ ...rental, rentalType: e.target.value })}
              className="w-full p-4 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Rental Period"
              value={rental.rentalPeriod}
              onChange={(e) => setRental({ ...rental, rentalPeriod: e.target.value })}
              className="w-full p-4 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Age Requirement"
              value={rental.ageRequirement}
              onChange={(e) => setRental({ ...rental, ageRequirement: e.target.value })}
              className="w-full p-4 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Damage Policy"
              value={rental.damagePolicy}
              onChange={(e) => setRental({ ...rental, damagePolicy: e.target.value })}
              className="w-full p-4 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Cancellation Policy Section */}
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold mb-4">Cancellation Policy</h3>
          <textarea
            value={cancellationPolicy}
            onChange={(e) => setCancellationPolicy(e.target.value)}
            placeholder="Enter cancellation policy..."
            className="w-full p-4 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={4}
          />
        </div>

        {/* Contact Information Section */}
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          <textarea
            value={contactInformation}
            onChange={(e) => setContactInformation(e.target.value)}
            placeholder="Enter contact information..."
            className="w-full p-4 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={4}
          />
        </div>

        {/* Terms and Conditions Section */}
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Terms and Conditions</h3>
          <textarea
            value={termsAndConditions}
            onChange={(e) => setTermsAndConditions(e.target.value)}
            placeholder="Enter terms and conditions..."
            className="w-full p-4 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={4}
          />
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
          Submit
          <span className="ml-2">&rarr;</span>
        </button>
      </div>
    </div>
  );
};

export default Liability;