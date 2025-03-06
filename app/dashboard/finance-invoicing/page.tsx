"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";

const FinanceInvoicing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [dateFilter, setDateFilter] = useState<string>("Month");

  // Dummy data
  const bookingPayouts = Array(8).fill({
    bookingReference: "BR12345",
    leadTraveler: "Alice Johnson",
    productCode: "PC001",
    optionCode: "OC01",
    activityDate: "2023-10-01",
    purchaseDate: "2023-10-01",
    retailRate: "$250",
    discount: "$50",
    netRate: "$200",
  });

  const invoices = Array(8).fill({
    date: "2023-10-01",
    invoice: "TIR-541212154",
    amount: "$250",
  });

  const paymentConfirmations = Array(8).fill({
    date: "2023-10-01",
    transactionId: "TXN123456",
    amount: "$250",
  });

  return (
    <div className="py-3 h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">Finance & Invoicing</h1>
        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Export Button */}
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
            <Icon icon="uil:file-download" className="text-lg" />
            
          </button>
          {/* Print Button */}
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
            <Icon icon="mdi:printer" className="text-lg" />
            
          </button>


          {/* Date Filter Dropdown */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="p-2 bg-gray-200 text-gray-700 rounded-lg border focus:outline-none focus:ring focus:ring-green-500"
          >
            <option value="Month">Month</option>
            <option value="Year">Year</option>
          </select>

          {/* Navigation Buttons */}
          <button className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            <Icon icon="mdi:chevron-left" className="text-lg" />
          </button>
          <button className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            <Icon icon="mdi:chevron-right" className="text-lg" />
          </button>
        </div>
      </div>

      {/* Header with Tabs and Controls */}
      <div className="flex flex-wrap items-center justify-between mb-6 bg-white rounded-xl p-3">
        {/* Tabs with Icons */}
        <div className="flex gap-4">
          {[
            { name: "Booking Payouts", icon: "mdi:cash-multiple" },
            { name: "Invoice", icon: "mdi:receipt" },
            { name: "Payment Confirmation", icon: "mdi:credit-card-check" },
          ].map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`py-2 px-4 font-medium flex items-center gap-2 ${
                activeTab === index
                  ? "text-black text-sm bg-gray-100 rounded-lg px-5"
                  : "text-gray-500 font-light text-sm"
              }`}
            >
              <Icon icon={tab.icon} className="text-lg" />
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {/* Booking Payouts Tab */}
        {activeTab === 0 && (
          <div className="overflow-auto border bg-white p-2 sm:p-8 rounded-3xl">
            <table className="w-full">
              <thead className=" text-left border-b">
                <tr>
                  <th className="p-3 rounded-md text-gray-500 text-[15px] font-light ">
                    Booking Reference
                  </th>
                  <th className="p-3 rounded-md text-gray-500 text-[15px] font-light ">
                    Lead Traveler
                  </th>
                  <th className="p-3 rounded-md text-gray-500 text-[15px] font-light ">
                    Product Code
                  </th>
                  <th className="p-3 rounded-md text-gray-500 text-[15px] font-light ">
                    Option Code
                  </th>
                  <th className="p-3 rounded-md text-gray-500 text-[15px] font-light ">
                    Activity Date
                  </th>
                  <th className="p-3 rounded-md text-gray-500 text-[15px] font-light ">
                    Purchase Date
                  </th>
                  <th className="p-3 rounded-md text-gray-500 text-[15px] font-light ">
                    Retail Rate
                  </th>
                  <th className="p-3 rounded-md text-gray-500 text-[15px] font-light ">
                    Discount
                  </th>
                  <th className="p-3 rounded-md text-gray-500 text-[15px] font-light ">
                    Net Rate
                  </th>
                </tr>
                
              </thead>
              
              <tbody>
                {bookingPayouts.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b"
                  >
                    <td className="p-3">{item.bookingReference}</td>
                    <td className="p-3">{item.leadTraveler}</td>
                    <td className="p-3">{item.productCode}</td>
                    <td className="p-3">{item.optionCode}</td>
                    <td className="p-3">{item.activityDate}</td>
                    <td className="p-3">{item.purchaseDate}</td>
                    <td className="p-3">{item.retailRate}</td>
                    <td className="p-3">{item.discount}</td>
                    <td className="p-3">{item.netRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Invoice Tab */}
        {activeTab === 1 && (
          <div className="overflow-auto  border bg-white p-2 sm:p-8 rounded-3xl">
            <table className="w-full">
              <thead className=" text-left rounded-md border-b">
                <tr>
                  <th className=" p-3 rounded-md text-gray-500 text-[15px] font-light">
                    Date
                  </th>
                  <th className=" p-3 rounded-md text-gray-500 text-[15px] font-light">
                    Invoice
                  </th>
                  <th className=" p-3 rounded-md text-gray-500 text-[15px] font-light">
                    Amount
                  </th>
                  <th className=" p-3 rounded-md text-gray-500 text-[15px] font-light">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white  border-b"
                  >
                    <td className="p-3">{item.date}</td>
                    <td className="p-3">
                      <span className="flex items-center gap-2">
                        <Icon icon="mdi:receipt-outline" />
                        {item.invoice}
                      </span>
                    </td>
                    <td className="p-3">{item.amount}</td>
                    <td className="p-3">
                      <button className=" hover:underline text-xl flex items-center gap-1">
                        <Icon icon="uil:file-download" />
                       
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Payment Confirmation Tab */}
        {activeTab === 2 && (
          <div className="overflow-auto  border bg-white p-2 sm:p-8 rounded-3xl">
            <table className="w-full">
              <thead className="border-b text-left rounded-md">
                <tr>
                  <th className="p-3 rounded-md text-gray-500 text-[15px] font-light">
                    Date
                  </th>
                  <th className="p-3 rounded-md text-gray-500 text-[15px] font-light">
                    Transaction ID
                  </th>
                  <th className="p-3 rounded-md text-gray-500 text-[15px] font-light">
                    Amount
                  </th>
                  <th className="p-3 rounded-md text-gray-500 text-[15px] font-light">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paymentConfirmations.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white  border-b"
                  >
                    <td className="p-3">{item.date}</td>
                    <td className="p-3">{item.transactionId}</td>
                    <td className="p-3">{item.amount}</td>
                    <td className="p-3">
                      <button className=" hover:underline flex items-center text-xl gap-1">
                        <Icon icon="uil:file-download" />
                        
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceInvoicing;
