import { MapPin, Timer, Sparkles, Vote, Cloud, Filter } from "lucide-react";

const FeaturesBento = () => {
  const features = [
    {
      icon: <Timer className="w-8 h-8" />,
      title: "Fair in Seconds",
      description: "Time-equitable midpoints, not just distance. Everyone's time matters equally.",
      size: "large",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: <Vote className="w-6 h-6" />,
      title: "Vote Together",
      description: "Share link, vote on venues, decide democratically.",
      size: "small",
      gradient: "from-accent to-pink-500",
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Weather-Smart",
      description: "Auto-suggests indoor spots when raining.",
      size: "small",
      gradient: "from-blue-400 to-cyan-400",
    },
    {
      icon: <Filter className="w-6 h-6" />,
      title: "Vibe Filters",
      description: "Find places by aesthetic: cozy, instagrammable, nature, lively...",
      size: "medium",
      gradient: "from-purple-400 to-pink-400",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Smart Discovery",
      description: "Finds cafes, restaurants, parks nearby with ratings and reviews.",
      size: "medium",
      gradient: "from-emerald-400 to-teal-400",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            The smartest way to find fair meetup spots for groups
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr">
          {/* Large card - spans 2 columns on desktop */}
          <div
            className="group md:col-span-2 bg-glass-bg backdrop-blur-xl border border-glass-border rounded-3xl p-8 hover:-translate-y-2 transition-all duration-500 hover:shadow-primary"
          >
            <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${features[0].gradient} mb-6 group-hover:scale-110 transition-transform duration-500`}>
              {features[0].icon}
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">{features[0].title}</h3>
            <p className="text-lg text-white/70">{features[0].description}</p>
            
            {/* Animated visual */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center animate-pulse">
                <span className="text-primary font-bold">18m</span>
              </div>
              <div className="text-white/40">—</div>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-accent flex items-center justify-center shadow-primary">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div className="text-white/40">—</div>
              <div className="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center animate-pulse" style={{ animationDelay: '0.5s' }}>
                <span className="text-accent font-bold">20m</span>
              </div>
            </div>
          </div>

          {/* Small cards */}
          {features.slice(1, 3).map((feature, index) => (
            <div
              key={feature.title}
              className={`group bg-glass-bg backdrop-blur-xl border border-glass-border rounded-3xl p-6 hover:-translate-y-2 transition-all duration-500 hover:shadow-${index === 0 ? 'primary' : 'glow'}`}
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-500`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-white/70">{feature.description}</p>
            </div>
          ))}

          {/* Medium cards */}
          {features.slice(3).map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-glass-bg backdrop-blur-xl border border-glass-border rounded-3xl p-6 hover:-translate-y-2 transition-all duration-500 hover:shadow-glow"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-500`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Final CTA Section */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-gradient-to-r from-primary via-primary-glow to-accent rounded-3xl p-12 shadow-primary">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Stop arguing. Start meeting.
            </h3>
            <p className="text-white/80 mb-8 text-lg">
              Free forever. No sign-up needed.
            </p>
            <button className="bg-white text-primary px-8 py-4 rounded-2xl font-semibold text-lg hover:scale-105 transition-transform duration-300 shadow-large">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesBento;