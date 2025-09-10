import { Box, Typography, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Drawer, IconButton, Checkbox, FormGroup, FormControlLabel, Collapse, Slider, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import AppBar from '~/components/AppBar/AppBar'
import theme from '~/theme'
import MenuList from './MenuList/MenuList'
import Footer from '~/components/Footer/Footer'
import FilterListIcon from '@mui/icons-material/FilterList'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { fetchCategoriesAPI, fetchBrandsAPI, fetchProductsAPI } from '~/apis'

function MenuLayout() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [sortOrder, setSortOrder] = useState('asc')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(true)
  const [isBrandExpanded, setIsBrandExpanded] = useState(true)
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  const fetchProducts = async (page = 0, append = false) => {
    const params = {
      searchTerm: searchTerm || undefined,
      categoryIds: selectedCategories.length > 0 ? selectedCategories : undefined,
      brandIds: selectedBrands.length > 0 ? selectedBrands : undefined,
      minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
      maxPrice: priceRange[1] < 1000000 ? priceRange[1] : undefined,
      page,
      size: 12,
      sortBy: 'price',
      sortDir: sortOrder
    }
    const response = await fetchProductsAPI(params)
    if (append) {
      setProducts(prev => [...prev, ...response.content])
    } else {
      setProducts(response.content)
    }
    setHasMore(!response.last)
    setCurrentPage(page)
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const categoriesData = await fetchCategoriesAPI()
        setCategories(categoriesData)
        const brandsData = await fetchBrandsAPI()
        setBrands(brandsData)
        await fetchProducts(0, false)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [searchTerm, selectedCategories, selectedBrands, priceRange, sortOrder])

  const loadMore = async () => {
    if (!hasMore || loadingMore) return
    setLoadingMore(true)
    try {
      await fetchProducts(currentPage + 1, true)
    } catch (error) {
      console.error('Error loading more:', error)
    } finally {
      setLoadingMore(false)
    }
  }

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setDrawerOpen(open)
  }

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target
    if (checked) {
      setSelectedCategories(prev => [...prev, Number(value)])
    } else {
      setSelectedCategories(prev => prev.filter(id => id !== Number(value)))
    }
  }

  const handleBrandChange = (event) => {
    const { value, checked } = event.target
    if (checked) {
      setSelectedBrands(prev => [...prev, Number(value)])
    } else {
      setSelectedBrands(prev => prev.filter(id => id !== Number(value)))
    }
  }

  const filterContent = (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.primary }}>
        Filter & Sort
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Search by name"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1, color: theme.palette.text.primary, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} onClick={() => setIsCategoryExpanded(!isCategoryExpanded)}>
          Category
          {isCategoryExpanded ? <ExpandLess /> : <ExpandMore />}
        </Typography>
        <Collapse in={isCategoryExpanded} sx={{ maxHeight: '300px', overflowY: 'auto' }}>
          <FormGroup>
            {categories.map((category) => (
              <FormControlLabel
                key={category.id}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category.id)}
                    onChange={handleCategoryChange}
                    value={category.id}
                  />
                }
                label={category.name}
              />
            ))}
          </FormGroup>
        </Collapse>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1, color: theme.palette.text.primary, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} onClick={() => setIsBrandExpanded(!isBrandExpanded)}>
          Brand
          {isBrandExpanded ? <ExpandLess /> : <ExpandMore />}
        </Typography>
        <Collapse in={isBrandExpanded} sx={{ maxHeight: '300px', overflowY: 'auto' }}>
          <FormGroup>
            {brands.map((brand) => (
              <FormControlLabel
                key={brand.id}
                control={
                  <Checkbox
                    checked={selectedBrands.includes(brand.id)}
                    onChange={handleBrandChange}
                    value={brand.id}
                  />
                }
                label={brand.name}
              />
            ))}
          </FormGroup>
        </Collapse>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1, color: theme.palette.text.primary }}>
          Price Range
        </Typography>
        <Slider
          value={priceRange}
          onChange={(event, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={1000000}
          step={10000}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: 2, mx: 3 }}>
          <TextField
            label="Min Price"
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            inputProps={{ min: 0, max: 1000000 }}
          />
          <TextField
            label="Max Price"
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            inputProps={{ min: 0, max: 1000000 }}
          />
        </Box>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, color: theme.palette.text.primary, minHeight: '100vh', fontFamily: '"Poppins", sans-serif' }}>
      <AppBar />
      <Box sx={{ maxWidth: '1380px', mx: 'auto', px: 2, py: 6, mt: theme.fitbowl.appBarHeight }}>
        <Typography
          variant="h1"
          align="center"
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem' },
            fontWeight: 300,
            letterSpacing: '0.1em',
            mb: 2,
            color: theme.palette.text.primary
          }}
        >
          Choose <span style={{ fontWeight: 800, color: theme.palette.primary.secondary }}>PET PRODUCTS</span>
        </Typography>
        <Box sx={{ width: '6rem', height: '0.4rem', bgcolor: theme.palette.primary.secondary, mx: 'auto', mb: 8 }} />
        <Typography
          variant="body1"
          align="center"
          sx={{ maxWidth: '48rem', mx: 'auto', mb: 10, fontSize: { xs: '1rem', md: '1.15rem' }, color: theme.palette.text.textSub }}
        >
          Fur Shield provides many pet products to meet your needs
        </Typography>


        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 3 }} sx={{ display: { xs: 'none', md: 'block' }, position: 'sticky', top: 100, minHeight: 'calc(100vh - 200px)' }}>
            {filterContent}
          </Grid>

          <Grid item size={{ xs: 12, md: 9 }}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box sx={{ display: { xs: 'flex', md: 'none' }, mb: 2 }}>
                  <IconButton onClick={toggleDrawer(true)} sx={{ color: theme.palette.primary.main }}>
                    <FilterListIcon fontSize='large' />
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'flex-end', width: '100%' }}>
                  <FormControl>
                    <InputLabel>Sort to</InputLabel>
                    <Select
                      value={sortOrder}
                      label="Sort to"
                      onChange={(e) => setSortOrder(e.target.value)}
                    >
                      <MenuItem value="asc">Price (Low to High)</MenuItem>
                      <MenuItem value="desc">Price (High to Low)</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              {loading ? (
                <Typography variant="h6" align="center" sx={{ mt: 4, color: theme.palette.text.primary }}>
                  Loading...
                </Typography>
              ) : products.length === 0 ? (
                <Typography variant="h6" align="center" sx={{ mt: 4, color: theme.palette.text.primary }}>
                  No products found.
                </Typography>
              ) : (
                <>
                  <MenuList pkg={products} />
                  {hasMore && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                      <Button
                        variant="contained"
                        onClick={loadMore}
                        disabled={loadingMore}
                        sx={{ bgcolor: theme.palette.primary.main, color: 'white' }}
                      >
                        {loadingMore ? 'Loading...' : 'Xem thêm'}
                      </Button>
                    </Box>
                  )}
                </>
              )}
            </Box>
          </Grid>
        </Grid>

        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          {filterContent}
        </Drawer>
      </Box>
      <Footer />
    </Box>
  )
}

export default MenuLayout