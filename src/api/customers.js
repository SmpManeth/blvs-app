import api from './api';

export const fetchCustomerProfile = async () => {
  const response = await api.get('/customer');
  return response.data;
};

export const fetchCustomerDocuments = async () => {
  const response = await api.get('/customer/documents');
  return response.data.documents;
};

export const fetchCustomerTrip = async () => {
  const response = await api.get('/customer/trip');
  return response.data.trip;
};
