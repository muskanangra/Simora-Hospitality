// DescriptionSection.jsx — Section 2: Kitchen Description with background photo collage.
// Displays kitchen "Since", title, optional tagline, and narrative paragraph in a centered cream card.

import renderAccent from '../../utils/renderAccent.jsx'
import useReveal from '../../hooks/useReveal.js'
import KitchenCollage from '../KitchenCollage.jsx'
import './DescriptionSection.css'

function DescriptionSection({ data, kitchen }) {
  const sectionRef = useReveal()

  if (!data) return null

  const kitchenKey = kitchen || (data?.tagline ? 'umami' : 'bedres')

  return (
    <section
      ref={sectionRef}
      className="kitchen-description"
      aria-label="Kitchen Description"
    >
      {/* 10-photo mosaic collage */}
      <KitchenCollage kitchen={kitchenKey} />

      {/* Centered cream description card in front of collage */}
      <div className="description-card">
        {/* 1. Since label pill */}
        {data.since && (
          <div>
            <span className="section-label kitchen-desc__since">
              {data.since}
            </span>
          </div>
        )}

        {/* 2. Title as section heading */}
        {data.title && (
          <h2 className="section-heading kitchen-desc__heading">
            {renderAccent(data.title)}
          </h2>
        )}

        {/* 3. Umami only: tagline */}
        {data.tagline && (
          <p className="kitchen-desc__tagline">
            {data.tagline}
          </p>
        )}

        {/* 4. Narrative paragraph */}
        {data.paragraph && (
          <p className="kitchen-desc__paragraph">
            {data.paragraph}
          </p>
        )}
      </div>
    </section>
  )
}

export default DescriptionSection
