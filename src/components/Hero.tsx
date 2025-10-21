import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Suspense, lazy } from "react";
import FloatingElements from "./FloatingElements";

const Hero3D = lazy(() => import("./Hero3D"));

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-16">
      {/* 3D Background Element */}
      <div className="absolute inset-0 opacity-30">
        <Suspense fallback={null}>
          <Hero3D />
        </Suspense>
      </div>

      {/* Floating animated icons */}
      <FloatingElements />

      {/* Enhanced background with multiple layers */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary-glow/5 to-accent/10 animate-pulse" style={{ animationDuration: '8s' }} />
        
        {/* Floating orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s', animationDuration: '10s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-primary-glow/10 rounded-full blur-3xl" />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Headline - Ultra bold with animation */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight"
          >
            Meet in the{" "}
            <motion.span
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent"
              style={{ backgroundSize: "200% 200%" }}
            >
              Middle
            </motion.span>
            .
          </motion.h1>

          {/* Subheadline - Large and light */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-2xl sm:text-3xl md:text-4xl text-white/60 font-light mb-4"
          >
            Fair for everyone.
          </motion.p>

          {/* Short punchy copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-base sm:text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto"
          >
            Smart location finder for groups. No more arguments about where to meet.
          </motion.p>

          {/* CTA Button - Large gradient pill with animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => navigate("/find-meetup")}
              variant="gradient"
              size="xl"
              className="group font-semibold"
            >
              Find Your Spot
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </motion.div>

          {/* Trust indicators - Animated */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 sm:mt-20 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
          >
            {[
              { text: "Free to use", delay: 0 },
              { text: "No sign-up required", delay: 0.1 },
              { text: "Privacy-first", delay: 0.2 },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + item.delay }}
                className="flex items-center gap-2.5 text-white/80"
              >
                <div className="w-2 h-2 bg-success rounded-full shadow-glow animate-pulse" style={{ boxShadow: '0 0 8px hsl(var(--success))', animationDelay: `${index * 0.5}s` }} />
                <span className="text-sm sm:text-base font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Enhanced wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
            className="drop-shadow-2xl"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
