export const SITE_URL = 'https://lisbon-cruise-guide.com';

export interface CategoryContent {
  slug: string;
  displaySingular: string;
  displayPlural: string;
  title: string;
  metaDescription: string;
  icon: string;
  intro: string[];
}

// Maps legacy/duplicate category slugs to their canonical curated slug.
// Used both for counting attractions into buckets and for 301 redirects.
export const CATEGORY_ALIASES: Record<string, string> = {
  // historic-site
  'historical-site': 'historic-site',
  'historic': 'historic-site',
  'historical': 'historic-site',
  'historic-landmark': 'historic-site',
  'historic-building': 'historic-site',
  'landmark': 'historic-site',
  'historic-area': 'historic-site',
  // monument
  'historic-monument': 'monument',
  'national-memorial': 'monument',
  'pantheon': 'monument',
  // museum
  'archaeological-museum': 'museum',
  'modern-museum': 'museum',
  'contemporary-art': 'museum',
  // viewpoint
  'miradouro': 'viewpoint',
  'sunset-spot': 'viewpoint',
  'photo-spot': 'viewpoint',
  'photography': 'viewpoint',
  'photography-spot': 'viewpoint',
  'panoramic-views': 'viewpoint',
  'observation-deck': 'viewpoint',
  'scenic-overlook': 'viewpoint',
  'scenic-viewpoint': 'viewpoint',
  'instagram-spot': 'viewpoint',
  'scenic-spot': 'viewpoint',
  'scenic-views': 'viewpoint',
  'observation-ride': 'viewpoint',
  'scenic': 'viewpoint',
  // cultural-attraction
  'cultural-experience': 'cultural-attraction',
  'cultural-activity': 'cultural-attraction',
  'cultural-heritage': 'cultural-attraction',
  'cultural-site': 'cultural-attraction',
  'cultural-center': 'cultural-attraction',
  'cultural-space': 'cultural-attraction',
  'cultural-immersion': 'cultural-attraction',
  'portuguese-culture': 'cultural-attraction',
  'educational': 'cultural-attraction',
  'entertainment': 'cultural-attraction',
  'theaters': 'cultural-attraction',
  'cultural-district': 'cultural-attraction',
  'creative-hub': 'cultural-attraction',
  'industrial-heritage': 'cultural-attraction',
  // day-trip
  'medieval-town': 'day-trip',
  'historic-town': 'day-trip',
  'historic-city': 'day-trip',
  'wine-region': 'day-trip',
  'roman-ruins': 'day-trip',
  // palace
  'royal-residence': 'palace',
  'estate': 'palace',
  // religious-site
  'church': 'religious-site',
  'basilica': 'religious-site',
  'cathedral': 'religious-site',
  'monastery': 'religious-site',
  'convent': 'religious-site',
  'pilgrimage': 'religious-site',
  'shrine': 'religious-site',
  'spiritual': 'religious-site',
  'church-ruins': 'religious-site',
  // food-and-drink
  'culinary-experience': 'food-and-drink',
  'dining': 'food-and-drink',
  'food-market': 'food-and-drink',
  'restaurant': 'food-and-drink',
  'restaurants': 'food-and-drink',
  'portuguese-cuisine': 'food-and-drink',
  'wine-tasting': 'food-and-drink',
  'food-tour': 'food-and-drink',
  'food-hall': 'food-and-drink',
  'food-court': 'food-and-drink',
  'market': 'food-and-drink',
  'traditional-market': 'food-and-drink',
  'culinary-destination': 'food-and-drink',
  'gourmet': 'food-and-drink',
  'bakery': 'food-and-drink',
  'portuguese-pastry': 'food-and-drink',
  'sweet-shop': 'food-and-drink',
  'food-culture': 'food-and-drink',
  'culinary-tradition': 'food-and-drink',
  'tapas': 'food-and-drink',
  'wine-bar': 'food-and-drink',
  'portuguese-wine': 'food-and-drink',
  'wine-tour': 'food-and-drink',
  'cafe': 'food-and-drink',
  'cafes': 'food-and-drink',
  'cooking-class': 'food-and-drink',
  // nightlife
  'bars': 'nightlife',
  'bar': 'nightlife',
  'rooftop-bar': 'nightlife',
  'clubs': 'nightlife',
  // fado-music
  'live-music': 'fado-music',
  'music': 'fado-music',
  'dinner-show': 'fado-music',
  // waterfront
  'marine-life': 'waterfront',
  'aquarium': 'waterfront',
  'maritime-history': 'waterfront',
  'naval-heritage': 'waterfront',
  // beaches
  'beach-town': 'beaches',
  'coastal': 'beaches',
  'coastal-town': 'beaches',
  'coastal-destination': 'beaches',
  'surfing': 'beaches',
  'big-wave-surfing': 'beaches',
  'fishing-village': 'beaches',
  // architecture
  'baroque-architecture': 'architecture',
  'baroque': 'architecture',
  'neoclassical': 'architecture',
  'gothic-architecture': 'architecture',
  'manueline-art': 'architecture',
  'modern-architecture': 'architecture',
  'romanesque-architecture': 'architecture',
  'architectural-landmark': 'architecture',
  'bridge': 'architecture',
  'tower': 'architecture',
  // castle
  'fortress': 'castle',
  'medieval': 'castle',
  'medieval-site': 'castle',
  'ruins': 'castle',
  'historic-ruins': 'castle',
  // unesco-site
  'unesco-heritage': 'unesco-site',
  'unesco-world-heritage': 'unesco-site',
  'unesco': 'unesco-site',
  // garden
  'gardens': 'garden',
  'park': 'garden',
  'parks': 'garden',
  'botanical-garden': 'garden',
  'botanical-gardens': 'garden',
  'historic-garden': 'garden',
  'green-space': 'garden',
  'natural-park': 'garden',
  'scientific-garden': 'garden',
  'nature': 'garden',
  'natural-attraction': 'garden',
  'hiking': 'garden',
  'outdoor': 'garden',
  // family-friendly
  'family-attraction': 'family-friendly',
  'family-adventure': 'family-friendly',
  'zoo': 'family-friendly',
  'animals': 'family-friendly',
  'interactive-experience': 'family-friendly',
  // tours-and-experiences
  'guided-tour': 'tours-and-experiences',
  'walking-tour': 'tours-and-experiences',
  'city-tour': 'tours-and-experiences',
  'boat-tour': 'tours-and-experiences',
  'bus-tour': 'tours-and-experiences',
  'bike-tour': 'tours-and-experiences',
  'tuk-tuk-tour': 'tours-and-experiences',
  'segway-tour': 'tours-and-experiences',
  'boat-cruise': 'tours-and-experiences',
  'sunset-tour': 'tours-and-experiences',
  'sightseeing-cruise': 'tours-and-experiences',
  'scenic-tour': 'tours-and-experiences',
  'small-group-tour': 'tours-and-experiences',
  'eco-tour': 'tours-and-experiences',
  'sightseeing': 'tours-and-experiences',
  'hands-on-workshop': 'tours-and-experiences',
  'hands-on-experience': 'tours-and-experiences',
  'hands-on-activity': 'tours-and-experiences',
  'workshop': 'tours-and-experiences',
  'cultural-workshop': 'tours-and-experiences',
  'art-class': 'tours-and-experiences',
  'wildlife-watching': 'tours-and-experiences',
  'nature-experience': 'tours-and-experiences',
  'tram-experience': 'tours-and-experiences',
  'historic-tram': 'tours-and-experiences',
  'scenic-ride': 'tours-and-experiences',
  'funicular': 'tours-and-experiences',
  'cable-car': 'tours-and-experiences',
  // neighborhood
  'historic-district': 'neighborhood',
  'district': 'neighborhood',
  'city-center': 'neighborhood',
  'baixa-district': 'neighborhood',
  'historic-plaza': 'neighborhood',
  'public-square': 'neighborhood',
  'historic-avenue': 'neighborhood',
  'pedestrian-street': 'neighborhood',
  'street-art': 'neighborhood',
  'street-scene': 'neighborhood',
  // shopping
  'bookstores': 'shopping',
  'traditional-craft': 'shopping',
  'souvenir-making': 'shopping',
};

// Former curated categories folded into a broader one (or retired, when null).
export const MERGED_CATEGORIES: Record<string, string | null> = {
  'monument': 'historic-site',
  'architecture': 'historic-site',
  'castle': 'historic-site',
  'unesco-site': 'historic-site',
  'palace': 'historic-site',
  'beaches': 'day-trip',
  'nightlife': 'food-and-drink',
  'shopping': 'neighborhood',
  'waterfront': 'neighborhood',
  'cultural-attraction': null,
  'tours-and-experiences': null,
};

export function canonicalizeCategory(slug: string): string | null {
  const canonical = CATEGORY_ALIASES[slug] ?? slug;
  return canonical in MERGED_CATEGORIES ? MERGED_CATEGORIES[canonical] : canonical;
}

export const CURATED_CATEGORIES: CategoryContent[] = [
  {
    slug: 'historic-site',
    displaySingular: 'historic site',
    displayPlural: 'historic sites',
    title: 'Historic Sites in Lisbon for Cruise Passengers',
    metaDescription:
      'Explore Lisbon’s most important historic sites on a cruise stop, from Alfama’s medieval lanes to Belém’s Age of Discovery landmarks, with times and port directions.',
    icon: 'history_edu',
    intro: [
      'Lisbon wears its history in layers. The Phoenicians traded here, the Romans built here, the Moors fortified the hilltops, and the explorers of the Age of Discovery sailed from the riverbank at Belém to map half the world. A single day ashore is enough to touch several of these eras, because Lisbon’s historic core is compact and much of it sits within walking distance of the cruise terminal at Santa Apolónia.',
      'If your ship docks in the morning, the oldest quarter, Alfama, is literally across the road from the terminal: you can be lost in its medieval alleys within ten minutes of stepping off the gangway. The 1755 earthquake destroyed much of downtown Lisbon, which is why the Baixa district is a grid of elegant Pombaline streets rather than a medieval tangle, and why the sites that survived, like the castle hill and Belém, feel so precious.',
      'Our advice for cruise passengers: pick one era and do it properly. Combine the sites near the terminal on foot, or take tram 15E west to Belém and dedicate half a day to the monuments there. Each listing below includes walking times from the port, realistic visit durations, and tips for getting back to the ship with time to spare.',
    ],
  },
  {
    slug: 'museum',
    displaySingular: 'museum',
    displayPlural: 'museums',
    title: 'Best Museums in Lisbon for a Cruise Day',
    metaDescription:
      'The Lisbon museums worth your limited shore time, covering tiles, coaches, art and archaeology, with visit durations and directions from the cruise terminal.',
    icon: 'museum',
    intro: [
      'Lisbon’s museums are mercifully manageable. Unlike the overwhelming national galleries of Paris or Madrid, most of the city’s best collections can be genuinely enjoyed in 60 to 90 minutes, which makes them realistic candidates for a cruise day rather than an impossible ambition.',
      'The subjects are distinctly Portuguese. Where else will you find an entire museum devoted to azulejos, the painted ceramic tiles that cover the city’s façades, or one of the world’s finest collections of royal coaches? Lisbon’s museums tell the story of a small country that briefly ran a global empire, and the artefacts, from Indian ivories to Chinese porcelain, reflect that reach.',
      'Museums also solve two classic cruise-day problems. On a rainy or scorching day, they are the most comfortable way to spend your hours ashore. And several of the best sit either near the terminal or in Belém alongside the monuments, so you can fold one into a walking route without a dedicated detour. Most close on Mondays, a detail that catches out many cruise visitors, so check the opening days in each listing below before you commit your day to one.',
    ],
  },
  {
    slug: 'viewpoint',
    displaySingular: 'viewpoint',
    displayPlural: 'viewpoints',
    title: 'Lisbon Viewpoints & Miradouros | Best Photo Spots',
    metaDescription:
      'The best miradouros and photo spots in Lisbon for cruise visitors: terrace viewpoints over the rooftops and the Tagus, with walking routes from the port.',
    icon: 'photo_camera',
    intro: [
      'Lisbon is built on hills beside a river so wide the locals call it the Sea of Straw, and the city has turned its topography into an art form. The miradouro, a terrace viewpoint usually shaded by pines and tiled with mosaics, is a Lisbon institution: a place to lean on a railing with a coffee and watch the rooftops fall away to the Tagus below.',
      'For cruise passengers the miradouros are a gift, because the most spectacular ones are free, open at all hours, and concentrated in Alfama and Graça, the neighbourhoods closest to the cruise terminal. You can string three or four of them into a single uphill walk from the ship and be rewarded with a completely different angle over the city at each stop.',
      'Two pieces of practical advice. First, wear proper shoes: the routes to the best views involve steep cobbled lanes and occasional staircases, beautiful but slippery. Second, think about light. Morning sun favours viewpoints facing west over the city, while the river panoramas glow best in the afternoon. If your ship sails in the evening, a sunset miradouro near the terminal makes a perfect final hour ashore, ten minutes’ walk from your gangway.',
    ],
  },
  {
    slug: 'day-trip',
    displaySingular: 'day trip',
    displayPlural: 'day trips',
    title: 'Day Trips from Lisbon Cruise Port: Sintra, Cascais & More',
    metaDescription:
      'Can you do Sintra, Cascais or Óbidos on a cruise stop? Realistic day trips from Lisbon’s cruise port with travel times, transport options and timing advice.',
    icon: 'directions_car',
    intro: [
      'The boldest question a cruise passenger can ask in Lisbon is whether to leave Lisbon at all. Within an hour of the city lie some of Portugal’s most extraordinary places: the fairy-tale palaces of Sintra scattered through misty forested hills, the elegant coastal towns of the Estoril coast, and walled medieval villages that seem frozen in the thirteenth century.',
      'The honest answer is: yes, it can be done, but only with discipline. Sintra, the most tempting target, is around 40 minutes away, and its palaces are spread across steep hills with their own internal transport challenges. A cruise visitor should pick one palace, pre-book tickets, and leave generous margin for the return. The coastal towns are the lower-risk option, with frequent direct trains along a scenic shoreline route.',
      'Every listing in this category states the realistic round-trip time from the cruise terminal, not the optimistic one. As a rule of thumb, do not attempt a day trip unless your ship is in port for at least nine hours, and always plan to be back in central Lisbon two hours before all-aboard. A missed ship costs far more than a second visit to Lisbon ever will.',
    ],
  },
  {
    slug: 'sintra-attractions',
    displaySingular: 'Sintra attraction',
    displayPlural: 'Sintra attractions',
    title: 'Sintra from Lisbon Cruise Port: What You Can Really See',
    metaDescription:
      'Visiting Sintra on a Lisbon cruise stop: which palace to choose, how long the trip really takes from the port, and how to get back to your ship on time.',
    icon: 'castle',
    intro: [
      'Sintra is the day trip every Lisbon cruise passenger agonises over, and with reason. A UNESCO-listed landscape of romantic palaces, Moorish ramparts and exotic gardens draped over green hills, it looks like the invention of a particularly imaginative set designer. Lord Byron called it a glorious Eden, and he had seen a few places.',
      'The catch is logistics. Sintra lies about 30 kilometres from the cruise terminal, and the sights are scattered across steep wooded hills served by winding roads that jam solid in high season. Trying to see everything is how cruise visitors end up sprinting for the gangway. The realistic plan is one palace done well, plus a stroll and lunch in the historic centre, in a round trip of six to seven hours.',
      'Each listing here covers one Sintra highlight with what it costs in time from the ship, not just at the gate. If your port call is shorter than nine hours, consider whether one of Lisbon’s own palaces might scratch the same itch with a fraction of the risk. If you do go, pre-book your palace ticket online and take the train or a pre-arranged driver rather than gambling on queues.',
    ],
  },
  {
    slug: 'religious-site',
    displaySingular: 'church or religious site',
    displayPlural: 'churches and religious sites',
    title: 'Churches & Religious Sites in Lisbon | Cruise Guide',
    metaDescription:
      'Lisbon’s cathedral, monasteries and churches for cruise visitors: what to see, dress codes, opening patterns and walking distances from the cruise port.',
    icon: 'church',
    intro: [
      'Lisbon’s churches chart the city’s whole biography. The fortress-like cathedral was begun in 1147, the year Christian crusaders took the city from the Moors, and has survived every earthquake since. The great monastery at Belém was funded by pepper and cinnamon money and took a century to carve. And the roofless Gothic church in the Chiado stands exactly as the 1755 earthquake left it, kept as a memorial more moving than any museum.',
      'Cruise passengers are well placed for church visits because several of the finest sit on the natural walking routes from the terminal through Alfama and the Baixa. Most churches are free or inexpensive to enter, making them the best-value sightseeing in the city, though the famous monastic cloisters charge admission and reward pre-booked tickets.',
      'Two practicalities. Churches here are working places of worship: shoulders and knees covered is the expected courtesy, and visits may be restricted during Mass, typically Sunday mornings. And do look down as well as up; many of Lisbon’s finest azulejo tile panels line church walls and cloisters, telling saints’ lives in blue and white across entire rooms.',
    ],
  },
  {
    slug: 'food-and-drink',
    displaySingular: 'food and drink experience',
    displayPlural: 'food and drink experiences',
    title: 'Food & Drink in Lisbon: What to Eat on a Cruise Day',
    metaDescription:
      'Pastéis de nata, food halls, ginjinha and proper Portuguese lunches: where cruise passengers should eat and drink in Lisbon, close to the port and beyond.',
    icon: 'restaurant',
    intro: [
      'You could argue, and many Lisboetas would, that lunch is the most important monument in Lisbon. This is a city that queues for custard tarts, debates grilled sardines with theological seriousness, and drinks sour-cherry liqueur from chocolate cups at eleven in the morning without the slightest embarrassment.',
      'A cruise day gives you two or three eating opportunities and they should not be wasted on international café chains. The essentials: a pastel de nata, warm if possible, its custard blistered and its pastry shattering; a proper lunch of fresh fish or the salt-cod dishes Portugal has spent five hundred years perfecting; and a glaça of ginjinha at a hole-in-the-wall counter, a ritual that costs about two euros and takes ninety seconds.',
      'This category gathers markets, food halls, historic bakeries, wine experiences and cooking classes, each with its distance from the cruise terminal. One warning shaped by hard experience: restaurants around the most touristed squares trade heavily on location. The listings below point you a street or two deeper, where the food improves and the bill shrinks. Lunch service runs roughly 12:30 to 15:00, perfectly timed for a shore day.',
    ],
  },
  {
    slug: 'fado-music',
    displaySingular: 'fado or live music venue',
    displayPlural: 'fado and live music venues',
    title: 'Fado in Lisbon: Where Cruise Visitors Can Hear It',
    metaDescription:
      'Fado is Lisbon’s soul set to music. Where cruise passengers can hear authentic fado, including daytime options that fit a port call, plus dinner-show advice.',
    icon: 'music_note',
    intro: [
      'Fado is Lisbon distilled into song: one voice, one or two Portuguese guitars, and an emotion the language calls saudade, a longing for something loved and lost that has no exact translation. UNESCO lists it as intangible cultural heritage. Lisboetas simply consider it theirs, born in the taverns of Alfama and Mouraria, the very neighbourhoods that rise behind the cruise terminal.',
      'The traditional fado house format is an evening dinner with performances between courses, which suits passengers whose ships stay late or overnight. But cruise visitors on a standard port day are not shut out: Lisbon offers museum performances, daytime shows and cultural experiences built around fado that fit comfortably inside an afternoon, and several are listed below.',
      'Wherever you hear it, one piece of etiquette matters above all: silence during the songs. The audience talks between numbers, never during them, and waiters pause their service. When the lights dim and someone whispers "silêncio, que se vai cantar o fado", put down your fork. Even without understanding a word of Portuguese, you will understand the song; that is rather the point of fado.',
    ],
  },
  {
    slug: 'garden',
    displaySingular: 'park or garden',
    displayPlural: 'parks and gardens',
    title: 'Parks, Gardens & Green Escapes in Lisbon | Cruise Guide',
    metaDescription:
      'Where Lisbon breathes: botanical gardens, viewpoint parks and green escapes for cruise passengers who need shade, quiet or a picnic between monuments.',
    icon: 'park',
    intro: [
      'Every cruise itinerary needs a pressure valve, and in Lisbon the gardens are it. This is a city of pocket parks tucked between hills, of botanical collections seeded by an empire that shipped home plants from five continents, and of shaded miradouro gardens where the reward for a steep climb is a bench, a kiosk coffee and a view over the rooftops to the river.',
      'The imperial history makes these gardens unusually interesting. Portuguese ships returned not just with spices but with seeds and specimens, and Lisbon’s botanical gardens became living catalogues of the tropics, with dragon trees, giant palms and hothouse collections that predate most of Europe’s. Some gardens double as open-air museums, with peacocks, tiled pavilions and centuries-old specimen trees.',
      'For cruise passengers, gardens work best as strategic pauses: a shaded hour between monument visits in summer, a picnic stop with market supplies, or a gentle option for a day when your legs have already done Alfama’s hills. Nearly all are free or cost a couple of euros. The listings note which gardens sit on natural walking routes from the terminal, so the green break costs you no detour at all.',
    ],
  },
  {
    slug: 'family-friendly',
    displaySingular: 'family-friendly attraction',
    displayPlural: 'family-friendly attractions',
    title: 'Lisbon with Kids: Family Attractions for Cruise Day',
    metaDescription:
      'Cruising to Lisbon with children? The aquarium, tram rides, castles and interactive museums that actually work for families on a one-day port call.',
    icon: 'family_restroom',
    intro: [
      'Lisbon is an underrated family port. It has one of the world’s finest aquariums, a castle with real battlements and resident peacocks, rattling vintage trams that children treat as fairground rides, and a food culture whose signature dish is, essentially, a custard tart. Few cities bribe young visitors so effectively.',
      'The trick on a cruise day is pacing. Lisbon’s hills and cobbles tire small legs quickly, so the family-tested formula is one big anchor attraction, one ride, and generous snack stops, rather than an adult-style monument marathon. The attractions in this category are chosen because they genuinely hold children’s attention, not merely tolerate them.',
      'Logistics for parents: the Oceanarium sits in the flat, modern Parque das Nações district, a 10 to 15 minute taxi from the terminal, with a cable car and gardens alongside, an easy self-contained half day. Pushchairs struggle on Alfama’s steps and cobbles, so a baby carrier serves better in the old town. Portuguese restaurants welcome children as a matter of course, and most attractions offer family tickets; details are in each listing below.',
    ],
  },
  {
    slug: 'neighborhood',
    displaySingular: 'neighbourhood',
    displayPlural: 'neighbourhoods',
    title: 'Lisbon Neighbourhoods to Explore on a Cruise Stop',
    metaDescription:
      'Alfama, Baixa, Chiado and beyond: which Lisbon neighbourhoods to explore on foot from the cruise terminal, and how to string them into one walking day.',
    icon: 'location_city',
    intro: [
      'Ask anyone who loves Lisbon for their favourite sight and they will more likely name a neighbourhood than a monument. This is a city best consumed by district: Alfama’s laundry-strung medieval maze, the Baixa’s grand earthquake-proof avenues, Chiado’s bookshops and café elegance, each a few minutes from the next yet distinct in character, sound and even smell.',
      'Cruise passengers hold the best cards here, because the terminal sits directly below Alfama, the oldest and most atmospheric quarter of all. You can walk off the ship and into the eleventh century in ten minutes, no transport required. From there, a natural route descends through the cathedral quarter to the riverfront square, up through the Baixa grid and into Chiado, covering four neighbourhoods in a single unhurried morning.',
      'The listings in this category treat each neighbourhood as an attraction in its own right, with suggested walking routes, the landmarks and viewpoints inside each one, and honest notes on hills and cobblestones. Getting slightly lost is part of the Alfama experience and entirely safe by day; downhill always leads back towards the river, and the river leads back to your ship.',
    ],
  },
];

export function getCuratedCategory(slug: string): CategoryContent | undefined {
  return CURATED_CATEGORIES.find((c) => c.slug === slug);
}
