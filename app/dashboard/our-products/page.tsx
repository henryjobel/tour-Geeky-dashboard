"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import grid from "/public/icons/grid.png";
import search from "/public/icons/search.png";
import { fetchProducts } from "@/services/productService";

const OurProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [ordering, setOrdering] = useState<string>("-createdAt");
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const { products, totalPages } = await fetchProducts(
        searchQuery,
        filters,
        ordering,
        page,
        pageSize
      );
      setProducts(products);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [searchQuery, filters, ordering, page, pageSize]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryFilterChange = (category: string) => {
    if (category === "All") {
      const newFilters = { ...filters };
      delete newFilters.category;
      setFilters(newFilters);
    } else {
      setFilters({ ...filters, category });
    }
  };

  const handleOrderingChange = (field: string) => {
    const newOrdering = ordering === `-${field}` ? field : `-${field}`;
    setOrdering(newOrdering);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  return (
    <div className="p-2 bg-[#F6F6F6] min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <div className="flex space-x-4">
          <h2 className="text-xl font-bold mt-2">Inhouse Products</h2>
          {loading && (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-3">
          {/* Search Bar */}
          <div className="flex flex-col gap-3 md:flex-row mt-2">
            <div className="flex items-center gap-3 bg-gray-200 px-3 py-2 rounded-full">
              <Image alt="search" src={search} height={18} width={18} />
              <input
                type="text"
                className="bg-gray-200 rounded-md text-[15px] text-black focus:outline-none"
                placeholder="Search Products"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            {/* Category Filter Dropdown */}
            <div className="relative">
              <select
                className="flex items-center space-x-2 bg-gray-200 rounded-md px-3 py-2 text-[15px] text-black hover:bg-gray-50 appearance-none"
                onChange={(e) => handleCategoryFilterChange(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Attraction ticket">Attraction ticket</option>
                <option value="Tour">Tour</option>
                <option value="City card">City card</option>
                <option value="Transfer">Transfer</option>
                <option value="Rental">Rental</option>
                <option value="Hop-on hop-off ticket">
                  Hop-on hop-off ticket
                </option>
              </select>
              <Icon
                icon="mdi:chevron-down"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
              />
            </div>

            {/* View Options */}
            <button className="flex items-center space-x-2 bg-gray-200 rounded-md px-3 py-2 text-[15px] text-black hover:bg-gray-50">
              <Image alt="grid" src={grid} height={18} width={18} />
              <span>Grid View</span>
              <Icon icon="mdi:chevron-down" className="wsemibold text-black" />
            </button>

            {/* Add New Product Button */}
            <Link href={`/dashboard/create-product/`}>
              <button className="flex items-center space-x-2 bg-black text-white rounded-md px-4 py-2 text-[15px] hover:bg-gray-800">
                <Icon icon="mdi:plus" className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-[20px] border shadow-sm overflow-x-auto mt-8">
        <table className="min-w-full table-auto">
          <thead className="bg-[#FAFDF2]">
            <tr>
              <th
                className="px-6 py-4  text-sm text-left text-[15px] font-bold text-black cursor-pointer"
                onClick={() => handleOrderingChange("title")}
              >
                Product{" "}
                {ordering === "title" ? "↑" : ordering === "-title" ? "↓" : ""}
              </th>
              <th
                className="px-6 py-4  text-sm text-center text-[15px] font-bold text-black cursor-pointer"
                onClick={() => handleOrderingChange("basePrice")}
              >
                Price
                {ordering === "basePrice"
                  ? "↑"
                  : ordering === "-basePrice"
                  ? "↓"
                  : ""}
              </th>
              <th
                className="px-6  text-sm py-4 text-center text-[15px] font-bold text-black cursor-pointer"
                onClick={() => handleOrderingChange("duration")}
              >
                Duration
                {ordering === "duration"
                  ? "↑"
                  : ordering === "-duration"
                  ? "↓"
                  : ""}
              </th>
              <th
                className="px-6  text-sm py-4 text-center text-[15px] font-bold text-black cursor-pointer"
                onClick={() => handleOrderingChange("category")}
              >
                Category
                {ordering === "category"
                  ? "↑"
                  : ordering === "-category"
                  ? "↓"
                  : ""}
              </th>
              <th className="px-6  text-sm py-4 text-center text-[15px] font-bold text-black">
                Sales
              </th>
              <th
                className="px-6 py-4  text-sm text-center text-[15px] font-bold text-black cursor-pointer"
                onClick={() => handleOrderingChange("status")}
              >
                Status{" "}
                {ordering === "status"
                  ? "↑"
                  : ordering === "-status"
                  ? "↓"
                  : ""}
              </th>
              <th className="px-6 py-4  text-sm text-center text-[15px] font-bold text-black">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="min-h-[200px]">
            {!loading &&
              products.map((product, index) => (
                <tr key={index} className="border-b last:border-none">
                  <td className="px-6 py-4 flex items-center space-x-4">
                    <img
                      src={
                        product.images[0]?.image || "/default-product-image.png"
                      }
                      alt={product.title}
                      className="w-[50px] h-[50px] rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-semibold text-[15px] text-gray-800 mb-1">
                        {product.title}
                      </p>
                      <div className="flex items-center space-x-1 text-semibold text-black">
                       
                        <span className="text-[15px] font-light mr-3 text-gray-500">
                       <Icon icon="mdi:star" className="text-yellow-500 w-4 h-4" />
                        </span>
                        {product?.avg_rating} of 5 (External Rating)
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-[15px] text-gray-600">
                    ${product.basePrice}
                  </td>
                  <td className="px-6 py-4 text-center text-[15px] text-gray-600">
                    {product.duration || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-center text-[15px] text-gray-600">
                    {product.category || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-center text-[15px] text-gray-600">
                    0
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-green-100 text-green-600 text-xs text-center font-medium px-3 py-1 rounded-full">
                      {product.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link
                      href={`/dashboard/our-products/${product.id}`}
                      className="flex justify-center w-max items-center mx-auto text-center space-x-1 px-3 py-1 rounded-full bg-blue-600 bg-opacity-25 text-blue-600 text-xs"
                    >
                      <span>See Details</span>
                      <Icon icon="mdi:chevron-down" className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded-md mx-1"
        >
          Previous
        </button>
        <span className="mx-2">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-md mx-1"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OurProducts;
