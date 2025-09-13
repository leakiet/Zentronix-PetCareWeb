import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
import { toast } from 'react-toastify'
//khởi tạo gía trị state của 1 cái slice trong redux
const initialState = {
  currentCustomer: null
}

//Các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào redux, dùng middleware CreateAsyncThunk đi kèm với extraReducers
export const loginCustomerApi = createAsyncThunk(
  'customer/loginCustomerApi',
  async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/apis/v1/auth/login`, data)
    return response.data
  }
)

export const googleLoginAPI = createAsyncThunk(
  'customer/googleLoginAPI',
  async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/apis/v1/auth/google-login`, data)
    return response.data
  }
)

export const logoutCustomerApi = createAsyncThunk(
  'customer/logoutCustomerApi',
  async (showSuccessMessage = true) => {
    const response = await authorizedAxiosInstance.delete(`${API_ROOT}/apis/v1/auth/logout`)
    if (showSuccessMessage) {
      toast.success('Logout successfully')
    }
    return response.data
  }
)

export const updateCustomerApi = createAsyncThunk(
  'customer/updateCustomerApi',
  async (data) => {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/apis/v1/users/update`, data)
    return response.data
  }
)

//tạo ra 1 slice trong redux store
export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  //extraReducers: nơi xử lí dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    //account
    builder.addCase(loginCustomerApi.fulfilled, (state, action) => {
      //action.payload là dữ liệu trả về từ axios call api
      const customer = action.payload
      state.currentCustomer = customer
    })
    builder.addCase(googleLoginAPI.fulfilled, (state, action) => {
      const customer = action.payload
      state.currentCustomer = customer
    })
    builder.addCase(logoutCustomerApi.fulfilled, (state) => {
      state.currentCustomer = null
    })
    builder.addCase(updateCustomerApi.fulfilled, (state, action) => {
      const updatedCustomer = action.payload
      //update lại dữ liệu của currentUser
      state.currentCustomer.role = updatedCustomer.role || state.currentCustomer.role
      state.currentCustomer.firstName = updatedCustomer.firstName || state.currentCustomer.firstName
      state.currentCustomer.lastName = updatedCustomer.lastName || state.currentCustomer.lastName
      state.currentCustomer.phone = updatedCustomer.phone || state.currentCustomer.phone
      state.currentCustomer.companyName = updatedCustomer.companyName || state.currentCustomer.companyName
      state.currentCustomer.street = updatedCustomer.address.street || state.currentCustomer.street
      state.currentCustomer.ward = updatedCustomer.address.ward || state.currentCustomer.ward
      state.currentCustomer.city = updatedCustomer.address.city || state.currentCustomer.city
      state.currentCustomer.latitude = updatedCustomer.address.latitude || state.currentCustomer.latitude
      state.currentCustomer.longitude = updatedCustomer.address.longitude || state.currentCustomer.longitude
    })
  }
})

// export const { } = userSlice.actions

//selector: là nơi cho các component lấy dữ liệu từ redux store
export const selectCurrentCustomer = (state) => {
  return state.customer.currentCustomer
}

//selectIsCustomerLoggedIn: là 1 hàm selector giúp cho các component biết xem người dùng có đang đăng nhập hay không
export const selectIsCustomerLoggedIn = (state) => !!state.customer.currentCustomer
//selectCustomerName: là 1 hàm selector giúp cho các component biết tên của người dùng
//nếu người dùng chưa đăng nhập (currentCustomer === null) thì sẽ trả về chuỗi 'Guest'
export const selectCustomerName = (state) => state.customer.currentCustomer?.name || 'Guest'
export const customerReducer = customerSlice.reducer
