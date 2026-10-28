const fs = require('fs');

console.log('Starting Stage 1 updates...');

// ============================================================================
// 1. App.jsx
// ============================================================================
let appContent = fs.readFileSync('src/App.jsx', 'utf8');
appContent = appContent.replace("import FounderPage from './pages/FounderPage.jsx'\n", "");
appContent = appContent.replace("import FounderPage from './pages/FounderPage.jsx'", "");
appContent = appContent.replace(/\s*<Route path="founder" element={<FounderPage \/>} \/>/, "");
fs.writeFileSync('src/App.jsx', appContent, 'utf8');
console.log('Updated src/App.jsx');

// Delete FounderPage.jsx if it exists
if (fs.existsSync('src/pages/FounderPage.jsx')) {
  fs.unlinkSync('src/pages/FounderPage.jsx');
  console.log('Deleted src/pages/FounderPage.jsx');
}

// ============================================================================
// 2. src/components/Paragraphs.jsx and Paragraphs.css
// ============================================================================
const paragraphsJsx = `// Paragraphs.jsx — Renders an array of paragraph strings with consistent body styling
import './Paragraphs.css'

export function renderRich(text) {
  if (!text || typeof text !== 'string') return text
  if (!text.includes('**') && !text.includes('_')) return text

  const parts = text.split(/(\\*[^*]+\\*|_[^_]+_)/g)
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return <strong key={idx}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('_') && part.endsWith('_') && part.length >= 2) {
      return (
        <em key={idx} className="accent-inline">
          {part.slice(1, -1)}
        </em>
      )
    }
    return part
  })
}

function Paragraphs({ items, className = '' }) {
  if (!items || !items.length) return null

  return (
    <div className={\`paragraphs \${className}\`}>
      {items.map((text, idx) => (
        <p key={idx} className="paragraphs__item">
          {renderRich(text)}
        </p>
      ))}
    </div>
  )
}

export default Paragraphs
`;
fs.writeFileSync('src/components/Paragraphs.jsx', paragraphsJsx, 'utf8');
console.log('Updated src/components/Paragraphs.jsx');

let paragraphsCss = fs.readFileSync('src/components/Paragraphs.css', 'utf8');
if (!paragraphsCss.includes('.accent-inline')) {
  paragraphsCss += `\n/* Inline accent in Instrument Serif, italic, 400, font-size 1.1em */
.accent-inline {
  font-family: var(--font-accent);
  font-style: italic;
  font-weight: 400;
  font-size: 1.1em;
  color: inherit;
}
`;
  fs.writeFileSync('src/components/Paragraphs.css', paragraphsCss, 'utf8');
  console.log('Updated src/components/Paragraphs.css');
}

// ============================================================================
// 3. src/data/siteConfig.js
// ============================================================================
let siteConfigContent = fs.readFileSync('src/data/siteConfig.js', 'utf8');

// Founder paragraphs replacement
const newFounderParagraphs = `founderParagraphs: [
    "I’m Siddharth Bedre, and this is the story behind the two kitchens I’m building with all my heart.",
    "I never imagined I’d end up in a kitchen. Growing up, my heart was set on _aviation_, until COVID brought that dream to a pause and gave me something I’ll always be grateful for — more time with my father.",
    "Cooking together, experimenting with dishes, and sharing our love for feeding people made me realise that his passion was slowly becoming mine. What started as his dream eventually became something I wanted to build my life around.",
    "After graduating from _IHM Mumbai_ and working at _Grand Hyatt Mumbai_, _The Westin Mumbai Garden City_, and _Taj Lands End, Mumbai_, I took a leap of faith and began building **Umami** and **Bedre’s Kitchen**.",
    "Today, they’re more than businesses to me; they’re a piece of my father, my family, and the journey that brought me here. And I hope that every plate we serve carries a little bit of that story.",
  ],`;

siteConfigContent = siteConfigContent.replace(/founderParagraphs:\s*\[[\s\S]*?\],/, newFounderParagraphs);

// Reviews paragraphs
const newReviewsParagraphs = `reviewsParagraphs: [
    "We cook for the little moments that make life delicious. The child who has been asking for noodles all week, the friends whose get-togethers are incomplete without their favourite Asian starters, and the grandparents who find comfort in a wholesome, home-cooked meal.",
    "From spontaneous indulgences to familiar favourites, we’re here for every craving, every mood, and every occasion.",
  ],`;

if (!siteConfigContent.includes('reviewsParagraphs:')) {
  siteConfigContent = siteConfigContent.replace(
    /reviewsText:\s*['"][^'"]*['"],/,
    `reviewsText: '[Reviews intro text]',\n  ${newReviewsParagraphs}`
  );
}

// Enquiries paragraphs
const newEnquiriesParagraphs = `enquiriesParagraphs: [
    "From bulk food orders and catering to corporate associations, event partnerships, and bespoke culinary projects, we’re open to exploring opportunities that bring good food and good people together.",
    "Have an idea or a proposition in mind? We’d love to hear from you.",
    "For all enquiries and partnership opportunities, get in touch with us.",
  ],`;

if (!siteConfigContent.includes('enquiriesParagraphs:')) {
  siteConfigContent = siteConfigContent.replace(
    /enquiriesHeading:\s*['"]Enquiries & \*Collaborations\*['"],/,
    `enquiriesHeading: 'Enquiries & *Collaborations*',\n  ${newEnquiriesParagraphs}`
  );
}

// Contact details in footer
const newContact = `contactHeading: 'Company *Details*',
  contact: {
    phones: [
      { display: "+91 77381 01181", tel: "+917738101181", wa: "917738101181" },
      { display: "+91 98212 66550", tel: "+919821266550", wa: "919821266550" },
    ],
    email: 'Bedres14@yahoo.com',
    emailHref: 'mailto:Bedres14@yahoo.com',
    address: 'Santa Cruz (East), Mumbai',
  },`;

siteConfigContent = siteConfigContent.replace(
  /contactHeading:\s*['"]Company \*Details\*['"],\s*contact:\s*\{[\s\S]*?\},/,
  newContact
);

// navLinks update: Founder -> /#founder
siteConfigContent = siteConfigContent.replace(
  /\{\s*label:\s*['"]Founder['"],\s*to:\s*['"]\/founder['"]\s*\}/,
  "{ label: 'Founder', to: '/#founder' }"
);

fs.writeFileSync('src/data/siteConfig.js', siteConfigContent, 'utf8');
console.log('Updated src/data/siteConfig.js');

