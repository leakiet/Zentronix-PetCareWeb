import { useState } from 'react'
// import Footer from './components/Footer/Footer'
import BlogLayout from './pages/customer/Blogs/BlogLayout'
import HomeLayout from './pages/customer/Home/HomeLayout'
import { Routes, Route } from 'react-router-dom'
import BlogDetail from './pages/customer/Blogs/BlogDetail/BlogDetail'
import MenuLayout from './pages/customer/Menu/MenuLayout'
import MenuDetail from './pages/customer/Menu/MenuDetail/MenuDetail'
import AboutUs from './pages/customer/AboutUs/AboutUs'
import CaloCalculatorLayout from './pages/customer/CaloCalculator/CaloCalulatorLayout'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/blogs" element={<BlogLayout />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/menu" element={<MenuLayout />} />
        <Route path="/menu/:slug" element={<MenuDetail />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/calo-calculator" element={<CaloCalculatorLayout />} />
      </Routes>
      {/* <Footer /> */}
    </>
  )
}

export default App
