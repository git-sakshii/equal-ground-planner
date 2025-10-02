import { GoogleMap, Marker, Polyline, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";
import { DEFAULT_MAP_OPTIONS } from "@/config/maps";
import { Location } from "@/services/mapsService";

interface MapViewProps {
  locations: Array<{ id: string; address: string; lat: number; lng: number; transportMode: string }>;
  midpoint: Location;
  midpointAddress: string;
  travelTimes: Array<{ duration: number; durationText: string }>;
}

const personColors = [
  "#3b82f6", // Blue
  "#a855f7", // Purple
  "#ec4899", // Pink
  "#f97316", // Orange
  "#14b8a6", // Teal
  "#ef4444", // Red
];

const MapView = ({ locations, midpoint, midpointAddress, travelTimes }: MapViewProps) => {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [showRoutes, setShowRoutes] = useState(true);

  const mapCenter = midpoint || locations[0];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Map View</h3>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={showRoutes}
            onChange={(e) => setShowRoutes(e.target.checked)}
            className="rounded border-border"
          />
          Show routes
        </label>
      </div>

      <div className="rounded-2xl overflow-hidden shadow-large">
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "500px",
          }}
          center={mapCenter}
          zoom={12}
          options={DEFAULT_MAP_OPTIONS}
        >
          {/* Person Markers */}
          {locations.map((location, index) => (
            <Marker
              key={location.id}
              position={{ lat: location.lat, lng: location.lng }}
              label={{
                text: String(index + 1),
                color: "white",
                fontSize: "14px",
                fontWeight: "bold",
              }}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 12,
                fillColor: personColors[index],
                fillOpacity: 1,
                strokeColor: "white",
                strokeWeight: 2,
              }}
              onClick={() => setSelectedMarker(location.id)}
            >
              {selectedMarker === location.id && (
                <InfoWindow onCloseClick={() => setSelectedMarker(null)}>
                  <div className="p-2">
                    <p className="font-semibold">Person {index + 1}</p>
                    <p className="text-sm text-muted-foreground">{location.address}</p>
                    {travelTimes[index] && (
                      <p className="text-sm font-medium mt-1">
                        🕐 {travelTimes[index].durationText}
                      </p>
                    )}
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}

          {/* Midpoint Marker */}
          <Marker
            position={midpoint}
            label={{
              text: "★",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 14,
              fillColor: "#10b981",
              fillOpacity: 1,
              strokeColor: "white",
              strokeWeight: 3,
            }}
            onClick={() => setSelectedMarker("midpoint")}
          >
            {selectedMarker === "midpoint" && (
              <InfoWindow onCloseClick={() => setSelectedMarker(null)}>
                <div className="p-2">
                  <p className="font-semibold">Midpoint</p>
                  <p className="text-sm text-muted-foreground">{midpointAddress}</p>
                </div>
              </InfoWindow>
            )}
          </Marker>

          {/* Route Polylines */}
          {showRoutes &&
            locations.map((location, index) => (
              <Polyline
                key={`route-${location.id}`}
                path={[
                  { lat: location.lat, lng: location.lng },
                  midpoint,
                ]}
                options={{
                  strokeColor: personColors[index],
                  strokeOpacity: 0.7,
                  strokeWeight: 3,
                  geodesic: true,
                }}
              />
            ))}
        </GoogleMap>
      </div>
    </div>
  );
};

export default MapView;
