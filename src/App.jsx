import HomeLayout from '~/pages/customer/Home/HomeLayout'
import { Routes, Route, Navigate } from 'react-router-dom'
import MenuLayout from './pages/customer/Menu/MenuLayout'
import MenuDetail from './pages/customer/Menu/MenuDetail/MenuDetail'
import ScheduleLayout from './pages/customer/Schedule/ScheduleLayout'
import AboutUs from './pages/customer/AboutUs/AboutUs'
import Contact from './pages/customer/Contact/Contact'
import FAQ from './pages/customer/FAQ/FAQ'
import Auth from './pages/customer/Auth/Auth'
import AccountVerification from './pages/customer/Auth/AccountVerification'
import NotFound from './pages/customer/NotFound/NotFound'
import Unauthorized from './pages/customer/Unauthorized/Unauthorized'
import VetSettings from './pages/customer/VetSettings/VetSettings'
import ShelterSettings from './pages/customer/ShelterSettings/ShelterSettings'
import Onboard from './pages/customer/Onboard/Onboard'
// import AppointmentFlow from './pages/customer/schedule/AppointmentForm'

import CartLayout from '~/pages/customer/Cart/CardLayout'
import AdoptionLayout from '~/pages/customer/Adoption/AdoptionLayout'
import { selectCurrentCustomer } from './redux/user/customerSlice'
import AdoptionDetail from '~/pages/customer/Adoption/AdoptionDetail'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { USER_ROLE } from './utils/constants'
import PetOwnerSettings from './pages/customer/PetOwnerSettings/PetOwnerSettings'
import ListAdoptionRequest from './pages/customer/ShelterSettings/ListAdoptionRequest'
import Checkout from './pages/customer/Checkout/Checkout'
import AdoptionRequestDetail from './pages/customer/ShelterSettings/AdoptionRequestDetail'
import CreateAdoptionListing from './pages/customer/ShelterSettings/CreateAdoptionListing'
import UpdateAdoptionListing from './pages/customer/ShelterSettings/UpdateAdoptionListing'
import VetManageLayout from './pages/customer/VetSettings/VetManageLayout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


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

const UndefinedRoute = ({ user }) => {
  if (!user) return <Navigate to='/login' replace={true} />
  if (user.role !== USER_ROLE.UNDEFINED) return <Navigate to='/' replace={true} />
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
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/cart" element={<CartLayout />} />
      <Route path="/adoption" element={<AdoptionLayout />} />
      <Route path="/adoption/:id" element={<AdoptionDetail />} />
      <Route path="/schedule" element={<ScheduleLayout />} />

      {/* <Route path="/appointment" element={<AppointmentFlow/>} /> */}

      {/* Authentication */}
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/reset-password" element={<Auth />} />
      <Route path="/verify-email" element={<AccountVerification />} />

      {/* pet owner Settings - Only for PET_OWNER */}
      <Route element={<PetOwnerRoute user={currentCustomer} />}>
        <Route path="/pet-owner-settings" element={<PetOwnerSettings />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>

      {/* Vet Settings - Only for VET */}
      <Route element={<VetRoute user={currentCustomer} />}>
        <Route path="/vet-settings" element={<VetSettings />} />
        <Route path="/vet-appointments" element={<VetManageLayout />} />
      </Route>

      {/* Shelter Settings - Only for SHELTER */}
      <Route element={<ShelterRoute user={currentCustomer} />}>
        <Route path="/shelter-settings" element={<ListAdoptionRequest />} />
        <Route path="/shelter-settings/:id" element={<AdoptionRequestDetail />} />
        <Route path="/shelter-profile/create" element={<CreateAdoptionListing />} />
        <Route path="/shelter-settings/edit/:id" element={<UpdateAdoptionListing />} />
      </Route>

      <Route element={<UndefinedRoute user={currentCustomer} />}>
        <Route path="/onboarding" element={<Onboard />} />
      </Route>

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />

      {/* Unauthorized Access */}
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  )
}

export default App
