import { useState, useRef } from "react";
import { MapPin, Plus, X, Car, Navigation, Train, Bike } from "lucide-react";
import { Autocomplete } from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import MapView from "@/components/MapView";
import ResultsPanel from "@/components/ResultsPanel";
import VenueList from "@/components/VenueList";
import VenueModal from "@/components/VenueModal";
import WeatherWidget from "@/components/WeatherWidget";
import {
  reverseGeocode,
  calculateTimeEquitableMidpoint,
  Location,
  LocationWithMode,
  calculateTravelTime,
} from "@/services/mapsService";
import { searchNearbyVenues, processVenues, Venue, formatDuration } from "@/services/venueService";

type TransportMode = "DRIVING" | "WALKING" | "TRANSIT" | "BICYCLING";

interface LocationInput {
  id: string;
  address: string;
  lat?: number;
  lng?: number;
  transportMode: TransportMode;
}

const transportModes = [
  { value: "DRIVING" as TransportMode, icon: Car, label: "Driving" },
  { value: "WALKING" as TransportMode, icon: Navigation, label: "Walking" },
  { value: "TRANSIT" as TransportMode, icon: Train, label: "Transit" },
  { value: "BICYCLING" as TransportMode, icon: Bike, label: "Cycling" },
];

const FindMeetup = () => {
  const [locations, setLocations] = useState<LocationInput[]>([
    { id: "1", address: "", transportMode: "DRIVING" },
    { id: "2", address: "", transportMode: "DRIVING" },
  ]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [midpoint, setMidpoint] = useState<Location | null>(null);
  const [midpointAddress, setMidpointAddress] = useState("");
  const [travelTimes, setTravelTimes] = useState<any[]>([]);
  const [fairnessScore, setFairnessScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loadingVenues, setLoadingVenues] = useState(false);
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);
  
  const autocompleteRefs = useRef<{ [key: string]: google.maps.places.Autocomplete | null }>({});

  const addLocation = () => {
    if (locations.length < 6) {
      setLocations([
        ...locations,
        {
          id: Date.now().toString(),
          address: "",
          transportMode: "DRIVING",
        },
      ]);
    } else {
      toast.error("Maximum 6 people allowed");
    }
  };

  const removeLocation = (id: string) => {
    if (locations.length > 2) {
      setLocations(locations.filter((loc) => loc.id !== id));
      const newErrors = { ...errors };
      delete newErrors[id];
      setErrors(newErrors);
    }
  };

  const updateLocation = (id: string, field: keyof LocationInput, value: any) => {
    setLocations(
      locations.map((loc) =>
        loc.id === id ? { ...loc, [field]: value } : loc
      )
    );
    if (errors[id] && field === "address" && value.length >= 3) {
      const newErrors = { ...errors };
      delete newErrors[id];
      setErrors(newErrors);
    }
  };

  const onPlaceChanged = (id: string) => {
    const autocomplete = autocompleteRefs.current[id];
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const address = place.formatted_address || place.name || "";
        
        setLocations(
          locations.map((loc) =>
            loc.id === id
              ? { ...loc, address, lat, lng }
              : loc
          )
        );

        const newErrors = { ...errors };
        delete newErrors[id];
        setErrors(newErrors);
        
        toast.success("Location set ✓");
      }
    }
  };

  const validateAndSubmit = async () => {
    const newErrors: Record<string, string> = {};
    
    const validLocations = locations.filter(loc => loc.lat && loc.lng && loc.address.length >= 3);
    
    if (validLocations.length < 2) {
      toast.error("Please enter at least 2 valid locations");
      return;
    }

    setLoading(true);
    setShowResults(false);

    try {
      toast.info("Calculating fair midpoint...");
      
      const locationsWithMode: LocationWithMode[] = validLocations.map(loc => ({
        lat: loc.lat!,
        lng: loc.lng!,
        transportMode: loc.transportMode,
      }));

      const result = await calculateTimeEquitableMidpoint(locationsWithMode);
      
      const address = await reverseGeocode(result.midpoint.lat, result.midpoint.lng);
      
      setMidpoint(result.midpoint);
      setMidpointAddress(address);
      setTravelTimes(result.travelTimes);
      setFairnessScore(result.fairnessScore);
      setShowResults(true);
      
      toast.success("Perfect spot found!");
      
      // Search for venues near the midpoint
      await searchVenues(result.midpoint, validLocations);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Error calculating midpoint:", error);
      toast.error("Unable to calculate midpoint. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const searchVenues = async (midpointLocation: Location, validLocations: LocationInput[]) => {
    setLoadingVenues(true);
    try {
      toast.info("Finding great places nearby...");
      
      // Search for cafes by default
      const rawVenues = await searchNearbyVenues(midpointLocation, 2000, 'cafe');
      const processed = processVenues(rawVenues, midpointLocation);
      
      // Calculate travel times for each venue for each person
      const venuesWithTravelTimes = await Promise.all(
        processed.map(async (venue) => {
          const travelTimes = await Promise.all(
            validLocations.map(async (loc) => {
              const result = await calculateTravelTime(
                { lat: loc.lat!, lng: loc.lng! },
                { lat: venue.lat, lng: venue.lng },
                loc.transportMode
              );
              return {
                duration: result.duration,
                durationText: result.durationText
              };
            })
          );
          return { ...venue, travelTimes };
        })
      );
      
      setVenues(venuesWithTravelTimes);
      toast.success(`Found ${venuesWithTravelTimes.length} venues!`);
    } catch (error) {
      console.error("Error searching venues:", error);
      toast.error("Unable to find venues. Showing map only.");
    } finally {
      setLoadingVenues(false);
    }
  };

  const resetResults = () => {
    setShowResults(false);
    setMidpoint(null);
    setMidpointAddress("");
    setTravelTimes([]);
    setFairnessScore(0);
    setVenues([]);
  };

  const useCurrentLocation = async (id: string) => {
    if ("geolocation" in navigator) {
      toast.info("Getting location...");
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            toast.info("Getting address...");
            const address = await reverseGeocode(latitude, longitude);
            
            setLocations(
              locations.map((loc) =>
                loc.id === id
                  ? { ...loc, address, lat: latitude, lng: longitude }
                  : loc
              )
            );
            
            const newErrors = { ...errors };
            delete newErrors[id];
            setErrors(newErrors);
            
            toast.success(`Location set to: ${address}`);
          } catch (error) {
            updateLocation(id, "address", `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`);
            updateLocation(id, "lat", latitude);
            updateLocation(id, "lng", longitude);
            toast.success("Location detected ✓");
          }
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            toast.error("Location permission denied. Please enter manually.");
          } else {
            toast.error("Could not get location. Please enter manually.");
          }
        }
      );
    } else {
      toast.error("Location not supported by your browser");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-3xl shadow-large p-6 sm:p-12 animate-fade-in">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Where is everyone coming from?
              </h1>
              <p className="text-muted-foreground">
                Enter locations to find your perfect meetup spot
              </p>
            </div>

            {/* Location Inputs */}
            <div className="space-y-6 mb-8">
              {locations.map((location, index) => (
                <div
                  key={location.id}
                  className="space-y-3 animate-slide-in"
                >
                  <div className="flex items-center justify-between">
                    <Label className="font-semibold text-base">
                      Person {index + 1}
                    </Label>
                    {locations.length > 2 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLocation(location.id)}
                        className="h-8 text-destructive hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                    <Autocomplete
                      onLoad={(autocomplete) => {
                        autocompleteRefs.current[location.id] = autocomplete;
                      }}
                      onPlaceChanged={() => onPlaceChanged(location.id)}
                      options={{
                        types: ["geocode", "establishment"],
                      }}
                    >
                      <Input
                        placeholder="Enter address, city, or landmark"
                        value={location.address}
                        onChange={(e) =>
                          updateLocation(location.id, "address", e.target.value)
                        }
                        className={`pl-12 h-14 text-base ${
                          errors[location.id]
                            ? "border-destructive"
                            : location.lat && location.lng
                            ? "border-green-500"
                            : ""
                        }`}
                      />
                    </Autocomplete>
                    {location.address && (
                      <button
                        onClick={() => {
                          updateLocation(location.id, "address", "");
                          updateLocation(location.id, "lat", undefined);
                          updateLocation(location.id, "lng", undefined);
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground z-10"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {index === 0 && (
                    <button
                      onClick={() => useCurrentLocation(location.id)}
                      className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
                    >
                      <MapPin className="w-4 h-4" />
                      Use My Current Location
                    </button>
                  )}

                  {errors[location.id] && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      {errors[location.id]}
                    </p>
                  )}

                  {/* Transport Mode Selector */}
                  <div className="flex flex-wrap gap-2">
                    {transportModes.map((mode) => {
                      const Icon = mode.icon;
                      return (
                        <button
                          key={mode.value}
                          onClick={() =>
                            updateLocation(
                              location.id,
                              "transportMode",
                              mode.value
                            )
                          }
                          className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border transition-all ${
                            location.transportMode === mode.value
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background text-foreground border-border hover:border-primary/50"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{mode.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Add Person Button */}
            {locations.length < 6 && (
              <Button
                variant="outline"
                onClick={addLocation}
                className="w-full mb-6 h-12 border-primary/30 text-primary hover:bg-primary/5"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another Person
              </Button>
            )}

            {/* Submit Button */}
            <Button
              onClick={validateAndSubmit}
              disabled={loading || locations.filter(l => l.lat && l.lng && l.address.length >= 3).length < 2}
              className="w-full h-14 text-base bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:shadow-primary transition-all disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Finding the perfect spot...
                </span>
              ) : (
                "Find Midpoint & Venues"
              )}
            </Button>

            {/* Privacy Note */}
            <p className="text-xs text-muted-foreground text-center mt-4">
              Locations stored locally on your device only
            </p>
          </div>
        </div>

        {/* Results Section */}
        {showResults && midpoint && (
          <div id="results-section" className="max-w-7xl mx-auto space-y-6">
            <ResultsPanel
              locations={locations.filter(l => l.lat && l.lng)}
              midpointAddress={midpointAddress}
              travelTimes={travelTimes}
              fairnessScore={fairnessScore}
              onReset={resetResults}
            />
            
            {/* Weather Widget */}
            <WeatherWidget lat={midpoint.lat} lng={midpoint.lng} />
            
            {/* Map and Venues Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="order-2 lg:order-1">
                <MapView
                  locations={locations.filter(l => l.lat && l.lng) as any}
                  midpoint={midpoint}
                  midpointAddress={midpointAddress}
                  travelTimes={travelTimes}
                />
              </div>
              
              <div className="order-1 lg:order-2">
                <VenueList
                  venues={venues}
                  midpoint={midpoint}
                  loading={loadingVenues}
                  onVenueSelect={(venue) => setSelectedVenueId(venue.placeId)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Venue Details Modal */}
        <VenueModal
          placeId={selectedVenueId}
          onClose={() => setSelectedVenueId(null)}
        />
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground">
              Calculating fair midpoint...
            </p>
            <p className="text-sm text-muted-foreground">
              This usually takes 5-10 seconds
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindMeetup;
