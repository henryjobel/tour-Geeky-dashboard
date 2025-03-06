import axios from "axios";
import Cookies from "js-cookie";
import { ApiBaseMysql } from "@/Helper/ApiBase";
import axiosInstance from "@/axiosInstance";

const token = Cookies.get("access_token");

const createProductFormData = (productData: any) => {
  const formData = new FormData();

  Object.entries(productData).forEach(([key, value]: any) => {
    if (key === "images" && Array.isArray(value)) {
      value.forEach((image) => {
        if (image.file instanceof File) {
          formData.append("images", image.file);
        }
      });
    } else if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
    } else if (value !== null && typeof value === "object") {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value);
    }
  });

  return formData;
};

export const submitProduct = async (productData: any) => {
  try {
    const formData = createProductFormData(productData);

    const response = await axios.post(
      `${ApiBaseMysql}/shop/products/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: "Failed to submit product" };
    }
  } catch (error: any) {
    console.error("Error submitting product:", error);
    return {
      success: false,
      message: error?.response?.data || "Error submitting product",
    };
  }
};

export const submitOption = async (productData: any) => {
  try {
    const response = await axiosInstance.post(
      `${ApiBaseMysql}/shop/options/`,
      productData
    );

    if (response.status === 200 || response.status === 201) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: "Failed to submit product" };
    }
  } catch (error: any) {
    console.error("Error submitting product:", error);
    return {
      success: false,
      message: error?.response?.data || "Error submitting product",
    };
  }
};

export const fetchOptions = async (): Promise<IOption[]> => {
  try {
    const response = await axios.get(`${ApiBaseMysql}/shop/options/`);
    console.log(response,"response");
    return response.data.data;
  } catch (error) {
    return [];
  }
};

export const fetchProducts = async (
  searchQuery: string,
  filters: Record<string, string>,
  ordering: string,
  page: number,
  pageSize: number
): Promise<{ products: Product[]; totalPages: number }> => {
  try {
    const response = await axios.get(`${ApiBaseMysql}/shop/products/`, {
      params: {
        search: searchQuery,
        ...filters,
        ordering,
        page,
        page_size: pageSize,
      },
    });

    const totalPages = Math.ceil(response.data.data.count / pageSize);

    return {
      products: response.data.data.results,
      totalPages,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
