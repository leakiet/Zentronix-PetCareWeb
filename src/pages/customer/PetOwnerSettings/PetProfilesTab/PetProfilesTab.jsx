import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import {
  fetchHealthRecordsByPetIdAPI,
  fetchPetVaccinationsByPetIdAPI,
  createPetAPI,
  updatePetAPI,
  updatePetImageAPI,
  createPetVaccinationAPI,
  updatePetVaccinationAPI,
  deletePetVaccinationAPI,
  createHealthRecordAPI,
  updateHealthRecordAPI,
  deleteHealthRecordAPI,
  deletePetAPI,
  fetchBreedsAPI,
  fetPetsByCustomerId,
  fetchDocumentsByPetIdAPI
} from '~/apis'
import PetList from './PetList'
import PetDialog from './PetDialog'
import VaccinationDialog from './VaccinationDialog'
import HealthRecordDialog from './HealthRecordDialog'
import HealthDialog from './HealthDialog'
import ConfirmModal from '~/components/Modals/ComfirmModal/ComfirmModal'

function PetProfilesTab({
  pets: initialPets = [],
  documents: initialDocuments = [],
  insurancePolicies = [],
  breeds: initialBreeds = [],
  currentCustomer
}) {
  const [pets, setPets] = useState(initialPets)
  const [documents, setDocuments] = useState(initialDocuments)
  const [breeds, setBreeds] = useState(initialBreeds)
  const [selectedPet, setSelectedPet] = useState(null)
  const [healthDialogOpen, setHealthDialogOpen] = useState(false)
  const [dialogTab, setDialogTab] = useState(0)

  // New states for dialogs
  const [petDialogOpen, setPetDialogOpen] = useState(false)
  const [vaccinationDialogOpen, setVaccinationDialogOpen] = useState(false)
  const [selectedPetForVaccination, setSelectedPetForVaccination] = useState(null)
  const [petVaccinations, setPetVaccinations] = useState([])
  const [petHealthRecords, setPetHealthRecords] = useState([])

  // Form states for Health Record Dialog
  const [healthRecordDialogOpen, setHealthRecordDialogOpen] = useState(false)
  const [selectedHealthRecord, setSelectedHealthRecord] = useState(null)

  // Confirm Modal states
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [confirmAction, setConfirmAction] = useState(null)
  const [confirmTitle, setConfirmTitle] = useState('')
  const [confirmDescription, setConfirmDescription] = useState('')
  const [confirmBtnName, setConfirmBtnName] = useState('')

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch breeds
        const breedsData = await fetchBreedsAPI()
        setBreeds(breedsData)

        // Fetch pets
        if (currentCustomer) {
          const petsData = await fetPetsByCustomerId(currentCustomer.id)
          setPets(petsData)

          // Fetch documents for all pets
          const allDocuments = []
          for (const pet of petsData) {
            try {
              const petDocuments = await fetchDocumentsByPetIdAPI(pet.id)
              allDocuments.push(...petDocuments.map(doc => ({ ...doc, petId: pet.id })))
            } catch {
              // Silently handle individual pet document fetch failures
            }
          }
          setDocuments(allDocuments)
        }
      } catch {
        toast.error('Failed to load data. Please try again later.')
      }
    }

    fetchData()
  }, [currentCustomer])

  // Helper function to open confirm modal
  const openConfirmModal = (title, description, btnName, action) => {
    setConfirmTitle(title)
    setConfirmDescription(description)
    setConfirmBtnName(btnName)
    setConfirmAction(() => action)
    setConfirmModalOpen(true)
  }

  // Helper function to close confirm modal
  const closeConfirmModal = () => {
    setConfirmModalOpen(false)
    setConfirmAction(null)
    setConfirmTitle('')
    setConfirmDescription('')
    setConfirmBtnName('')
  }

  // Handler for confirm action
  const handleConfirmAction = async () => {
    if (confirmAction) {
      await confirmAction()
    }
    closeConfirmModal()
  }

  // Handler for opening pet dialog
  const handleOpenPetDialog = (pet = null) => {
    setSelectedPet(pet)
    setPetDialogOpen(true)
  }

  // Handler for opening health records dialog with fetch
  const handleViewHealthRecords = async (pet) => {
    setSelectedPet(pet)
    setDialogTab(0)
    try {
      const response = await fetchHealthRecordsByPetIdAPI(pet.id)
      setPetHealthRecords(response || [])
    } catch {
      // TODO: Handle error fetching health records
    }
    setHealthDialogOpen(true)
  }

  // Handler for opening vaccination dialog with fetch
  const handleAddVaccination = async (pet) => {
    setSelectedPetForVaccination(pet)
    try {
      const response = await fetchPetVaccinationsByPetIdAPI(pet.id)
      setPetVaccinations(response || [])
    } catch {
      // TODO: Handle error fetching vaccinations
    }
    setVaccinationDialogOpen(true)
  }

  // Handler for saving pet
  const handleSavePet = async (petData) => {
    const isUpdate = !!selectedPet
    const actionText = isUpdate ? 'update' : 'create'
    const petName = petData.petName || 'this pet'

    openConfirmModal(
      `${isUpdate ? 'Update' : 'Create'} Pet`,
      `Are you sure you want to ${actionText} ${petName}?`,
      isUpdate ? 'Update' : 'Create',
      async () => {
        try {
          if (selectedPet) {
            // Update existing pet
            const updatedPet = await updatePetAPI(selectedPet.id, petData)
            toast.success('Pet updated successfully!')

            // Update pet in local state
            setPets(prevPets => prevPets.map(pet =>
              pet.id === selectedPet.id ? { ...pet, ...updatedPet } : pet
            ))
          } else {
            // Create new pet - need userId from props or context
            const userId = currentCustomer?.id
            if (!userId) {
              toast.error('User not logged in. Please login first.')
              return
            }
            const newPet = await createPetAPI({ ...petData, userId })
            toast.success('Pet created successfully!')

            // Add new pet to local state
            setPets(prevPets => [...prevPets, newPet])
          }
        } catch {
          toast.error(selectedPet ? 'Failed to update pet. Please try again.' : 'Failed to create pet. Please try again.')
        }
      }
    )
  }

  // Handler for saving vaccination
  const handleSaveVaccination = async (vaccinationData, selectedVaccination) => {
    const isUpdate = !!selectedVaccination
    const actionText = isUpdate ? 'update' : 'create'

    openConfirmModal(
      `${isUpdate ? 'Update' : 'Create'} Vaccination`,
      `Are you sure you want to ${actionText} this vaccination record?`,
      isUpdate ? 'Update' : 'Create',
      async () => {
        try {
          if (selectedVaccination) {
            // Update existing vaccination
            await updatePetVaccinationAPI(selectedVaccination.id, vaccinationData)
            toast.success('Vaccination updated successfully!')
          } else {
            // Create new vaccination
            await createPetVaccinationAPI(vaccinationData)
            toast.success('Vaccination created successfully!')
          }

          // After successful save, refresh the vaccinations list
          const response = await fetchPetVaccinationsByPetIdAPI(selectedPetForVaccination.id)
          setPetVaccinations(response || [])
        } catch {
          toast.error(selectedVaccination ? 'Failed to update vaccination. Please try again.' : 'Failed to create vaccination. Please try again.')
        }
      }
    )
  }

  const handleOpenHealthRecordDialog = (record = null) => {
    if (record) {
      setSelectedHealthRecord(record)
    } else {
      setSelectedHealthRecord(null)
    }
    setHealthRecordDialogOpen(true)
  }

  // Handler for saving health record
  const handleSaveHealthRecord = async (recordData, selectedHealthRecord) => {
    const isUpdate = !!selectedHealthRecord
    const actionText = isUpdate ? 'update' : 'create'

    openConfirmModal(
      `${isUpdate ? 'Update' : 'Create'} Health Record`,
      `Are you sure you want to ${actionText} this health record?`,
      isUpdate ? 'Update' : 'Create',
      async () => {
        try {
          if (selectedHealthRecord) {
            // Update existing health record
            await updateHealthRecordAPI(selectedHealthRecord.id, {
              ...recordData,
              petId: selectedPet?.id
            })
            toast.success('Health record updated successfully!')
          } else {
            // Create new health record
            await createHealthRecordAPI({
              ...recordData,
              petId: selectedPet?.id
            })
            toast.success('Health record created successfully!')
          }

          // Refresh health records list
          const response = await fetchHealthRecordsByPetIdAPI(selectedPet.id)
          setPetHealthRecords(response || [])
        } catch {
          toast.error(selectedHealthRecord ? 'Failed to update health record. Please try again.' : 'Failed to create health record. Please try again.')
        }
      }
    )
  }

  // Handler for deleting health record
  const handleDeleteHealthRecord = (recordId) => {
    openConfirmModal(
      'Delete Health Record',
      'Are you sure you want to delete this health record? This action cannot be undone.',
      'Delete',
      async () => {
        try {
          await deleteHealthRecordAPI(recordId)
          toast.success('Health record deleted successfully!')

          // Refresh health records list
          const response = await fetchHealthRecordsByPetIdAPI(selectedPet.id)
          setPetHealthRecords(response || [])
        } catch {
          toast.error('Failed to delete health record. Please try again.')
        }
      }
    )
  }

  // Handler for deleting vaccination
  const handleDeleteVaccination = (vaccinationId) => {
    openConfirmModal(
      'Delete Vaccination',
      'Are you sure you want to delete this vaccination record? This action cannot be undone.',
      'Delete',
      async () => {
        try {
          await deletePetVaccinationAPI(vaccinationId)
          toast.success('Vaccination deleted successfully!')

          // Refresh vaccinations list
          const response = await fetchPetVaccinationsByPetIdAPI(selectedPetForVaccination.id)
          setPetVaccinations(response || [])
        } catch {
          toast.error('Failed to delete vaccination. Please try again.')
        }
      }
    )
  }

  // Handler for deleting pet
  const handleDeletePet = (petId) => {
    const pet = pets.find(p => p.id === petId)
    const petName = pet?.petName || 'this pet'

    openConfirmModal(
      'Delete Pet',
      `Are you sure you want to delete ${petName}? This action cannot be undone.`,
      'Delete',
      async () => {
        try {
          await deletePetAPI(petId)
          toast.success('Pet deleted successfully!')

          // Remove pet from local state
          setPets(prevPets => prevPets.filter(pet => pet.id !== petId))
        } catch {
          toast.error('Failed to delete pet. Please try again.')
        }
      }
    )
  }

  // Handler for document upload
  const handleDocumentUpload = (newDocument) => {
    setDocuments(prevDocuments => [...prevDocuments, { ...newDocument, petId: selectedPet?.id }])
  }

  // Handler for document delete
  const handleDocumentDelete = (documentId) => {
    setDocuments(prevDocuments => prevDocuments.filter(doc => doc.id !== documentId))
  }

  // Handler for updating pet photo
  const handleUpdatePetPhoto = async (petId, imageUrl) => {
    try {
      // Update pet with new image URL using the new dedicated endpoint
      await updatePetImageAPI(petId, imageUrl)
      toast.success('Pet photo updated successfully!')

      // Update pet in local state
      setPets(prevPets => prevPets.map(pet =>
        pet.id === petId ? { ...pet, image: imageUrl } : pet
      ))
    } catch {
      toast.error('Failed to update pet photo. Please try again.')
    }
  }

  return (
    <>
      <PetList
        pets={pets}
        onOpenPetDialog={handleOpenPetDialog}
        onViewHealthRecords={handleViewHealthRecords}
        onAddVaccination={handleAddVaccination}
        onDeletePet={handleDeletePet}
        onUpdatePetPhoto={handleUpdatePetPhoto}
        userId={currentCustomer?.id}
      />

      {/* Pet Dialog */}
      <PetDialog
        open={petDialogOpen}
        onClose={() => setPetDialogOpen(false)}
        selectedPet={selectedPet}
        breeds={breeds}
        onSave={handleSavePet}
      />

      {/* Vaccination Dialog */}
      <VaccinationDialog
        open={vaccinationDialogOpen}
        onClose={() => setVaccinationDialogOpen(false)}
        selectedPet={selectedPetForVaccination}
        vaccinations={petVaccinations}
        onSave={handleSaveVaccination}
        onDelete={handleDeleteVaccination}
      />

      {/* Health Dialog with Tabs */}
      <HealthDialog
        open={healthDialogOpen}
        onClose={() => setHealthDialogOpen(false)}
        selectedPet={selectedPet}
        dialogTab={dialogTab}
        onChangeTab={setDialogTab}
        healthRecords={petHealthRecords}
        documents={documents}
        insurancePolicies={insurancePolicies}
        onOpenHealthRecordDialog={handleOpenHealthRecordDialog}
        onDeleteHealthRecord={handleDeleteHealthRecord}
        onDocumentUpload={handleDocumentUpload}
        onDocumentDelete={handleDocumentDelete}
      />

      {/* Health Record Dialog */}
      <HealthRecordDialog
        open={healthRecordDialogOpen}
        onClose={() => setHealthRecordDialogOpen(false)}
        selectedRecord={selectedHealthRecord}
        onSave={handleSaveHealthRecord}
      />

      {/* Confirm Modal */}
      <ConfirmModal
        open={confirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleConfirmAction}
        title={confirmTitle}
        description={confirmDescription}
        btnName={confirmBtnName}
      />
    </>
  )
}

export default PetProfilesTab