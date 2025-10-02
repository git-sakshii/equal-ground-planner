// Google Maps Service Functions

export interface Location {
  lat: number;
  lng: number;
}

export interface LocationWithMode extends Location {
  transportMode: 'DRIVING' | 'WALKING' | 'TRANSIT' | 'BICYCLING';
}

/**
 * Reverse geocode coordinates to get formatted address
 */
export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  const geocoder = new google.maps.Geocoder();
  const latlng = { lat, lng };

  return new Promise((resolve, reject) => {
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        resolve(results[0].formatted_address);
      } else {
        reject('Geocoding failed');
      }
    });
  });
}

/**
 * Calculate geographic midpoint using Cartesian coordinates
 */
export function calculateGeographicMidpoint(locations: Location[]): Location {
  if (locations.length === 0) {
    throw new Error('No locations provided');
  }

  const toRadians = (deg: number) => (deg * Math.PI) / 180;
  const toDegrees = (rad: number) => (rad * 180) / Math.PI;

  let x = 0, y = 0, z = 0;

  locations.forEach(loc => {
    const latRad = toRadians(loc.lat);
    const lngRad = toRadians(loc.lng);

    x += Math.cos(latRad) * Math.cos(lngRad);
    y += Math.cos(latRad) * Math.sin(lngRad);
    z += Math.sin(latRad);
  });

  const total = locations.length;
  x = x / total;
  y = y / total;
  z = z / total;

  const centralLng = Math.atan2(y, x);
  const centralSquareRoot = Math.sqrt(x * x + y * y);
  const centralLat = Math.atan2(z, centralSquareRoot);

  return {
    lat: toDegrees(centralLat),
    lng: toDegrees(centralLng)
  };
}

/**
 * Calculate travel time between two points
 */
export async function calculateTravelTime(
  origin: Location,
  destination: Location,
  mode: 'DRIVING' | 'WALKING' | 'TRANSIT' | 'BICYCLING'
): Promise<{ duration: number; durationText: string; distance: number; distanceText: string }> {
  const directionsService = new google.maps.DirectionsService();

  return new Promise((resolve, reject) => {
    directionsService.route(
      {
        origin: new google.maps.LatLng(origin.lat, origin.lng),
        destination: new google.maps.LatLng(destination.lat, destination.lng),
        travelMode: google.maps.TravelMode[mode],
      },
      (result, status) => {
        if (status === 'OK' && result?.routes[0]) {
          const leg = result.routes[0].legs[0];
          resolve({
            duration: leg.duration?.value || 0,
            durationText: leg.duration?.text || '0 min',
            distance: leg.distance?.value || 0,
            distanceText: leg.distance?.text || '0 km',
          });
        } else {
          reject(`Unable to calculate route: ${status}`);
        }
      }
    );
  });
}

/**
 * Calculate time-equitable midpoint by iteratively adjusting for fairness
 */
export async function calculateTimeEquitableMidpoint(
  locations: LocationWithMode[],
  maxIterations: number = 3
): Promise<{ 
  midpoint: Location; 
  travelTimes: Array<{ duration: number; durationText: string; distance: number; distanceText: string }>;
  fairnessScore: number;
}> {
  let currentMidpoint = calculateGeographicMidpoint(locations);

  for (let i = 0; i < maxIterations; i++) {
    const travelTimes = await Promise.all(
      locations.map(loc =>
        calculateTravelTime(loc, currentMidpoint, loc.transportMode)
      )
    );

    const durations = travelTimes.map(t => t.duration);
    const maxTime = Math.max(...durations);
    const minTime = Math.min(...durations);
    const difference = maxTime - minTime;

    // If fair enough (within 5 minutes), stop
    if (difference < 300) {
      const fairnessScore = calculateFairnessScore(durations);
      return { midpoint: currentMidpoint, travelTimes, fairnessScore };
    }

    // Adjust midpoint toward person with longest travel
    const longestIndex = durations.indexOf(maxTime);
    const longestLocation = locations[longestIndex];

    currentMidpoint = {
      lat: currentMidpoint.lat + (longestLocation.lat - currentMidpoint.lat) * 0.2,
      lng: currentMidpoint.lng + (longestLocation.lng - currentMidpoint.lng) * 0.2
    };
  }

  const finalTimes = await Promise.all(
    locations.map(loc =>
      calculateTravelTime(loc, currentMidpoint, loc.transportMode)
    )
  );

  const fairnessScore = calculateFairnessScore(finalTimes.map(t => t.duration));
  return { midpoint: currentMidpoint, travelTimes: finalTimes, fairnessScore };
}

/**
 * Calculate fairness score (0-100) based on time variance
 */
function calculateFairnessScore(durations: number[]): number {
  if (durations.length === 0) return 100;
  
  const maxTime = Math.max(...durations);
  const minTime = Math.min(...durations);
  const difference = maxTime - minTime;

  // Convert difference (in seconds) to score
  // 0-3 min = 100, 3-7 min = 80, 7-12 min = 60, >12 min = 40
  if (difference < 180) return 100;
  if (difference < 420) return 80;
  if (difference < 720) return 60;
  return 40;
}

/**
 * Calculate distance between two points using Haversine formula
 */
export function calculateDistance(point1: Location, point2: Location): number {
  const R = 6371; // Earth radius in km
  const toRadians = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRadians(point2.lat - point1.lat);
  const dLon = toRadians(point2.lng - point1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(point1.lat)) *
    Math.cos(toRadians(point2.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10;
}

/**
 * Get fairness badge based on score
 */
export function getFairnessBadge(score: number): { label: string; icon: string; color: string } {
  if (score >= 90) return { label: 'Perfectly Fair', icon: '✅', color: 'text-green-600' };
  if (score >= 70) return { label: 'Very Fair', icon: '👍', color: 'text-green-500' };
  if (score >= 50) return { label: 'Acceptable', icon: '⚖️', color: 'text-yellow-500' };
  return { label: 'Slightly Unfair', icon: '⚠️', color: 'text-orange-500' };
}
