import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Users, Clock, Sparkles } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in-up">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                About HalfwayMeet
              </h1>
              <p className="text-xl text-muted-foreground">
                Making meetups fair, simple, and enjoyable for everyone
              </p>
            </div>

            {/* Story */}
            <div className="prose prose-lg max-w-none mb-16 animate-fade-in">
              <div className="bg-card rounded-2xl p-8 shadow-soft">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Our Story</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We've all been there—trying to coordinate a meetup with friends, only to spend hours
                  debating where to go. Someone suggests a place that's "close" to them, but it's
                  an hour away for everyone else. The group chat becomes an endless scroll of
                  suggestions, counter-suggestions, and "I'm fine with whatever."
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  HalfwayMeet was born from this frustration. We believe meeting up should be about
                  the people, not the logistics. Our smart midpoint calculator considers travel time,
                  not just distance, ensuring everyone gets to the meetup with the same effort.
                  Add in filters for vibe and ambience, and you've got a spot everyone will actually
                  want to visit.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              <div className="bg-card rounded-xl p-6 shadow-soft animate-fade-in-up" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
                <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Fair for Everyone</h3>
                <p className="text-muted-foreground">
                  No one should have to travel twice as far. We calculate midpoints based on
                  actual travel time, making meetups equitable.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-soft animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
                <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Save Time</h3>
                <p className="text-muted-foreground">
                  Stop scrolling through endless group chats. Find the perfect spot in seconds,
                  not hours.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-soft animate-fade-in-up" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
                <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Find Your Vibe</h3>
                <p className="text-muted-foreground">
                  Whether you want Instagram-worthy cafes or cozy hideaways, filter by the
                  ambience that matters to your group.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-soft animate-fade-in-up" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>
                <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Privacy First</h3>
                <p className="text-muted-foreground">
                  Your locations are processed securely and never stored. No sign-up required,
                  no tracking, no hassle.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center bg-gradient-hero rounded-2xl p-12 text-white animate-scale-in">
              <h2 className="text-3xl font-bold mb-4">Ready to find your perfect meetup spot?</h2>
              <p className="text-lg mb-6 text-white/90">
                Join thousands making fair, fun meetups happen
              </p>
              <a
                href="/find-meetup"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/95 transition-all hover:scale-105 shadow-large"
              >
                Get Started Now
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
