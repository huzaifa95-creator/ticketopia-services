
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import FeaturedEvents from "@/components/FeaturedEvents";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto py-8">
        <section className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-2">Event Booking Platform</h1>
            <p className="text-lg text-muted-foreground">
              Discover and book amazing events in your area
            </p>
          </div>
          <div className="flex justify-center mb-8">
            <Button size="lg" onClick={() => navigate("/events")}>
              Browse All Events
            </Button>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Events</h2>
          <FeaturedEvents />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Find Events</CardTitle>
              <CardDescription>Browse through our collection of events</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Discover events that match your interests, from conferences to concerts, workshops to sports events.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => navigate("/events")}>Browse Events</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Book Tickets</CardTitle>
              <CardDescription>Secure your spot at your favorite events</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Easy booking process with instant confirmation and e-tickets delivered straight to your inbox.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => navigate("/events")}>Book Now</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Host Events</CardTitle>
              <CardDescription>Create and manage your own events</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Create events, manage attendees, and promote your events to our community of event-goers.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => navigate("/login")}>Get Started</Button>
            </CardFooter>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Index;
