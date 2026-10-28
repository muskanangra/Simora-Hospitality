// App.jsx — Root component. Sets up BrowserRouter and all application routes.
// Routes: "/" → HomePage, "/bedres-kitchen" → BedresKitchenPage, "/umami" → UmamiPage
// All other paths redirect to "/".
// All pages share the Layout (TopNav + page content + Footer) via Outlet.

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import BedresKitchenPage from './pages/BedresKitchenPage.jsx'
import UmamiPage from './pages/UmamiPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="bedres-kitchen" element={<BedresKitchenPage />} />
          <Route path="umami" element={<UmamiPage />} />
          {/* Redirect any unmatched path back to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
