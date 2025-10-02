import { Clock, Sparkles, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Clock,
    title: "Fair Travel Time",
    description:
      "Calculate time-equitable midpoints, not just distance. Everyone travels the same duration.",
  },
  {
    icon: Sparkles,
    title: "Aesthetic Filters",
    description:
      "Find Instagrammable cafes, cozy spots, or nature vibes. Filter by ambience, not just ratings.",
  },
  {
    icon: Users,
    title: "Group Voting",
    description:
      "Share with friends, vote together, decide fairly. No more endless group chat debates.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Why HalfwayMeet?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meeting shouldn't be complicated. We make it fair, fun, and fast.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="p-8 transition-all duration-300 hover:shadow-large hover:-translate-y-1 border-border/50 group animate-fade-in-up"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: "both" 
                }}
              >
                <div className="mb-4 inline-flex p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary-glow/10 group-hover:from-primary/20 group-hover:to-primary-glow/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
