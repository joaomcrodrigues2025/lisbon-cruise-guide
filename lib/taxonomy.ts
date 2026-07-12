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

export function canonicalizeCategory(slug: string): string {
  return CATEGORY_ALIASES[slug] ?? slug;
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
    slug: 'monument',
    displaySingular: 'monument',
    displayPlural: 'monuments',
    title: 'Monuments & Memorials in Lisbon | Cruise Guide',
    metaDescription:
      'Lisbon’s great monuments, from the Tower of Belém to the Monument to the Discoveries, ranked for cruise visitors with visit times and directions from the port.',
    icon: 'account_balance',
    intro: [
      'Few European capitals put on a show of monuments quite like Lisbon. The city’s golden age, when Portuguese carracks returned from India and Brazil laden with spices and gold, paid for extravagant stonework you can still visit today. The signature style is Manueline: ropes, armillary spheres and sea creatures carved into limestone, celebrating an empire built on the ocean.',
      'For cruise passengers, the monuments cluster in two zones. Belém, about 25 to 30 minutes west of the cruise terminal by tram 15E or taxi, holds the icons every visitor recognises. Central Lisbon has its own set, including grand squares and the national pantheon, which sits close enough to the terminal to visit on foot before the crowds arrive.',
      'A practical note on timing: the most famous monuments draw long queues from mid-morning, especially in summer when several ships are in port at once. If a monument is high on your list, make it your first stop of the day rather than your last, and check whether an exterior view alone satisfies you; several of Lisbon’s monuments are more impressive outside than in, which can save you an hour of queuing on a tight ship schedule.',
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
    slug: 'cultural-attraction',
    displaySingular: 'cultural attraction',
    displayPlural: 'cultural attractions',
    title: 'Cultural Attractions in Lisbon for Cruise Visitors',
    metaDescription:
      'Lisbon culture beyond the monuments: creative quarters, historic cafés, cultural centres and living traditions you can experience in a single day ashore.',
    icon: 'theater_comedy',
    intro: [
      'There is a Lisbon of monuments, and then there is the Lisbon that Lisboetas actually live in: the historic cafés where writers argued over bica coffee, the converted factories now full of studios and bookshops, the theatres, the tile workshops, the crafts passed down through generations. This category collects the places where you experience Portuguese culture as a living thing rather than an exhibit.',
      'Cruise passengers often skip cultural attractions on the assumption that they demand more time than a port day allows. In Lisbon the opposite is true. A creative quarter can be wandered in an hour, a historic café visited in twenty minutes, and each delivers a more personal memory than another queue at a famous ticket office.',
      'These experiences also mix well with the rest of your day. Most of the venues below sit inside or beside the districts you will already be exploring, Chiado, Baixa, Alfama and the riverside, so treat this list as a set of detours to weave between bigger sights. Where a venue runs timed events or performances, we flag the schedule in the listing so you can check it against your all-aboard time.',
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
    slug: 'palace',
    displaySingular: 'palace',
    displayPlural: 'palaces',
    title: 'Palaces in and around Lisbon for Cruise Passengers',
    metaDescription:
      'From riverside royal residences to Sintra’s hilltop fantasies: the palaces cruise visitors can actually reach from the Lisbon terminal, with times and tips.',
    icon: 'castle',
    intro: [
      'Portugal ran an empire from Lisbon for the better part of five centuries, and its royals and aristocrats built accordingly. The palaces that survive range from restrained riverside residences, where the last kings lived until the monarchy ended in 1910, to the flamboyant hilltop fantasies of Sintra that seem to defy both gravity and good taste in the most delightful way.',
      'For a cruise visitor, the crucial distinction is geography. Some palaces sit within Greater Lisbon and can be reached in under half an hour from the cruise terminal, making them a comfortable half-day outing. The Sintra palaces are a full expedition, spectacular but demanding, and covered in detail in our Sintra and day-trip guides.',
      'Palace interiors in Portugal are gloriously excessive: gilded thrones rooms, walls of blue-and-white azulejo tiles, ceilings painted with magpies and swans for reasons that come with excellent stories. Guided visits typically take 60 to 90 minutes. Most palaces close one day a week, commonly Monday or Wednesday, and the popular ones sell timed tickets, so check the listing details below and book ahead rather than losing shore time in a queue.',
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
    slug: 'nightlife',
    displaySingular: 'bar or nightlife spot',
    displayPlural: 'bars and nightlife spots',
    title: 'Lisbon Bars & Nightlife for Cruise Passengers',
    metaDescription:
      'In port late or overnight in Lisbon? Rooftop bars, riverside terraces and the Bairro Alto: how cruise passengers can taste the city’s nightlife safely.',
    icon: 'local_bar',
    intro: [
      'Most cruise passengers see Lisbon by daylight, but ships increasingly stay into the evening or overnight, and that changes everything. Lisbon at night is arguably the more authentic city: the day-trippers vanish, the light turns golden, and the town settles into the long, sociable evenings that Portuguese life is actually built around.',
      'The classic evening progression is simple. Start with a sunset drink at a rooftop or riverside bar, many of which face the Tagus and the ships at anchor, your own vessel possibly among them. Then dinner, which locals begin at 20:00 at the earliest. Afterwards, the Bairro Alto neighbourhood turns into a street party of tiny bars where the crowd drinks outside on the cobbles, at its best from about 22:00.',
      'Practical notes for ship passengers: the areas listed here are busy and generally safe, but keep an eye on belongings in crowds, agree taxi or app fares before boarding, and know your route back to the terminal, which is a short ride from the nightlife districts. Every listing includes the distance back to the port so you can enjoy the evening with your all-aboard time firmly in mind.',
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
    slug: 'waterfront',
    displaySingular: 'waterfront attraction',
    displayPlural: 'waterfront attractions',
    title: 'Lisbon Waterfront & the Tagus | Cruise Passenger Guide',
    metaDescription:
      'The Tagus riverfront is Lisbon’s front door: waterside promenades, the Oceanarium and maritime sights, with walking access straight from the cruise terminal.',
    icon: 'water',
    intro: [
      'Lisbon has always faced the water. The Tagus estuary here is so vast that first-time visitors regularly mistake it for the open sea, and everything that made the city rich and famous, the spice fleets, the explorers, the trade with four continents, came and went across it. Your cruise ship is simply the latest vessel in a five-hundred-year procession.',
      'This gives cruise passengers a rare advantage: you are already on the waterfront the moment you disembark. The riverside promenade runs from the terminal through the grandest square in the city and, with time or a tram, all the way to Belém, where the caravels once departed. Walking even part of it delivers Lisbon’s essential views with no ticket required.',
      'The waterfront also holds some of the city’s most modern attractions, including the Parque das Nações district built for Expo 98 and its world-class Oceanarium, reachable by a short taxi or metro ride east of the terminal. Between the historic riverside and the contemporary east end, this category suits passengers who want maximum Lisbon with minimal uphill walking; it is, unusually for this city, almost entirely flat.',
    ],
  },
  {
    slug: 'beaches',
    displaySingular: 'beach or coastal escape',
    displayPlural: 'beaches and coastal escapes',
    title: 'Beaches & Coastal Towns near Lisbon Cruise Port',
    metaDescription:
      'Yes, you can reach a real Atlantic beach on a Lisbon cruise stop. Cascais, the Estoril coast and beyond, with train times and back-to-ship planning.',
    icon: 'beach_access',
    intro: [
      'It surprises many cruise passengers to learn that Lisbon is a beach city. Within 40 minutes of the terminal, the Estoril coast unrolls a chain of golden Atlantic beaches ending at Cascais, a former fishing village turned elegant resort where Europe’s exiled royalty spent the twentieth century. The train ride there, hugging the shoreline for half its length, is one of the great cheap scenic journeys of Europe.',
      'A beach excursion suits a particular kind of port day: your second visit to Lisbon, a scorching August call, or simply a preference for sea air over museum queues. Cascais itself offers more than sand, with a walkable old town, a dramatic clifftop blowhole, seafood lunches and a genteel promenade, so the trip works even for confirmed non-swimmers.',
      'Practicalities: the Atlantic here is refreshing, which is a polite word for cold, and the surf beaches further out are for watching rather than casual swimming. Trains run frequently through the day. As with any excursion outside the city, give yourself a two-hour buffer before all-aboard, and remember that summer weekends bring Lisboetas to the same beaches in force; a weekday call is your friend.',
    ],
  },
  {
    slug: 'architecture',
    displaySingular: 'architectural landmark',
    displayPlural: 'architectural landmarks',
    title: 'Lisbon Architecture: Manueline to Modern | Cruise Guide',
    metaDescription:
      'A cruise visitor’s guide to Lisbon’s architecture: Manueline stone ropes, Pombaline grids, azulejo façades and bold modern landmarks, with walking routes.',
    icon: 'domain',
    intro: [
      'Lisbon is an open-air textbook of architecture with a plot twist at its centre. On the morning of 1 November 1755, one of history’s most powerful earthquakes, followed by a tsunami and days of fire, erased most of the medieval city. What Lisbon built afterwards, the Baixa’s rational grid of prefabricated, earthquake-resistant buildings, was Europe’s first modern planned city centre, decades ahead of its time.',
      'That is why Lisbon’s architecture reads as before and after. Before: the Manueline masterpieces of Belém, where carved stone ropes and sea monsters celebrate the Age of Discovery, and the stubborn medieval survivor that is the cathedral. After: elegant Pombaline streets, tiled façades in every shade of blue and green, and eventually the daring modern statements along the river.',
      'For cruise passengers, architecture is the sightseeing that requires no tickets and no queues; the city itself is the exhibit. The listings below pick out the individual landmarks most worth a detour, each with its distance from the terminal. Look up constantly, and look at the ground too: the black-and-white calçada mosaic pavements underfoot are hand-laid, centuries-old, and a Lisbon signature all their own.',
    ],
  },
  {
    slug: 'castle',
    displaySingular: 'castle or fortress',
    displayPlural: 'castles and fortresses',
    title: 'Castles & Fortresses in Lisbon | Cruise Visitor Guide',
    metaDescription:
      'From São Jorge Castle above the port to Moorish walls and river forts: Lisbon’s castles ranked for cruise passengers, with climbs, views and timing advice.',
    icon: 'fort',
    intro: [
      'A castle crowns Lisbon, visible from your ship’s deck the moment you sail up the Tagus. The hilltop above the cruise terminal has been fortified for well over two thousand years, by Iberians, Romans and Moors in turn, before Portugal’s first king took it in 1147 with the help of a passing crusader fleet. The battlements you climb today have watched every ship arrive since.',
      'For cruise passengers, the castles in this category conveniently ascend in difficulty. The main castle is a steep but rewarding walk, or a short tuk-tuk ride, directly up from the terminal, and its ramparts deliver the definitive view over the city, the river and your own ship below. Further afield, Moorish walls snake along Sintra’s ridgetops and stout little forts guard the river approaches, each with its own listing and logistics.',
      'Timing advice from experience: castles here are open-air sites with limited shade, so summer visitors should go early, wear real shoes for the polished-stone ramparts, and carry water. Early also beats the tour groups, which arrive from mid-morning. Allow ninety minutes to two hours for the main castle including the climb, peacock encounters included at no extra charge.',
    ],
  },
  {
    slug: 'unesco-site',
    displaySingular: 'UNESCO site',
    displayPlural: 'UNESCO sites',
    title: 'UNESCO World Heritage Sites near Lisbon Cruise Port',
    metaDescription:
      'The UNESCO World Heritage sites within reach of a Lisbon cruise call, in Belém and Sintra: what earned the listing and how to visit them in a day.',
    icon: 'workspace_premium',
    intro: [
      'A Lisbon port call puts two full UNESCO World Heritage inscriptions within reach, which is generous for a single day ashore. In Belém, the monastery and tower were listed together for their Manueline architecture, the exuberant maritime Gothic that Portugal invented to celebrate the voyages of Vasco da Gama. In Sintra, an entire cultural landscape of palaces, gardens and mist-wrapped hills carries the inscription.',
      'The two make very different demands on your day. Belém is straightforward: 25 to 30 minutes from the cruise terminal by tram or taxi, flat, and walkable between its monuments, a comfortable half-day even with a custard-tart stop, which in Belém is practically mandatory. Sintra is an expedition of six hours minimum, covered honestly in our day-trip guides.',
      'Beyond the formal inscriptions, Lisbon’s fado music holds UNESCO intangible heritage status, meaning you can round off a World Heritage day with a World Heritage song. Each listing below explains what earned the recognition and, more practically for a cruise passenger, how long the visit truly takes door to door from the ship, queues included.',
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
    slug: 'tours-and-experiences',
    displaySingular: 'tour or experience',
    displayPlural: 'tours and experiences',
    title: 'Best Tours & Experiences in Lisbon for Cruise Passengers',
    metaDescription:
      'Tuk-tuks, historic trams, walking tours, boat trips and hands-on workshops: the Lisbon tours that fit a cruise schedule, and how to book them safely.',
    icon: 'tour',
    intro: [
      'There is a strong case for taking a tour in Lisbon even if you never normally would. The city’s stories, of earthquakes and explorers, dictators and revolutions carried out with carnations in rifle barrels, are better told than read. And the hills that exhaust walkers are precisely what tuk-tuks, vintage trams and funiculars were made for.',
      'The options range from the famous number 28 tram, a public bus route that happens to be one of Europe’s great sightseeing rides, to guided food walks, river cruises timed for sunset, tile-painting workshops and cooking classes where you earn your lunch. Most run two to three hours, which slots neatly into a port day with time left over for independent wandering.',
      'For cruise passengers, the golden rule is to book with your ship’s schedule in mind: morning departures are safer than afternoon ones, and reputable operators will confirm return times in writing. Tuk-tuk drivers around the terminal negotiate; agree the price and duration before boarding. Each listing below states duration, starting point and distance from the port so you can build a day that ends calmly at the gangway rather than at a run.',
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
  {
    slug: 'shopping',
    displaySingular: 'shopping experience',
    displayPlural: 'shopping experiences',
    title: 'Shopping in Lisbon: What Cruise Passengers Should Buy',
    metaDescription:
      'Skip the fridge magnets: cork, azulejo tiles, canned fish in beautiful wrappers and the world’s oldest bookshop. A cruise passenger’s Lisbon shopping guide.',
    icon: 'shopping_bag',
    intro: [
      'Lisbon shopping rewards those who skip the souvenir shops nearest the terminal and walk ten minutes further. Portugal makes beautiful things: cork turned into everything from handbags to shoes, hand-painted azulejo tiles, soap and stationery from pharmacies and printers that have not changed their packaging in a century, and canned sardines dressed in wrappers so lovely they double as gifts.',
      'The shopping districts are conveniently the sightseeing districts. Chiado mixes historic shops, including the world’s oldest operating bookshop, with Portuguese fashion; the Baixa’s grid still hosts single-trade streets where glove shops and haberdashers survive from another era; and the food halls and delicatessens solve every edible-gift question in one stop.',
      'Practical notes for cruise shoppers: most shops open around 10:00, so plan purchases for mid-morning onwards; smaller traditional shops may close for lunch. Tinned fish, wine and ceramics all travel well in checked luggage, and shops accustomed to visitors will wrap tiles properly for transit. Non-EU residents can reclaim VAT on larger purchases with a passport; ask for the tax-free form at the till and allow a few extra minutes at your final EU airport.',
    ],
  },
];

export function getCuratedCategory(slug: string): CategoryContent | undefined {
  return CURATED_CATEGORIES.find((c) => c.slug === slug);
}
