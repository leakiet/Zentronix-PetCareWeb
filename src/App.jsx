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
import Auth from './pages/customer/Auth/Auth'
import AccountVerification from './pages/customer/Auth/AccountVerification'
import NotFound from './pages/customer/NotFound/NotFound'
import Chat from './pages/Employee/Chat/Chat'
function App() {

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

        {/* Authentication */}
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/verify-email" element={<AccountVerification /> }/>

        {/* Employee Chat */}
        <Route path="/chat-employee" element={<Chat />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound /> }/>
      </Routes>
      {/* <Footer /> */}
    </>
  )
}

export default App
