// siteConfig.js — Single source of truth for all content, placeholder text, and navigation links.
// Real content populated for Founder, Dishes, What Makes Us Different, Inside the Experiment,
// Enquiries & Collaborations buttons, and Phone/WhatsApp/Email in Company Details.
// Placeholders remain for Hero name/tagline, About Us, Delivery, Reviews, Enquiries text, Address & Details.

const siteConfig = {
  // Page titles and descriptions for SEO & link previews
  meta: {
    home: {
      title: 'Simora Hospitality — Beyond Hospitality. Into Experience.',
      description: 'Simora Hospitality is the home of Bedre’s Kitchen and Umami, two cloud kitchens in Santa Cruz (East), Mumbai. Beyond Hospitality. Into Experience.',
    },
    bedres: {
      title: 'Bedre’s Kitchen — Malvani & North Indian | Simora Hospitality',
      description: 'From the bold, coastal flavours of Malvan to the comforting classics of North India: Bedre’s Kitchen, Santa Cruz (East), Mumbai.',
    },
    umami: {
      title: 'Umami — The Taste That Talks | Simora Hospitality',
      description: 'Umami is our take on Oriental, Pan-Asian and Chinese cuisine, built around punchy sauces and wok-tossed favourites. Santa Cruz (East), Mumbai.',
    },
  },

  businessName: 'Simora Hospitality',

  // Short punchy tagline shown below the business name in the hero
  heroTagline: 'Beyond Hospitality. Into Experience.',

  // Section label tags (shown as small pills above section headings)
  labels: {
    about: 'WELCOME',
    founder: 'MEET CHEF SIDDHARTH',
    dishes: 'MOST LOVED',
    different: 'CARE IN EVERY PLATE',
    experiment: 'IN THE MAKING',
    delivery: 'TASTE THE STORY',
    reviews: 'OUR GUESTS',
    kitchens: 'EXPLORE',
    enquiries: 'GET IN TOUCH',
    subscriptions: '',
  },

  // 1. Section: About Simora Hospitality
  aboutHeading: 'About Simora *Hospitality*',
  aboutParagraphs: [
    "At Simora, we believe hospitality is an art — a blend of thoughtful details, distinctive experiences, and a genuine passion for bringing people together.",
    "Simora Hospitality is built on a vision to create something beyond the ordinary. With a focus on quality, creativity, and meaningful experiences, we bring ideas to life through hospitality that feels personal, purposeful, and timeless.",
    "Because the finest experiences aren’t just served — they’re remembered.",
  ],

  // Founder photo
  founderImage: '/images/home/founder.jpg',
  founderAlt: 'Siddharth Bedre',

  // 2. Section: The Person Behind the Plate (Founder)
  founderHeading: 'The Person Behind the *Plate*',
  founderParagraphs: [
    "I’m Siddharth Bedre, and this is the story behind the two kitchens I’m building with all my heart.",
    "I never imagined I’d end up in a kitchen. Growing up, my heart was set on _aviation_, until COVID brought that dream to a pause and gave me something I’ll always be grateful for — more time with my father.",
    "Cooking together, experimenting with dishes, and sharing our love for feeding people made me realise that his passion was slowly becoming mine. What started as his dream eventually became something I wanted to build my life around.",
    "After graduating from _IHM Mumbai_ and working at _Grand Hyatt Mumbai_, _The Westin Mumbai Garden City_, and _Taj Lands End, Mumbai_, I took a leap of faith and began building **Umami** and **Bedre’s Kitchen**.",
    "Today, they’re more than businesses to me; they’re a piece of my father, my family, and the journey that brought me here. And I hope that every plate we serve carries a little bit of that story.",
  ],

  // 3. Section: Signature & Bestselling Dishes
  dishesHeading: 'Signature & Bestselling *Dishes*',
  dishes: [
    {
      name: "Umami’s Special Chicken Stir-Fry",
      image: "/images/home/dish-umami-chicken-stir-fry.jpg",
    },
    {
      name: "Bedre’s Special Bombay Mutton Biryani",
      image: "/images/home/dish-bedres-bombay-mutton-biryani.jpg",
    },
    {
      name: "Kolambi Bhaat",
      image: "/images/home/dish-kolambi-bhaat.jpg",
    },
    {
      name: "Thecha-Stuffed Pomfret",
      image: "/images/home/dish-thecha-stuffed-pomfret.jpg",
    },
    {
      name: "Shandong-Style Fried Rice with Spicy Coriander Gravy",
      image: "/images/home/dish-shandong-fried-rice.jpg",
    },
  ],

  // 4. Section: What Makes Us Different
  differentHeading: 'What Makes Us *Different*',
  differentParagraphs: [
    "We believe quality ingredients, impeccable hygiene, and consistency are the cornerstones of good hospitality. But what truly distinguishes us is something far more intrinsic — the emotional connection we cultivate through food.",
    "Chef Siddharth believes that every individual has a unique relationship with what they eat. He genuinely delights in understanding our customers’ preferences, accommodating their little idiosyncrasies, and transforming their ideas into something tangible, even when they transcend the boundaries of our menu.",
    "For him, there is something deeply fulfilling about knowing that a dish has been thoughtfully personalised, a craving understood, or an idea brought to fruition simply because it mattered to someone.",
    "Because to us, hospitality is not merely about serving food; it is about making people feel understood, remembered, and genuinely cared for.",
  ],

  // 5. Section: Inside the Experiment
  experimentHeading: 'Inside the *Experiment*',
  experimentParagraphs: [
    "What begins in our kitchens doesn’t always stay on the menu. We’re experimenting with a wider range of ready-to-cook gravies and signature sauces, inspired by the very flavours that define Umami and Bedre’s Kitchen.",
    "Something exciting is simmering behind the scenes. For now, stay curious. Watch this space.",
  ],

  // 6. Section: From Our Kitchen to Yours
  deliveryHeading: 'From Our Kitchen to *Yours*',
  deliveryText: '[From our kitchen to yours text]',
  dips: [
    {
      name: "Schezwan Sauce",
      image: "/images/home/dip-schezwan-sauce.jpg",
      tagline: "A fiery blend of chillies, garlic and aromatic spices.",
      dish: "Wok-Tossed Schezwan Water Chestnuts / Prawns",
      serves: "Serves: 2",
      ingredients: [
        "200 g water chestnuts (vegetarian) / 200 g prawns, cleaned and deveined (non-vegetarian)",
        "1 tbsp oil or butter",
        "1 tbsp chopped garlic",
        "1 tsp chopped ginger",
        "2 tbsp Schezwan sauce",
        "Water, as required to adjust consistency",
        "Salt, to taste",
      ],
      method: [
        "Heat oil or butter in a wok over medium-high heat.",
        "Add chopped garlic and ginger. Sauté until fragrant.",
        "Add water chestnuts / prawns and toss well. Cook water chestnuts for 2–3 minutes or until the prawns begin to turn pink.",
        "Add Schezwan sauce and mix well to coat evenly.",
        "Add a little water if required to adjust the consistency.",
        "Season with salt to taste. Cook prawns until fully cooked.",
      ],
      closing: "Serve hot.",
    },
    {
      name: "Crispy Garlic",
      image: "/images/home/dip-crispy-garlic.jpg",
      tagline: "Crispy golden garlic flakes, fried to perfection for a rich, aromatic crunch.",
      dish: "Crispy Garlic Mushrooms",
      serves: "Serves: 2",
      ingredients: [
        "200 g mushrooms, sliced and fried until crispy",
        "1 tbsp chopped green chillies",
        "2 tbsp spring onions, chopped",
        "2 tbsp crispy fried garlic",
        "Salt, to taste",
        "½ tsp seasoning powder",
      ],
      method: [
        "Dry roast the chopped chillies in a wok until fragrant.",
        "Add the crispy fried mushrooms and toss well.",
        "Add the spring onions, crispy fried garlic, salt and seasoning powder.",
        "Toss everything together until evenly mixed.",
      ],
      closing: "Serve hot and crispy.",
    },
    {
      name: "Cucumber Kimchi",
      image: "/images/home/dip-cucumber-kimchi.jpg",
      tagline: "Cucumber kimchi with a savoury soy-brined finish and a hint of Korean-inspired flavour.",
      dish: "Cold Kimchi Rice Bowl Salad",
      serves: "Serves: 2",
      ingredients: [
        "150 g jasmine rice (uncooked)",
        "100 g cucumber kimchi",
        "100 g edamame beans, steamed",
        "150 g firm tofu, cut into cubes",
        "100 g water chestnuts, boiled and sliced",
        "1 tbsp oil, for crisping the tofu",
        "1 tsp sesame seeds",
        "1 spring onion, finely sliced",
      ],
      method: [
        "Cook the rice: Cook the jasmine rice in a rice cooker. Allow it to cool completely.",
        "Prepare the tofu: Heat oil in a pan and cook the firm tofu cubes until golden and crispy on all sides.",
        "Assemble the bowl: Divide the cooled jasmine rice between two bowls. Arrange the cucumber kimchi, steamed edamame, crispy tofu and sliced water chestnuts on top.",
        "Garnish: Finish with spring onions and sesame seeds.",
      ],
      closing: "Serve chilled.",
    },
    {
      name: "Bean Infused Chilli Crisp",
      image: "/images/home/dip-bean-chilli-crisp.jpg",
      tagline: "A bold chilli crunch with savoury black beans and a fiery finish.",
      dish: "Fiery Bean Crisp Corn",
      serves: "Serves: 2",
      ingredients: [
        "200 g American sweet corn, boiled",
        "1 tbsp bean-infused chilli crisp",
        "1 tbsp butter",
        "1 tbsp chopped garlic",
        "1 tsp chopped ginger",
        "2 tbsp chopped onion",
        "Salt, to taste",
      ],
      method: [
        "Heat butter in a pan over medium heat.",
        "Add chopped garlic, ginger and onion. Sauté until fragrant and the onion softens.",
        "Add the boiled sweet corn and toss well.",
        "Add the bean-infused chilli crisp and mix until the corn is evenly coated.",
        "Season with salt to taste and toss for another 1–2 minutes.",
      ],
      closing: "Serve hot.",
    },
  ],
  dipsLink: {
    text: 'Click for recipes',
    to: '/umami#recipes',
  },

  // Kitchen pages shared and unique content
  umamiLogoLabel: '[Umami logo]',
  bedresLogoLabel: '[Bedre’s Kitchen logo]',
  foodImagesLabel: 'Food images',
  menuPhotoLabel: 'Menu photo',
  video1Label: 'Behind-the-scenes video 1',
  video2Label: 'Behind-the-scenes video 2',
  recipeLabel: 'RECIPE',

  // CTA button config for subscriptions
  subscriptionCta: {
    text: 'Enquire on WhatsApp',
  },

  // Kitchen pages description content
  kitchenPages: {
    bedres: {
      heroPattern: 'lattice',
            since: "Since February 2025",
      title: "Bedre’s *Kitchen*",
      paragraph: "From the bold, coastal flavours of Malvan to the comforting classics of North India, Bedre’s Kitchen brings together food that feels familiar, generous and full of character. Rooted in regional traditions and driven by a love for good food, our kitchen celebrates spice, soul and the joy of a satisfying meal.",
      subscriptions: [
        {
          name: 'The Everyday Table',
          intro: 'For individuals who want delicious, dependable meals as part of their everyday routine.',
          bullets: [
            'Daily lunch or dinner plans',
            'Weekly and monthly subscriptions',
            'Meals from Bedre’s Kitchen',
          ],
          schedule: 'Lunch and dinner · 5–6 days a week · Tuesday to Sunday',
          whatsappMessage: 'Hi, I’d like to know more about The Everyday Table subscription from Bedre’s Kitchen.',
          image: '/images/bedres/subscription-everyday-table.jpg',
        },
        {
          name: 'The Gathering Table',
          intro: 'For families, offices, celebrations, and gatherings that bring people together over good food.',
          bullets: [
            'Group meals and family spreads',
            'Office lunches and corporate meal orders',
            'Bulk food orders for gatherings',
          ],
          schedule: 'Lunch or dinner · 3–6 days a week · Tuesday to Sunday',
          whatsappMessage: 'Hi, I’d like to know more about The Gathering Table subscription from Bedre’s Kitchen.',
          image: '/images/bedres/subscription-gathering-table.jpg',
        },
      ],
    },
    umami: {
      heroPattern: 'waves',
            since: "Since January 2026",
      title: "Umami – The Taste That *Talks*",
      tagline: "Big flavours. Bold combinations. A little unexpected.",
      paragraph: "Umami is our take on Oriental, Pan-Asian and Chinese cuisine — a kitchen built around punchy sauces, wok-tossed favourites and flavours that leave an impression. From comforting classics to playful twists, every dish is made to awaken your taste buds and keep you coming back for more.",
      subscriptions: [
        {
          name: 'The Asian Lunch Club',
          intro: 'For people who want exciting Asian-inspired meals beyond the usual lunch routine.',
          bullets: [
            'Daily lunch plans',
            'Weekly and monthly subscriptions',
            'Meals from Umami',
          ],
          schedule: 'Lunch only · 5–6 days a week · Tuesday to Sunday',
          whatsappMessage: 'Hi, I’d like to know more about The Asian Lunch Club subscription from Umami.',
          image: '/images/umami/subscription-asian-lunch-club.jpg',
        },
        {
          name: 'The Umami Experience',
          intro: 'A curated Pan-Asian meal subscription.',
          description: 'A rotating selection of Umami favourites, bringing together noodles, rice bowls, dumplings, starters and signature mains.',
          bullets: [],
          bestFor: 'Best for: Customers who enjoy variety and want to explore the menu beyond lunch.',
          schedule: 'Lunch or dinner · 5–6 days a week · Tuesday to Sunday',
          whatsappMessage: 'Hi, I’d like to know more about The Umami Experience subscription from Umami.',
          image: '/images/umami/subscription-umami-experience.jpg',
        },
      ],
    },
  },

  // Videos configuration
  videos: {
    different: {
      src: "/images/videos/home-different.mp4",
      poster: "/images/videos/home-different-poster.jpg",
    },
  },

  // Menus configuration for Umami and Bedre’s Kitchen
  menus: {
    umami: {
      title: "Menu",
      pagesBase: "/images/umami/menu-page-",
      ext: "jpg",
      pdf: "/menus/umami-menu.pdf",
      downloadName: "Umami-Menu.pdf",
      label: "Umami",
      pageCount: 10,
      video: {
        src: "/images/videos/umami-menu.mp4",
        poster: "/images/videos/umami-menu-poster.jpg",
      },
    },
    bedres: {
      title: "Menu",
      pagesBase: "/images/bedres/menu-page-",
      ext: "jpg",
      pdf: "/menus/bedres-menu.pdf",
      downloadName: "Bedres-Kitchen-Menu.pdf",
      label: "Bedre’s Kitchen",
      pageCount: 6,
      video: {
        src: "/images/videos/bedres-menu.mp4",
        poster: "/images/videos/bedres-menu-poster.jpg",
      },
    },
    viewHint: "View menu",
    downloadText: "Download PDF",
    closeLabel: "Close menu",
  },
  viewHint: "View menu",
  downloadText: "Download PDF",
  closeLabel: "Close menu",

  // Bedre’s Kitchen Subscriptions
  subscriptionsHeading: '*Subscriptions*',
  subscriptions: [
    {
      name: 'The Everyday Table',
      intro: 'For individuals who want delicious, dependable meals as part of their everyday routine.',
      bullets: [
        'Daily lunch or dinner plans',
        'Weekly and monthly subscriptions',
        'Meals from Bedre’s Kitchen',
      ],
      schedule: 'Lunch and dinner · 5–6 days a week · Tuesday to Sunday',
      whatsappMessage: 'Hi, I’d like to know more about The Everyday Table subscription from Bedre’s Kitchen.',
      image: '/images/bedres/subscription-everyday-table.jpg',
    },
    {
      name: 'The Gathering Table',
      intro: 'For families, offices, celebrations, and gatherings that bring people together over good food.',
      bullets: [
        'Group meals and family spreads',
        'Office lunches and corporate meal orders',
        'Bulk food orders for gatherings',
      ],
      schedule: 'Lunch or dinner · 3–6 days a week · Tuesday to Sunday',
      whatsappMessage: 'Hi, I’d like to know more about The Gathering Table subscription from Bedre’s Kitchen.',
      image: '/images/bedres/subscription-gathering-table.jpg',
    },
  ],

  // 7. Section: The People We Serve
  reviewsHeading: 'The People We *Serve*',
  reviewsParagraphs: [
    "We cook for the little moments that make life delicious. The child who has been asking for noodles all week, the friends whose get-togethers are incomplete without their favourite Asian starters, and the grandparents who find comfort in a wholesome, home-cooked meal.",
    "From spontaneous indulgences to familiar favourites, we’re here for every craving, every mood, and every occasion.",
  ],
  reviews: [
    {
      kitchen: "Bedre’s Kitchen",
      name: "shrey",
      text: "The food was tasty. The fish was rightly tawa fried, so loved the taste.",
      image: "/images/reviews/bedres-review-1.jpg",
      alt: "Zomato review of Bedre’s Kitchen by shrey: The food was tasty. The fish was rightly tawa fried, so loved the taste.",
    },
    {
      kitchen: "Umami",
      name: "Harish Nagar",
      text: "Loved the konjee chicken, it was hot and fresh. Packaging was good and arrived on time.",
      image: "/images/reviews/umami-review-1.jpg",
      alt: "Zomato review of Umami by Harish Nagar: Loved the konjee chicken, it was hot and fresh. Packaging was good and arrived on time.",
    },
    {
      kitchen: "Bedre’s Kitchen",
      name: "Bene Dhruv",
      text: "Amazing taste, just like from my hometown of Goa",
      image: "/images/reviews/bedres-review-2.jpg",
      alt: "Zomato review of Bedre’s Kitchen by Bene Dhruv: Amazing taste, just like from my hometown of Goa",
    },
    {
      kitchen: "Umami",
      name: "Isteyak Mishra",
      text: "One of the best kung pao chicken I had. Affordable price. Packaging was good, and freshly prepared. Delivery on time.",
      image: "/images/reviews/umami-review-2.jpg",
      alt: "Zomato review of Umami by Isteyak Mishra: One of the best kung pao chicken I had. Affordable price. Packaging was good, and freshly prepared. Delivery on time.",
    },
    {
      kitchen: "Bedre’s Kitchen",
      name: "SEQUEIRA",
      text: "Your restaurant probably has the best Chicken Thali in Mumbai, Good Price (discounted) , Tasty and Variety dishes , Hygienic Excellent Packing and Sufficient Quantity and the food arrives Hot. Thanks .",
      image: "/images/reviews/bedres-review-3.jpg",
      alt: "Zomato review of Bedre’s Kitchen by SEQUEIRA: Your restaurant probably has the best Chicken Thali in Mumbai, Good Price (discounted) , Tasty and Variety dishes , Hygienic Excellent Packing and Sufficient Quantity and the food arrives Hot. Thanks .",
    },
    {
      kitchen: "Umami",
      name: "anju shrivastav",
      text: "I like spicy coriander chicken from here the most. It's super tasty and hits the spot every time.",
      image: "/images/reviews/umami-review-3.jpg",
      alt: "Zomato review of Umami by anju shrivastav: I like spicy coriander chicken from here the most. It's super tasty and hits the spot every time.",
    },
    {
      kitchen: "Bedre’s Kitchen",
      name: "Prasad Kulkarni",
      text: "Absolutely delicious food .. felt like homely meal.. packaging was superb... loved it",
      image: "/images/reviews/bedres-review-4.jpg",
      alt: "Zomato review of Bedre’s Kitchen by Prasad Kulkarni: Absolutely delicious food .. felt like homely meal.. packaging was superb... loved it",
    },
    {
      kitchen: "Umami",
      name: "Raja",
      text: "The black pepper fish and sichuan fish was very tasty. What an amazing taste! It was great with top-notch quality and quantity. Highly recommended.",
      image: "/images/reviews/umami-review-4.jpg",
      alt: "Zomato review of Umami by Raja: The black pepper fish and sichuan fish was very tasty. What an amazing taste! It was great with top-notch quality and quantity. Highly recommended.",
    },
    {
      kitchen: "Bedre’s Kitchen",
      name: "KKM",
      text: "Amazing and closest to home food! received the parcel within 30mins and the food was still warm. Tasted as good as mom's food!",
      image: "/images/reviews/bedres-review-5.jpg",
      alt: "Zomato review of Bedre’s Kitchen by KKM: Amazing and closest to home food! received the parcel within 30mins and the food was still warm. Tasted as good as mom's food!",
    },
    {
      kitchen: "Umami",
      name: "Pratap Raj",
      text: "chicken dumplings was perfectly sealed and maintained hygiene. Overall, it was a great experience. Lovely.",
      image: "/images/reviews/umami-review-5.jpg",
      alt: "Zomato review of Umami by Pratap Raj: chicken dumplings was perfectly sealed and maintained hygiene. Overall, it was a great experience. Lovely.",
    },
    {
      kitchen: "Bedre’s Kitchen",
      name: "shaheen",
      text: "very tasty puran puri ... this is my second time ordered. packing is also very good .",
      image: "/images/reviews/bedres-review-6.jpg",
      alt: "Zomato review of Bedre’s Kitchen by shaheen: very tasty puran puri ... this is my second time ordered. packing is also very good .",
    },
    {
      kitchen: "Umami",
      name: "Indrajeet Patel",
      text: "The mapo tofu and spring roll was a treat to my taste buds. Flavors were spot on, and presentation was appealing.",
      image: "/images/reviews/umami-review-6.jpg",
      alt: "Zomato review of Umami by Indrajeet Patel: The mapo tofu and spring roll was a treat to my taste buds. Flavors were spot on, and presentation was appealing.",
    },
  ],

  orderLinks: {
    bedres: {
      swiggy: "https://www.swiggy.com/menu/1070948?source=sharing",
      zomato: "https://link.zomato.com/xqzv/rshare?id=114098543305634fd",
    },
    umami: {
      swiggy: "https://www.swiggy.com/direct/brand/746245?source=swiggy-direct&subSource=generic",
      zomato: "https://link.zomato.com/xqzv/rshare?id=15054860230563dd5",
    },
  },

  // 8. Section: Our Kitchens — these names are REAL, do not change them
  kitchensHeading: 'Our *Kitchens*',
  kitchens: [
    {
      name: 'Bedre’s Kitchen',
      path: '/bedres-kitchen',
      logo: '/images/bedres/bedres-logo.png',
      heroLogo: '/images/bedres/bedres-logo-transparent.png',
      heroPattern: 'lattice',
            logoWidth: 600,
      logoHeight: 600,
      alt: 'Bedre’s Kitchen logo',
    },
    {
      name: 'Umami',
      path: '/umami',
      logo: '/images/umami/umami-logo.png',
      heroLogo: '/images/umami/umami-logo-transparent.png',
      heroPattern: 'waves',
            logoWidth: 500,
      logoHeight: 500,
      alt: 'Umami logo',
    },
  ],

  // 9. Section: Enquiries & Collaborations
  enquiriesHeading: 'Enquiries & *Collaborations*',
  enquiriesParagraphs: [
    "From bulk food orders and catering to corporate associations, event partnerships, and bespoke culinary projects, we’re open to exploring opportunities that bring good food and good people together.",
    "Have an idea or a proposition in mind? We’d love to hear from you.",
    "For all enquiries and partnership opportunities, get in touch with us.",
  ],
  enquiriesSubheading: 'Enquiries',
  enquiriesBtnLabel: 'Bedres14@yahoo.com',
  enquiriesBtnHref: 'mailto:Bedres14@yahoo.com',
  collaborationsSubheading: 'Collaborations',
  collaborationsBtnLabel: 'WhatsApp +91 77381 01181',
  collaborationsBtnHref: 'https://wa.me/917738101181',


  // 10. Footer / Contact section (only address and extra details are still placeholders)
  contactHeading: 'Company *Details*',
  contact: {
    phones: [
      { display: "+91 77381 01181", tel: "+917738101181", wa: "917738101181" },
      { display: "+91 98212 66550", tel: "+919821266550", wa: "919821266550" },
    ],
    email: 'Bedres14@yahoo.com',
    emailHref: 'mailto:Bedres14@yahoo.com',
    address: 'Santa Cruz (East), Mumbai',
  },

  // Navigation links used by TopNav: Home, About, Founder, Bedre’s Kitchen, Umami
  navLinks: [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/#about' },
    { label: 'Founder', to: '/#founder' },
    { label: 'Bedre’s Kitchen', to: '/bedres-kitchen' },
    { label: 'Umami', to: '/umami' },
  ],
}

export default siteConfig
