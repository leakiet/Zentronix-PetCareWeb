import Box from '@mui/material/Box'
import AppBar from '~/components/AppBar/AppBar'
import theme from '~/theme'
import TabCal from './Item/TabCal'
import ChoiceCal from './Item/HealthyChoice/HealthyChoice'
import ListCard from './Item/ListCard/ListCard'
import { useState, useRef, useEffect } from 'react'
import Footer from '~/components/Footer/Footer'
import { ItemHealthy } from '~/apis/mockData'

const SmartMealLayout = () => {
  const [value, setValue] = useState(0)
  const itemHealthy = ItemHealthy
  const proteinRef = useRef(null)
  const carbsRef = useRef(null)
  const sideRef = useRef(null)
  const sauceRef = useRef(null)


  useEffect(() => {
    const handleScroll = () => {
      const refs = [proteinRef, carbsRef, sideRef, sauceRef]
      const offsets = refs.map(ref => {
        if (!ref.current) return Infinity
        return Math.abs(ref.current.getBoundingClientRect().top - (parseInt(theme.fitbowl.appBarHeight) + 80))
      })
      const minIndex = offsets.indexOf(Math.min(...offsets))
      if (minIndex !== value) setValue(minIndex)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [value])

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
          px: { xs: 1, sm: 2, md: 2 },
          py: { xs: 1, sm: 2, md: 3 }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 2, md: 4 },
            alignItems: 'flex-start',
            maxWidth: '90vw',
            mx: 'auto',
            width: '100%'
          }}
        >
          <Box
            sx={{
              flex: 2,
              minWidth: 0,
              width: '100%',
              maxWidth: { xs: '100%', md: '90vw' },
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
              <Box ref={proteinRef} sx={{ scrollMarginTop: `calc(${theme.fitbowl.appBarHeight} + 80px)` }}>
                <ListCard title="SELECT PROTEIN" index={1} type="protein" cards={itemHealthy?.protein} />
              </Box>
              <Box ref={carbsRef} sx={{ scrollMarginTop: `calc(${theme.fitbowl.appBarHeight} + 80px)` }}>
                <ListCard title="SELECT CARBS" index={2} type="carbs" cards={itemHealthy?.carbs} />
              </Box>
              <Box ref={sideRef} sx={{ scrollMarginTop: `calc(${theme.fitbowl.appBarHeight} + 80px)` }}>
                <ListCard title="SELECT SIDE" index={3} type="side" cards={itemHealthy?.side} />
              </Box>
              <Box ref={sauceRef} sx={{ scrollMarginTop: `calc(${theme.fitbowl.appBarHeight} + 80px)` }}>
                <ListCard title="SELECT SAUCE" index={4} type="sauce" cards={itemHealthy?.sauce} />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 2, md: 3 } }}>
              <Box sx={{
                py: 1,
                px: 4,
                borderRadius: 5,
                maxWidth: 'fit-content',
                cursor: 'pointer',
                color: 'white',
                bgcolor: theme.palette.primary.secondary,
                fontWeight: 400,
                fontSize: '1rem',
                '&:hover': {
                  bgcolor: 'rgba(0, 99, 76, 0.8)'
                }
              }}>
                Suggest Foods
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              position: { xs: 'static', md: 'sticky' },
              top: { xs: 0, md: theme.fitbowl.appBarHeight },
              height: { xs: 'auto', md: '85vh' },
              minWidth: { xs: '100%', md: '40%' },
              maxWidth: { xs: '100%', md: '40%' },
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
      <Footer />
    </Box>
  )
}

export default SmartMealLayout