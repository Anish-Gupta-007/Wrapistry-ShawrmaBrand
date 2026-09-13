export interface MenuItem {
  id: string;
  name: string;
  category: "wraps" | "combos" | "sides" | "beverages";
  price: number;
  description: string;
  image: string;
  isSpicy?: boolean;
  isChefSpecial?: boolean;
  isVeg?: boolean;
  calories: number;
  prepTime: string;
  ingredients: string[];
}

export interface LocationItem {
  id: string;
  city: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  isOpenNow: boolean;
  coordinates: { lat: number; lng: number };
  image: string;
  features: string[];
}

export interface FranchiseTier {
  id: string;
  name: string;
  subtitle: string;
  investment: string;
  sqft: string;
  roi: string;
  popular?: boolean;
  features: string[];
}

export const MENU_ITEMS: MenuItem[] = [
  // Wraps
  {
    id: "wrap-1",
    name: "The Emperor Toum Chicken",
    category: "wraps",
    price: 249,
    description: "24-hour spiced roasted chicken thighs, hand-whipped garlic toum, fermented turnip pickles, and crispy spiced fries wrapped in double-baked artisanal Saj bread.",
    image: "/chicken_shawarma_final.png",
    isChefSpecial: true,
    isSpicy: false,
    isVeg: false,
    calories: 680,
    prepTime: "8 mins",
    ingredients: ["Roasted Chicken", "Signature Garlic Toum", "Wild Pickles", "Saj Bread", "Spiced Potatoes"]
  },
  {
    id: "wrap-2",
    name: "Fireburst Spicy Beef Shawarma",
    category: "wraps",
    price: 279,
    description: "Prime Ribeye beef strips seared on charcoal, roasted harissa red peppers, sumac onions, charred tomatoes, and fire-smoke tahini glaze.",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?q=80&w=1000&auto=format&fit=crop",
    isChefSpecial: false,
    isSpicy: true,
    isVeg: false,
    calories: 740,
    prepTime: "10 mins",
    ingredients: ["Prime Ribeye Beef", "Smoked Harissa", "Sumac Onions", "Roasted Tomato", "Fire Tahini"]
  },
  {
    id: "wrap-3",
    name: "Smoky Charcoal Lamb Kafta",
    category: "wraps",
    price: 299,
    description: "Char-grilled minced lamb kafta infused with fresh mint, parsley, pomegranate molasses drizzle, cucumber pickles, and sesame labneh spread.",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=1000&auto=format&fit=crop",
    isChefSpecial: true,
    isSpicy: false,
    isVeg: false,
    calories: 710,
    prepTime: "9 mins",
    ingredients: ["Spiced Lamb Kafta", "Pomegranate Molasses", "Sesame Labneh", "Fresh Mint", "Cucumber Pickles"]
  },
  {
    id: "wrap-4",
    name: "Golden Falafel Craft Roll",
    category: "wraps",
    price: 199,
    description: "Crispy chickpea-herb falafel fritters, creamy tarator sesame emulsion, pickled turnips, shredded red cabbage, and mint-parsley salad.",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=1000&auto=format&fit=crop",
    isChefSpecial: false,
    isSpicy: false,
    isVeg: true,
    calories: 590,
    prepTime: "7 mins",
    ingredients: ["Handcrafted Falafel", "Tarator Sesame Sauce", "Red Cabbage", "Pickled Turnips", "Fresh Herbs"]
  },
  {
    id: "wrap-5",
    name: "Truffle Mushroom & Halloumi",
    category: "wraps",
    price: 269,
    description: "Pan-seared Cypriot Halloumi cheese, roasted wild oyster mushrooms, black truffle toum, and baby arugula wrapped in warm yeast-flatbread.",
    image: "/tofu_shawarma_final.png",
    isChefSpecial: true,
    isSpicy: false,
    isVeg: true,
    calories: 640,
    prepTime: "8 mins",
    ingredients: ["Searing Halloumi", "Wild Oyster Mushrooms", "Black Truffle Toum", "Baby Arugula"]
  },

  // Combos
  {
    id: "combo-1",
    name: "The Wrapistry Legend Box",
    category: "combos",
    price: 399,
    description: "Choice of any Signature Wrap + Sumac Dust Salted Fries + Choice of House Hummus or Mutabbal + Artisan Mint Lemonade + 2 Garlic Dips.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop",
    isChefSpecial: true,
    isSpicy: false,
    isVeg: false,
    calories: 1250,
    prepTime: "12 mins",
    ingredients: ["Signature Wrap", "Sumac Fries", "House Dip", "Fresh Beverage", "Double Dips"]
  },
  {
    id: "combo-2",
    name: "Dual Charcoal Feast (For 2)",
    category: "combos",
    price: 699,
    description: "1 Emperor Chicken Wrap + 1 Fireburst Beef Wrap + Loaded Spicy Garlic Fries + Batata Harra + 2 Craft Drinks + Baklava Duo.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop",
    isChefSpecial: false,
    isSpicy: true,
    isVeg: false,
    calories: 2100,
    prepTime: "15 mins",
    ingredients: ["2 Wraps", "Loaded Garlic Fries", "Batata Harra", "2 Craft Drinks", "Baklava Dessert"]
  },
  {
    id: "combo-3",
    name: "Garden Harvest Veggie Box",
    category: "combos",
    price: 349,
    description: "Golden Falafel Roll or Truffle Halloumi + Charcoal Roasted Eggplant Baba Ghanoush + Quinoa Fattoush Salad + Hibiscus Cooler.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1000&auto=format&fit=crop",
    isChefSpecial: false,
    isSpicy: false,
    isVeg: true,
    calories: 980,
    prepTime: "10 mins",
    ingredients: ["Veggie Craft Roll", "Baba Ghanoush", "Quinoa Fattoush", "Hibiscus Cooler"]
  },

  // Sides
  {
    id: "side-1",
    name: "Sumac & Harissa Dust Fries",
    category: "sides",
    price: 129,
    description: "Triple-cooked crispy potatoes tossed in wild sumac, sea salt, and smoked harissa oil. Served with signature garlic dip.",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1000&auto=format&fit=crop",
    isChefSpecial: false,
    isSpicy: true,
    isVeg: true,
    calories: 420,
    prepTime: "5 mins",
    ingredients: ["Crispy Potatoes", "Wild Sumac", "Smoked Harissa Oil", "Garlic Toum"]
  },
  {
    id: "side-2",
    name: "Smoked Paprika Hummus & Saj Chips",
    category: "sides",
    price: 149,
    description: "Smooth chickpea purée whipped with tahini, extra virgin olive oil, toasted pine nuts, and warm olive-oil crispy Saj crisps.",
    image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=1000&auto=format&fit=crop",
    isChefSpecial: true,
    isSpicy: false,
    isVeg: true,
    calories: 480,
    prepTime: "4 mins",
    ingredients: ["Whipped Chickpeas", "Tahini", "EVOO", "Toasted Pine Nuts", "Saj Chips"]
  },
  {
    id: "side-3",
    name: "Charred Batata Harra",
    category: "sides",
    price: 139,
    description: "Cubed crispy gold potatoes sautéed with coriander, crushed garlic, chili flakes, and freshly squeezed lemon juice.",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1000&auto=format&fit=crop",
    isChefSpecial: false,
    isSpicy: true,
    isVeg: true,
    calories: 450,
    prepTime: "6 mins",
    ingredients: ["Gold Potato Cubes", "Fresh Coriander", "Garlic", "Chili Flakes", "Lemon Juice"]
  },

  // Beverages
  {
    id: "bev-1",
    name: "Fresh Mint Limonada",
    category: "beverages",
    price: 99,
    description: "Freshly crushed Persian limes, sweet garden spearmint, raw cane sugar, and chilled sparkling spring water.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1000&auto=format&fit=crop",
    isChefSpecial: true,
    isSpicy: false,
    isVeg: true,
    calories: 140,
    prepTime: "3 mins",
    ingredients: ["Persian Limes", "Fresh Mint", "Sparkling Water", "Cane Sugar"]
  },
  {
    id: "bev-2",
    name: "Blood Orange & Hibiscus Infusion",
    category: "beverages",
    price: 119,
    description: "Cold-brewed Egyptian hibiscus flowers blended with crushed blood orange juice and pomegranate arils.",
    image: "https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=1000&auto=format&fit=crop",
    isChefSpecial: false,
    isSpicy: false,
    isVeg: true,
    calories: 120,
    prepTime: "3 mins",
    ingredients: ["Cold Brew Hibiscus", "Blood Orange Juice", "Pomegranate Arils"]
  },
  {
    id: "bev-3",
    name: "Salted Pistachio Ayran",
    category: "beverages",
    price: 129,
    description: "Traditional chilled Mediterranean yogurt beverage infused with sea salt, crushed Antep pistachios, and dried rose petals.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1000&auto=format&fit=crop",
    isChefSpecial: true,
    isSpicy: false,
    isVeg: true,
    calories: 180,
    prepTime: "3 mins",
    ingredients: ["Yogurt Culture", "Sea Salt", "Crushed Pistachios", "Rose Petals"]
  }
];

export const LOCATIONS: LocationItem[] = [
  {
    id: "loc-1",
    city: "Mumbai Flagship",
    name: "Wrapistry Bandra West",
    address: "742 Linking Road, Bandra West, Mumbai, Maharashtra 400050",
    phone: "+91 98200 55101",
    hours: "Mon - Sun: 10:30 AM - 1:00 AM",
    isOpenNow: true,
    coordinates: { lat: 19.0596, lng: 72.8295 },
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop",
    features: ["Charcoal Grill Kitchen", "Late Night Window", "Outdoor Patio", "Valet Parking"]
  },
  {
    id: "loc-2",
    city: "Delhi NCR Hub",
    name: "Wrapistry Connaught Place",
    address: "18 Block A, Inner Circle, Connaught Place, New Delhi 110001",
    phone: "+91 98100 44320",
    hours: "Mon - Sun: 11:00 AM - 12:00 AM",
    isOpenNow: true,
    coordinates: { lat: 28.6315, lng: 77.2167 },
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop",
    features: ["Drive-Thru Lane", "Custom Roll Bar", "Craft Beverage Station", "Spacious Seating"]
  },
  {
    id: "loc-3",
    city: "Bengaluru Hub",
    name: "Wrapistry Indiranagar",
    address: "42 100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
    phone: "+91 98450 11912",
    hours: "Mon - Sat: 11:00 AM - 11:30 PM",
    isOpenNow: true,
    coordinates: { lat: 12.9784, lng: 77.6408 },
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop",
    features: ["Open Fire Pit", "Cocktail & Ayran Bar", "Private Dining Room", "Delivery Hub"]
  },
  {
    id: "loc-4",
    city: "Hyderabad Hub",
    name: "Wrapistry Jubilee Hills",
    address: "Plot 88, Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033",
    phone: "+91 98850 77876",
    hours: "Mon - Sun: 10:00 AM - 3:00 AM",
    isOpenNow: true,
    coordinates: { lat: 17.4319, lng: 78.4073 },
    image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?q=80&w=1000&auto=format&fit=crop",
    features: ["Waterfront Dining", "24-Hour Delivery", "VIP Lounge", "Live Spit Roast"]
  }
];

export const FRANCHISE_TIERS: FranchiseTier[] = [
  {
    id: "tier-1",
    name: "Express Kiosk",
    subtitle: "High-footfall malls, airports & transport hubs",
    investment: "₹25 Lakhs - ₹35 Lakhs",
    sqft: "350 - 650 sq.ft.",
    roi: "14 - 18 Months",
    features: [
      "Streamlined high-throughput equipment layout",
      "Plug-and-play POS & digital kiosk order displays",
      "Full supply chain sauce & marinated meat delivery",
      "Staff training & operations playbook (4 weeks)",
      "Central marketing support & app integration"
    ]
  },
  {
    id: "tier-2",
    name: "Flagship Bistro",
    subtitle: "High-street retail centers & premium dining districts",
    investment: "₹50 Lakhs - ₹75 Lakhs",
    sqft: "1,200 - 2,500 sq.ft.",
    roi: "18 - 24 Months",
    popular: true,
    features: [
      "Full charcoal spit showcase & open kitchen design",
      "Indoor & outdoor seating layout (40 - 80 seats)",
      "Integrated pickup window + direct delivery hub",
      "Exclusive territory rights (3-mile radius)",
      "Comprehensive launch team onsite for 14 days",
      "National advertising campaign inclusion"
    ]
  },
  {
    id: "tier-3",
    name: "Drive-Thru & Dual Hub",
    subtitle: "Standalone arterial locations & suburban corridors",
    investment: "₹1 Crore - ₹1.5 Crores",
    sqft: "2,200 - 3,500 sq.ft.",
    roi: "20 - 28 Months",
    features: [
      "Dual lane high-speed drive-thru technology",
      "High volume kitchen capable of ₹3 Crores+ annual gross",
      "Dedicated delivery partner driver staging area",
      "Multi-unit development option with reduced royalty",
      "Dedicated regional franchise director oversight"
    ]
  }
];

export const REVIEWS = [
  {
    id: "r-1",
    author: "Chef Marcus Vance",
    role: "Michelin Guide Food Critic",
    content: "Wrapistry has redefined street food into an art form. The garlic toum is silky perfection, and the charred smoke on the beef ribeye wrap is unprecedented.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "r-2",
    author: "Elena Rostova",
    role: "Food & Wine Magazine",
    content: "The contrast of hot, crisp Saj bread against cold pickled turnips and juicy roasted lamb kafta is pure ecstasy. The standard for modern Middle Eastern craft.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "r-3",
    author: "David Chen",
    role: "Eater Senior Editor",
    content: "I’ve eaten shawarma across Istanbul, Beirut, Mumbai, and Berlin. Wrapistry's Emperor Toum Roll stands shoulder-to-shoulder with the world's best.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  }
];

export const GALLERY_IMAGES = [
  {
    id: "g-1",
    url: "https://images.unsplash.com/photo-1561651823-34feb02250e4?q=80&w=800&auto=format&fit=crop",
    title: "Signature Spit Roast",
    tag: "@wrapistrycraft"
  },
  {
    id: "g-2",
    url: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?q=80&w=800&auto=format&fit=crop",
    title: "Charcoal Ribeye Wrap",
    tag: "#WrapistryOriginal"
  },
  {
    id: "g-3",
    url: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
    title: "Artisanal Toum Dip",
    tag: "@wrapistry_flavor"
  },
  {
    id: "g-4",
    url: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=800&auto=format&fit=crop",
    title: "Golden Falafel Fritters",
    tag: "#CraftShawarma"
  },
  {
    id: "g-5",
    url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop",
    title: "Legend Box Feast",
    tag: "@wrapistry_dining"
  },
  {
    id: "g-6",
    url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop",
    title: "Fresh Mint Limonada",
    tag: "#WrapistryDrinks"
  }
];

export const FAQS = [
  {
    question: "What makes Wrapistry shawarma different from traditional street food?",
    answer: "We blend 24-hour slow marination, open charcoal spit roasting, and zero-compromise artisanal ingredients. Every wrap is rolled in custom double-baked Saj flatbread made fresh every 30 minutes in our kitchen, paired with house-whipped garlic toum crafted from pure olive oil and sea salt."
  },
  {
    question: "Do you offer vegetarian and vegan options?",
    answer: "Absolutely! Our Golden Falafel Roll, Truffle Mushroom & Halloumi Wrap, Smoked Paprika Hummus, and Batata Harra are 100% vegetarian. Our falafel and hummus options are fully vegan."
  },
  {
    question: "How can I order delivery or pickup?",
    answer: "You can place orders directly through our website via the Order Online page, or through our official delivery partners including Zomato, Swiggy, Uber Eats, and Deliveroo depending on your city location."
  },
  {
    question: "What are the requirements for opening a Wrapistry franchise?",
    answer: "We look for passionate restaurant operators or investment groups with liquid capital starting at ₹25 Lakhs. Complete our Franchise Inquiry Form to receive our full 40-page Franchise Disclosure Document."
  }
];
