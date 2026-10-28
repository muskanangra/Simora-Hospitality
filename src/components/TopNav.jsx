// TopNav.jsx — Fixed top navigation bar.
// Desktop: 3-column grid (Brand, Center Nav Links, Contact Pill).
// Mobile (<900px): Brand + "Menu"/"Close" text pill button opening dropdown.

import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import siteConfig from '../data/siteConfig.js'
import './TopNav.css'

const DROPDOWN_ID = 'mobile-menu-dropdown'

function TopNav() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)
  const location = useLocation()
  const { businessName, navLinks } = siteConfig

  // Close dropdown on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname, location.hash])

  // Close dropdown on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !buttonRef.current?.contains(e.target)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isOpen])

  const handleContactClick = (e) => {
    setIsOpen(false)
    const enquiries = document.getElementById('enquiries')
    if (enquiries) {
      e.preventDefault()
      enquiries.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    const contact = document.getElementById('contact')
    if (contact) {
      e.preventDefault()
      contact.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
  }

  const handleLinkClick = (e, to) => {
    setIsOpen(false)

    // Handle Contact anchor on same page
    if (to === '#contact' || to === '/#contact' || to === '#enquiries' || to === '/#enquiries') {
      handleContactClick(e)
      return
    }

    // Handle /#about when already on "/"
    if (to.startsWith('/#') && location.pathname === '/') {
      e.preventDefault()
      const id = to.slice(2)
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
  }

  // Active check helper
  const isLinkActive = (to) => {
    if (to === '/') return location.pathname === '/' && !location.hash
    if (to === '/#about') return location.pathname === '/' && location.hash === '#about'
    if (to === '/#founder') return location.pathname === '/' && location.hash === '#founder'
    return location.pathname === to
  }

  return (
    <header className="topnav">
      <div className="topnav__inner">
        {/* Left: Brand */}
        <div className="topnav__brand">
          <Link to="/" className="topnav__brand-link">
            {businessName}
          </Link>
        </div>

        {/* Center: Desktop Nav Links */}
        <nav className="topnav__center" aria-label="Main Navigation">
          <ul className="topnav__links">
            {navLinks.map(({ label, to }) => {
              const active = isLinkActive(to)
              return (
                <li key={label}>
                  <Link
                    to={to}
                    className={`topnav__link ${active ? 'topnav__link--active' : ''}`}
                    aria-current={active ? 'page' : undefined}
                    onClick={(e) => handleLinkClick(e, to)}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Right: Desktop Contact Pill */}
        <div className="topnav__right">
          <Link
            to="/#enquiries"
            className="topnav__contact-btn"
            onClick={handleContactClick}
          >
            <span>Contact</span>
            <span className="topnav__arrow-circle" aria-hidden="true">
              <svg
                width="11"
                height="11"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Mobile: Pill Menu Button (<900px) */}
        <button
          ref={buttonRef}
          type="button"
          className="topnav__mobile-btn"
          aria-expanded={isOpen}
          aria-controls={DROPDOWN_ID}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile Dropdown Menu (<900px) */}
      <div
        id={DROPDOWN_ID}
        ref={menuRef}
        className={`topnav__dropdown ${isOpen ? 'topnav__dropdown--open' : ''}`}
      >
        <ul className="topnav__dropdown-list">
          {navLinks.map(({ label, to }) => (
            <li key={label}>
              <Link
                to={to}
                className="topnav__dropdown-link"
                onClick={(e) => handleLinkClick(e, to)}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/#enquiries"
              className="topnav__dropdown-link"
              onClick={handleContactClick}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default TopNav
