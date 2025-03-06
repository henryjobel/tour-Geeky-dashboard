"use client";
import React, { useState, useEffect, use } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { ApiBaseMysql } from "@/Helper/ApiBase";
import Link from "next/link";

interface ProductDetails {
  id: number;
  avg_rating: number;
  option: Option;
  summarize: { id: number; summaryText: string }[];
  location: { id: number; address: string }[];
  productKeywords: { id: number; keyword: string }[];
  images: { id: number; image: string }[];
  inclusions: { id: number; name: string }[];
  exclusions: { id: number; name: string }[];
  emergencyContacts: { id: number; name: string; phone: string }[];
  attractionTicket: {
    id: number;
    ticketType?: string;
    ageRestrictions?: string;
    accessibility?: string;
  };
  tour: {
    id: number;
    tourType: string;
    locationsCovered: string;
    guideInformation: string;
  };
  cityCard: {
    id: number;
    cardName: string;
    validFor: string;
    activationMethod: string;
  };
  hopOnHopOffTicket: {
    id: number;
    routeInformation: string;
    ticketType?: string;
    operatingHours: string;
    frequency: string;
  };
  transfer: {
    id: number;
    transferType: string;
    pickupLocation: string;
    dropoffLocation: string;
    vehicleType: string;
    luggageAllowance: string;
  };
  rental: {
    id: number;
    rentalItemName: string;
    rentalType: string;
    rentalPeriod: string;
    ageRequirement: string;
    damagePolicy: string;
  };
  otherCategory: {
    id: number;
    categoryType: string;
    activityName: string;
    specialRequirements: string;
  };
  pickupDropoffs: {
    id: number;
    pickup: string;
    dropoff: string;
    tour: null;
    hopOnHopOffTicket: null;
  }[];
  options: { id: number; name: string }[];
  notSuitable: { id: number; condition: string }[];
  notAllowed: { id: number; restriction: string }[];
  mustCarryItems: { id: number; item: string }[];
  schedules: {
    id: number;
    name: string;
    start_time: string;
    end_time: string;
    interval_mins: number;
    available_days: { id: number; name: string }[];
    prices: {
      id: number;
      name: string;
      option: string;
      capacity: number;
      price: number;
    }[];
  }[];
  languageType: string;
  category: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  basePrice: string;
  cancellationPolicy: string;
  departure_from: string;
  duration: string;
  contactInformation: string;
  termsAndConditions: string;
  bookingInformation: string;
  status: boolean;
  isFoodIncluded: boolean;
  isTransportIncluded: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ProductDetails({ params }: any) {
  const unwrappedParams: any = use(params);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${ApiBaseMysql}/shop/products/${unwrappedParams.id}/`
        );
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [unwrappedParams.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-4">Product not found.</div>;
  }

  const formatTime = (timeString: string) => {
    const time = new Date(`1970-01-01T${timeString}Z`);
    return time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-start lg:items-center">
          <img
            src={product?.images[0]?.image || "https://via.placeholder.com/80"}
            alt="Product"
            className="w-20 h-20 rounded-lg object-cover mr-4"
          />
          <div>
            <h1 className="text-xl font-bold">{product?.title}</h1>
            <p className="text-sm text-gray-500">
              Product id: {product?.id} | Category: {product?.category}
            </p>
            <div className="flex items-center mt-2 space-x-1">
              <span className="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
                {product.status ? "Active" : "Inactive"}
              </span>
              <Icon icon="mdi:star" className="text-yellow-500 w-4 h-4" />
              <p className="text-sm text-gray-600">
                {product?.avg_rating} of 5
              </p>
            </div>
          </div>
        </div>
        <Link href={`/dashboard/our-products/${unwrappedParams.id}/edit`}>
          <button className="flex items-center space-x-2 bg-black text-white rounded-md px-4 py-2 text-[15px] hover:bg-gray-800">
            <Icon icon="mdi:plus" className="w-4 h-4" />
            <span>Edit Product</span>
          </button>
        </Link>
      </div>

      {/* Product Images Section */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Product Images</h2>
        <div className="flex space-x-2 overflow-x-auto">
          {product?.images?.map((image, idx) => (
            <img
              key={idx}
              src={image?.image}
              alt="Product"
              className="w-32 h-20 rounded-lg object-cover"
            />
          ))}
        </div>
      </section>

      {/* Product Details Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Summarize Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Summary</h2>
          <ul className="list-disc list-inside">
            {product?.summarize?.map((summary, idx) => (
              <li key={idx} className="text-sm text-gray-600 mb-1">
                {summary?.summaryText}
              </li>
            ))}
          </ul>
        </section>

        {/* Location Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Location</h2>
          <ul className="list-disc list-inside">
            {product?.location?.map((loc, idx) => (
              <li key={idx} className="text-sm text-gray-600 mb-1">
                {loc?.address}
              </li>
            ))}
          </ul>
        </section>

        {/* Inclusions & Exclusions Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Inclusions</h2>
          <ul className="list-disc list-inside">
            {product?.inclusions?.map((inclusion, idx) => (
              <li key={idx} className="text-sm text-gray-600 mb-1">
                {inclusion?.name}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Exclusions</h2>
          <ul className="list-disc list-inside">
            {product?.exclusions?.map((exclusion, idx) => (
              <li key={idx} className="text-sm text-gray-600 mb-1">
                {exclusion?.name}
              </li>
            ))}
          </ul>
        </section>

        {/* Emergency Contacts Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Emergency Contacts</h2>
          <ul className="list-disc list-inside">
            {product?.emergencyContacts?.map((contact, idx) => (
              <li key={idx} className="text-sm text-gray-600 mb-1">
                {contact?.name} - {contact?.phone}
              </li>
            ))}
          </ul>
        </section>

        {/* Product Keywords Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Product Keywords</h2>
          <ul className="list-disc list-inside">
            {product?.productKeywords?.map((keyword, idx) => (
              <li key={idx} className="text-sm text-gray-600 mb-1">
                {keyword?.keyword}
              </li>
            ))}
          </ul>
        </section>

        {/* Attraction Ticket Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Attraction Ticket</h2>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Ticket Type:</span>{" "}
            {product?.attractionTicket?.ticketType}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Age Restrictions:</span>{" "}
            {product?.attractionTicket?.ageRestrictions}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Accessibility:</span>{" "}
            {product?.attractionTicket?.accessibility}
          </p>
        </section>

        {/* Tour Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Tour</h2>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Tour Type:</span>{" "}
            {product?.tour?.tourType}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Locations Covered:</span>{" "}
            {product?.tour?.locationsCovered}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Guide Information:</span>{" "}
            {product.tour?.guideInformation}
          </p>
        </section>

        {/* City Card Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">City Card</h2>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Card Name:</span>{" "}
            {product?.cityCard?.cardName}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Valid For:</span>{" "}
            {product?.cityCard?.validFor}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Activation Method:</span>{" "}
            {product?.cityCard?.activationMethod}
          </p>
        </section>

        {/* Hop On Hop Off Ticket Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Hop On Hop Off Ticket</h2>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Route Information:</span>{" "}
            {product?.hopOnHopOffTicket?.routeInformation}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Ticket Type:</span>{" "}
            {product?.hopOnHopOffTicket?.ticketType}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Operating Hours:</span>{" "}
            {product?.hopOnHopOffTicket?.operatingHours}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Frequency:</span>{" "}
            {product?.hopOnHopOffTicket?.frequency}
          </p>
        </section>

        {/* Transfer Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Transfer</h2>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Transfer Type:</span>{" "}
            {product?.transfer?.transferType}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Pickup Location:</span>{" "}
            {product?.transfer?.pickupLocation}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Dropoff Location:</span>{" "}
            {product?.transfer?.dropoffLocation}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Vehicle Type:</span>{" "}
            {product?.transfer?.vehicleType}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Luggage Allowance:</span>{" "}
            {product?.transfer?.luggageAllowance}
          </p>
        </section>

        {/* Rental Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Rental</h2>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Rental Item Name:</span>{" "}
            {product?.rental?.rentalItemName}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Rental Type:</span>{" "}
            {product?.rental?.rentalType}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Rental Period:</span>{" "}
            {product?.rental?.rentalPeriod}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Age Requirement:</span>{" "}
            {product?.rental?.ageRequirement}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Damage Policy:</span>{" "}
            {product?.rental?.damagePolicy}
          </p>
        </section>

        {/* Other Category Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Other Category</h2>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Category Type:</span>{" "}
            {product?.otherCategory?.categoryType}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Activity Name:</span>{" "}
            {product?.otherCategory?.activityName}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Special Requirements:</span>{" "}
            {product?.otherCategory?.specialRequirements}
          </p>
        </section>

        {/* Pickup & Dropoffs Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Pickup & Dropoffs</h2>
          <ul className="list-disc list-inside">
            {product?.pickupDropoffs?.map((pickupDropoff, idx) => (
              <li key={idx} className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Pickup:</span>{" "}
                {pickupDropoff?.pickup} |{" "}
                <span className="font-medium">Dropoff:</span>{" "}
                {pickupDropoff?.dropoff}
              </li>
            ))}
          </ul>
        </section>

        {/* Options Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Options</h2>
          <ul className="list-disc list-inside">
            {product?.options?.map((option, idx) => (
              <li key={idx} className="text-sm text-gray-600 mb-1">
                {option?.name}
              </li>
            ))}
          </ul>
        </section>

        {/* Not Suitable Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Not Suitable For</h2>
          <ul className="list-disc list-inside">
            {product?.notSuitable?.map((condition, idx) => (
              <li key={idx} className="text-sm text-gray-600 mb-1">
                {condition?.condition}
              </li>
            ))}
          </ul>
        </section>

        {/* Not Allowed Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Not Allowed</h2>
          {product?.notAllowed?.map((restriction, idx) => (
            <li key={idx} className="text-sm text-gray-600 mb-1">
              {restriction?.restriction}
            </li>
          ))}
        </section>

        {/* Must Carry Items Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Must Carry Items</h2>
          <ul className="list-disc list-inside">
            {product?.mustCarryItems?.map((item, idx) => (
              <li key={idx} className="text-sm text-gray-600 mb-1">
                {item?.item}
              </li>
            ))}
          </ul>
        </section>

        {/* Language Type Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Language Type</h2>
          <p className="text-sm text-gray-600 mb-1">{product?.languageType}</p>
        </section>

        {/* Meta Information Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Meta Information</h2>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Meta Title:</span>{" "}
            {product?.metaTitle}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Meta Description:</span>{" "}
            {product?.metaDescription}
          </p>
        </section>

        {/* Description Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-sm text-gray-600 mb-1">{product?.description}</p>
        </section>

        {/* Base Price Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Base Price</h2>
          <p className="text-sm text-gray-600 mb-1">{product?.basePrice}</p>
        </section>

        {/* Cancellation Policy Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Cancellation Policy</h2>
          <p className="text-sm text-gray-600 mb-1">
            {product?.cancellationPolicy}
          </p>
        </section>

        {/* Departure From Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Departure From</h2>
          <p className="text-sm text-gray-600 mb-1">
            {product?.departure_from}
          </p>
        </section>

        {/* Duration Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Duration</h2>
          <p className="text-sm text-gray-600 mb-1">{product?.duration}</p>
        </section>

        {/* Contact Information Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
          <p className="text-sm text-gray-600 mb-1">
            {product?.contactInformation}
          </p>
        </section>

        {/* Terms and Conditions Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Terms and Conditions</h2>
          <p className="text-sm text-gray-600 mb-1">
            {product?.termsAndConditions}
          </p>
        </section>

        {/* Booking Information Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Booking Information</h2>
          <p className="text-sm text-gray-600 mb-1">
            {product?.bookingInformation}
          </p>
        </section>

        {/* Food and Transport Included Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Food and Transport</h2>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Food Included:</span>{" "}
            {product?.isFoodIncluded ? "Yes" : "No"}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Transport Included:</span>{" "}
            {product?.isTransportIncluded ? "Yes" : "No"}
          </p>
        </section>

        {/* Created and Updated At Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Timestamps</h2>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Created At:</span>{" "}
            {new Date(product?.createdAt).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Updated At:</span>{" "}
            {new Date(product?.updatedAt).toLocaleString()}
          </p>
        </section>
      </div>

      {product?.option && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Option Details
          </h2>

          {/* General Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-4">
              <p className="text-gray-700">
                <strong className="text-gray-900">Name:</strong>{" "}
                {product?.option?.name}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Reference Code:</strong>{" "}
                {product?.option?.reference_code}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Maximum Group Size:</strong>{" "}
                {product?.option?.maximum_group_size}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">
                  Wheelchair Accessible:
                </strong>{" "}
                <span
                  className={
                    product?.option?.is_wheelchair_accessible
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {product?.option?.is_wheelchair_accessible ? "Yes" : "No"}
                </span>
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Skip the Line:</strong>{" "}
                <span
                  className={
                    product?.option.skip_the_line
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {product.option?.skip_the_line ? "Yes" : "No"}
                </span>
              </p>
            </div>
            <div className="space-y-4 my-4">
              <p className="text-gray-700">
                <strong className="text-gray-900">Valid For:</strong>{" "}
                {product.option?.valid_for} day(s)
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Fixed Time:</strong>{" "}
                <span
                  className={
                    product.option?.has_fixed_time
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {product.option?.has_fixed_time ? "Yes" : "No"}
                </span>
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Audio Guide:</strong>{" "}
                <span
                  className={
                    product?.option.audio_guide
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {product.option?.audio_guide ? "Yes" : "No"}
                </span>
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Booklet:</strong>{" "}
                <span
                  className={
                    product?.option.booklet ? "text-green-600" : "text-red-600"
                  }
                >
                  {product.option?.booklet ? "Yes" : "No"}
                </span>
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Private:</strong>{" "}
                <span
                  className={
                    product.option.is_private
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {product.option?.is_private ? "Yes" : "No"}
                </span>
              </p>
            </div>
          </div>

          {/* Drop-off and Meeting Point */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Drop-off Details
              </h3>
              <p className="text-gray-700">
                <strong className="text-gray-900">Type:</strong>{" "}
                {product.option.drop_off_type}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Address:</strong>{" "}
                {product.option.drop.address}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Landmark:</strong>{" "}
                {product.option.drop.landmark || "Not provided"}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Description:</strong>{" "}
                {product.option.drop.description || "Not provided"}
              </p>
            </div>
            <div className="space-y-4 my-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Meeting Point Details
              </h3>
              <p className="text-gray-700">
                <strong className="text-gray-900">Type:</strong>{" "}
                {product.option.meeting_point_type}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Address:</strong>{" "}
                {product.option.meet.address}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Landmark:</strong>{" "}
                {product.option.meet.landmark || "Not provided"}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Description:</strong>{" "}
                {product.option.meet.description || "Not provided"}
              </p>
            </div>
          </div>

          {/* Host Languages */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Host Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.option.host_languages.length > 0 ? (
                product.option.host_languages.map((lang, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {lang.keyword}
                  </span>
                ))
              ) : (
                <p className="text-gray-700">No languages provided</p>
              )}
            </div>
          </div>

          {/* Audio Guides and Booklet Languages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Audio Guides Languages
              </h3>
              {product.option.audio_guides_languages.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {product.option.audio_guides_languages.map((lang, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-700">No languages provided</p>
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Booklet Languages
              </h3>
              {product.option.booklet_languages.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {product.option.booklet_languages.map((lang, index) => (
                    <span
                      key={index}
                      className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-700">No languages provided</p>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Schedules Section */}
      <div className="w-full bg-white  mt-6">
        <h2 className="text-xl font-semibold mb-4">Schedules</h2>
        <div className="space-y-4">
          {product?.schedules?.map((schedule, idx) => (
            <div
              key={idx}
              className="w-full p-6 border rounded-lg hover:shadow-md transition-shadow"
            >
              {/* Schedule Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                <h3 className="text-lg font-medium text-gray-800">
                  {schedule?.name}
                </h3>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Timing:</span>{" "}
                  {formatTime(schedule?.start_time)} -{" "}
                  {formatTime(schedule?.end_time)} |{" "}
                  <span className="font-medium">Interval:</span>{" "}
                  {schedule?.interval_mins} mins
                </div>
              </div>

              {/* Available Days */}
              <div className="mb-4">
                <h4 className="text-md font-semibold text-gray-700 mb-2">
                  Available Days
                </h4>
                <div className="flex flex-wrap gap-2">
                  {schedule?.available_days?.map((day, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {day?.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing Information */}
              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-2">
                  Pricing
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {schedule?.prices?.map((price, idx) => (
                    <div key={idx} className="rounded-lg bg-green-50  p-6">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <p className="font-medium">Name:</p>
                        <p>{price?.name}</p>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <p className="font-medium">Option:</p>
                        <p>{price?.option}</p>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <p className="font-medium">Capacity:</p>
                        <p>{price?.capacity}</p>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <p className="font-medium">Price:</p>
                        <p>${price?.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
