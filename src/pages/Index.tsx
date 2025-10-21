import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturesBento from "@/components/FeaturesBento";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturesBento />
      <Footer />
    </div>
  );
};

export default Index;
