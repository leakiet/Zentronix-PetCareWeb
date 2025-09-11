import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

//token
export const refreshTokenEmployeeAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/apis/v1/Employees/RefreshToken`)
  return response.data
}

export const refreshTokenCustomerAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/apis/v1/Customers/RefreshToken`)
  return response.data
}

export const resetPasswordAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/apis/v1/auth/resetPassword`, data)
  return response.data
}

export const changePasswordAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/apis/v1/customers/updatePassword`, data)
  return response.data
}

export const unlinkGoogleAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/apis/v1/customers/unlinkGoogle`, data)
  return response.data
}

export const linkGoogleAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/apis/v1/customers/linkGoogle`, data)
  return response.data
}

export const verifyOtpCodeAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/apis/v1/auth/verifyOtpCode`, data)
  return response.data
}

export const sendOtpCodeAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/apis/v1/auth/sendOtpCode`, data)
  return response.data
}

export const registerCustomerAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/apis/v1/auth/register`, data)
  return response.data
}

export const verifyCustomerAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/apis/v1/auth/verify`, data)
  return response.data
}

export const resendVerifyEmailApi = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/apis/v1/auth/resend-verifyEmail`, data)
  return response.data
}

//Customer
export const fetchCustomerDetails = async (email) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/apis/v1/customers/email/${email}`)
  return response.data
}

export const updateCustomerInfo = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/apis/v1/customers/update`, data)
  return response.data
}

export const updateCustomerPassword = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/apis/v1/customers/updatePassword`, data)
  return response.data
}



// Address
export const createNewAddressAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/apis/v1/addresses/create`, data)
  return response.data
}

export const updateAddressAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/apis/v1/addresses/update`, data)
  return response.data
}

export const deleteAddressAPI = async (id) => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/apis/v1/addresses/delete/${id}`)
  return response.data
}


// Products
export const fetchProductsAPI = async (params) => {
  let url = `${API_ROOT}/apis/v1/products?page=${params.page || 0}&size=${params.size || 10}`
  if (params.searchTerm) url += `&searchTerm=${encodeURIComponent(params.searchTerm)}`
  if (params.categoryIds && params.categoryIds.length > 0) url += `&categoryIds=${encodeURIComponent(params.categoryIds.join(','))}`
  if (params.brandIds && params.brandIds.length > 0) url += `&brandIds=${encodeURIComponent(params.brandIds.join(','))}`
  if (params.minPrice !== undefined) url += `&minPrice=${encodeURIComponent(params.minPrice)}`
  if (params.maxPrice !== undefined) url += `&maxPrice=${encodeURIComponent(params.maxPrice)}`
  if (params.sortBy) url += `&sortBy=${encodeURIComponent(params.sortBy)}`
  if (params.sortDir) url += `&sortDir=${encodeURIComponent(params.sortDir)}`
  const response = await authorizedAxiosInstance.get(url)
  return response.data
}

export const fetchCategoriesAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/apis/v1/products/categories`)
  return response.data
}

export const fetchBrandsAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/apis/v1/products/brands`)
  return response.data
}