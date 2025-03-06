"use client";
import React, { useState, useEffect, use } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { ApiBaseMysql } from "@/Helper/ApiBase";
import Link from "next/link";

interface ProductDetails {
  id: number;
  summarize: { id: number; summaryText: string }[];
  location: { id: number; address: string }[];
  productKeywords: { id: number; keyword: string }[];
  images: { id: number; url: string }[];
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

export default function ProductDetailsEdit({ params }: any) {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const unwrappedParams: any = use(params);

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

  const handleSave = async () => {
    try {
      // delete product?.schedules;
      const response = await axios.patch(
        `${ApiBaseMysql}/shop/products/${unwrappedParams.id}/`,
        product
      );
      console.log("Product updated successfully:", response.data);
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  const handleChange = (field: string, value: any) => {
    setProduct((prev) => ({ ...prev, [field]: value } as ProductDetails));
  };

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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-start lg:items-center">
          <img
            src={product.images[0]?.url || "https://via.placeholder.com/80"}
            alt="Product"
            className="w-20 h-20 rounded-lg object-cover mr-4"
          />
          <div>
            <h1 className="text-xl font-bold">
              <input
                type="text"
                value={product.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="border rounded p-1"
              />
            </h1>
            <p className="text-sm text-gray-500">
              Product id: {product.id} | Category:{" "}
              <input
                type="text"
                value={product.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="border rounded p-1"
              />
            </p>
            <div className="flex items-center mt-2 space-x-1">
              <span className="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
                {product.status ? "Active" : "Inactive"}
              </span>
              <Icon icon="mdi:star" className="text-yellow-500 w-4 h-4" />
              <p className="text-sm text-gray-600">3.3 of 5</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="mt-4 lg:mt-0 bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <span>Save Changes</span>
          <Icon icon="mdi:content-save" className="w-4 h-4" />
        </button>
      </div>

      {/* Product Images Section */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Product Images</h2>
        <div className="flex space-x-2 overflow-x-auto">
          {product.images.map((image, idx) => (
            <img
              key={idx}
              src={image.url}
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
            {product.summarize.map((summary, idx) => (
              <li key={idx} className="text-sm text-gray-600 mb-1">
                <input
                  type="text"
                  value={summary.summaryText}
                  onChange={(e) => {
                    const updatedSummarize = [...product.summarize];
                    updatedSummarize[idx].summaryText = e.target.value;
                    handleChange("summarize", updatedSummarize);
                  }}
                  className="border rounded p-1"
                />
              </li>
            ))}
          </ul>
        </section>

        {/* Location Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Location</h2>
          <ul className="list-disc list-inside">
            {product.location.map((loc, idx) => (
              <li key={idx} className="text-sm text-gray-600 mb-1">
                <input
                  type="text"
                  value={loc.address}
                  onChange={(e) => {
                    const updatedLocation = [...product.location];
                    updatedLocation[idx].address = e.target.value;
                    handleChange("location", updatedLocation);
                  }}
                  className="border rounded p-1"
                />
              </li>
            ))}
          </ul>
        </section>

        {/* Inclusions & Exclusions Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Inclusions</h2>
          <ul className="list-disc list-inside">
            {product.inclusions.map((inclusion, idx) => (
              <li key={idx} className="text-sm text-gray-600 mb-1">
                <input
                  type="text"
                  value={inclusion.name}
                  onChange={(e) => {
                    const updatedInclusions = [...product.inclusions];
                    updatedInclusions[idx].name = e.target.value;
                    handleChange("inclusions", updatedInclusions);
                  }}
                  className="border rounded p-1"
                />
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Exclusions</h2>
          <ul className="list-disc list-inside">
            {product.exclusions.map((exclusion, idx) => (
              <li key={idx} className="text-sm text-gray-600 mb-1">
                <input
                  type="text"
                  value={exclusion.name}
                  onChange={(e) => {
                    const updatedExclusions = [...product.exclusions];
                    updatedExclusions[idx].name = e.target.value;
                    handleChange("exclusions", updatedExclusions);
                  }}
                  className="border rounded p-1"
                />
              </li>
            ))}
          </ul>
        </section>

        {/* Emergency Contacts Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Emergency Contacts</h2>
          <ul className="list-disc list-inside">
            {product.emergencyContacts.map((contact, idx) => (
              <li key={idx} className="text-sm text-gray-600 mb-1">
                <input
                  type="text"
                  value={contact.name}
                  onChange={(e) => {
                    const updatedContacts = [...product.emergencyContacts];
                    updatedContacts[idx].name = e.target.value;
                    handleChange("emergencyContacts", updatedContacts);
                  }}
                  className="border rounded p-1"
                />
                <input
                  type="text"
                  value={contact.phone}
                  onChange={(e) => {
                    const updatedContacts = [...product.emergencyContacts];
                    updatedContacts[idx].phone = e.target.value;
                    handleChange("emergencyContacts", updatedContacts);
                  }}
                  className="border rounded p-1 mt-1"
                />
              </li>
            ))}
          </ul>
        </section>

        {/* Product Keywords Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Product Keywords</h2>
          <ul className="list-disc list-inside">
            {product.productKeywords.map((keyword, idx) => (
              <li key={idx} className="text-sm text-gray-600 mb-1">
                <input
                  type="text"
                  value={keyword.keyword}
                  onChange={(e) => {
                    const updatedKeywords = [...product.productKeywords];
                    updatedKeywords[idx].keyword = e.target.value;
                    handleChange("productKeywords", updatedKeywords);
                  }}
                  className="border rounded p-1"
                />
              </li>
            ))}
          </ul>
        </section>

        {/* Attraction Ticket Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Attraction Ticket</h2>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Ticket Type:</span>{" "}
            <input
              type="text"
              value={product.attractionTicket?.ticketType || ""}
              onChange={(e) =>
                handleChange("attractionTicket", {
                  ...product.attractionTicket,
                  ticketType: e.target.value,
                })
              }
              className="border rounded p-1"
            />
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Age Restrictions:</span>{" "}
            <input
              type="text"
              value={product.attractionTicket?.ageRestrictions || ""}
              onChange={(e) =>
                handleChange("attractionTicket", {
                  ...product.attractionTicket,
                  ageRestrictions: e.target.value,
                })
              }
              className="border rounded p-1"
            />
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Accessibility:</span>{" "}
            <input
              type="text"
              value={product.attractionTicket?.accessibility || ""}
              onChange={(e) =>
                handleChange("attractionTicket", {
                  ...product.attractionTicket,
                  accessibility: e.target.value,
                })
              }
              className="border rounded p-1"
            />
          </p>
        </section>

        {/* Tour Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Tour</h2>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Tour Type:</span>{" "}
            <input
              type="text"
              value={product.tour?.tourType || ""}
              onChange={(e) =>
                handleChange("tour", {
                  ...product.tour,
                  tourType: e.target.value,
                })
              }
              className="border rounded p-1"
            />
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Locations Covered:</span>{" "}
            <input
              type="text"
              value={product.tour?.locationsCovered || ""}
              onChange={(e) =>
                handleChange("tour", {
                  ...product.tour,
                  locationsCovered: e.target.value,
                })
              }
              className="border rounded p-1"
            />
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Guide Information:</span>{" "}
            <input
              type="text"
              value={product.tour?.guideInformation || ""}
              onChange={(e) =>
                handleChange("tour", {
                  ...product.tour,
                  guideInformation: e.target.value,
                })
              }
              className="border rounded p-1"
            />
          </p>
        </section>

        {/* City Card Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">City Card</h2>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Card Name:</span>{" "}
            <input
              type="text"
              value={product.cityCard?.cardName || ""}
              onChange={(e) =>
                handleChange("cityCard", {
                  ...product.cityCard,
                  cardName: e.target.value,
                })
              }
              className="border rounded p-1"
            />
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Valid For:</span>{" "}
            <input
              type="text"
              value={product.cityCard?.validFor || ""}
              onChange={(e) =>
                handleChange("cityCard", {
                  ...product.cityCard,
                  validFor: e.target.value,
                })
              }
              className="border rounded p-1"
            />
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Activation Method:</span>{" "}
            <input
              type="text"
              value={product.cityCard?.activationMethod || ""}
              onChange={(e) =>
                handleChange("cityCard", {
                  ...product.cityCard,
                  activationMethod: e.target.value,
                })
              }
              className="border rounded p-1"
            />
          </p>
        </section>

        {/* Hop On Hop Off Ticket Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Hop On Hop Off Ticket</h2>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Route Information:</span>{" "}
            <input
              type="text"
              value={product.hopOnHopOffTicket?.routeInformation || ""}
              onChange={(e) =>
                handleChange("hopOnHopOffTicket", {
                  ...product.hopOnHopOffTicket,
                  routeInformation: e.target.value,
                })
              }
              className="border rounded p-1"
            />
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Ticket Type:</span>{" "}
            <input
              type="text"
              value={product.hopOnHopOffTicket?.ticketType || ""}
              onChange={(e) =>
                handleChange("hopOnHopOffTicket", {
                  ...product.hopOnHopOffTicket,
                  ticketType: e.target.value,
                })
              }
              className="border rounded p-1"
            />
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Operating Hours:</span>{" "}
            <input
              type="text"
              value={product.hopOnHopOffTicket?.operatingHours || ""}
              onChange={(e) =>
                handleChange("hopOnHopOffTicket", {
                  ...product.hopOnHopOffTicket,
                  operatingHours: e.target.value,
                })
              }
              className="border rounded p-1"
            />
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Frequency:</span>{" "}
            <input
              type="text"
              value={product.hopOnHopOffTicket?.frequency || ""}
              onChange={(e) =>
                handleChange("hopOnHopOffTicket", {
                  ...product.hopOnHopOffTicket,
                  frequency: e.target.value,
                })
              }
              className="border rounded p-1"
            />
          </p>
        </section>

        {/* Transfer Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Transfer</h2>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Transfer Type:</span>{" "}
            <input
              type="text"
              value={product.transfer?.transferType || ""}
              onChange={(e) =>
                handleChange("transfer", {
                  ...product.transfer,
                  transferType: e.target.value,
                })
              }
              className="border rounded p-1"
            />
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Pickup Location:</span>{" "}
            <input
              type="text"
              value={product.transfer?.pickupLocation || ""}
              onChange={(e) =>
                handleChange("transfer", {
                  ...product.transfer,
                  pickupLocation: e.target.value,
                })
              }
              className="border rounded p-1"
            />
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Dropoff Location:</span>{" "}
            <input
              type="text"
              value={product.transfer?.dropoffLocation || ""}
              onChange={(e) =>
                handleChange("transfer", {
                  ...product.transfer,
                  dropoffLocation: e.target.value,
                })
              }
              className="border rounded p-1"
            />
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Vehicle Type:</span>{" "}
            <input
              type="text"
              value={product.transfer?.vehicleType || ""}
              onChange={(e) =>
                handleChange("transfer", {
                  ...product.transfer,
                  vehicleType: e.target.value,
                })
              }
              className="border rounded p-1"
            />
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Luggage Allowance:</span>{" "}
            <input
              type="text"
              value={product.transfer?.luggageAllowance || ""}
              onChange={(e) =>
                handleChange("transfer", {
                  ...product.transfer,
                  luggageAllowance: e.target.value,
                })
              }
              className="border rounded p-1"
            />
          </p>
        </section>

        {/* Rental Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Rental</h2>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Rental Item Name:</span>{" "}
            <input
              type="text"
              value={product.rental?.rentalItemName || ""}
              onChange={(e) =>
                handleChange("rental", {
                  ...product.rental,
                  rentalItemName: e.target.value,
                })
              }
              className="border rounded p-1"
            />
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Rental Type:</span>{" "}
            <input
              type="text"
              value={product.rental?.rentalType || ""}
              onChange={(e) =>
                handleChange("rental", {
                  ...product.rental,
                  rentalType: e.target.value,
                })
              }
              className="border rounded p-1"
            />
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Rental Period:</span>{" "}
            <input
              type="text"
              value={product.rental?.rentalPeriod || ""}
              onChange={(e) =>
                handleChange("rental", {
                  ...product.rental,
                  rentalPeriod: e.target.value,
                })
              }
              className="border rounded p-1"
            />
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Age Requirement:</span>{" "}
            <input
              type="text"
              value={product.rental?.ageRequirement || ""}
              onChange={(e) =>
                handleChange("rental", {
                  ...product.rental,
                  ageRequirement: e.target.value,
                })
              }
              className="border rounded p-1"
            />
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Damage Policy:</span>{" "}
            <input
              type="text"
              value={product.rental?.damagePolicy || ""}
              onChange={(e) =>
                handleChange("rental", {
                  ...product.rental,
                  damagePolicy: e.target.value,
                })
              }
              className="border rounded p-1"
            />
          </p>
        </section>

        {/* Other Category Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Other Category</h2>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Category Type:</span>{" "}
            <input
              type="text"
              value={product.otherCategory?.categoryType || ""}
              onChange={(e) =>
                handleChange("otherCategory", {
                  ...product.otherCategory,
                  categoryType: e.target.value,
                })
              }
              className="border rounded p-1"
            />
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Activity Name:</span>{" "}
            <input
              type="text"
              value={product.otherCategory?.activityName || ""}
              onChange={(e) =>
                handleChange("otherCategory", {
                  ...product.otherCategory,
                  activityName: e.target.value,
                })
              }
              className="border rounded p-1"
            />
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Special Requirements:</span>{" "}
            <input
              type="text"
              value={product.otherCategory?.specialRequirements || ""}
              onChange={(e) =>
                handleChange("otherCategory", {
                  ...product.otherCategory,
                  specialRequirements: e.target.value,
                })
              }
              className="border rounded p-1"
            />
          </p>
        </section>

        {/* Pickup & Dropoffs Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Pickup & Dropoffs</h2>
          <ul className="list-disc list-inside">
            {product.pickupDropoffs.map((pickupDropoff, idx) => (
              <li key={idx} className="text-sm text-gray-600 mb-1">
                <input
                  type="text"
                  value={pickupDropoff.pickup}
                  onChange={(e) => {
                    const updatedPickupDropoffs = [...product.pickupDropoffs];
                    updatedPickupDropoffs[idx].pickup = e.target.value;
                    handleChange("pickupDropoffs", updatedPickupDropoffs);
                  }}
                  className="border rounded p-1"
                />
                <input
                  type="text"
                  value={pickupDropoff.dropoff}
                  onChange={(e) => {
                    const updatedPickupDropoffs = [...product.pickupDropoffs];
                    updatedPickupDropoffs[idx].dropoff = e.target.value;
                    handleChange("pickupDropoffs", updatedPickupDropoffs);
                  }}
                  className="border rounded p-1 mt-1"
                />
              </li>
            ))}
          </ul>
        </section>

        {/* Options Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Options</h2>
          <ul className="list-disc list-inside">
            {product.options.map((option, idx) => (
              <li key={idx} className="text-sm text-gray-600 mb-1">
                <input
                  type="text"
                  value={option.name}
                  onChange={(e) => {
                    const updatedOptions = [...product.options];
                    updatedOptions[idx].name = e.target.value;
                    handleChange("options", updatedOptions);
                  }}
                  className="border rounded p-1"
                />
              </li>
            ))}
          </ul>
        </section>

        {/* Not Suitable Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Not Suitable For</h2>
          <ul className="list-disc list-inside">
            {product.notSuitable.map((condition, idx) => (
              <li key={idx} className="text-sm text-gray-600 mb-1">
                <input
                  type="text"
                  value={condition.condition}
                  onChange={(e) => {
                    const updatedNotSuitable = [...product.notSuitable];
                    updatedNotSuitable[idx].condition = e.target.value;
                    handleChange("notSuitable", updatedNotSuitable);
                  }}
                  className="border rounded p-1"
                />
              </li>
            ))}
          </ul>
        </section>

        {/* Not Allowed Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Not Allowed</h2>
          <ul className="list-disc list-inside">
            {product.notAllowed.map((restriction, idx) => (
              <li key={idx} className="text-sm text-gray-600 mb-1">
                <input
                  type="text"
                  value={restriction.restriction}
                  onChange={(e) => {
                    const updatedNotAllowed = [...product.notAllowed];
                    updatedNotAllowed[idx].restriction = e.target.value;
                    handleChange("notAllowed", updatedNotAllowed);
                  }}
                  className="border rounded p-1"
                />
              </li>
            ))}
          </ul>
        </section>

        {/* Must Carry Items Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Must Carry Items</h2>
          <ul className="list-disc list-inside">
            {product.mustCarryItems.map((item, idx) => (
              <li key={idx} className="text-sm text-gray-600 mb-1">
                <input
                  type="text"
                  value={item.item}
                  onChange={(e) => {
                    const updatedMustCarryItems = [...product.mustCarryItems];
                    updatedMustCarryItems[idx].item = e.target.value;
                    handleChange("mustCarryItems", updatedMustCarryItems);
                  }}
                  className="border rounded p-1"
                />
              </li>
            ))}
          </ul>
        </section>

        {/* Language Type Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Language Type</h2>
          <input
            type="text"
            value={product.languageType}
            onChange={(e) => handleChange("languageType", e.target.value)}
            className="border rounded p-1"
          />
        </section>

        {/* Meta Information Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Meta Information</h2>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Meta Title:</span>{" "}
            <input
              type="text"
              value={product.metaTitle}
              onChange={(e) => handleChange("metaTitle", e.target.value)}
              className="border rounded p-1"
            />
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Meta Description:</span>{" "}
            <input
              type="text"
              value={product.metaDescription}
              onChange={(e) => handleChange("metaDescription", e.target.value)}
              className="border rounded p-1"
            />
          </p>
        </section>

        {/* Description Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <textarea
            value={product.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="border rounded p-1 w-full"
            rows={4}
          />
        </section>

        {/* Base Price Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Base Price</h2>
          <input
            type="text"
            value={product.basePrice}
            onChange={(e) => handleChange("basePrice", e.target.value)}
            className="border rounded p-1"
          />
        </section>

        {/* Cancellation Policy Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Cancellation Policy</h2>
          <textarea
            value={product.cancellationPolicy}
            onChange={(e) => handleChange("cancellationPolicy", e.target.value)}
            className="border rounded p-1 w-full"
            rows={4}
          />
        </section>

        {/* Departure From Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Departure From</h2>
          <input
            type="text"
            value={product.departure_from}
            onChange={(e) => handleChange("departure_from", e.target.value)}
            className="border rounded p-1"
          />
        </section>

        {/* Duration Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Duration</h2>
          <input
            type="text"
            value={product.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
            className="border rounded p-1"
          />
        </section>

        {/* Contact Information Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
          <textarea
            value={product.contactInformation}
            onChange={(e) => handleChange("contactInformation", e.target.value)}
            className="border rounded p-1 w-full"
            rows={4}
          />
        </section>

        {/* Terms and Conditions Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Terms and Conditions</h2>
          <textarea
            value={product.termsAndConditions}
            onChange={(e) => handleChange("termsAndConditions", e.target.value)}
            className="border rounded p-1 w-full"
            rows={4}
          />
        </section>

        {/* Booking Information Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Booking Information</h2>
          <textarea
            value={product.bookingInformation}
            onChange={(e) => handleChange("bookingInformation", e.target.value)}
            className="border rounded p-1 w-full"
            rows={4}
          />
        </section>

        {/* Food and Transport Included Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Food and Transport</h2>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={product.isFoodIncluded}
                onChange={(e) =>
                  handleChange("isFoodIncluded", e.target.checked)
                }
                className="mr-2"
              />
              <span className="text-sm text-gray-600">Food Included</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={product.isTransportIncluded}
                onChange={(e) =>
                  handleChange("isTransportIncluded", e.target.checked)
                }
                className="mr-2"
              />
              <span className="text-sm text-gray-600">Transport Included</span>
            </label>
          </div>
        </section>

        {/* Created and Updated At Section */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Timestamps</h2>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Created At:</span>{" "}
            {new Date(product.createdAt).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Updated At:</span>{" "}
            {new Date(product.updatedAt).toLocaleString()}
          </p>
        </section>
      </div>

      {/* Schedules Section */}
      {/* <div className="w-full bg-white mt-6 p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Schedules</h2>
        <div className="space-y-4">
          {product.schedules.map((schedule, idx) => (
            <div
              key={idx}
              className="w-full p-6 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                <h3 className="text-lg font-medium text-gray-800">
                  <input
                    type="text"
                    value={schedule.name}
                    onChange={(e) => {
                      const updatedSchedules = [...product.schedules];
                      updatedSchedules[idx].name = e.target.value;
                      handleChange("schedules", updatedSchedules);
                    }}
                    className="border rounded p-1"
                  />
                </h3>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Timing:</span>{" "}
                  <input
                    type="text"
                    value={(schedule.start_time)}
                    onChange={(e) => {
                      const updatedSchedules = [...product.schedules];
                      updatedSchedules[idx].start_time = e.target.value;
                      handleChange("schedules", updatedSchedules);
                    }}
                    className="border rounded p-1"
                  />{" "}
                  -{" "}
                  <input
                    type="text"
                    value={(schedule.end_time)}
                    onChange={(e) => {
                      const updatedSchedules = [...product.schedules];
                      updatedSchedules[idx].end_time = e.target.value;
                      handleChange("schedules", updatedSchedules);
                    }}
                    className="border rounded p-1"
                  />{" "}
                  |{" "}
                  <span className="font-medium">Interval:</span>{" "}
                  <input
                    type="number"
                    value={schedule.interval_mins}
                    onChange={(e) => {
                      const updatedSchedules = [...product.schedules];
                      updatedSchedules[idx].interval_mins = parseInt(
                        e.target.value
                      );
                      handleChange("schedules", updatedSchedules);
                    }}
                    className="border rounded p-1"
                  />{" "}
                  mins
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-md font-semibold text-gray-700 mb-2">
                  Available Days
                </h4>
                <div className="flex flex-wrap gap-2">
                  {schedule.available_days.map((day, dayIdx) => (
                    <input
                      key={dayIdx}
                      type="text"
                      value={day.name}
                      onChange={(e) => {
                        const updatedSchedules = [...product.schedules];
                        updatedSchedules[idx].available_days[
                          dayIdx
                        ].name = e.target.value;
                        handleChange("schedules", updatedSchedules);
                      }}
                      className="border rounded p-1"
                    />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-2">
                  Pricing
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {schedule.prices.map((price, priceIdx) => (
                    <div key={priceIdx} className="rounded-lg bg-green-50 p-6">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <p className="font-medium">Name:</p>
                        <input
                          type="text"
                          value={price.name}
                          onChange={(e) => {
                            const updatedSchedules = [...product.schedules];
                            updatedSchedules[idx].prices[
                              priceIdx
                            ].name = e.target.value;
                            handleChange("schedules", updatedSchedules);
                          }}
                          className="border rounded p-1"
                        />
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <p className="font-medium">Option:</p>
                        <input
                          type="text"
                          value={price.option}
                          onChange={(e) => {
                            const updatedSchedules = [...product.schedules];
                            updatedSchedules[idx].prices[
                              priceIdx
                            ].option = e.target.value;
                            handleChange("schedules", updatedSchedules);
                          }}
                          className="border rounded p-1"
                        />
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <p className="font-medium">Capacity:</p>
                        <input
                          type="number"
                          value={price.capacity}
                          onChange={(e) => {
                            const updatedSchedules = [...product.schedules];
                            updatedSchedules[idx].prices[
                              priceIdx
                            ].capacity = parseInt(e.target.value);
                            handleChange("schedules", updatedSchedules);
                          }}
                          className="border rounded p-1"
                        />
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <p className="font-medium">Price:</p>
                        <input
                          type="number"
                          value={price.price}
                          onChange={(e) => {
                            const updatedSchedules = [...product.schedules];
                            updatedSchedules[idx].prices[
                              priceIdx
                            ].price = parseFloat(e.target.value);
                            handleChange("schedules", updatedSchedules);
                          }}
                          className="border rounded p-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
