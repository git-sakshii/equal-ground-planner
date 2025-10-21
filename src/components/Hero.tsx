import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-16">
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
          {/* Main Headline - Ultra bold */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 animate-fade-in-up leading-[1.1] tracking-tight">
            Meet in the{" "}
            <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              Middle
            </span>
            .
          </h1>

          {/* Subheadline - Large and light */}
          <p className="text-2xl sm:text-3xl md:text-4xl text-white/60 font-light mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
            Fair for everyone.
          </p>

          {/* Short punchy copy */}
          <p className="text-base sm:text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.15s", animationFillMode: "both" }}>
            Smart location finder for groups. No more arguments about where to meet.
          </p>

          {/* CTA Button - Large gradient pill */}
          <Button
            onClick={() => navigate("/find-meetup")}
            variant="gradient"
            size="xl"
            className="animate-scale-in group font-semibold"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            Find Your Spot
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>

          {/* Trust indicators - Modernized */}
          <div className="mt-16 sm:mt-20 flex flex-wrap items-center justify-center gap-6 sm:gap-10 animate-fade-in" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
            <div className="flex items-center gap-2.5 text-white/80">
              <div className="w-2 h-2 bg-success rounded-full shadow-glow animate-pulse" style={{ boxShadow: '0 0 8px hsl(var(--success))' }} />
              <span className="text-sm sm:text-base font-medium">Free to use</span>
            </div>
            <div className="flex items-center gap-2.5 text-white/80">
              <div className="w-2 h-2 bg-success rounded-full shadow-glow animate-pulse" style={{ boxShadow: '0 0 8px hsl(var(--success))', animationDelay: '0.5s' }} />
              <span className="text-sm sm:text-base font-medium">No sign-up required</span>
            </div>
            <div className="flex items-center gap-2.5 text-white/80">
              <div className="w-2 h-2 bg-success rounded-full shadow-glow animate-pulse" style={{ boxShadow: '0 0 8px hsl(var(--success))', animationDelay: '1s' }} />
              <span className="text-sm sm:text-base font-medium">Privacy-first</span>
            </div>
          </div>
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
