import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

// Create new rating
export const createRating = async (ratingData) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/apis/v1/ratings`, ratingData)
  return response.data
}

// Get rating by ID
export const getRatingById = async (ratingId) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/apis/v1/ratings/${ratingId}`)
  return response.data
}

// Get ratings for a vet
export const getRatingsByVet = async (vetId, page = 0, size = 10) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/apis/v1/ratings/vet/${vetId}?page=${page}&size=${size}`)
  return response.data
}

// Get user's own ratings
export const getMyRatings = async (page = 0, size = 10) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/apis/v1/ratings/user/my-ratings?page=${page}&size=${size}`)
  return response.data
}

// Get vet rating statistics
export const getVetRatingStats = async (vetId) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/apis/v1/ratings/vet/${vetId}/stats`)
  return response.data
}

// Get top rated vets
export const getTopRatedVets = async (limit = 10) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/apis/v1/ratings/top-vets?limit=${limit}`)
  return response.data
}

// Check if user has rated an appointment
export const checkIfRated = async (appointmentId) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/apis/v1/ratings/appointment/${appointmentId}/check`)
  return response.data
}

// Update rating
export const updateRating = async (ratingId, ratingData) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/apis/v1/ratings/${ratingId}`, ratingData)
  return response.data
}

// Delete rating
export const deleteRating = async (ratingId) => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/apis/v1/ratings/${ratingId}`)
  return response.data
}
