import Box from '@mui/material/Box'
import AppBar from '~/components/AppBar/AppBar'
import theme from '~/theme'
import TabCal from './Item/TabCal'
import ChoiceCal from './Item/ChoiceCal'
import ListCard from './Item/ListCard/ListCard'
import { useState, useRef } from 'react'
import Footer from '~/components/Footer/Footer'

const CaloCalculatorLayout = () => {
  const [value, setValue] = useState(0)

  const proteinRef = useRef(null)
  const carbsRef = useRef(null)
  const sideRef = useRef(null)
  const sauceRef = useRef(null)

  const handleChange = (event, newValue) => {
    setValue(newValue)
    const refs = [proteinRef, carbsRef, sideRef, sauceRef]
    setTimeout(() => {
      refs[newValue]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 40)
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
          py: { xs: 1, sm: 2, md: 3 }
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
            width: '100%'
          }}
        >
          <Box
            sx={{
              flex: 2,
              minWidth: 0,
              width: '100%',
              maxWidth: { xs: '100%', md: 900 },
              mx: 'auto',
              mb: { xs: 3, md: 0 }
            }}
          >
            <Box
              sx={{
                position: { xs: 'static', md: 'sticky' },
                top: { md: theme.fitbowl.appBarHeight },
                zIndex: 10,
                my: { xs: 2, md: 3 },
                mx: 'auto',
                width: '100%',
                maxWidth: 540,
                minWidth: 0,
                p: { xs: 1, md: 2 },
                boxShadow: 'none',
                background: 'transparent'
              }}
            >
              <TabCal value={value} handleChange={handleChange} />
            </Box>
            <Box sx={{ mx: '15px' }}>
              <Box ref={proteinRef} sx={{ scrollMarginTop: `calc(${theme.fitbowl.appBarHeight} + 40px)` }}>
                <ListCard title="SELECT PROTEIN" index={1} />
              </Box>
              <Box ref={carbsRef} sx={{ scrollMarginTop: `calc(${theme.fitbowl.appBarHeight} + 40px)` }}>
                <ListCard title="SELECT CARBS" index={2} />
              </Box>
              <Box ref={sideRef} sx={{ scrollMarginTop: `calc(${theme.fitbowl.appBarHeight} + 40px)` }}>
                <ListCard title="SELECT SIDE" index={3} />
              </Box>
              <Box ref={sauceRef} sx={{ scrollMarginTop: `calc(${theme.fitbowl.appBarHeight} + 40px)` }}>
                <ListCard title="SELECT SAUCE" index={4} />
              </Box>
            </Box>

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
                  transition: 'box-shadow 0.2s'
                }}
              >
                See Menu
              </button>
            </Box>
          </Box>
          <Box
            sx={{
              position: { xs: 'static', md: 'sticky' },
              top: { xs: 0, md: theme.fitbowl.appBarHeight },
              height: { xs: 'auto', md: '82vh' },
              minWidth: { xs: '100%', md: '30%' },
              maxWidth: { xs: '100%', md: '30%' },
              flex: 1,
              borderRadius: { xs: 0, md: 4 },
              p: { xs: 0, md: 2 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              overflowY: { xs: 'visible', md: 'auto' },
              background: { xs: 'transparent', md: theme.colorSchemes.light.palette.background.default }
            }}
          >
            <ChoiceCal />
          </Box>
        </Box>
      </Box>
      <Footer/>
    </Box>
  )
}

export default CaloCalculatorLayout