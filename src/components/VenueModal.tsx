import { useEffect, useState } from "react";
import { X, Star, MapPin, Phone, Globe, ExternalLink, Clock, Navigation } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getVenueDetails, VenueDetails, getPriceLevelText } from "@/services/venueService";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface VenueModalProps {
  placeId: string | null;
  onClose: () => void;
}

const VenueModal = ({ placeId, onClose }: VenueModalProps) => {
  const [venue, setVenue] = useState<VenueDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  useEffect(() => {
    if (!placeId) return;

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const details = await getVenueDetails(placeId);
        setVenue(details);
      } catch (error) {
        toast.error("Unable to load venue details");
        onClose();
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [placeId, onClose]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }
    const emptyStars = 5 - fullStars;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }
    return stars;
  };

  return (
    <Dialog open={!!placeId} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : venue ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl sm:text-3xl font-bold pr-8">
                {venue.name}
              </DialogTitle>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <div className="flex gap-1">
                  {renderStars(venue.rating)}
                </div>
                <span className="font-semibold">{venue.rating}</span>
                <span className="text-muted-foreground">
                  ({venue.userRatingsTotal} reviews)
                </span>
                {venue.isOpen !== undefined && (
                  <Badge variant={venue.isOpen ? "default" : "secondary"}>
                    {venue.isOpen ? 'Open Now' : 'Closed'}
                  </Badge>
                )}
              </div>
            </DialogHeader>

            {/* Photo Gallery */}
            {venue.photos && venue.photos.length > 0 && (
              <div className="space-y-3">
                <img
                  src={venue.photos[selectedPhoto]}
                  alt={venue.name}
                  className="w-full h-64 sm:h-96 object-cover rounded-lg"
                />
                {venue.photos.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {venue.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`${venue.name} ${index + 1}`}
                        className={`w-20 h-20 object-cover rounded cursor-pointer border-2 transition-all ${
                          selectedPhoto === index ? 'border-primary' : 'border-transparent'
                        }`}
                        onClick={() => setSelectedPhoto(index)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
                <TabsTrigger value="hours" className="flex-1">Hours</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm">{venue.address}</p>
                    </div>
                  </div>

                  {venue.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                      <a href={`tel:${venue.phone}`} className="text-sm text-primary hover:underline">
                        {venue.phone}
                      </a>
                    </div>
                  )}

                  {venue.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-muted-foreground" />
                      <a 
                        href={venue.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        Visit Website
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}

                  {venue.priceLevel !== undefined && (
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">Price Level:</span>
                      <span>{getPriceLevelText(venue.priceLevel)}</span>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4 mt-4">
                {venue.reviews && venue.reviews.length > 0 ? (
                  <>
                    {venue.reviews.map((review, index) => (
                      <div key={index} className="border-b pb-4 last:border-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{review.author_name}</span>
                          <div className="flex gap-0.5">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.text}</p>
                      </div>
                    ))}
                    {venue.googleMapsUrl && (
                      <a
                        href={venue.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm flex items-center gap-1"
                      >
                        Read more on Google Maps
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </>
                ) : (
                  <p className="text-muted-foreground">No reviews available</p>
                )}
              </TabsContent>

              <TabsContent value="hours" className="mt-4">
                {venue.hours && venue.hours.length > 0 ? (
                  <div className="space-y-2">
                    {venue.hours.map((hours, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{hours}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Hours not available</p>
                )}
              </TabsContent>
            </Tabs>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
              <Button 
                className="flex-1"
                onClick={() => {
                  window.open(venue.googleMapsUrl, '_blank');
                }}
              >
                <Navigation className="w-4 h-4 mr-2" />
                Open in Google Maps
              </Button>
              <Button 
                variant="outline"
                className="flex-1"
                onClick={() => {
                  navigator.clipboard.writeText(venue.address);
                  toast.success("Address copied to clipboard");
                }}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Copy Address
              </Button>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default VenueModal;
