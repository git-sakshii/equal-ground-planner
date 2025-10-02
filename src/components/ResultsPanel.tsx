import { CheckCircle, Navigation, Car, Train, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFairnessBadge } from "@/services/mapsService";

interface ResultsPanelProps {
  locations: Array<{ id: string; address: string; transportMode: string }>;
  midpointAddress: string;
  travelTimes: Array<{ duration: number; durationText: string; distance: number; distanceText: string }>;
  fairnessScore: number;
  onReset: () => void;
}

const transportIcons = {
  DRIVING: Car,
  WALKING: Navigation,
  TRANSIT: Train,
  BICYCLING: Bike,
};

const ResultsPanel = ({
  locations,
  midpointAddress,
  travelTimes,
  fairnessScore,
  onReset,
}: ResultsPanelProps) => {
  const fairnessBadge = getFairnessBadge(fairnessScore);
  const maxDuration = Math.max(...travelTimes.map(t => t.duration));
  const totalDistance = travelTimes.reduce((sum, t) => sum + t.distance, 0) / 1000; // Convert to km

  return (
    <div className="bg-card rounded-3xl shadow-large p-6 sm:p-8 animate-slide-in space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-1">Perfect Spot Found!</h2>
          <p className="text-muted-foreground">{midpointAddress}</p>
        </div>
      </div>

      {/* Fairness Badge */}
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border-2 ${
        fairnessScore >= 70 ? 'border-green-500' : fairnessScore >= 50 ? 'border-yellow-500' : 'border-orange-500'
      }`}>
        <span className="text-2xl">{fairnessBadge.icon}</span>
        <span className={`font-semibold ${fairnessBadge.color}`}>{fairnessBadge.label}</span>
        {fairnessScore < 100 && (
          <span className="text-sm text-muted-foreground">
            ({Math.max(...travelTimes.map(t => t.duration)) - Math.min(...travelTimes.map(t => t.duration))} sec difference)
          </span>
        )}
      </div>

      {/* Travel Times */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Travel Time Breakdown
        </h3>
        {locations.map((location, index) => {
          const Icon = transportIcons[location.transportMode as keyof typeof transportIcons] || Car;
          const travelTime = travelTimes[index];
          const percentage = (travelTime.duration / maxDuration) * 100;

          return (
            <div key={location.id} className="space-y-1 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">👤 Person {index + 1}</span>
                  {index === 0 && <span className="text-xs text-muted-foreground">(You)</span>}
                </div>
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{travelTime.durationText}</span>
                  <span className="text-muted-foreground">· {travelTime.distanceText}</span>
                </div>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Total Distance</p>
          <p className="text-2xl font-bold">{totalDistance.toFixed(1)} km</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Fairness Score</p>
          <p className="text-2xl font-bold">{fairnessScore}/100</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          className="flex-1 h-12 bg-gradient-to-r from-primary to-primary-glow"
          onClick={() => {
            // TODO: Navigate to venues page in Part 3
            console.log("Find venues clicked");
          }}
        >
          Find Venues Nearby
        </Button>
        <Button variant="outline" className="flex-1 h-12" onClick={onReset}>
          Adjust Locations
        </Button>
      </div>
    </div>
  );
};

export default ResultsPanel;
