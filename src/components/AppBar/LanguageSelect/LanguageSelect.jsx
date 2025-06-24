import { useState } from 'react'
import LanguageIcon from '@mui/icons-material/Language'
import en from '~/assets/Language/english.png'
import vi from '~/assets/Language/vietnam.png'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentLanguage, updateCurrentLanguage } from '~/redux/translations/translationsSlice'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import i18n from '~/customLibraries/i18n'
const LanguageSelect = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const dispatch = useDispatch()
  const currentLanguageCode = useSelector(selectCurrentLanguage)
  const languages = [
    { code: 'en', name: 'EN', icon: en },
    { code: 'vi', name: 'VI', icon: vi }
  ]

  const currentLanguage = languages.find((lang) => lang.code === currentLanguageCode) || languages[1]

  const handleSwitchLanguage = () => {
    const newLanguage = currentLanguageCode === 'en' ? 'vi' : 'en'
    dispatch(updateCurrentLanguage(newLanguage))
    i18n.changeLanguage(newLanguage)
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          border: '1px solid #4C082A',
          borderRadius: '50px',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          '&:hover': { backgroundColor: (theme) => theme.palette.action.hover }

        }}
        onClick={handleSwitchLanguage}
      >
        <LanguageIcon fontSize="small" sx={{ color: (theme) => theme.palette.text.primary }} />
        <Typography sx={{ color: (theme) => theme.palette.text.primary }}>
          {currentLanguage.name}
        </Typography>
      </Box>
    </Box>
  )
}

export default LanguageSelect