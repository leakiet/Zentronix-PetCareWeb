import { useSelector } from 'react-redux'
import { selectCurrentCustomer } from '~/redux/user/customerSlice'
import { USER_ROLE } from '~/utils/constants'
import Profile from './PetOwnerSettings/PetOwnerSettings'
import VetSettings from './VetSettings/VetSettings'
import ShelterSettings from './ShelterSettings/ShelterSettings'
import { Navigate } from 'react-router-dom'

function RoleBasedProfileRouter() {
  const currentCustomer = useSelector(selectCurrentCustomer)

  // If no user is logged in, redirect to login
  if (!currentCustomer) {
    return <Navigate to="/login" replace />
  }

  // Route based on user role
  switch (currentCustomer.role) {
  case USER_ROLE.PET_OWNER:
    return <Profile />
  case USER_ROLE.VET:
    return <VetSettings />
  case USER_ROLE.SHELTER:
    return <ShelterSettings />
  default:
    // Default to regular profile for unknown roles
    return <Profile />
  }
}

export default RoleBasedProfileRouter
