"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import ProductCard from "./ProductCard";
import { fetchBookings } from "@/services/bookingService";

function AllOrders() {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");

  const loadBookings = async () => {
    setLoading(true);
    try {
      const { bookings, totalPages } = await fetchBookings(
        page,
        searchQuery,
        statusFilter
      );
      setBookings(bookings);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error loading bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [page, searchQuery, statusFilter]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    setPage(1);
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="p-2 bg-[#F6F6F6] min-h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-4">
          <h2 className="text-xl font-bold">All Bookings</h2>
          {loading && (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          )}
        </div>
        {/* Filter Section */}
        <div className="my-2 flex space-x-4 text-sm">
          {["All", "Reserved", "Confirmed", "Cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status === "All" ? "" : status)}
              className={`px-4 py-2 rounded-lg ${
                statusFilter === status ||
                (status === "All" && statusFilter === "")
                  ? "border border-blue-500 text-black"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center gap-3 bg-gray-200 px-3 py-2 rounded-full">
            <Icon
              icon="solar:ticket-outline"
              className="text-gray-400 w-5 h-5"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-gray-200 rounded-md text-sm text-black focus:outline-none"
              placeholder="Reference Code"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-[20px] shadow-sm p-4 space-y-4 min-h-screen">
        {!loading &&
          bookings?.map((booking) => (
            <ProductCard key={booking.id} booking={booking} />
          ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={!prevPage}
          className={`mx-1 px-3 py-1 rounded-full ${
            !prevPage
              ? "bg-gray-100 text-gray-400"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          Previous
        </button>
        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`mx-1 px-3 py-1 rounded-full ${
              page === pageNumber
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={!nextPage}
          className={`mx-1 px-3 py-1 rounded-full ${
            !nextPage
              ? "bg-gray-100 text-gray-400"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AllOrders;
