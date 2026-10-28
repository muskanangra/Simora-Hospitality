import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import './styles/animations.css'
import { isIntroPlayed } from './utils/introState.js'

// Set data-intro attribute BEFORE React renders to avoid flash
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (window.location.pathname === '/' && !window.location.hash && !prefersReduced && !isIntroPlayed()) {
  document.documentElement.dataset.intro = 'loading'
} else {
  document.documentElement.dataset.intro = 'done'
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
