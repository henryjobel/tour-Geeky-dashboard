"use client";
import React, { useEffect, useState, use } from "react";
import "chart.js/auto";
import { fetchBookingDetails } from "@/services/bookingService";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function CustomerDetailsView({ params }: { params: any }) {
  const { id }: any = use(params);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBookingDetails = async () => {
      try {
        const data = await fetchBookingDetails(id);
        setBookingDetails(data);
      } catch (err) {
        setError("Failed to load booking details.");
      } finally {
        setLoading(false);
      }
    };
    loadBookingDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Booking Details</h2>

      {/* User Details */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <div className="flex justify-between">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          User Information
        </h3>
        <Link href={`/dashboard/all-orders/${id}/edit`}>
          <button className="bg-gray-200 text-gray-600 text-sm font-medium px-4 py-2 rounded-lg flex items-center space-x-2">
            <span>Edit</span>
            <Icon icon="mdi:chevron-down" className="w-4 h-4" />
          </button>
        </Link>
        </div>
        <div className="flex items-center gap-6">
          <img
            src={bookingDetails.user.image}
            alt={`${bookingDetails.user.first_name} ${bookingDetails.user.last_name}`}
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
          />
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Name:</span>{" "}
              {`${bookingDetails.user.first_name} ${bookingDetails.user.last_name}`}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Email:</span>{" "}
              {bookingDetails.user.email}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Phone:</span>{" "}
              {bookingDetails.user.phone}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Address:</span>{" "}
              {`${bookingDetails.user.address}, ${bookingDetails.user.city}, ${bookingDetails.user.country}`}
            </p>
          </div>
        </div>

      </div>

      {/* Booking Info */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <h3 className="text-xl font-semibold mb-6 text-gray-700 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Booking Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Product */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <p className="text-sm font-medium text-gray-600">Product</p>
            </div>
            <p className="text-lg font-semibold text-gray-800">
              {bookingDetails.product_title}
            </p>
          </div>

          {/* Status */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm font-medium text-gray-600">Status</p>
            </div>
            <p
              className={`text-lg font-semibold ${
                bookingDetails.status === "Confirmed"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {bookingDetails.status}
            </p>
          </div>

          {/* Departure From */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-sm font-medium text-gray-600">
                Departure From
              </p>
            </div>
            <p className="text-lg font-semibold text-gray-800">
              {bookingDetails.departure_from}
            </p>
          </div>

          {/* Departure Date */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm font-medium text-gray-600">
                Departure Date
              </p>
            </div>
            <p className="text-lg font-semibold text-gray-800">
              {new Date(bookingDetails.departure_date_time).toLocaleString()}
            </p>
          </div>

          {/* Total Amount */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
            </div>
            <p className="text-lg font-semibold text-gray-800">
              ${bookingDetails.total_amount.toFixed(2)}
            </p>
          </div>

          {/* Location */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-sm font-medium text-gray-600">Location</p>
            </div>
            <p className="text-lg font-semibold text-gray-800">
              {bookingDetails.location}
            </p>
          </div>
        </div>
      </div>

      {/* Participants */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Participants
        </h3>
        {bookingDetails.participants.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                    Cost per Unit
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookingDetails.participants.map((participant: any) => (
                  <tr
                    key={participant.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {participant.option_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {participant.participant_type}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {participant.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      ${participant.cost_per_unit.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No participants available.</p>
        )}
      </div>
    </div>
  );
}
