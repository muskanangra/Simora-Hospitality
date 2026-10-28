// Layout.jsx — Shared site layout wrapping all pages.
// Renders TopNav → page content (Outlet) → Footer.
// ScrollManager ensures smooth navigation and anchor scrolling.

import { Outlet } from 'react-router-dom'
import TopNav from './TopNav.jsx'
import Footer from './Footer.jsx'
import ScrollManager from './ScrollManager.jsx'

function Layout() {
  return (
    <>
      {/* Handles smooth scroll to hash targets on every route change */}
      <ScrollManager />

      {/* Fixed top navigation bar */}
      <TopNav />

      {/* Current page content rendered here */}
      <Outlet />

      {/* Shared footer */}
      <Footer />
    </>
  )
}

export default Layout
