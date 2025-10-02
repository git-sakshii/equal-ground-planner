import Navbar from "@/components/Navbar";

const VotingRoom = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Voting Room
          </h1>
          <p className="text-muted-foreground">Coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default VotingRoom;
