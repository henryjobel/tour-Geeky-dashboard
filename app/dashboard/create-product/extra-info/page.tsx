"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useStepStore } from "@/app/store/useStepStore";
import { useProductStore } from "@/app/store/useProductStore";

const ExtraInfo: React.FC = () => {
  const { nextStep, prevStep } = useStepStore();
  const { productData, setProductData }: any = useProductStore();
  const [notSuitableInput, setNotSuitableInput] = useState("");
  const [notAllowedInput, setNotAllowedInput] = useState("");
  const [mustCarryInput, setMustCarryInput] = useState("");
  const [optionInput, setOptionInput] = useState("");
  const [emergencyContact, setEmergencyContact] = useState({
    name: "",
    phone: "",
  });

  // State for each additional category
  const [attractionTicket, setAttractionTicket] = useState(
    productData.attractionTicket || {
      ticketType: "",
      ageRestrictions: "",
      accessibility: "",
    }
  );
  const [pickupDropoffs, setPickupDropoffs] = useState(
    productData.pickupDropoffs || [{ pickup: "", dropoff: "" }]
  );
  const [otherCategory, setOtherCategory] = useState(
    productData.otherCategory || {
      categoryType: "",
      activityName: "",
      specialRequirements: "",
    }
  );
  const [tour, setTour] = useState(
    productData.tour || {
      tourType: "",
      locationsCovered: "",
      guideInformation: "",
    }
  );
  const [cityCard, setCityCard] = useState(
    productData.cityCard || {
      cardName: "",
      validFor: "",
      activationMethod: "",
    }
  );
  const [bookingInfo, setBookingInfo] = useState("");
  const [hopOnHopOffTicket, setHopOnHopOffTicket] = useState(
    productData.hopOnHopOffTicket || {
      routeInformation: "",
      ticketType: "",
      operatingHours: "",
      frequency: "",
    }
  );

  // Handle adding a new pickup/dropoff pair
  const addPickupDropoff = () => {
    setPickupDropoffs([...pickupDropoffs, { pickup: "", dropoff: "" }]);
  };

  // Handle removing a pickup/dropoff pair
  const removePickupDropoff = (index: number) => {
    const newList = pickupDropoffs.filter((_: any, i: any) => i !== index);
    setPickupDropoffs(newList);
  };

  // Handle updating a pickup/dropoff pair
  const updatePickupDropoff = (
    index: number,
    field: "pickup" | "dropoff",
    value: string
  ) => {
    const newList = [...pickupDropoffs];
    newList[index][field] = value;
    setPickupDropoffs(newList);
  };

  const addItem = (field: keyof any, value: string, objKey: string) => {
    if (
      value.trim() &&
      !productData[field].some((item: any) => item[objKey] === value)
    ) {
      setProductData({
        [field]: [...productData[field], { [objKey]: value.trim() }],
      });
    }
  };

  const removeItem = (field: any, value: string, objKey: string) => {
    setProductData({
      [field]: productData[field].filter((item: any) => item[objKey] !== value),
    });
  };

  // Emergency contact handling
  const addEmergencyContact = () => {
    if (emergencyContact.name.trim() && emergencyContact.phone.trim()) {
      setProductData({
        emergencyContacts: [...productData.emergencyContacts, emergencyContact],
      });
      setEmergencyContact({ name: "", phone: "" });
    }
  };

  const handleContinue = () => {
    setProductData({
      ...productData,
      attractionTicket,
      pickupDropoffs,
      otherCategory,
      tour,
      cityCard,
      hopOnHopOffTicket,
      bookingInformation: bookingInfo,
    });
    nextStep();
  };

  return (
    <div className="pt-2">
      <div className="w-full mx-auto bg-white border rounded-[20px]">
        {/* Not Suitable For */}
        <div className="p-6 border-b">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Not Suitable For</h3>
            <p className="text-[#010A15B2] text-sm mb-4">
              Add types of travelers who should avoid this activity
            </p>
            <div className="relative">
              <Icon
                icon="mdi:magnify"
                className="absolute left-3 top-4 text-gray-400 text-xl"
              />
              <input
                type="text"
                value={notSuitableInput}
                onChange={(e) => setNotSuitableInput(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" &&
                  addItem("notSuitable", notSuitableInput, "condition")
                }
                placeholder="Add restrictions..."
                className="w-full pl-10 pr-4 py-3 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {productData.notSuitable.map(({ condition }: any) => (
              <div
                key={condition}
                className="flex items-center px-3 py-2 bg-gray-100 rounded-full"
              >
                <span className="text-sm">{condition}</span>
                <button
                  onClick={() =>
                    removeItem("notSuitable", condition, "condition")
                  }
                  className="ml-2 text-gray-500 hover:text-red-500"
                >
                  <Icon icon="mdi:close" className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Not Allowed */}
        <div className="p-6 border-b">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">
              Prohibited Items/Actions
            </h3>
            <p className="text-[#010A15B2] text-sm mb-4">
              List restricted items or behaviors
            </p>
            <div className="relative">
              <Icon
                icon="mdi:magnify"
                className="absolute left-3 top-4 text-gray-400 text-xl"
              />
              <input
                type="text"
                value={notAllowedInput}
                onChange={(e) => setNotAllowedInput(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" &&
                  addItem("notAllowed", notAllowedInput, "restriction")
                }
                placeholder="Add prohibited items/actions..."
                className="w-full pl-10 pr-4 py-3 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {productData.notAllowed.map(({ restriction }: any) => (
              <div
                key={restriction}
                className="flex items-center px-3 py-2 bg-gray-100 rounded-full"
              >
                <span className="text-sm">{restriction}</span>
                <button
                  onClick={() =>
                    removeItem("notAllowed", restriction, "restriction")
                  }
                  className="ml-2 text-gray-500 hover:text-red-500"
                >
                  <Icon icon="mdi:close" className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Must Carry Items */}
        <div className="p-6 border-b">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Mandatory Items</h3>
            <p className="text-[#010A15B2] text-sm mb-4">
              Essential items customers must bring
            </p>
            <div className="relative">
              <Icon
                icon="mdi:magnify"
                className="absolute left-3 top-4 text-gray-400 text-xl"
              />
              <input
                type="text"
                value={mustCarryInput}
                onChange={(e) => setMustCarryInput(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" &&
                  addItem("mustCarryItems", mustCarryInput, "item")
                }
                placeholder="Add required items..."
                className="w-full pl-10 pr-4 py-3 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {productData.mustCarryItems.map(({ item }: any) => (
              <div
                key={item}
                className="flex items-center px-3 py-2 bg-gray-100 rounded-full"
              >
                <span className="text-sm">{item}</span>
                <button
                  onClick={() => removeItem("mustCarryItems", item, "item")}
                  className="ml-2 text-gray-500 hover:text-red-500"
                >
                  <Icon icon="mdi:close" className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="p-6 border-b">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Emergency Contacts</h3>
            <p className="text-[#010A15B2] text-sm mb-4">
              Add emergency contact information
            </p>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Name"
                value={emergencyContact.name}
                onChange={(e) =>
                  setEmergencyContact({
                    ...emergencyContact,
                    name: e.target.value,
                  })
                }
                className="flex-1 p-3 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Phone"
                value={emergencyContact.phone}
                onChange={(e) =>
                  setEmergencyContact({
                    ...emergencyContact,
                    phone: e.target.value,
                  })
                }
                className="flex-1 p-3 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={addEmergencyContact}
                className="px-4 bg-black text-white rounded-[12px] hover:bg-gray-600"
              >
                Add
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {productData.emergencyContacts.map((contact: any, index: any) => (
              <div
                key={index}
                className="flex items-center px-3 py-2 bg-gray-100 rounded-full"
              >
                <span className="text-sm">
                  {contact.name} - {contact.phone}
                </span>
                <button
                  onClick={() =>
                    setProductData({
                      emergencyContacts: productData.emergencyContacts.filter(
                        (_: any, i: number) => i !== index
                      ),
                    })
                  }
                  className="ml-2 text-gray-500 hover:text-red-500"
                >
                  <Icon icon="mdi:close" className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Options Section */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Additional Options</h3>
            <p className="text-[#010A15B2] text-sm mb-4">
              Add any additional activity options
            </p>
            <div className="relative">
              <Icon
                icon="mdi:magnify"
                className="absolute left-3 top-4 text-gray-400 text-xl"
              />
              <input
                type="text"
                value={optionInput}
                onChange={(e) => setOptionInput(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && addItem("options", optionInput, "name")
                }
                placeholder="Add options..."
                className="w-full pl-10 pr-4 py-3 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {productData.options.map(({ name }: any) => (
              <div
                key={name}
                className="flex items-center px-3 py-2 bg-gray-100 rounded-full"
              >
                <span className="text-sm">{name}</span>
                <button
                  onClick={() => removeItem("options", name, "name")}
                  className="ml-2 text-gray-500 hover:text-red-500"
                >
                  <Icon icon="mdi:close" className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        {/* <div className="flex items-center justify-end gap-4 p-6">
          <button
            onClick={prevStep}
            className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Back
          </button>
          <button
            onClick={nextStep}
            className="px-6 py-2 text-white bg-black rounded-lg hover:bg-gray-800"
          >
            Continue
          </button>
        </div> */}

        {/* Attraction Ticket Section */}
        {/* <div className="p-6">
          <h2 className="text-xl font-semibold">Attraction Ticket</h2>
          <div className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Ticket Type"
              value={attractionTicket.ticketType}
              onChange={(e) =>
                setAttractionTicket({
                  ...attractionTicket,
                  ticketType: e.target.value,
                })
              }
              className="w-full p-4 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Age Restrictions"
              value={attractionTicket.ageRestrictions}
              onChange={(e) =>
                setAttractionTicket({
                  ...attractionTicket,
                  ageRestrictions: e.target.value,
                })
              }
              className="w-full p-4 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Accessibility"
              value={attractionTicket.accessibility}
              onChange={(e) =>
                setAttractionTicket({
                  ...attractionTicket,
                  accessibility: e.target.value,
                })
              }
              className="w-full p-4 border rounded-lg"
            />
          </div>
        </div>*/}

        {/* Pickup/Dropoff Section */}
        {/*<div className="p-6 bg-white rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Pickup & Dropoff
          </h2>
          {pickupDropoffs.map((pd: any, index: any) => (
            <div
              key={index}
              className="flex gap-6 mb-6 bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Pickup Location"
                  value={pd.pickup}
                  onChange={(e) =>
                    updatePickupDropoff(index, "pickup", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400"
                />
              </div>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Dropoff Location"
                  value={pd.dropoff}
                  onChange={(e) =>
                    updatePickupDropoff(index, "dropoff", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400"
                />
              </div>
              <div className="flex justify-center items-center">
                <button
                  onClick={() => removePickupDropoff(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
                >
                  <Icon icon="mdi:trash-can" className="text-white" />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={addPickupDropoff}
            className=" w-full py-2  border-gray-500 border rounded-lg hover:bg-gray-100 transition-all duration-200"
          >
            + Add Pickup/Dropoff
          </button>
        </div>*/}

        {/* Tour Section */}
        {/* <div className="p-6">
          <h2 className="text-xl font-semibold">Tour</h2>
          <div className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Tour Type"
              value={tour.tourType}
              onChange={(e) => setTour({ ...tour, tourType: e.target.value })}
              className="w-full p-4 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Locations Covered"
              value={tour.locationsCovered}
              onChange={(e) =>
                setTour({ ...tour, locationsCovered: e.target.value })
              }
              className="w-full p-4 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Guide Information"
              value={tour.guideInformation}
              onChange={(e) =>
                setTour({ ...tour, guideInformation: e.target.value })
              }
              className="w-full p-4 border rounded-lg"
            />
          </div>
        </div>*/}

        {/* City Card Section */}
        {/* <div className="p-6">
          <h2 className="text-xl font-semibold">City Card</h2>
          <div className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Card Name"
              value={cityCard.cardName}
              onChange={(e) =>
                setCityCard({ ...cityCard, cardName: e.target.value })
              }
              className="w-full p-4 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Valid For"
              value={cityCard.validFor}
              onChange={(e) =>
                setCityCard({ ...cityCard, validFor: e.target.value })
              }
              className="w-full p-4 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Activation Method"
              value={cityCard.activationMethod}
              onChange={(e) =>
                setCityCard({ ...cityCard, activationMethod: e.target.value })
              }
              className="w-full p-4 border rounded-lg"
            />
          </div>
        </div>*/}

        {/* Hop On Hop Off Ticket Section */}
        {/* <div className="p-6">
          <h2 className="text-xl font-semibold">Hop On Hop Off Ticket</h2>
          <div className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Route Information"
              value={hopOnHopOffTicket.routeInformation}
              onChange={(e) =>
                setHopOnHopOffTicket({
                  ...hopOnHopOffTicket,
                  routeInformation: e.target.value,
                })
              }
              className="w-full p-4 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Ticket Type"
              value={hopOnHopOffTicket.ticketType}
              onChange={(e) =>
                setHopOnHopOffTicket({
                  ...hopOnHopOffTicket,
                  ticketType: e.target.value,
                })
              }
              className="w-full p-4 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Operating Hours"
              value={hopOnHopOffTicket.operatingHours}
              onChange={(e) =>
                setHopOnHopOffTicket({
                  ...hopOnHopOffTicket,
                  operatingHours: e.target.value,
                })
              }
              className="w-full p-4 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Frequency"
              value={hopOnHopOffTicket.frequency}
              onChange={(e) =>
                setHopOnHopOffTicket({
                  ...hopOnHopOffTicket,
                  frequency: e.target.value,
                })
              }
              className="w-full p-4 border rounded-lg"
            />
          </div>
        </div>*/}
      </div>

      {/* Other bOOKING iNFO */}
      <div className="border rounded-[20px] bg-white mt-6">
        <div className="flex items-center justify-between p-6 border-b w-full py-4">
          <h2 className="text-xl font-semibold">Other Booking Info</h2>
          <Icon icon="iconamoon:arrow-up-2-thin" className="text-2xl" />
        </div>
        <div className="p-4 sm:p-6">
          <input
            type="text"
            value={bookingInfo}
            onChange={(e) => setBookingInfo(e.target.value)}
            placeholder="Sunset Sailing Tour in Santorini"
            className="w-full p-4 mt-4 border rounded-[12px] focus:outline-none focus:border focus:border-green-500 focus:border-opacity-30"
          />
        </div>
      </div>

      {/* Other Category Section */}
      {/*<div className="p-6">
        <h2 className="text-xl font-semibold">Other Category</h2>
        <div className="mt-4 space-y-4">
          <input
            type="text"
            placeholder="Category Type"
            value={otherCategory.categoryType}
            onChange={(e) =>
              setOtherCategory({
                ...otherCategory,
                categoryType: e.target.value,
              })
            }
            className="w-full p-4 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Activity Name"
            value={otherCategory.activityName}
            onChange={(e) =>
              setOtherCategory({
                ...otherCategory,
                activityName: e.target.value,
              })
            }
            className="w-full p-4 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Special Requirements"
            value={otherCategory.specialRequirements}
            onChange={(e) =>
              setOtherCategory({
                ...otherCategory,
                specialRequirements: e.target.value,
              })
            }
            className="w-full p-4 border rounded-lg"
          />
        </div>
      </div>*/}

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
  );
};

export default ExtraInfo;
