import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VENUE_CATEGORIES } from "@/services/venueService";
import { Filter, X } from "lucide-react";

interface FilterBarProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  openNow: boolean;
  onOpenNowChange: (value: boolean) => void;
  maxDistance: number;
  onMaxDistanceChange: (value: number) => void;
  minRating: number;
  onMinRatingChange: (value: number) => void;
}

const FilterBar = ({
  selectedCategories,
  onCategoryChange,
  openNow,
  onOpenNowChange,
  maxDistance,
  onMaxDistanceChange,
  minRating,
  onMinRatingChange,
}: FilterBarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCategory = (categoryKey: string) => {
    if (categoryKey === 'all') {
      onCategoryChange(['all']);
    } else {
      const newCategories = selectedCategories.includes(categoryKey)
        ? selectedCategories.filter(c => c !== categoryKey)
        : [...selectedCategories.filter(c => c !== 'all'), categoryKey];
      
      onCategoryChange(newCategories.length > 0 ? newCategories : ['all']);
    }
  };

  const activeFiltersCount = 
    (openNow ? 1 : 0) + 
    (maxDistance < 5 ? 1 : 0) + 
    (minRating > 3.5 ? 1 : 0) +
    (selectedCategories.length > 0 && !selectedCategories.includes('all') ? 1 : 0);

  return (
    <div className="space-y-4 mb-6">
      {/* Category Chips */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(VENUE_CATEGORIES).map(([key, category]) => {
          const isSelected = selectedCategories.includes(key);
          return (
            <Button
              key={key}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => toggleCategory(key)}
              className="gap-2"
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </Button>
          );
        })}

        {/* Filters Sheet (Mobile/Additional Filters) */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            
            <div className="mt-6 space-y-6">
              {/* Open Now Toggle */}
              <div className="flex items-center justify-between">
                <Label htmlFor="open-now" className="text-base">Open Now</Label>
                <Switch 
                  id="open-now"
                  checked={openNow} 
                  onCheckedChange={onOpenNowChange}
                />
              </div>

              {/* Distance Slider */}
              <div className="space-y-3">
                <Label className="text-base">
                  Maximum Distance: {maxDistance.toFixed(1)} km
                </Label>
                <Slider
                  value={[maxDistance]}
                  onValueChange={(value) => onMaxDistanceChange(value[0])}
                  min={0.5}
                  max={5}
                  step={0.5}
                  className="w-full"
                />
              </div>

              {/* Minimum Rating */}
              <div className="space-y-3">
                <Label className="text-base">
                  Minimum Rating: {minRating}+
                </Label>
                <div className="flex gap-2">
                  {[3.5, 4.0, 4.5].map((rating) => (
                    <Button
                      key={rating}
                      variant={minRating === rating ? "default" : "outline"}
                      size="sm"
                      onClick={() => onMinRatingChange(rating)}
                    >
                      {rating}+
                    </Button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <Button 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => {
                    onCategoryChange(['all']);
                    onOpenNowChange(false);
                    onMaxDistanceChange(5);
                    onMinRatingChange(3.5);
                  }}
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear All Filters
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default FilterBar;
