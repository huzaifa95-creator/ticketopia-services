
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToSignup = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  const NavLinks = () => (
    <>
      <Link to="/" className="font-medium transition-colors hover:text-primary">
        Home
      </Link>
      <Link to="/events" className="font-medium transition-colors hover:text-primary">
        Events
      </Link>
      {isLoggedIn && (
        <>
          <Link to="/my-bookings" className="font-medium transition-colors hover:text-primary">
            My Bookings
          </Link>
          <Link to="/add-event" className="font-medium transition-colors hover:text-primary">
            Add Event
          </Link>
        </>
      )}
    </>
  );

  const AuthButtons = () => (
    <div className="flex items-center gap-4">
      {isLoggedIn ? (
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <>
          <Button variant="outline" onClick={navigateToLogin}>
            Login
          </Button>
          <Button onClick={navigateToSignup}>Sign Up</Button>
        </>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        <div className="flex items-center justify-between w-full">
          <Link to="/" className="text-xl font-bold">
            EventHub
          </Link>

          {isMobile ? (
            <div className="flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col gap-6 mt-6">
                    <NavLinks />
                    <AuthButtons />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          ) : (
            <>
              <nav className="flex items-center gap-6 mx-6">
                <NavLinks />
              </nav>
              <AuthButtons />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
