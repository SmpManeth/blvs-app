import api from "./api";

export const fetchCustomerProfile = async () => {
  const response = await api.get("/user");
  return response.data;
};

export const fetchCustomerDocuments = async () => {
  const response = await api.get("/customer/documents");
  return response.data.documents;
};

export const fetchCustomerTrip = async () => {
  const response = await api.get("/customer/trip");
  return response.data.trip;
};

export async function fetchCustomerDocumentsbyType(documentType) {
  try {
    const response = await api.get(`/customer/documents?type=${documentType}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Doc Fetch Failed. Please try again."
    );
  }
}
