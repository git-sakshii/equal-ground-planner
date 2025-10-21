import { MapPin, Timer, Vote, Cloud, Filter } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedCard from "./AnimatedCard";

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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            The smartest way to find fair meetup spots for groups
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr">
          {/* Large card - spans 2 columns on desktop */}
          <AnimatedCard delay={0.1} className="md:col-span-2">
            <div className="group bg-glass-bg backdrop-blur-xl border border-glass-border rounded-3xl p-8 hover:shadow-primary h-full"
          >
            <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${features[0].gradient} mb-6 group-hover:scale-110 transition-transform duration-500`}>
              {features[0].icon}
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">{features[0].title}</h3>
            <p className="text-lg text-white/70">{features[0].description}</p>
            
              {/* Animated visual */}
              <div className="mt-8 flex items-center justify-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center"
                >
                  <span className="text-primary font-bold">18m</span>
                </motion.div>
                <div className="text-white/40">—</div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-accent flex items-center justify-center shadow-primary"
                >
                  <MapPin className="w-8 h-8 text-white" />
                </motion.div>
                <div className="text-white/40">—</div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
                  className="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center"
                >
                  <span className="text-accent font-bold">20m</span>
                </motion.div>
              </div>
            </div>
          </AnimatedCard>

          {/* Small cards */}
          {features.slice(1, 3).map((feature, index) => (
            <AnimatedCard key={feature.title} delay={0.2 + index * 0.1}>
              <div className="group bg-glass-bg backdrop-blur-xl border border-glass-border rounded-3xl p-6 hover:shadow-glow h-full">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/70">{feature.description}</p>
              </div>
            </AnimatedCard>
          ))}

          {/* Medium cards */}
          {features.slice(3).map((feature, index) => (
            <AnimatedCard key={feature.title} delay={0.4 + index * 0.1}>
              <div className="group bg-glass-bg backdrop-blur-xl border border-glass-border rounded-3xl p-6 hover:shadow-glow h-full">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/70">{feature.description}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* Final CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-block bg-gradient-to-r from-primary via-primary-glow to-accent rounded-3xl p-12 shadow-primary"
          >
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Stop arguing. Start meeting.
            </h3>
            <p className="text-white/80 mb-8 text-lg">
              Free forever. No sign-up needed.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary px-8 py-4 rounded-2xl font-semibold text-lg shadow-large"
            >
              Get Started
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesBento;