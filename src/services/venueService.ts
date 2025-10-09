export interface Venue {
  placeId: string;
  name: string;
  address: string;
  rating: number;
  userRatingsTotal: number;
  priceLevel?: number;
  types: string[];
  photo?: string;
  isOpen?: boolean;
  lat: number;
  lng: number;
  distance?: number;
  travelTimes?: Array<{ duration: number; durationText: string }>;
}

export interface VenueDetails extends Venue {
  phone?: string;
  website?: string;
  hours?: string[];
  reviews?: any[];
  photos?: string[];
  googleMapsUrl?: string;
}

export const VENUE_CATEGORIES = {
  all: { label: 'All', type: '', icon: '🎯' },
  cafe: { label: 'Cafes', type: 'cafe', icon: '☕' },
  restaurant: { label: 'Restaurants', type: 'restaurant', icon: '🍽️' },
  bar: { label: 'Bars', type: 'bar', icon: '🍺' },
  park: { label: 'Parks', type: 'park', icon: '🌳' },
  library: { label: 'Study Spots', type: 'library', icon: '📚' },
  mall: { label: 'Shopping', type: 'shopping_mall', icon: '🛍️' },
  museum: { label: 'Museums', type: 'museum', icon: '🏛️' },
};

export async function searchNearbyVenues(
  midpoint: { lat: number; lng: number },
  radius: number = 2000,
  type: string = 'cafe'
): Promise<any[]> {
  const service = new google.maps.places.PlacesService(
    document.createElement('div')
  );

  return new Promise((resolve, reject) => {
    service.nearbySearch(
      {
        location: new google.maps.LatLng(midpoint.lat, midpoint.lng),
        radius: radius,
        type: type || undefined,
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          resolve(results);
        } else {
          reject('No venues found');
        }
      }
    );
  });
}

export function processVenues(venues: any[], midpoint: { lat: number; lng: number }): Venue[] {
  return venues
    .filter(venue => venue.rating && venue.rating >= 3.5)
    .map(venue => ({
      placeId: venue.place_id,
      name: venue.name,
      address: venue.vicinity,
      rating: venue.rating,
      userRatingsTotal: venue.user_ratings_total || 0,
      priceLevel: venue.price_level,
      types: venue.types || [],
      photo: venue.photos?.[0]?.getUrl({ maxWidth: 400 }),
      isOpen: venue.opening_hours?.open_now,
      lat: venue.geometry.location.lat(),
      lng: venue.geometry.location.lng(),
    }))
    .sort((a, b) => {
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return b.userRatingsTotal - a.userRatingsTotal;
    })
    .slice(0, 15);
}

export async function getVenueDetails(placeId: string): Promise<VenueDetails> {
  const service = new google.maps.places.PlacesService(
    document.createElement('div')
  );

  return new Promise((resolve, reject) => {
    service.getDetails(
      {
        placeId: placeId,
        fields: [
          'place_id',
          'name',
          'formatted_address',
          'formatted_phone_number',
          'website',
          'opening_hours',
          'reviews',
          'photos',
          'price_level',
          'rating',
          'user_ratings_total',
          'url',
          'geometry',
          'types',
          'vicinity'
        ]
      },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          resolve({
            placeId: place.place_id!,
            name: place.name!,
            address: place.formatted_address || place.vicinity || '',
            phone: place.formatted_phone_number,
            website: place.website,
            hours: place.opening_hours?.weekday_text,
            isOpen: place.opening_hours?.open_now,
            reviews: place.reviews?.slice(0, 5),
            photos: place.photos?.map(p => p.getUrl({ maxWidth: 800 })),
            priceLevel: place.price_level,
            rating: place.rating || 0,
            userRatingsTotal: place.user_ratings_total || 0,
            googleMapsUrl: place.url,
            lat: place.geometry?.location?.lat() || 0,
            lng: place.geometry?.location?.lng() || 0,
            types: place.types || [],
          });
        } else {
          reject('Unable to fetch venue details');
        }
      }
    );
  });
}

export function formatDuration(seconds: number): string {
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

export function getPriceLevelText(level?: number): string {
  if (level === undefined) return 'N/A';
  return '💰'.repeat(level || 1);
}
