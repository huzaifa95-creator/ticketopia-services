
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { CalendarIcon, MapPinIcon, ClockIcon } from "lucide-react";
import { useEvents } from "@/hooks/use-events";

const FeaturedEvents = () => {
  const navigate = useNavigate();
  const { featuredEvents, isLoading } = useEvents();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="w-full h-48" />
            <CardHeader>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {featuredEvents?.map((event) => (
        <Card key={event.id} className="overflow-hidden">
          <div className="relative aspect-video overflow-hidden">
            <img 
              src={event.image} 
              alt={event.title} 
              className="object-cover w-full h-full transition-transform hover:scale-105"
            />
          </div>
          <CardHeader>
            <CardTitle className="line-clamp-1">{event.title}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarIcon className="mr-1 h-4 w-4" /> 
              {new Date(event.date).toLocaleDateString()}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <MapPinIcon className="mr-1 h-4 w-4" /> 
              {event.location}
            </div>
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <ClockIcon className="mr-1 h-4 w-4" /> 
              {event.time}
            </div>
            <p className="line-clamp-2 text-sm">{event.description}</p>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={() => navigate(`/events/${event.id}`)}
            >
              View Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default FeaturedEvents;
