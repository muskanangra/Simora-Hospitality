// usePageMeta.js — Updates document.title, meta description, and Open Graph tags per page.

import { useEffect } from 'react'

const DOMAIN = 'https://simora-hospitality.vercel.app'

function toAbsolute(urlOrPath) {
  if (!urlOrPath) return urlOrPath
  if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
    return urlOrPath
  }
  return `${DOMAIN}${urlOrPath.startsWith('/') ? '' : '/'}${urlOrPath}`
}

export default function usePageMeta({ title, description, image, url } = {}) {
  useEffect(() => {
    if (title) {
      document.title = title

      let ogTitle = document.querySelector('meta[property="og:title"]')
      if (!ogTitle) {
        ogTitle = document.createElement('meta')
        ogTitle.setAttribute('property', 'og:title')
        document.head.appendChild(ogTitle)
      }
      ogTitle.setAttribute('content', title)
    }

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]')
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.setAttribute('name', 'description')
        document.head.appendChild(metaDesc)
      }
      metaDesc.setAttribute('content', description)

      let ogDesc = document.querySelector('meta[property="og:description"]')
      if (!ogDesc) {
        ogDesc = document.createElement('meta')
        ogDesc.setAttribute('property', 'og:description')
        document.head.appendChild(ogDesc)
      }
      ogDesc.setAttribute('content', description)
    }

    if (image) {
      const absoluteImage = toAbsolute(image)
      let ogImage = document.querySelector('meta[property="og:image"]')
      if (!ogImage) {
        ogImage = document.createElement('meta')
        ogImage.setAttribute('property', 'og:image')
        document.head.appendChild(ogImage)
      }
      ogImage.setAttribute('content', absoluteImage)

      let twitterImage = document.querySelector('meta[name="twitter:image"]')
      if (!twitterImage) {
        twitterImage = document.createElement('meta')
        twitterImage.setAttribute('name', 'twitter:image')
        document.head.appendChild(twitterImage)
      }
      twitterImage.setAttribute('content', absoluteImage)
    }

    if (url) {
      const absoluteUrl = toAbsolute(url)
      let ogUrl = document.querySelector('meta[property="og:url"]')
      if (!ogUrl) {
        ogUrl = document.createElement('meta')
        ogUrl.setAttribute('property', 'og:url')
        document.head.appendChild(ogUrl)
      }
      ogUrl.setAttribute('content', absoluteUrl)

      let canonical = document.querySelector('link[rel="canonical"]')
      if (canonical) {
        canonical.setAttribute('href', absoluteUrl)
      }
    }
  }, [title, description, image, url])
}
