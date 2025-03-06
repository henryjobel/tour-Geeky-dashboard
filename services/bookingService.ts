import axiosInstance from "@/axiosInstance";
import { ApiBaseMysql } from "@/Helper/ApiBase";

export const fetchBookings = async (
  page: number = 1,
  search: string = "",
  statusFilter: string = ""
): Promise<{
  bookings: IBooking[];
  totalPages: number;
  nextPage: string | null;
  prevPage: string | null;
}> => {
  try {
    const response = await axiosInstance.get<ApiResponse<IBooking>>(
      `${ApiBaseMysql}/shop/bookings/`,
      {
        params: {
          page,
          search,
          status: statusFilter,
        },
      }
    );

    const totalPages = Math.ceil(response.data.data.count / 10);

    return {
      bookings: response.data.data.results,
      totalPages,
      nextPage: response.data.data.next,
      prevPage: response.data.data.previous,
    };
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const fetchBookingDetails = async (id: string): Promise<IBooking> => {
  try {
    const response = await axiosInstance.get<any>(
      `${ApiBaseMysql}/shop/bookings/${id}/`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching booking details:", error);
    throw new Error("Failed to fetch booking details.");
  }
};

export const updateBookingDetails = async (
  id: string,
  formData: FormData
) => {
  try {
    const response = await axiosInstance.patch(
      `${ApiBaseMysql}/shop/bookings/${id}/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error)
    throw new Error("An error occurred while updating user.");
  }
};
