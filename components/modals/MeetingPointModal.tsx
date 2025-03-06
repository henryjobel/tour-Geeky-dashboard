"use client";
import { useEffect, useState } from "react";
import { useOptionStore } from "@/app/store/useOptionStore";

export default function MeetingPoint({ onNext }: any) {
  const { optionData, setOptionData, submitOption } = useOptionStore();

  // Initialize state with values from optionData
  const [meetingType, setMeetingType] = useState<"setMeetingPoint" | "pickUp">(
    optionData.meeting_point_type === "choose_meeting_point" ? "pickUp" : "setMeetingPoint"
  );
  const [meetingPointAddress, setMeetingPointAddress] = useState(optionData.meet?.address || "");
  const [meetingPointDescription, setMeetingPointDescription] = useState(optionData.meet?.description || "");
  const [arrivalTime, setArrivalTime] = useState("10 minutes before the activity"); // This field is not stored in optionData
  const [dropOffPlace, setDropOffPlace] = useState<"same_place" | "different_place" | "no_service">(
    optionData.drop_off_type || "same_place"
  );
  const [dropOffAddress, setDropOffAddress] = useState(optionData.drop?.address || "");

  // Update optionData whenever state changes
  useEffect(() => {
    const meetingPointData = {
      meet: {
        address: meetingPointAddress,
        landmark: "", // You can add a landmark field if needed
        description: meetingPointDescription,
        latitude: 0, // You can add latitude and longitude if needed
        longitude: 0,
      },
      drop: dropOffPlace === "different_place"
        ? {
            address: dropOffAddress,
            landmark: "", // You can add a landmark field if needed
            description: "", // You can add a description if needed
            latitude: 0,
            longitude: 0,
          }
        : undefined,
      meeting_point_type: meetingType === "setMeetingPoint" ? "set_meeting_point" : "choose_meeting_point",
      drop_off_type: dropOffPlace,
    };

    setOptionData(meetingPointData);
  }, [
    meetingType,
    meetingPointAddress,
    meetingPointDescription,
    dropOffPlace,
    dropOffAddress,
  ]);

  const handleDone = async () => {
    try {
      await submitOption();
      onNext();
    } catch (error) {
      alert("Failed to submit option");
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-green-500 mb-2">New Options</h2>
      <h3 className="font-medium text-lg">Meeting Point or Pickup</h3>

      <div className="mt-4">
        <h4 className="font-medium">How do customers get to the activity?</h4>
        <label className="flex items-center">
          <input
            type="radio"
            name="meetingType"
            value="setMeetingPoint"
            checked={meetingType === "setMeetingPoint"}
            onChange={() => setMeetingType("setMeetingPoint")}
            className="mr-2"
          />
          They go to a set meeting point
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="meetingType"
            value="pickUp"
            checked={meetingType === "pickUp"}
            onChange={() => setMeetingType("pickUp")}
            className="mr-2"
          />
          They can choose where you pick them up from certain areas or a list of places
        </label>
      </div>

      <div className="mt-4">
        <h4 className="font-medium">Meeting Point</h4>
        <input
          type="text"
          value={meetingPointAddress}
          onChange={(e) => setMeetingPointAddress(e.target.value)}
          placeholder="Add meeting point address"
          className="border rounded-lg p-2 w-full mt-2"
        />
        <textarea
          value={meetingPointDescription}
          onChange={(e) => setMeetingPointDescription(e.target.value)}
          placeholder="Describe the meeting point (optional)"
          className="border rounded-lg p-2 mt-2 w-full"
        />
      </div>

      <div className="mt-4">
        <h4 className="font-medium">When do customers need to arrive?</h4>
        <select
          value={arrivalTime}
          onChange={(e) => setArrivalTime(e.target.value)}
          className="border rounded-lg p-2 mt-2 w-full"
        >
          <option>10 minutes before the activity</option>
          <option>15 minutes before the activity</option>
          <option>30 minutes before the activity</option>
        </select>
      </div>

      <div className="mb-6">
        <h3 className="font-medium">Drop-off</h3>
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="same-place"
            name="drop-off"
            value="same_place"
            checked={dropOffPlace === "same_place"}
            onChange={() => setDropOffPlace("same_place")}
          />
          <label htmlFor="same-place" className="ml-2">
            At the same place you meet them
          </label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="different-place"
            name="drop-off"
            value="different_place"
            checked={dropOffPlace === "different_place"}
            onChange={() => setDropOffPlace("different_place")}
          />
          <label htmlFor="different-place" className="ml-2">
            At a different place
          </label>
        </div>
        <div className={dropOffPlace === "different_place" ? "block mb-2" : "hidden"}>
          <input
            type="text"
            value={dropOffAddress}
            onChange={(e) => setDropOffAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Search for dropping points..."
          />
        </div>
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="no-drop-off"
            name="drop-off"
            value="no_service"
            checked={dropOffPlace === "no_service"}
            onChange={() => setDropOffPlace("no_service")}
          />
          <label htmlFor="no-drop-off" className="ml-2">
            No drop-off service, the customer stays at the site or destination
          </label>
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <button className="bg-gray-300 text-gray-700 rounded-lg px-4 py-2">Cancel</button>
        <button onClick={handleDone} className="bg-green-500 text-white rounded-lg px-4 py-2">
          Done
        </button>
      </div>
    </div>
  );
}