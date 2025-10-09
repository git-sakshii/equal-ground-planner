import { useState, useEffect } from "react";
import VenueCard from "./VenueCard";
import FilterBar from "./FilterBar";
import { Venue } from "@/services/venueService";
import { calculateDistance } from "@/services/mapsService";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin } from "lucide-react";

interface VenueListProps {
  venues: Venue[];
  midpoint: { lat: number; lng: number };
  loading: boolean;
  onVenueSelect: (venue: Venue) => void;
}

const VenueList = ({ venues, midpoint, loading, onVenueSelect }: VenueListProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [openNow, setOpenNow] = useState(false);
  const [maxDistance, setMaxDistance] = useState(5);
  const [minRating, setMinRating] = useState(3.5);
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>(venues);

  useEffect(() => {
    let filtered = [...venues];

    // Category filter
    if (!selectedCategories.includes('all') && selectedCategories.length > 0) {
      filtered = filtered.filter(venue => 
        venue.types.some(type => 
          selectedCategories.some(cat => type.includes(cat))
        )
      );
    }

    // Open now filter
    if (openNow) {
      filtered = filtered.filter(venue => venue.isOpen === true);
    }

    // Distance filter
    filtered = filtered.filter(venue => {
      const distance = calculateDistance(midpoint, { lat: venue.lat, lng: venue.lng });
      return distance <= maxDistance;
    });

    // Rating filter
    filtered = filtered.filter(venue => venue.rating >= minRating);

    setFilteredVenues(filtered);
  }, [venues, selectedCategories, openNow, maxDistance, minRating, midpoint]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-40 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MapPin className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">
          {filteredVenues.length > 0 
            ? `🎉 Found ${filteredVenues.length} great places!`
            : 'No venues match your filters'
          }
        </h2>
      </div>

      <FilterBar
        selectedCategories={selectedCategories}
        onCategoryChange={setSelectedCategories}
        openNow={openNow}
        onOpenNowChange={setOpenNow}
        maxDistance={maxDistance}
        onMaxDistanceChange={setMaxDistance}
        minRating={minRating}
        onMinRatingChange={setMinRating}
      />

      {filteredVenues.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground mb-2">😔 No venues found</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or expanding the search radius
          </p>
        </div>
      )}

      <div className="space-y-4">
        {filteredVenues.map((venue) => (
          <VenueCard
            key={venue.placeId}
            venue={venue}
            midpoint={midpoint}
            onSelect={onVenueSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default VenueList;
