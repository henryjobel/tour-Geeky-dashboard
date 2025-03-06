"use client";
import React, { useState } from "react";
import { useStepStore } from "@/app/store/useStepStore";
import { useProductStore } from "@/app/store/useProductStore";

const Pricing: React.FC = () => {
  const { nextStep, prevStep } = useStepStore();
  const { productData, setProductData } = useProductStore();

  // Initialize state from the persisted Zustand store
  const [schedules, setSchedules] = useState(productData.schedules || []);

  // Add a new schedule
  const addSchedule = () => {
    setSchedules([
      ...schedules,
      {
        name: "",
        start_time: "09:00",
        end_time: "17:00",
        interval_mins: 30,
        available_days: [],
        prices: [],
      },
    ]);
  };

  // Update a schedule
  const updateSchedule = (index: number, field: string, value: any) => {
    const newSchedules = [...schedules];
    newSchedules[index] = { ...newSchedules[index], [field]: value };
    setSchedules(newSchedules);
  };

  // Add a price tier to a schedule
  const addPriceTier = (scheduleIndex: number) => {
    const newSchedules = [...schedules];
    newSchedules[scheduleIndex].prices.push({
      name: "",
      option: "Standard",
      capacity: 0,
      price: "0.00",
    });
    setSchedules(newSchedules);
  };

  // Update a price tier
  const updatePriceTier = (
    scheduleIndex: number,
    priceIndex: number,
    field: string,
    value: any
  ) => {
    const newSchedules = [...schedules];
    newSchedules[scheduleIndex].prices[priceIndex] = {
      ...newSchedules[scheduleIndex].prices[priceIndex],
      [field]: value,
    };
    setSchedules(newSchedules);
  };

  // Handle continue button click
  const handleContinue = () => {
    setProductData({ schedules }); // Update the Zustand store
    nextStep(); // Move to the next step
  };

  return (
    <div className="pt-2 h-screen">
      <div className="w-full mx-auto">
        {/* Schedules Section */}
        <div className="border rounded-[20px] bg-white mt-6">
          <div className="flex items-center justify-between p-6 border-b w-full py-4">
            <h2 className="text-xl font-semibold">Schedules</h2>
            <button
              onClick={addSchedule}
              className="text-black font-medium text-[15px] hover:underline"
            >
              + Add Schedule
            </button>
          </div>
          <div className="p-2 sm:p-6">
            {schedules.map((schedule, scheduleIndex) => (
              <div key={scheduleIndex} className="mb-6">
                <h3 className="text-lg font-semibold mb-4">
                  Schedule {scheduleIndex + 1}
                </h3>
                {/* Schedule Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Schedule Name
                  </label>
                  <input
                    type="text"
                    value={schedule.name}
                    onChange={(e) =>
                      updateSchedule(scheduleIndex, "name", e.target.value)
                    }
                    placeholder="Morning Tour"
                    className="w-full p-3 border rounded-[12px] focus:outline-none focus:border focus:border-green-500 focus:border-opacity-30"
                  />
                </div>

                {/* Start and End Time */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={schedule.start_time}
                      onChange={(e) =>
                        updateSchedule(scheduleIndex, "start_time", e.target.value)
                      }
                      className="w-full p-3 border rounded-[12px] focus:outline-none focus:border focus:border-green-500 focus:border-opacity-30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={schedule.end_time}
                      onChange={(e) =>
                        updateSchedule(scheduleIndex, "end_time", e.target.value)
                      }
                      className="w-full p-3 border rounded-[12px] focus:outline-none focus:border focus:border-green-500 focus:border-opacity-30"
                    />
                  </div>
                </div>

                {/* Interval and Available Days */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Interval (minutes)
                    </label>
                    <input
                      type="number"
                      value={schedule.interval_mins}
                      onChange={(e) =>
                        updateSchedule(
                          scheduleIndex,
                          "interval_mins",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full p-3 border rounded-[12px] focus:outline-none focus:border focus:border-green-500 focus:border-opacity-30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Available Days
                    </label>
                    <select
                      multiple
                      value={schedule.available_days.map(String)}
                      onChange={(e) =>
                        updateSchedule(
                          scheduleIndex,
                          "available_days",
                          Array.from(e.target.selectedOptions, (option) =>
                            parseInt(option.value)
                          )
                        )
                      }
                      className="w-full p-3 border rounded-[12px] focus:outline-none focus:border focus:border-green-500 focus:border-opacity-30"
                    >
                      <option value="1">Sunday</option>
                      <option value="2">Monday</option>
                      <option value="3">Tuesday</option>
                      <option value="4">Wednesday</option>
                      <option value="5">Thursday</option>
                      <option value="6">Friday</option>
                      <option value="7">Saturday</option>
                    </select>
                  </div>
                </div>

                {/* Price Tiers */}
                <div className="mb-4">
                  <h4 className="text-md font-semibold mb-2">Price Tiers</h4>
                  {schedule.prices.map((price, priceIndex) => (
                    <div key={priceIndex} className="mb-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Tier Name
                          </label>
                          <input
                            type="text"
                            value={price.name}
                            onChange={(e) =>
                              updatePriceTier(
                                scheduleIndex,
                                priceIndex,
                                "name",
                                e.target.value
                              )
                            }
                            placeholder="Adult"
                            className="w-full p-3 border rounded-[12px] focus:outline-none focus:border focus:border-green-500 focus:border-opacity-30"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Price
                          </label>
                          <input
                            type="text"
                            value={price.price}
                            onChange={(e) =>
                              updatePriceTier(
                                scheduleIndex,
                                priceIndex,
                                "price",
                                e.target.value
                              )
                            }
                            placeholder="50.00"
                            className="w-full p-3 border rounded-[12px] focus:outline-none focus:border focus:border-green-500 focus:border-opacity-30"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Capacity
                          </label>
                          <input
                            type="number"
                            value={price.capacity}
                            onChange={(e) =>
                              updatePriceTier(
                                scheduleIndex,
                                priceIndex,
                                "capacity",
                                parseInt(e.target.value)
                              )
                            }
                            placeholder="20"
                            className="w-full p-3 border rounded-[12px] focus:outline-none focus:border focus:border-green-500 focus:border-opacity-30"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Option
                          </label>
                          <input
                            type="text"
                            value={price.option}
                            onChange={(e) =>
                              updatePriceTier(
                                scheduleIndex,
                                priceIndex,
                                "option",
                                e.target.value
                              )
                            }
                            placeholder="Standard"
                            className="w-full p-3 border rounded-[12px] focus:outline-none focus:border focus:border-green-500 focus:border-opacity-30"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => addPriceTier(scheduleIndex)}
                    className="text-black font-medium text-[15px] hover:underline"
                  >
                    + Add Price Tier
                  </button>
                </div>
              </div>
            ))}
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

export default Pricing;