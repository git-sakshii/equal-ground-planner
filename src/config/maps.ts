// Google Maps API Configuration
// Get your API key from: https://console.cloud.google.com/
// Enable: Maps JavaScript API, Places API, Directions API, Geocoding API

export const GOOGLE_MAPS_CONFIG = {
  apiKey: "YOUR_GOOGLE_MAPS_API_KEY_HERE", // Replace with your actual API key
  libraries: ["places", "geometry"],
  id: "google-map-script",
};

// Map styling for a clean, modern look
export const MAP_STYLES = [
  {
    featureType: "poi.business",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
];

export const DEFAULT_MAP_OPTIONS = {
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
  styles: MAP_STYLES,
};
