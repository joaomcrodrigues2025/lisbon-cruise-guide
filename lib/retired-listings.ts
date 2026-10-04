// Commercial tour/workshop listings removed from the directory; their JSON lives in data-retired/
// and their URLs redirect to the editorial tours guide.
export const RETIRED_LISTINGS = [
  'azulejo-tile-painting-workshop',
  'bacalhau-cooking-class',
  'cork-workshop',
  'dolphin-watching-tour',
  'hop-on-hop-off-bus-tour',
  'lisbon-bike-tour',
  'lisbon-food-tour',
  'lisbon-tuk-tuk-tour',
  'pastel-de-nata-cooking-class',
  'port-wine-tasting-experience',
  'portuguese-wine-tasting-tour',
  'segway-tour',
  'tagus-river-sunset-cruise',
];

// Duplicate or closed listings folded into another one: old id -> surviving id
export const MERGED_LISTINGS: Record<string, string> = {
  'miradouro-da-graca': 'miradouro-da-senhora-do-monte',
  // Closed since the Glória funicular accident (Sept 2025), no reopening date
  'elevador-da-bica': 'chiado',
  // Same site as the Convento do Carmo listing
  'carmo-archaeological-museum': 'convento-do-carmo',
};

// Destinations too far for a cruise call, covered instead by one editorial guide
export const DAY_TRIP_GUIDE = '/guides/lisbon-day-trips-cruise-call';
export const DAY_TRIP_LISTINGS = [
  'evora',
  'mosteiro-da-batalha',
  'santuario-de-fatima',
  'nazare',
  'obidos',
  'parque-natural-da-arrabida',
];
