export interface Attraction {
  id: string;
  name: string;
  tagline: string;
  type: string;
  categories: string[];

  description: {
    short: string;
    full: string;
    history?: string;
    significance?: string;
  };

  location: {
    address: {
      street: string;
      postal_code: string;
      neighborhood: string;
      city: string;
      region: string;
      country: string;
    };
    coordinates: {
      latitude: number;
      longitude: number;
    };
    directions: {
      general: string;
      fromCruisePort: string;
      publicTransport: string;
      parking: string;
    };
    distanceFromCruisePort: {
      meters: number;
      walkingTime: string;
      drivingTime: string;
    };
  };

  contact: {
    phone: string;
    email: string;
    website: string;
    bookingUrl?: string | null;
    socialMedia: {
      facebook?: string | null;
      twitter?: string | null;
      instagram?: string | null;
    };
  };

  visitingInformation: {
    openingTimes: {
      currentStatus: string;
      seasonal: Array<{
        season: string;
        days: string;
        hours: string;
        lastAdmission?: string;
        notes?: string;
      }>;
      closedDates: string[];
    };
    admissionPrices: {
      currency: string;
      adult: number;
      youth?: number;
      child?: number;
      senior?: number;
      family?: number;
      lisboaCardFree?: boolean;
      comboTicket?: string;
      notes: string;
    };
    averageVisitDuration: string;
    bestTimeToVisit: string;
    busyPeriods: string[];
    adviceForVisitors: string;
  };

  cruisePassengerInfo: {
    idealForCruisePassengers: boolean;
    timeNeededFromPort: string;
    accessibility: string;
    combinableWith: string[];
    tips: string[];
  };

  features: {
    highlights: string[];
    facilities: string[];
    accessibility: {
      wheelchairAccessible: boolean;
      mobilityNotes: string;
      visualAidServices: boolean;
      hearingAidServices: boolean;
    };
    languages: string[];
  };

  images: {
    heroImage: {
      url: string;
      alt: string;
      caption: string;
    };
    gallery: Array<{
      url: string;
      alt: string;
      caption: string;
    }>;
  };

  nearbyAttractions: Array<{
    name: string;
    distance: string;
    type: string;
    walkingTime?: string;
  }>;

  tags: string[];
  suitableFor: string[];
  weatherDependent: boolean;
  indoorActivities: boolean;
  outdoorActivities: boolean;
  priceRange: string;
  rating: number;
  reviewCount: number;
  reviewSource: string;
}
