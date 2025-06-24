import Box from '@mui/material/Box'
import AppBar from '~/components/AppBar/AppBar'
import theme from '~/theme'
import TabCal from './Item/TabCal'
import ChoiceCal from './Item/ChoiceCal'
import ListCard from './Item/ListCard/ListCard'
import { useState } from 'react'

const CaloCalculatorLayout = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box>
      <AppBar />
      <Box
        sx={{
          mt: theme.fitbowl.appBarHeight,
          backgroundColor: theme.colorSchemes.light.palette.background.default,
          minHeight: '100vh',
          px: { xs: 1, sm: 2, md: 4 },
          py: { xs: 1, sm: 2, md: 3 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 2, md: 4 },
            alignItems: 'flex-start',
            maxWidth: 1440,
            mx: 'auto',
            width: '100%',
          }}
        >
          {/* Content + Grid */}
          <Box
            sx={{
              flex: 2,
              minWidth: 0,
              width: '100%',
              maxWidth: { xs: '100%', md: 900 },
              mx: 'auto',
              mb: { xs: 3, md: 0 },
            }}
          >
            {/* TabCal sticky trên desktop, scroll trên mobile */}
            <Box
              sx={{
                position: { xs: 'static', md: 'sticky' },
                top: { md: theme.fitbowl.appBarHeight },
                zIndex: 10,
                my: { xs: 2, md: 3 },
                mx: 'auto',
                width: '100%',
                maxWidth: 600,
                minWidth: 0,
                p: { xs: 1, md: 2 },
                boxShadow: 'none',
                background: 'transparent',
              }}
            >
              <TabCal />
            </Box>
            {/* Grid món ăn */}
            <Box>
              <ListCard title="CHỌN LOẠI ĐẠM" index={1}/>
              <ListCard title="CHỌN LOẠI ĐẠM" index={2}/>
              <ListCard title="CHỌN LOẠI ĐẠM" index={3}/>
              <ListCard title="CHỌN LOẠI ĐẠM" index={4}/>
            </Box>

            {/* Nút xem thực đơn */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 2, md: 3 } }}>
              <button
                style={{
                  background: '#2ecc9b',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 24px',
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: 'pointer',
                  width: '100%',
                  maxWidth: 220,
                  boxShadow: '0 2px 12px 0 rgba(46,204,155,0.10)',
                  transition: 'box-shadow 0.2s',
                }}
              >
                See Menu
              </button>
            </Box>
          </Box>
          {/* Sidebar ChoiceCal */}
          <Box
            sx={{
              position: { xs: 'static', md: 'sticky' },
              top: { xs: 0, md: theme.fitbowl.appBarHeight },
              height: { xs: 'auto', md: '82vh' },
              minWidth: { xs: '100%', md: 320 },
              maxWidth: { xs: '100%', md: 340 },
              flex: 1,
              borderRadius: { xs: 0, md: 4 },
              p: { xs: 0, md: 2 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              overflowY: { xs: 'visible', md: 'auto' },
              background: { xs: 'transparent', md: theme.colorSchemes.light.palette.background.default },
            }}
          >
            <ChoiceCal />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default CaloCalculatorLayout