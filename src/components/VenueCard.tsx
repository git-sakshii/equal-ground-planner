import { MapPin, Star, Clock, Navigation } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Venue, getPriceLevelText } from "@/services/venueService";
import { calculateDistance } from "@/services/mapsService";

interface VenueCardProps {
  venue: Venue;
  midpoint: { lat: number; lng: number };
  onSelect: (venue: Venue) => void;
}

const VenueCard = ({ venue, midpoint, onSelect }: VenueCardProps) => {
  const distance = calculateDistance(midpoint, { lat: venue.lat, lng: venue.lng });
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    return stars;
  };

  return (
    <Card 
      className="flex flex-col sm:flex-row overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fade-in"
      onClick={() => onSelect(venue)}
    >
      {/* Image Section */}
      <div className="w-full sm:w-40 h-40 sm:h-auto flex-shrink-0 relative bg-muted">
        {venue.photo ? (
          <img 
            src={venue.photo} 
            alt={venue.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            {venue.types[0] === 'cafe' ? '☕' : 
             venue.types[0] === 'restaurant' ? '🍽️' :
             venue.types[0] === 'park' ? '🌳' :
             venue.types[0] === 'bar' ? '🍺' : '📍'}
          </div>
        )}
        {venue.isOpen !== undefined && (
          <Badge 
            variant={venue.isOpen ? "default" : "secondary"}
            className="absolute top-2 left-2 text-xs"
          >
            {venue.isOpen ? 'Open' : 'Closed'}
          </Badge>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 p-4 sm:p-6">
        <div className="flex flex-col h-full">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{venue.name}</h3>
            
            <div className="flex items-center gap-2 mb-2">
              <div className="flex gap-0.5">
                {renderStars(venue.rating)}
              </div>
              <span className="text-sm font-medium">{venue.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({venue.userRatingsTotal})
              </span>
            </div>

            <div className="flex items-start gap-2 text-sm text-muted-foreground mb-2">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">{venue.address}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1">
                <Navigation className="w-4 h-4" />
                {distance.toFixed(1)} km
              </span>
              {venue.priceLevel !== undefined && (
                <span>{getPriceLevelText(venue.priceLevel)}</span>
              )}
            </div>
          </div>

          {/* Travel Times */}
          {venue.travelTimes && venue.travelTimes.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {venue.travelTimes.map((time, index) => (
                  <Badge 
                    key={index}
                    variant="secondary"
                    className="text-xs"
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    Person {index + 1}: {time.durationText}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Button 
            className="w-full mt-4" 
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(venue);
            }}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default VenueCard;
