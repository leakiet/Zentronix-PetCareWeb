import HomeLayout from '~/pages/customer/Home/HomeLayout'
import { Routes, Route, Navigate } from 'react-router-dom'
import MenuLayout from './pages/customer/Menu/MenuLayout'
import MenuDetail from './pages/customer/Menu/MenuDetail/MenuDetail'
import AboutUs from './pages/customer/AboutUs/AboutUs'
import Auth from './pages/customer/Auth/Auth'
import AccountVerification from './pages/customer/Auth/AccountVerification'
import NotFound from './pages/customer/NotFound/NotFound'
import Unauthorized from './pages/customer/Unauthorized/Unauthorized'
import Profile from './pages/customer/Profile/Profile'
import VetSettings from './pages/customer/VetSettings/VetSettings'
import ShelterSettings from './pages/customer/ShelterSettings/ShelterSettings'

import CartLayout from '~/pages/customer/Cart/CardLayout'
import { selectCurrentCustomer } from './redux/user/customerSlice'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { USER_ROLE } from './utils/constants'


const PetOwnerRoute = ({ user }) => {
  if (!user) return <Navigate to='/login' replace={true} />
  if (user.role !== USER_ROLE.PET_OWNER) return <Navigate to='/unauthorized' replace={true} />
  return <Outlet />
}

const VetRoute = ({ user }) => {
  if (!user) return <Navigate to='/login' replace={true} />
  if (user.role !== USER_ROLE.VET) return <Navigate to='/unauthorized' replace={true} />
  return <Outlet />
}

const ShelterRoute = ({ user }) => {
  if (!user) return <Navigate to='/login' replace={true} />
  if (user.role !== USER_ROLE.SHELTER) return <Navigate to='/unauthorized' replace={true} />
  return <Outlet />
}

function App() {
  const currentCustomer = useSelector(selectCurrentCustomer)

  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />
      <Route path="/menu" element={<MenuLayout />} />
      <Route path="/menu/:slug" element={<MenuDetail />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/cart" element={<CartLayout />} />

      {/* Authentication */}
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/reset-password" element={<Auth />} />
      <Route path="/verify-email" element={<AccountVerification />} />

      {/* Customer Profile - Only for PET_OWNER */}
      <Route element={<PetOwnerRoute user={currentCustomer} />}>
        <Route path="/profile" element={<Navigate to="/profile/overview" replace />} />
        <Route path="/profile/overview" element={<Profile />} />
        <Route path="/profile/account" element={<Profile />} />
        <Route path="/profile/appointment" element={<Profile />} />
        <Route path="/profile/order-history" element={<Profile />} />
        <Route path="/profile/pet-health-profile" element={<Profile />} />
      </Route>

      {/* Vet Settings - Only for VET */}
      <Route element={<VetRoute user={currentCustomer} />}>
        <Route path="/vet-settings" element={<VetSettings />} />
      </Route>

      {/* Shelter Settings - Only for SHELTER */}
      <Route element={<ShelterRoute user={currentCustomer} />}>
        <Route path="/shelter-settings" element={<ShelterSettings />} />
      </Route>

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />

      {/* Unauthorized Access */}
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>

  )
}

export default App
